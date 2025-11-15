import { NextRequest, NextResponse } from 'next/server';
import { 
  getKVKarbharanaData, 
  getKVKarbharanaDataCached,
  updateKVKarbharanaData,
  initializeKVData 
} from '@/lib/kv-storage';

export async function GET(request: Request) {
  try {
    // Initialize KV data if needed (only runs once)
    await initializeKVData();
    const { searchParams } = new URL(request.url);
    const noCache = searchParams.get('noCache') === '1';
    const karbharanaData = noCache ? await getKVKarbharanaData() : await getKVKarbharanaDataCached();
    return NextResponse.json({ karbharana: karbharanaData });
  } catch (error) {
    console.error('Error fetching karbharana data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch karbharana data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { karbharana } = body;

    if (!karbharana) {
      return NextResponse.json(
        { error: 'Karbharana data is required' },
        { status: 400 }
      );
    }

    // Validate karbharana structure
    if (typeof karbharana !== 'object' || karbharana === null) {
      return NextResponse.json(
        { error: 'Invalid karbharana format. Must be an object.' },
        { status: 400 }
      );
    }

    // Validate taxReports array
    if (karbharana.taxReports && !Array.isArray(karbharana.taxReports)) {
      return NextResponse.json(
        { error: 'taxReports must be an array' },
        { status: 400 }
      );
    }

    // Validate accordions array
    if (karbharana.accordions && !Array.isArray(karbharana.accordions)) {
      return NextResponse.json(
        { error: 'accordions must be an array' },
        { status: 400 }
      );
    }

    // Validate tax report objects
    if (karbharana.taxReports) {
      for (const report of karbharana.taxReports) {
        if (!report.id || !report.year || !report.title) {
          return NextResponse.json(
            { error: 'Each tax report must have id, year, and title fields' },
            { status: 400 }
          );
        }
        if (!report.table || !report.table.columns || !report.table.subColumns || !report.table.rows) {
          return NextResponse.json(
            { error: 'Each tax report must have a valid table structure' },
            { status: 400 }
          );
        }
      }
    }

    // Validate accordion objects
    if (karbharana.accordions) {
      for (const accordion of karbharana.accordions) {
        if (!accordion.id || !accordion.title) {
          return NextResponse.json(
            { error: 'Each accordion must have id and title fields' },
            { status: 400 }
          );
        }
      }
    }

    // Update timestamps for tax reports
    if (karbharana.taxReports) {
      karbharana.taxReports = karbharana.taxReports.map((report: any) => ({
        ...report,
        updatedAt: new Date().toLocaleString('mr-IN', { 
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      }));
    }

    const updatedKarbharana = await updateKVKarbharanaData(karbharana);

    return NextResponse.json({
      message: 'Karbharana updated successfully',
      karbharana: updatedKarbharana,
    });
  } catch (error) {
    console.error('Error updating karbharana:', error);
    return NextResponse.json(
      { error: 'Failed to update karbharana' },
      { status: 500 }
    );
  }
}
