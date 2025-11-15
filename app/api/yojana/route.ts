import { NextRequest, NextResponse } from 'next/server';
import { 
  getKVYojanaData, 
  updateKVYojanaData,
  initializeKVData 
} from '@/lib/kv-storage';

export async function GET() {
  try {
    // Initialize KV data if needed (only runs once)
    await initializeKVData();
    
    const yojanaData = await getKVYojanaData();
    return NextResponse.json({ yojana: yojanaData });
  } catch (error) {
    console.error('Error fetching yojana data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch yojana data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { yojana } = body;

    if (!yojana) {
      return NextResponse.json(
        { error: 'Yojana data is required' },
        { status: 400 }
      );
    }

    // Validate yojana structure
    if (typeof yojana !== 'object' || yojana === null) {
      return NextResponse.json(
        { error: 'Invalid yojana format. Must be an object.' },
        { status: 400 }
      );
    }

    // Validate pradhanMantriAawas section
    if (!yojana.pradhanMantriAawas) {
      return NextResponse.json(
        { error: 'pradhanMantriAawas section is required' },
        { status: 400 }
      );
    }

    const pradhanMantriAawas = yojana.pradhanMantriAawas;

    // Validate required fields
    if (typeof pradhanMantriAawas.heading !== 'string') {
      return NextResponse.json(
        { error: 'heading must be a string' },
        { status: 400 }
      );
    }

    if (typeof pradhanMantriAawas.pdfUrl !== 'string') {
      return NextResponse.json(
        { error: 'pdfUrl must be a string' },
        { status: 400 }
      );
    }

    if (typeof pradhanMantriAawas.content !== 'string') {
      return NextResponse.json(
        { error: 'content must be a string' },
        { status: 400 }
      );
    }

    // Update yojana data
    const updatedYojana = await updateKVYojanaData(yojana);

    return NextResponse.json({ yojana: updatedYojana });
  } catch (error) {
    console.error('Error updating yojana data:', error);
    return NextResponse.json(
      { error: 'Failed to update yojana data' },
      { status: 500 }
    );
  }
}
