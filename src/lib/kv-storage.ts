// Vercel KV Storage - Persistent across deployments
// This replaces the in-memory storage with persistent key-value storage

import { kv } from '@vercel/kv';
import {
  ContentData,
  PadadhikariData,
  FooterData,
  PhotoGalleryData,
  NagrikData,
  AdminProfile,
  KarbharanaData,
  YojanaData,
  ComplaintsData,
  ComplaintItem
} from './storage';

// Default data (same as before)
const defaultContentStore: ContentData = {
  preheader: '<p>ग्रामपंचायत सावरगाव हडप, जालना</p>',
  header: [
    { id: '1', title: 'होम', url: '/' },
    { id: '2', title: 'पदाधिकारी', url: '/padadhikari' },
    { id: '3', title: 'करभारणा', url: '/karbharana' },
    { id: '4', title: 'नागरिकांसाठी', url: '/nagrik' },
    { id: '5', title: 'फोटो गॅलरी', url: '/photo' },
    { id: '6', title: 'योजना', url: '#', subItems: [
      { id: '6-1', title: 'प्रधानमंत्री आवास योजना', url: '/pradhanmantri-aawas-yojana' },
      { id: '6-2', title: '१५ वित्त आयोग', url: '/finance-commission' },
      { id: '6-3', title: 'यशोदाथा योजना', url: '#' },
      { id: '6-4', title: 'महात्मा गांधी तंटाश्री ग्रामीण अभियान', url: '#' },
      { id: '6-5', title: 'जल जीवन मिशन', url: '#' },
      { id: '6-6', title: 'स्वच्छ भारत अभियान', url: '#' }
    ]},
    { id: '8', title: 'तक्रार', action: 'takrarModal' }
  ],
  headerTitle: 'ग्रामपंचायत सावरगाव हडप',
  headerSubtitle: 'जालना, महाराष्ट्र',
  bannerImage: '',
  about: '<h2>आमची पदाधिकारी</h2><p>ग्रामपंचायत सावरगाव हडप, जालना</p>',
  yashodatha: '<h2>यशोदाथा योजना</h2><p>ग्रामपंचायत सावरगाव हडप येथील यशोदाथा योजनेची माहिती</p>',
  homepage: '<div><h1>ग्रामपंचायत सावरगाव हडप, जालना</h1><p>आपल्या गावाची प्रगती, आपली जबाबदारी</p></div>',
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
      { id: '1', icon: '👨‍👩‍👧', count: 740, label: 'कुटुंब' },
      { id: '2', icon: '🏠', count: 3241, label: 'लोकसंख्या' },
      { id: '3', icon: '👨', count: 1730, label: 'पुरुष' },
      { id: '4', icon: '👩', count: 1511, label: 'महिला' }
    ]
  },
  govtLogos: [],
  lastUpdated: new Date().toISOString()
};

// Cached getters for other resources
export const getKVPadadhikariDataCached = async (): Promise<PadadhikariData> => {
  try {
    const hot = await kv.get<PadadhikariData>(CACHE_KEYS.PADADHIKARI);
    if (hot) return hot;
  } catch {}
  const data = await getKVPadadhikariData();
  try { await kv.set(CACHE_KEYS.PADADHIKARI, data, { ex: CACHE_TTL_SECONDS }); } catch {}
  return data;
};

export const getKVFooterDataCached = async (): Promise<FooterData> => {
  try {
    const hot = await kv.get<FooterData>(CACHE_KEYS.FOOTER);
    if (hot) return hot;
  } catch {}
  const data = await getKVFooterData();
  try { await kv.set(CACHE_KEYS.FOOTER, data, { ex: CACHE_TTL_SECONDS }); } catch {}
  return data;
};

export const getKVPhotoGalleryDataCached = async (): Promise<PhotoGalleryData> => {
  try {
    const hot = await kv.get<PhotoGalleryData>(CACHE_KEYS.PHOTO_GALLERY);
    if (hot) return hot;
  } catch {}
  const data = await getKVPhotoGalleryData();
  try { await kv.set(CACHE_KEYS.PHOTO_GALLERY, data, { ex: CACHE_TTL_SECONDS }); } catch {}
  return data;
};

export const getKVNagrikDataCached = async (): Promise<NagrikData> => {
  try {
    const hot = await kv.get<NagrikData>(CACHE_KEYS.NAGRIK);
    if (hot) return hot;
  } catch {}
  const data = await getKVNagrikData();
  try { await kv.set(CACHE_KEYS.NAGRIK, data, { ex: CACHE_TTL_SECONDS }); } catch {}
  return data;
};

