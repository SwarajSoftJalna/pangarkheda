import { NextRequest, NextResponse } from 'next/server';
import { 
  getKVPhotoGalleryData, 
  getKVPhotoGalleryDataCached,
  updateKVPhotoGalleryData
} from '@/lib/kv-storage';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const noCache = searchParams.get('noCache') === '1';
    const photoGalleryData = noCache ? await getKVPhotoGalleryData() : await getKVPhotoGalleryDataCached();
    return NextResponse.json({ photoGallery: photoGalleryData });
  } catch (error) {
    console.error('Error fetching photo gallery data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photo gallery data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { photoGallery } = body;

    if (!photoGallery) {
      return NextResponse.json(
        { error: 'Photo gallery data is required' },
        { status: 400 }
      );
    }

    // Validate photo gallery structure
    if (typeof photoGallery !== 'object' || photoGallery === null) {
      return NextResponse.json(
        { error: 'Invalid photo gallery format. Must be an object.' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (typeof photoGallery.heading !== 'string') {
      return NextResponse.json(
        { error: 'heading must be a string' },
        { status: 400 }
      );
    }

    if (typeof photoGallery.subheading !== 'string') {
      return NextResponse.json(
        { error: 'subheading must be a string' },
        { status: 400 }
      );
    }

    // Validate sections array
    if (!photoGallery.sections || !Array.isArray(photoGallery.sections)) {
      return NextResponse.json(
        { error: 'sections must be an array' },
        { status: 400 }
      );
    }

    // Validate section objects and nested images
    for (const section of photoGallery.sections) {
      if (!section.id || typeof section.title !== 'string') {
        return NextResponse.json(
          { error: 'Each section must have id and title fields' },
          { status: 400 }
        );
      }
      if (!Array.isArray(section.images)) {
        return NextResponse.json(
          { error: 'Each section must have an images array' },
          { status: 400 }
        );
      }
      for (const image of section.images) {
        if (!image.id || typeof image.caption !== 'string') {
          return NextResponse.json(
            { error: 'Each image must have id and caption fields' },
            { status: 400 }
          );
        }
        if (typeof image.src !== 'string') {
          return NextResponse.json(
            { error: 'Each image src must be a string (can be empty)' },
            { status: 400 }
          );
        }
      }
    }

    const updatedPhotoGallery = await updateKVPhotoGalleryData(photoGallery);

    return NextResponse.json({
      message: 'Photo gallery updated successfully',
      photoGallery: updatedPhotoGallery,
    });
  } catch (error) {
    console.error('Error updating photo gallery:', error);
    return NextResponse.json(
      { error: 'Failed to update photo gallery' },
      { status: 500 }
    );
  }
}
