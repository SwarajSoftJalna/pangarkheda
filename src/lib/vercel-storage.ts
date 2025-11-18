// Vercel-compatible storage using in-memory storage
// This is a temporary solution for Vercel deployment
// For production, you should implement a proper database (Vercel KV, Supabase, etc.)

import {
  ContentData,
  PadadhikariData,
  FooterData,
  PhotoGalleryData,
  NagrikData,
  AdminProfile
} from './storage';

// Import the default data directly (they're not exported, so we need to recreate them)
const defaultContentStore: ContentData = {
  preheader: '<p>ग्रामपंचायत पांगरखेडा, जालना</p>',
  header: [
    { id: '1', title: 'होम', url: '/' },
    { id: '2', title: 'पदाधिकारी', url: '/padadhikari' },
    { id: '3', title: 'करभारणा', url: '/karbharana' },
    { id: '4', title: 'नागरिकांसाठी', url: '/nagrik' },
    { id: '5', title: 'फोटो गॅलरी', url: '/photo' },
    {
      id: '6', title: 'योजना', url: '#', subItems: [
        { id: '6-1', title: 'प्रधानमंत्री आवास योजना', url: '/pradhanmantri-aawas-yojana' },
        { id: '6-2', title: '१५ वित्त आयोग', url: '/finance-commission' },
        { id: '6-3', title: 'जल जीवन मिशन', url: 'https://water.maharashtra.gov.in/jal-jeevan-mission/', isExternal: true },
        { id: '6-4', title: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजना', url: '/rural-employment-guarantee-scheme' },
        { id: '6-5', title: 'बहुजन कल्याण', url: 'https://obcbahujankalyan.maharashtra.gov.in/mr/schemes/48', isExternal: true },
        { id: '6-6', title: 'अनुसूचीत जाती व नवबौध्द विकास', url: '/scheduled-castes-and-neo-buddhist-development' },
        { id: '6-7', title: ' रमाई आवास योजना', url: '/ramai-awas-yojana' },
        { id: '6-8', title: ' शबरी आदिवासी घरकुल योजना', url: '/shabari-tribal-shelter-scheme' },
        { id: '6-9', title: ' मोदी आवास योजना', url: '/modi-awas-yojana' },
      ]
    },
    { id: '7', title: 'तक्रार', action: 'takrarModal' }
  ],
  headerTitle: 'ग्रामपंचायत पांगरखेडा',
  headerSubtitle: 'जालना, महाराष्ट्र',
  bannerImage: '',
  about: '<h2>आमची पदाधिकारी</h2><p>ग्रामपंचायत पांगरखेडा, जालना</p>',
  yashodatha: '<h2>यशोदाथा योजना</h2><p>ग्रामपंचायत पांगरखेडा येथील यशोदाथा योजनेची माहिती</p>',
  homepage: '<div><h1>ग्रामपंचायत पांगरखेडा, जालना</h1><p>आपल्या गावाची प्रगती, आपली जबाबदारी</p></div>',
  administrativeStructureHeading: 'प्रशासकीय संरचना',
  administrativeStructureImage: '',
  administrativeStructureMembers: [],
  officeBearers: [],
  ctaSection: {
    heading: 'भारतातील पंचायती राज हे ग्रामीण स्थानिक स्वराज्य प्रणालीचे प्रतीक आहे.',
    subheading: 'जन्म, मृत्यू व विवाह यांची नोंदणी अवश्य करा...',
    phone: '+91-9730746355',
    images: []
  },
  populationStats: {
    mainHeading: 'लोकसंख्या आकडेवारी',
    items: [
      { id: '1', icon: '🏠', count: 740, label: 'कुटुंब' },
      { id: '2', icon: '👨‍👩‍👧', count: 3241, label: 'लोकसंख्या' },
      { id: '3', icon: '👨', count: 1730, label: 'पुरुष' },
      { id: '4', icon: '👩', count: 1511, label: 'महिला' }
    ]
  },
  govtLogos: [
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395756/atalbhujal_iqvjfr.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395792/digitalIndia_t6xopn.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395808/g20_qvaoq9.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395824/jal_rptord.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395839/merigovt_eky0n8.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395883/maharastrashanshan_d1fhop.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395900/panchayatraj_k9jtzu.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395913/panchayatvikas_en2ylp.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395928/satamevjayate_w3pvxo.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395939/vasundhara_aseg5n.png',
    'https://res.cloudinary.com/dusmiv4xe/image/upload/v1763395948/yojanavikas_stdqsi.png'

  ],
  lastUpdated: new Date().toISOString()
};

const defaultFooterData: FooterData = {
  column1: [
    { label: 'मुख्यपृष्ठ', url: '/' },
    { label: 'आमच्या बद्दल', url: '#' },
    { label: 'संपर्क', url: '#' }
  ],
  column2: [
    { label: 'योजना', url: '#' },
    { label: 'सेवा', url: '#' },
    { label: 'डाउनलोड', url: '#' }
  ],
  social: {
    instagram: '#',
    twitter: '#',
    facebook: '#',
    youtube: '#'
  },
  address: {
    lines: 'ग्रामपंचायत पांगरखेडा, ता. जालना, जि. जालना, पिन कोड: 431203',
    phone: '+91-9730746355',
    mapLink: 'https://maps.google.com/?q=Savargaon+Hadap+Jalna',
    code: 'GP-MAH-JAL-001'
  }
};

const defaultPadadhikariData: PadadhikariData = {
  tab1: [
    {
      id: '1',
      image: '',
      name: 'श्रीमती इंदुबाई राऊत',
      role: 'सरपंच',
      active: true
    },
    {
      id: '2',
      image: '',
      name: 'श्रीमती अलका ढोरे',
      role: 'ग्रामपंचायत अधिकारी',
      active: true
    }
  ],
  tab2: [
    {
      id: '3',
      image: '',
      name: 'श्री तुषार पाटील',
      role: 'लेखापाल',
      active: true
    }
  ],
  tab3: [
    {
      id: '4',
      image: '',
      name: 'श्रीमती सोनाबाई आनंद',
      role: 'सदस्य',
      active: true
    }
  ]
};

const defaultPhotoGalleryData: PhotoGalleryData = {
  heading: 'आम्ही आरोग्य करीता कटिबद्ध आहोत',
  subheading: 'आमच्या ग्रामपंचायतीत सांस्कृतिक, क्रीडा आणि सामाजिक कार्यक्रमांचे आयोजन केले जाते.',
  sections: [
    {
      id: 'sec-1',
      title: 'गॅलरी',
      images: [
        {
          id: '1',
          src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A',
          caption: 'आरोग्य शिबीर'
        },
        {
          id: '2',
          src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A',
          caption: 'शाळा सभागृह कार्यक्रम'
        },
        {
          id: '3',
          src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A',
          caption: 'महिला गट उपक्रम'
        },
        {
          id: '4',
          src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A',
          caption: 'ग्रामसभा कार्यक्रम'
        },
        {
          id: '5',
          src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A',
          caption: 'आरोग्य जनजागृती शिबीर'
        },
        {
          id: '6',
          src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A',
          caption: 'सामाजिक अभियान'
        }
      ]
    }
  ]
};

const defaultNagrikData: NagrikData = {
  accordions: [
    {
      id: '1',
      title: 'स्व: घोषणा पत्र',
      items: [
        {
          id: '1-1',
          label: 'शौचालय असल्याबाबत स्वयंघोषणापत्र',
          type: 'pdf',
          url: ''
        },
        {
          id: '1-2',
          label: 'रहिवाशी स्वयंघोषणापत्र',
          type: 'pdf',
          url: ''
        }
      ]
    },
    {
      id: '2',
      title: 'अर्ज',
      items: [
        {
          id: '2-1',
          label: 'मंजूर नोंदणी अर्ज',
          type: 'pdf',
          url: ''
        },
        {
          id: '2-2',
          label: 'ऑनलाइन दाखले मिळविण्यासाठी इथे क्लिक करा',
          type: 'link',
          url: 'https://example.com'
        }
      ]
    },
    {
      id: '3',
      title: 'ग्रामपंचायती मार्फत दिले जाणारे महसूल विभागाचे दाखले',
      items: [
        {
          id: '3-1',
          label: 'जातीचा दाखला अर्ज',
          type: 'pdf',
          url: ''
        }
      ]
    },
    {
      id: '4',
      title: 'तक्रार',
      items: [
        {
          id: '4-1',
          label: 'ऑनलाइन तक्रारीसाठी इथे क्लिक करा (शासकीय पोर्टल)',
          type: 'link',
          url: 'https://example.com'
        }
      ]
    }
  ]
};

const defaultAdminProfile: AdminProfile = {
  displayName: 'Administrator',
  email: 'gp.manepuri@gmail.com'
};

// In-memory storage (will reset on each function invocation)
// This allows the API to respond without errors, but won't persist data
let memoryStorage: {
  content?: ContentData;
  padadhikari?: PadadhikariData;
  footer?: FooterData;
  photoGallery?: PhotoGalleryData;
  nagrik?: NagrikData;
  adminProfile?: AdminProfile;
} = {};

// Content data functions
export const getVercelContentData = (): ContentData => {
  if (!memoryStorage.content) {
    memoryStorage.content = defaultContentStore;
  }
  return memoryStorage.content!;
};

export const updateVercelContentData = (contentData: Partial<ContentData>): ContentData => {
  const currentContent = getVercelContentData();
  const updatedContent = { ...currentContent, ...contentData };
  memoryStorage.content = updatedContent;
  console.log('Content updated (in-memory storage):', Object.keys(contentData));
  return updatedContent;
};

// Padadhikari data functions
export const getVercelPadadhikariData = (): PadadhikariData => {
  if (!memoryStorage.padadhikari) {
    memoryStorage.padadhikari = defaultPadadhikariData;
  }
  return memoryStorage.padadhikari!;
};

export const updateVercelPadadhikariData = (padadhikariData: Partial<PadadhikariData>): PadadhikariData => {
  const currentPadadhikari = getVercelPadadhikariData();
  const updatedPadadhikari = { ...currentPadadhikari, ...padadhikariData };
  memoryStorage.padadhikari = updatedPadadhikari;
  console.log('Padadhikari updated (in-memory storage)');
  return updatedPadadhikari;
};

// Footer data functions
export const getVercelFooterData = (): FooterData => {
  if (!memoryStorage.footer) {
    memoryStorage.footer = defaultFooterData;
  }
  return memoryStorage.footer!;
};

export const updateVercelFooterData = (footerData: Partial<FooterData>): FooterData => {
  const currentFooter = getVercelFooterData();
  const updatedFooter = { ...currentFooter, ...footerData };
  memoryStorage.footer = updatedFooter;
  console.log('Footer updated (in-memory storage)');
  return updatedFooter;
};

// Photo gallery data functions
export const getVercelPhotoGalleryData = (): PhotoGalleryData => {
  if (!memoryStorage.photoGallery) {
    memoryStorage.photoGallery = defaultPhotoGalleryData;
  }
  return memoryStorage.photoGallery!;
};

export const updateVercelPhotoGalleryData = (photoGalleryData: Partial<PhotoGalleryData>): PhotoGalleryData => {
  const currentPhotoGallery = getVercelPhotoGalleryData();
  const updatedPhotoGallery = { ...currentPhotoGallery, ...photoGalleryData };
  memoryStorage.photoGallery = updatedPhotoGallery;
  console.log('Photo gallery updated (in-memory storage):', photoGalleryData.heading ? `Updated heading: ${photoGalleryData.heading}` : 'Updated images');
  return updatedPhotoGallery;
};

// Nagrik data functions
export const getVercelNagrikData = (): NagrikData => {
  if (!memoryStorage.nagrik) {
    memoryStorage.nagrik = defaultNagrikData;
  }
  return memoryStorage.nagrik!;
};

export const updateVercelNagrikData = (nagrikData: Partial<NagrikData>): NagrikData => {
  const currentNagrik = getVercelNagrikData();
  const updatedNagrik = { ...currentNagrik, ...nagrikData };
  memoryStorage.nagrik = updatedNagrik;
  console.log('Nagrik updated (in-memory storage)');
  return updatedNagrik;
};

// Admin profile functions
export const getVercelAdminProfile = (): AdminProfile => {
  if (!memoryStorage.adminProfile) {
    memoryStorage.adminProfile = defaultAdminProfile;
  }
  return memoryStorage.adminProfile!;
};

export const updateVercelAdminProfile = (profileData: Partial<AdminProfile>): AdminProfile => {
  const currentProfile = getVercelAdminProfile();
  const updatedProfile = { ...currentProfile, ...profileData };
  memoryStorage.adminProfile = updatedProfile;
  console.log('Admin profile updated (in-memory storage)');
  return updatedProfile;
};