export const getKVAdminProfileCached = async (): Promise<AdminProfile> => {
  try {
    const hot = await kv.get<AdminProfile>(CACHE_KEYS.ADMIN_PROFILE);
    if (hot) return hot;
  } catch {}
  const data = await getKVAdminProfile();
  try { await kv.set(CACHE_KEYS.ADMIN_PROFILE, data, { ex: CACHE_TTL_SECONDS }); } catch {}
  return data;
};

export const getKVKarbharanaDataCached = async (): Promise<KarbharanaData> => {
  try {
    const hot = await kv.get<KarbharanaData>(CACHE_KEYS.KARBHARANA);
    if (hot) return hot;
  } catch {}
  const data = await getKVKarbharanaData();
  try { await kv.set(CACHE_KEYS.KARBHARANA, data, { ex: CACHE_TTL_SECONDS }); } catch {}
  return data;
};

export const getKVYojanaDataCached = async (): Promise<YojanaData> => {
  try {
    const hot = await kv.get<YojanaData>(CACHE_KEYS.YOJANA);
    if (hot) return hot;
  } catch {}
  const data = await getKVYojanaData();
  try { await kv.set(CACHE_KEYS.YOJANA, data, { ex: CACHE_TTL_SECONDS }); } catch {}
  return data;
};

export const getKVComplaintsCached = async (): Promise<ComplaintsData> => {
  try {
    const hot = await kv.get<ComplaintsData>(CACHE_KEYS.COMPLAINTS);
    if (hot) return hot;
  } catch {}
  const data = await getKVComplaints();
  try { await kv.set(CACHE_KEYS.COMPLAINTS, data, { ex: CACHE_TTL_SECONDS }); } catch {}
  return data;
};

