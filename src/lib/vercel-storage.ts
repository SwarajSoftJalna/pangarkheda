// Vercel-compatible storage using in-memory storage
// This is a temporary solution for Vercel deployment
// For production, you should implement a proper database (Vercel KV, Supabase, etc.)

import { 
  ContentData, 
  PadadhikariData, 
  FooterData, 
  PhotoGalleryData, 
  NagrikData
} from './storage';

// Import the default data directly (they're not exported, so we need to recreate them)
const defaultContentStore: ContentData = {
  preheader: '<p>ग्रामपंचायत सावरगाव हडप, जालना</p>',
  header: [
    { id: '1', title: 'होम', url: '/' },
    { id: '2', title: 'पदाधिकारी', url: '/padadhikari' },
    { id: '3', title: 'करभारणा', url: '/karbharana' },
    { id: '4', title: 'नागरिकांसाठी', url: '/nagrik' },
    { id: '5', title: 'फोटो गॅलरी', url: '/photo' },
    { id: '6', title: 'योजना', url: '#', subItems: [
      { id: '6-1', title: 'यशोदाथा योजना', url: '#' },
      { id: '6-2', title: 'महात्मा गांधी तंटाश्री ग्रामीण अभियान', url: '#' },
      { id: '6-3', title: 'राष्ट्रीय ग्रामीण पेयजल योजना', url: '#' },
      { id: '6-4', title: 'प्रधानमंत्री आवास योजना', url: '#' },
      { id: '6-5', title: 'सौर ऊर्जा योजना', url: '#' }
    ]}
  ],
  headerTitle: 'ग्रामपंचायत सावरगाव हडप',
  headerSubtitle: 'जालना, महाराष्ट्र',
  bannerImage: '',
  about: '<h2>आमची पदाधिकारी</h2><p>ग्रामपंचायत सावरगाव हडप, जालना</p>',
  yashodatha: '<h2>यशोदाथा योजना</h2><p>ग्रामपंचायत सावरगाव हडप येथील यशोदाथा योजनेची माहिती</p>',
  homepage: '<div><h1>ग्रामपंचायत सावरगाव हडप, जालना</h1><p>आपल्या गावाची प्रगती, आपली जबाबदारी</p></div>',
  administrativeStructureHeading: 'प्रशासकीय संरचना',
  administrativeStructureImage: '',
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
      { id: '1', icon: '👨‍👩‍👧', count: 740, label: 'कुटुंब' },
      { id: '2', icon: '🏠', count: 3241, label: 'लोकसंख्या' },
      { id: '3', icon: '👨', count: 1730, label: 'पुरुष' },
      { id: '4', icon: '👩', count: 1511, label: 'महिला' }
    ]
  },
  govtLogos: [],
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
    lines: 'ग्रामपंचायत सावरगाव हडप, ता. जालना, जि. जालना, पिन कोड: 431203',
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

// In-memory storage (will reset on each function invocation)
// This allows the API to respond without errors, but won't persist data
let memoryStorage: {
  content?: ContentData;
  padadhikari?: PadadhikariData;
  footer?: FooterData;
  photoGallery?: PhotoGalleryData;
  nagrik?: NagrikData;
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
