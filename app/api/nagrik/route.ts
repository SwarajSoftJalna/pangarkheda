import { NextRequest, NextResponse } from 'next/server';
import { getNagrikData, updateNagrikData } from '@/lib/storage';

export async function GET() {
  try {
    const nagrikData = getNagrikData();
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

    // Validate nagrik structure
    if (typeof nagrik !== 'object' || nagrik === null) {
      return NextResponse.json(
        { error: 'Invalid nagrik format. Must be an object.' },
        { status: 400 }
      );
    }

    // Validate accordions array
    if (!nagrik.accordions || !Array.isArray(nagrik.accordions)) {
      return NextResponse.json(
        { error: 'accordions must be an array' },
        { status: 400 }
      );
    }

    // Validate accordion objects
    for (const accordion of nagrik.accordions) {
      if (!accordion.id || !accordion.title) {
        return NextResponse.json(
          { error: 'Each accordion must have id and title fields' },
          { status: 400 }
        );
      }

      if (!accordion.items || !Array.isArray(accordion.items)) {
        return NextResponse.json(
          { error: 'Each accordion must have an items array' },
          { status: 400 }
        );
      }

      // Validate items
      for (const item of accordion.items) {
        if (!item.id || !item.label || !item.type || !item.url) {
          return NextResponse.json(
            { error: 'Each item must have id, label, type, and url fields' },
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

    const updatedNagrik = updateNagrikData(nagrik);

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