const defaultComplaints: ComplaintsData = {
  items: []
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
  sections: [
    { id: 'sec-1', title: 'आरोग्य शिबीर', images: [] },
    { id: 'sec-2', title: 'ग्रामसभा कार्यक्रम', images: [] },
    { id: 'sec-3', title: 'महिला गट उपक्रम', images: [] },
    { id: 'sec-4', title: 'आरोग्य जनजागृती शिबीर', images: [] },
    { id: 'sec-5', title: 'सामाजिक अभियान', images: [] }
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

const defaultYojanaData: YojanaData = {
  pradhanMantriAawas: {
    id: '1',
    heading: 'प्रधानमंत्री आवास योजना',
    pdfUrl: '',
    content: '<p>प्रधानमंत्री आवास योजना ही भारत सरकारची एक महत्त्वाची योजना आहे. या योजनेअंतर्गत गरीब कुटुंबांना स्वस्त दरात घरे बांधण्यासाठी मदत मिळते.</p>'
  },
  financeCommission: {
    id: '2',
    heading: '१५ वित्त आयोग',
    pdfUrl: '',
    content: '<p>१५ वित्त आयोगाच्या शिफारशीनुसार ग्रामपंचायतींना मिळणारे अनुदान आणि वित्तीय साहाय्याबद्दल माहिती.</p>'
  },
  mgnrega: {
    id: '3',
    heading: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजना',
    pdfUrl: '',
    content: '<p>महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजनेबद्दल माहिती.</p>'
  },
  scheduledCastesNeoBuddhist: {
    id: '4',
    heading: 'अनुसूचीत जाती व नवबौध्द विकास',
    pdfUrl: '',
    content: '<p>अनुसूचीत जाती व नवबौध्द विकास योजनेबद्दल माहिती.</p>'
  },
  ramaiAwas: {
    id: '5',
    heading: 'रमाई आवास योजना',
    pdfUrl: '',
    content: '<p>रमाई आवास योजनेबद्दल माहिती.</p>'
  },
  shabariAdivasiGharkul: {
    id: '6',
    heading: 'शबरी आदिवासी घरकुल योजना',
    pdfUrl: '',
    content: '<p>शबरी आदिवासी घरकुल योजनेबद्दल माहिती.</p>'
  },
  modiAwas: {
    id: '7',
    heading: 'मोदी आवास योजना',
    pdfUrl: '',
    content: '<p>मोदी आवास योजनेबद्दल माहिती.</p>'
  }
};

const defaultAdminProfile: AdminProfile = {
  displayName: 'Administrator',
  email: 'gp.sawargaon@gmail.com'
};

const defaultKarbharanaData: KarbharanaData = {
  taxReports: [
    {
      id: '1',
      year: '2023-24',
      title: 'वार्षिक कर वसूली अहवाल 2023-24',
      table: {
        columns: ['मागील वर्ष येणे बाकी', 'मागणी', 'वसूली'],
        subColumns: [['घरपट्टी'], ['पाणीपट्टी']],
        rows: [
          {
            id: 1,
            घरपट्टी_बाकी: 0,
            पाणीपट्टी_बाकी: 0,
            घरपट्टी_मागणी: 0,
            पाणीपट्टी_मागणी: 0,
            घरपट्टी_वसूली: 0,
            पाणीपट्टी_वसूली: 0
          }
        ]
      },
      updatedAt: '14/11/2025 12:30:00 PM'
    },
    {
      id: '2',
      year: '2024-25',
      title: 'वार्षिक कर वसूली अहवाल 2024-25',
      table: {
        columns: ['मागील वर्ष येणे बाकी', 'मागणी', 'वसूली'],
        subColumns: [['घरपट्टी'], ['पाणीपट्टी']],
        rows: [
          {
            id: 1,
            घरपट्टी_बाकी: 0,
            पाणीपट्टी_बाकी: 0,
            घरपट्टी_मागणी: 0,
            पाणीपट्टी_मागणी: 0,
            घरपट्टी_वसूली: 0,
            पाणीपट्टी_वसूली: 0
          }
        ]
      },
      updatedAt: '14/11/2025 12:30:00 PM'
    }
  ],
  accordions: [
    {
      id: '1',
      title: 'घरपट्टी भरण्यासाठी इथे क्लिक करा',
      image: ''
    },
    {
      id: '2',
      title: 'पाणीपट्टी भरण्यासाठी इथे क्लिक करा',
      image: ''
    }
  ]
};

// KV Storage Keys
const KV_KEYS = {
  CONTENT: 'cms:content',
  PADADHIKARI: 'cms:padadhikari',
  FOOTER: 'cms:footer',
  PHOTO_GALLERY: 'cms:photo-gallery',
  NAGRIK: 'cms:nagrik',
  ADMIN_PROFILE: 'cms:admin-profile',
  KARBHARANA: 'cms:karbharana',
  YOJANA: 'cms:yojana',
  COMPLAINTS: 'cms:complaints'
} as const;

// Cache keys (Redis via Vercel KV) - POC
const CACHE_KEYS = {
  CONTENT: 'cache:content',
  PADADHIKARI: 'cache:padadhikari',
  FOOTER: 'cache:footer',
  PHOTO_GALLERY: 'cache:photo-gallery',
  NAGRIK: 'cache:nagrik',
  ADMIN_PROFILE: 'cache:admin-profile',
  KARBHARANA: 'cache:karbharana',
  YOJANA: 'cache:yojana',
  COMPLAINTS: 'cache:complaints',
} as const;

// POC TTL: 5 minutes
const CACHE_TTL_SECONDS = 60 * 5;

// Content data functions
export const getKVContentData = async (): Promise<ContentData> => {
  try {
    const cached = await kv.get<ContentData>(KV_KEYS.CONTENT);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('Error reading content from KV:', error);
  }
  
  // Return default if KV fails or no data exists
  return defaultContentStore;
};

// GET with cache (POC): serves from Redis cache layer if present
export const getKVContentDataCached = async (): Promise<ContentData> => {
  try {
    const hot = await kv.get<ContentData>(CACHE_KEYS.CONTENT);
    if (hot) return hot;
  } catch (e) {
    console.warn('Cache read failed (content):', e);
  }
  const data = await getKVContentData();
  try {
    await kv.set(CACHE_KEYS.CONTENT, data, { ex: CACHE_TTL_SECONDS });
  } catch (e) {
    console.warn('Cache write failed (content):', e);
  }
  return data;
};

export const updateKVContentData = async (contentData: Partial<ContentData>): Promise<ContentData> => {
  try {
    const currentContent = await getKVContentData();
    const updatedContent = { ...currentContent, ...contentData, lastUpdated: new Date().toISOString() };
    
    await kv.set(KV_KEYS.CONTENT, updatedContent);
    console.log('Content updated (KV storage):', Object.keys(contentData));
    // Invalidate cache (POC)
    try { await kv.del(CACHE_KEYS.CONTENT); } catch {}
    
    return updatedContent;
  } catch (error) {
    console.error('Error updating content in KV:', error);
    throw new Error('Failed to update content');
  }
};

// Padadhikari data functions
export const getKVPadadhikariData = async (): Promise<PadadhikariData> => {
  try {
    const cached = await kv.get<PadadhikariData>(KV_KEYS.PADADHIKARI);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('Error reading padadhikari from KV:', error);
  }
  
  return defaultPadadhikariData;
};

export const updateKVPadadhikariData = async (padadhikariData: Partial<PadadhikariData>): Promise<PadadhikariData> => {
  try {
    const currentPadadhikari = await getKVPadadhikariData();
    const updatedPadadhikari = { ...currentPadadhikari, ...padadhikariData };
    
    await kv.set(KV_KEYS.PADADHIKARI, updatedPadadhikari);
    console.log('Padadhikari updated (KV storage)');
    try { await kv.del(CACHE_KEYS.PADADHIKARI); } catch {}
    
    return updatedPadadhikari;
  } catch (error) {
    console.error('Error updating padadhikari in KV:', error);
    throw new Error('Failed to update padadhikari');
  }
};

// Footer data functions
export const getKVFooterData = async (): Promise<FooterData> => {
  try {
    const cached = await kv.get<FooterData>(KV_KEYS.FOOTER);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('Error reading footer from KV:', error);
  }
  
  return defaultFooterData;
};

export const updateKVFooterData = async (footerData: Partial<FooterData>): Promise<FooterData> => {
  try {
    const currentFooter = await getKVFooterData();
    const updatedFooter = { ...currentFooter, ...footerData };
    
    await kv.set(KV_KEYS.FOOTER, updatedFooter);
    console.log('Footer updated (KV storage)');
    try { await kv.del(CACHE_KEYS.FOOTER); } catch {}
    
    return updatedFooter;
  } catch (error) {
    console.error('Error updating footer in KV:', error);
    throw new Error('Failed to update footer');
  }
};

// Photo gallery data functions
export const getKVPhotoGalleryData = async (): Promise<PhotoGalleryData> => {
  try {
    const cached = await kv.get<PhotoGalleryData>(KV_KEYS.PHOTO_GALLERY);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('Error reading photo gallery from KV:', error);
  }
  
  return defaultPhotoGalleryData;
};

export const updateKVPhotoGalleryData = async (photoGalleryData: Partial<PhotoGalleryData>): Promise<PhotoGalleryData> => {
  try {
    const currentPhotoGallery = await getKVPhotoGalleryData();
    const updatedPhotoGallery = { ...currentPhotoGallery, ...photoGalleryData };
    
    await kv.set(KV_KEYS.PHOTO_GALLERY, updatedPhotoGallery);
    console.log('Photo gallery updated (KV storage):', photoGalleryData.heading ? `Updated heading: ${photoGalleryData.heading}` : 'Updated images');
    try { await kv.del(CACHE_KEYS.PHOTO_GALLERY); } catch {}
    
    return updatedPhotoGallery;
  } catch (error) {
    console.error('Error updating photo gallery in KV:', error);
    throw new Error('Failed to update photo gallery');
  }
};

// Nagrik data functions
export const getKVNagrikData = async (): Promise<NagrikData> => {
  try {
    const cached = await kv.get<NagrikData>(KV_KEYS.NAGRIK);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('Error reading nagrik from KV:', error);
  }
  
  return defaultNagrikData;
};

export const updateKVNagrikData = async (nagrikData: Partial<NagrikData>): Promise<NagrikData> => {
  try {
    const currentNagrik = await getKVNagrikData();
    const updatedNagrik = { ...currentNagrik, ...nagrikData };
    
    await kv.set(KV_KEYS.NAGRIK, updatedNagrik);
    console.log('Nagrik updated (KV storage)');
    try { await kv.del(CACHE_KEYS.NAGRIK); } catch {}
    
    return updatedNagrik;
  } catch (error) {
    console.error('Error updating nagrik in KV:', error);
    throw new Error('Failed to update nagrik');
  }
};

// Admin profile functions
export const getKVAdminProfile = async (): Promise<AdminProfile> => {
  try {
    const cached = await kv.get<AdminProfile>(KV_KEYS.ADMIN_PROFILE);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('Error reading admin profile from KV:', error);
  }
  
  return defaultAdminProfile;
};

export const updateKVAdminProfile = async (profileData: Partial<AdminProfile>): Promise<AdminProfile> => {
  try {
    const currentProfile = await getKVAdminProfile();
    const updatedProfile = { ...currentProfile, ...profileData };
    
    await kv.set(KV_KEYS.ADMIN_PROFILE, updatedProfile);
    console.log('Admin profile updated (KV storage)');
    try { await kv.del(CACHE_KEYS.ADMIN_PROFILE); } catch {}
    
    return updatedProfile;
  } catch (error) {
    console.error('Error updating admin profile in KV:', error);
    throw new Error('Failed to update admin profile');
  }
};

// Karbharana data functions
export const getKVKarbharanaData = async (): Promise<KarbharanaData> => {
  try {
    const cached = await kv.get<KarbharanaData>(KV_KEYS.KARBHARANA);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('Error reading karbharana from KV:', error);
  }
  
  return defaultKarbharanaData;
};

export const updateKVKarbharanaData = async (karbharanaData: Partial<KarbharanaData>): Promise<KarbharanaData> => {
  try {
    const currentKarbharana = await getKVKarbharanaData();
    const updatedKarbharana = { ...currentKarbharana, ...karbharanaData };
    
    await kv.set(KV_KEYS.KARBHARANA, updatedKarbharana);
    console.log('Karbharana updated (KV storage)');
    try { await kv.del(CACHE_KEYS.KARBHARANA); } catch {}
    
    return updatedKarbharana;
  } catch (error) {
    console.error('Error updating karbharana in KV:', error);
    throw new Error('Failed to update karbharana');
  }
};

// Yojana data functions
export const getKVYojanaData = async (): Promise<YojanaData> => {
  try {
    const cached = await kv.get<YojanaData>(KV_KEYS.YOJANA);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('Error reading yojana from KV:', error);
  }
  
  return defaultYojanaData;
};

export const updateKVYojanaData = async (yojanaData: Partial<YojanaData>): Promise<YojanaData> => {
  try {
    const currentYojana = await getKVYojanaData();
    const updatedYojana = { ...currentYojana, ...yojanaData };
    
    await kv.set(KV_KEYS.YOJANA, updatedYojana);
    console.log('Yojana updated (KV storage)');
    try { await kv.del(CACHE_KEYS.YOJANA); } catch {}
    
    return updatedYojana;
  } catch (error) {
    console.error('Error updating yojana in KV:', error);
    throw new Error('Failed to update yojana');
  }
};

// Complaints data functions
export const getKVComplaints = async (): Promise<ComplaintsData> => {
  try {
    const cached = await kv.get<ComplaintsData>(KV_KEYS.COMPLAINTS);
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.error('Error reading complaints from KV:', error);
  }
  return { ...defaultComplaints };
};

export const addKVComplaint = async (item: Omit<ComplaintItem, 'id' | 'createdAt'>): Promise<ComplaintItem> => {
  const current = await getKVComplaints();
  const newItem: ComplaintItem = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...item,
  };
  const updated: ComplaintsData = { items: [newItem, ...(current.items || [])] };
  await kv.set(KV_KEYS.COMPLAINTS, updated);
  try { await kv.del(CACHE_KEYS.COMPLAINTS); } catch {}
  return newItem;
};

// Utility function to initialize all data with defaults
export const initializeKVData = async (): Promise<void> => {
  try {
    // Check if content exists, if not initialize with defaults
    const contentExists = await kv.exists(KV_KEYS.CONTENT);
    if (!contentExists) {
      await kv.set(KV_KEYS.CONTENT, defaultContentStore);
    }

    const padadhikariExists = await kv.exists(KV_KEYS.PADADHIKARI);
    if (!padadhikariExists) {
      await kv.set(KV_KEYS.PADADHIKARI, defaultPadadhikariData);
    }

    const footerExists = await kv.exists(KV_KEYS.FOOTER);
    if (!footerExists) {
      await kv.set(KV_KEYS.FOOTER, defaultFooterData);
    }

    const photoGalleryExists = await kv.exists(KV_KEYS.PHOTO_GALLERY);
    if (!photoGalleryExists) {
      await kv.set(KV_KEYS.PHOTO_GALLERY, defaultPhotoGalleryData);
    }

    const nagrikExists = await kv.exists(KV_KEYS.NAGRIK);
    if (!nagrikExists) {
      await kv.set(KV_KEYS.NAGRIK, defaultNagrikData);
    }

    const adminProfileExists = await kv.exists(KV_KEYS.ADMIN_PROFILE);
    if (!adminProfileExists) {
      await kv.set(KV_KEYS.ADMIN_PROFILE, defaultAdminProfile);
    }

    const karbharanaExists = await kv.exists(KV_KEYS.KARBHARANA);
    if (!karbharanaExists) {
      await kv.set(KV_KEYS.KARBHARANA, defaultKarbharanaData);
    }

    const yojanaExists = await kv.exists(KV_KEYS.YOJANA);
    if (!yojanaExists) {
      await kv.set(KV_KEYS.YOJANA, defaultYojanaData);
    }

    const complaintsExists = await kv.exists(KV_KEYS.COMPLAINTS);
    if (!complaintsExists) {
      await kv.set(KV_KEYS.COMPLAINTS, defaultComplaints);
    }

    console.log('KV data initialized successfully');
  } catch (error) {
    console.error('Error initializing KV data:', error);
  }
};
