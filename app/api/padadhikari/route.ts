import { NextRequest, NextResponse } from 'next/server';
import { 
  getKVPadadhikariData, 
  getKVPadadhikariDataCached,
  updateKVPadadhikariData,
  initializeKVData 
} from '@/lib/kv-storage';

export async function GET(request: Request) {
  try {
    // Initialize KV data if needed (only runs once)
    await initializeKVData();
    const { searchParams } = new URL(request.url);
    const noCache = searchParams.get('noCache') === '1';
    const padadhikariData = noCache ? await getKVPadadhikariData() : await getKVPadadhikariDataCached();
    return NextResponse.json({ padadhikari: padadhikariData });
  } catch (error) {
    console.error('Error fetching padadhikari data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch padadhikari data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { padadhikari } = body;

    if (!padadhikari) {
      return NextResponse.json(
        { error: 'Padadhikari data is required' },
        { status: 400 }
      );
    }

    // Validate padadhikari structure
    if (typeof padadhikari !== 'object' || padadhikari === null) {
      return NextResponse.json(
        { error: 'Invalid padadhikari format. Must be an object.' },
        { status: 400 }
      );
    }

    // Validate tabs
    const validTabs = ['tab1', 'tab2', 'tab3'];
    for (const tab of validTabs) {
      if (padadhikari[tab] && !Array.isArray(padadhikari[tab])) {
        return NextResponse.json(
          { error: `${tab} must be an array of members` },
          { status: 400 }
        );
      }
    }

    // Validate member objects in each tab
    for (const tab of validTabs) {
      if (padadhikari[tab]) {
        for (const member of padadhikari[tab]) {
          if (!member.id || !member.name || !member.role) {
            return NextResponse.json(
              { error: `Each member must have id, name, and role fields` },
              { status: 400 }
            );
          }
          if (typeof member.active !== 'boolean') {
            return NextResponse.json(
              { error: `Member active field must be a boolean` },
              { status: 400 }
            );
          }
        }
      }
    }

    const updatedPadadhikari = await updateKVPadadhikariData(padadhikari);

    return NextResponse.json({
      message: 'Padadhikari updated successfully',
      padadhikari: updatedPadadhikari,
    });
  } catch (error) {
    console.error('Error updating padadhikari:', error);
    return NextResponse.json(
      { error: 'Failed to update padadhikari' },
      { status: 500 }
    );
  }
}
