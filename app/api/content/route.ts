import { NextRequest, NextResponse } from 'next/server';
import { 
  getKVContentData, 
  updateKVContentData, 
  getKVAdminProfile, 
  updateKVAdminProfile,
  initializeKVData 
} from '@/lib/kv-storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'profile') {
      const profile = await getKVAdminProfile();
      return NextResponse.json(profile);
    }

    const content = await getKVContentData();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    if (type === 'profile') {
      const { displayName, email } = body;
      
      if (typeof displayName !== 'string' || typeof email !== 'string') {
        return NextResponse.json(
          { error: 'Invalid profile format. DisplayName and email must be strings.' },
          { status: 400 }
        );
      }

      const updatedProfile = await updateKVAdminProfile({ displayName, email });
      return NextResponse.json({
        message: 'Profile updated successfully',
        profile: updatedProfile,
      });
    }

    // Handle content updates
    const { preheader, header, headerTitle, headerSubtitle, bannerImage, about, yashodatha, homepage, administrativeStructureHeading, administrativeStructureImage, officeBearers, ctaSection, populationStats, govtLogos } = body;
    
    // Validate preheader and homepage
    if (preheader !== undefined && typeof preheader !== 'string') {
      return NextResponse.json(
        { error: 'Invalid preheader format. Must be a string.' },
        { status: 400 }
      );
    }

    if (homepage !== undefined && typeof homepage !== 'string') {
      return NextResponse.json(
        { error: 'Invalid homepage format. Must be a string.' },
        { status: 400 }
      );
    }

    // Validate header title and subtitle
    if (headerTitle !== undefined && typeof headerTitle !== 'string') {
      return NextResponse.json(
        { error: 'Invalid headerTitle format. Must be a string.' },
        { status: 400 }
      );
    }

    if (headerSubtitle !== undefined && typeof headerSubtitle !== 'string') {
      return NextResponse.json(
        { error: 'Invalid headerSubtitle format. Must be a string.' },
        { status: 400 }
      );
    }

    // Validate banner image
    if (bannerImage !== undefined && typeof bannerImage !== 'string') {
      return NextResponse.json(
        { error: 'Invalid bannerImage format. Must be a string.' },
        { status: 400 }
      );
    }

    // Validate about section
    if (about !== undefined && typeof about !== 'string') {
      return NextResponse.json(
        { error: 'Invalid about format. Must be a string.' },
        { status: 400 }
      );
    }

    // Validate yashodatha section
    if (yashodatha !== undefined && typeof yashodatha !== 'string') {
      return NextResponse.json(
        { error: 'Invalid yashodatha format. Must be a string.' },
        { status: 400 }
      );
    }

    // Validate header (array of menu items)
    if (header !== undefined && (!Array.isArray(header))) {
      return NextResponse.json(
        { error: 'Invalid header format. Must be an array of menu items.' },
        { status: 400 }
      );
    }

    // Validate administrative structure fields
    if (administrativeStructureHeading !== undefined && typeof administrativeStructureHeading !== 'string') {
      return NextResponse.json(
        { error: 'Invalid administrativeStructureHeading format. Must be a string.' },
        { status: 400 }
      );
    }

    if (administrativeStructureImage !== undefined && typeof administrativeStructureImage !== 'string') {
      return NextResponse.json(
        { error: 'Invalid administrativeStructureImage format. Must be a string.' },
        { status: 400 }
      );
    }

    // Validate officeBearers field
    if (officeBearers !== undefined && !Array.isArray(officeBearers)) {
      return NextResponse.json(
        { error: 'Invalid officeBearers format. Must be an array.' },
        { status: 400 }
      );
    }

    // Validate ctaSection field
    if (ctaSection !== undefined && (typeof ctaSection !== 'object' || ctaSection === null)) {
      return NextResponse.json(
        { error: 'Invalid ctaSection format. Must be an object.' },
        { status: 400 }
      );
    }

    // Validate populationStats field
    if (populationStats !== undefined && (typeof populationStats !== 'object' || populationStats === null)) {
      return NextResponse.json(
        { error: 'Invalid populationStats format. Must be an object.' },
        { status: 400 }
      );
    }

    // Validate govtLogos field
    if (govtLogos !== undefined && !Array.isArray(govtLogos)) {
      return NextResponse.json(
        { error: 'Invalid govtLogos format. Must be an array.' },
        { status: 400 }
      );
    }

    // Update the content
    const updateData: any = {};
    if (preheader !== undefined) updateData.preheader = preheader;
    if (header !== undefined) updateData.header = header;
    if (headerTitle !== undefined) updateData.headerTitle = headerTitle;
    if (headerSubtitle !== undefined) updateData.headerSubtitle = headerSubtitle;
    if (bannerImage !== undefined) updateData.bannerImage = bannerImage;
    if (about !== undefined) updateData.about = about;
    if (yashodatha !== undefined) updateData.yashodatha = yashodatha;
    if (homepage !== undefined) updateData.homepage = homepage;
    if (administrativeStructureHeading !== undefined) updateData.administrativeStructureHeading = administrativeStructureHeading;
    if (administrativeStructureImage !== undefined) updateData.administrativeStructureImage = administrativeStructureImage;
    if (officeBearers !== undefined) updateData.officeBearers = officeBearers;
    if (ctaSection !== undefined) updateData.ctaSection = ctaSection;
    if (populationStats !== undefined) updateData.populationStats = populationStats;
    if (govtLogos !== undefined) updateData.govtLogos = govtLogos;

    const updatedContent = await updateKVContentData(updateData);

    return NextResponse.json({
      message: 'Content updated successfully',
      content: updatedContent,
    });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { field, content } = body;
    
    if (!field) {
      return NextResponse.json(
        { error: 'Invalid request. Field is required.' },
        { status: 400 }
      );
    }

    if (!['preheader', 'header', 'headerTitle', 'headerSubtitle', 'bannerImage', 'about', 'yashodatha', 'homepage', 'administrativeStructureHeading', 'administrativeStructureImage', 'officeBearers', 'ctaSection', 'populationStats', 'govtLogos'].includes(field)) {
      return NextResponse.json(
        { error: 'Invalid field. Must be preheader, header, headerTitle, headerSubtitle, bannerImage, about, yashodatha, homepage, administrativeStructureHeading, administrativeStructureImage, officeBearers, ctaSection, populationStats, or govtLogos.' },
        { status: 400 }
      );
    }

    // Validate content based on field type
    if ((field === 'header' || field === 'officeBearers' || field === 'govtLogos') && !Array.isArray(content)) {
      return NextResponse.json(
        { error: `${field} content must be an array.` },
        { status: 400 }
      );
    }

    if ((field === 'ctaSection' || field === 'populationStats') && (typeof content !== 'object' || content === null)) {
      return NextResponse.json(
        { error: `${field} content must be an object.` },
        { status: 400 }
      );
    }

    if ((field === 'preheader' || field === 'homepage' || field === 'headerTitle' || field === 'headerSubtitle' || field === 'bannerImage' || field === 'about' || field === 'yashodatha' || field === 'administrativeStructureHeading' || field === 'administrativeStructureImage') && typeof content !== 'string') {
      return NextResponse.json(
        { error: `${field} content must be a string.` },
        { status: 400 }
      );
    }

    const updatedContent = await updateKVContentData({ [field]: content });

    return NextResponse.json({
      message: `${field} updated successfully`,
      content: updatedContent,
    });
  } catch (error) {
    console.error('Error updating content field:', error);
    return NextResponse.json(
      { error: 'Failed to update content field' },
      { status: 500 }
    );
  }
}
