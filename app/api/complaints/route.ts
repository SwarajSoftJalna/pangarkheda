import { NextRequest, NextResponse } from 'next/server';
import { initializeKVData, getKVComplaints, addKVComplaint } from '@/lib/kv-storage';

export async function GET() {
  try {
    await initializeKVData();
    const data = await getKVComplaints();
    return NextResponse.json({ complaints: data.items });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json({ error: 'Failed to fetch complaints' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeKVData();
    const body = await request.json();
    const { name, mobile, type, details } = body;

    if (typeof name !== 'string' || typeof mobile !== 'string' || typeof type !== 'string' || typeof details !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const saved = await addKVComplaint({ name, mobile, type, details });
    return NextResponse.json({ complaint: saved }, { status: 201 });
  } catch (error) {
    console.error('Error creating complaint:', error);
    return NextResponse.json({ error: 'Failed to create complaint' }, { status: 500 });
  }
}
