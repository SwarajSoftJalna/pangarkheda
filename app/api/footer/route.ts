import { NextRequest, NextResponse } from 'next/server';
import { getFooterData, updateFooterData } from '@/lib/storage';

export async function GET() {
  try {
    const footerData = getFooterData();
    return NextResponse.json({ footer: footerData });
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { footer } = body;

    if (!footer) {
      return NextResponse.json(
        { error: 'Footer data is required' },
        { status: 400 }
      );
    }

    // Validate footer structure
    if (typeof footer !== 'object' || footer === null) {
      return NextResponse.json(
        { error: 'Invalid footer format. Must be an object.' },
        { status: 400 }
      );
    }

    // Validate columns
    if (footer.column1 && !Array.isArray(footer.column1)) {
      return NextResponse.json(
        { error: 'column1 must be an array of links' },
        { status: 400 }
      );
    }

    if (footer.column2 && !Array.isArray(footer.column2)) {
      return NextResponse.json(
        { error: 'column2 must be an array of links' },
        { status: 400 }
      );
    }

    // Validate social media object
    if (footer.social && (typeof footer.social !== 'object' || footer.social === null)) {
      return NextResponse.json(
        { error: 'social must be an object' },
        { status: 400 }
      );
    }

    // Validate address object
    if (footer.address && (typeof footer.address !== 'object' || footer.address === null)) {
      return NextResponse.json(
        { error: 'address must be an object' },
        { status: 400 }
      );
    }

    const updatedFooter = updateFooterData(footer);

    return NextResponse.json({
      message: 'Footer updated successfully',
      footer: updatedFooter,
    });
  } catch (error) {
    console.error('Error updating footer:', error);
    return NextResponse.json(
      { error: 'Failed to update footer' },
      { status: 500 }
    );
  }
}
