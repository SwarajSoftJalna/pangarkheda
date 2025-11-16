import { NextRequest, NextResponse } from 'next/server';
import { 
  getKVNagrikData, 
  getKVNagrikDataCached,
  updateKVNagrikData
} from '@/lib/kv-storage';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const noCache = searchParams.get('noCache') === '1';
    const nagrikData = noCache ? await getKVNagrikData() : await getKVNagrikDataCached();
    return NextResponse.json({ nagrik: nagrikData });
  } catch (error) {
    console.error('Error fetching nagrik data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nagrik data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nagrik } = body;

    if (!nagrik) {
      return NextResponse.json(
        { error: 'Nagrik data is required' },
        { status: 400 }
      );
    }

    // Basic nagrik structure validation
    if (typeof nagrik !== 'object' || nagrik === null) {
      return NextResponse.json(
        { error: 'Invalid nagrik format. Must be an object.' },
        { status: 400 }
      );
    }

    // Validate accordions array shape (but allow empty titles/items)
    if (!nagrik.accordions || !Array.isArray(nagrik.accordions)) {
      return NextResponse.json(
        { error: 'accordions must be an array' },
        { status: 400 }
      );
    }

    for (const accordion of nagrik.accordions) {
      if (!accordion || typeof accordion !== 'object') {
        return NextResponse.json(
          { error: 'Each accordion must be an object' },
          { status: 400 }
        );
      }

      // Only require an id; title can be empty string while editing
      if (!accordion.id) {
        return NextResponse.json(
          { error: 'Each accordion must have an id field' },
          { status: 400 }
        );
      }

      if (!Array.isArray(accordion.items)) {
        return NextResponse.json(
          { error: 'Each accordion must have an items array' },
          { status: 400 }
        );
      }

      // Validate items structure but allow empty label/url values
      for (const item of accordion.items) {
        if (!item || typeof item !== 'object') {
          return NextResponse.json(
            { error: 'Each item must be an object' },
            { status: 400 }
          );
        }

        if (!item.id) {
          return NextResponse.json(
            { error: 'Each item must have an id field' },
            { status: 400 }
          );
        }

        if (item.type !== 'pdf' && item.type !== 'link') {
          return NextResponse.json(
            { error: 'Item type must be either "pdf" or "link"' },
            { status: 400 }
          );
        }
      }
    }

    const updatedNagrik = await updateKVNagrikData(nagrik);

    return NextResponse.json({
      message: 'Nagrik updated successfully',
      nagrik: updatedNagrik,
    });
  } catch (error) {
    console.error('Error updating nagrik:', error);
    return NextResponse.json(
      { error: 'Failed to update nagrik' },
      { status: 500 }
    );
  }
}
