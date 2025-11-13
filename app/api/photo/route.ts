import { NextRequest, NextResponse } from 'next/server';
import { getPhotoGalleryData, updatePhotoGalleryData } from '@/lib/storage';

export async function GET() {
  try {
    const photoGalleryData = getPhotoGalleryData();
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

    // Validate images array
    if (!photoGallery.images || !Array.isArray(photoGallery.images)) {
      return NextResponse.json(
        { error: 'images must be an array' },
        { status: 400 }
      );
    }

    // Validate image objects
    for (const image of photoGallery.images) {
      if (!image.id || typeof image.caption !== 'string') {
        return NextResponse.json(
          { error: 'Each image must have id and caption fields' },
          { status: 400 }
        );
      }
      // src can be empty for newly added images that haven't been uploaded yet
      if (typeof image.src !== 'string') {
        return NextResponse.json(
          { error: 'Each image src must be a string (can be empty)' },
          { status: 400 }
        );
      }
    }

    const updatedPhotoGallery = updatePhotoGalleryData(photoGallery);

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
