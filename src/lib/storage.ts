import fs from 'fs';
import path from 'path';

export interface MenuItem {
  id: string;
  title: string;
  url?: string;
  isExternal?: boolean;
  subItems?: MenuItem[];
}

export interface OfficeBearerMember {
  id: string;
  image: string;
  name: string;
  title: string;
  desc?: string;
}

export interface CtaSection {
  heading: string;
  subheading: string;
  phone: string;
  images: string[];
}

export interface PopulationStatsItem {
  id: string;
  icon: string;
  count: number;
  label: string;
}

export interface PopulationStats {
  mainHeading: string;
  items: PopulationStatsItem[];
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterSocial {
  instagram: string;
  twitter: string;
  facebook: string;
  youtube: string;
}

export interface FooterAddress {
  lines: string;
  phone: string;
  mapLink: string;
  code: string;
}

export interface FooterData {
  column1: FooterLink[];
  column2: FooterLink[];
  social: FooterSocial;
  address: FooterAddress;
}

export interface PadadhikariMember {
  id: string;
  image: string;
  name: string;
  role: string;
  active: boolean;
}

export interface PadadhikariData {
  tab1: PadadhikariMember[]; // ग्रा. पं. कार्यकर्तीणी
  tab2: PadadhikariMember[]; // ग्रा. पं. कर्मचारी
  tab3: PadadhikariMember[]; // सर्व सदस्य
}

export interface TaxTableData {
  columns: string[];
  subColumns: string[][];
  rows: Record<string, number>[];
}

export interface TaxReport {
  id: string;
  year: string;
  title: string;
  table: TaxTableData;
  updatedAt: string;
}

export interface PaymentAccordion {
  id: string;
  title: string;
  image: string;
}

export interface KarbharanaData {
  taxReports: TaxReport[];
  accordions: PaymentAccordion[];
}

export interface NagrikItem {
  id: string;
  label: string;
  type: 'pdf' | 'link';
  url: string;
}

export interface NagrikAccordion {
  id: string;
  title: string;
  items: NagrikItem[];
}

export interface NagrikData {
  accordions: NagrikAccordion[];
}

export interface GalleryImage {
  id: string;
  src: string;
  caption: string;
}

export interface PhotoGalleryData {
  heading: string;
  subheading: string;
  images: GalleryImage[];
}

export interface YojanaSection {
  id: string;
  heading: string;
  pdfUrl: string;
  content: string;
}

export interface YojanaData {
  pradhanMantriAawas: YojanaSection;
  financeCommission: YojanaSection;
}

export interface ContentData {
  preheader: string;
  header: MenuItem[];
  headerTitle: string;
  headerSubtitle: string;
  bannerImage: string;
  about: string;
  yashodatha: string;
  homepage: string;
  administrativeStructureHeading: string;
  administrativeStructureImage: string;
  officeBearers: OfficeBearerMember[];
  ctaSection: CtaSection;
  populationStats: PopulationStats;
  govtLogos: string[];
  lastUpdated: string;
}

export interface AdminProfile {
  displayName: string;
  email: string;
}

// File paths for persistent storage
const DATA_DIR = path.join(process.cwd(), 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const PROFILE_FILE = path.join(DATA_DIR, 'profile.json');
const FOOTER_FILE = path.join(DATA_DIR, 'footer.json');
const PADADHIKARI_FILE = path.join(DATA_DIR, 'padadhikari.json');
const KARBHARANA_FILE = path.join(DATA_DIR, 'karbharana.json');
const NAGRIK_FILE = path.join(DATA_DIR, 'nagrik.json');
const PHOTO_GALLERY_FILE = path.join(DATA_DIR, 'photo-gallery.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default content data
const defaultContentStore: ContentData = {
  preheader: '<p>ग्रामपंचायत सावरगाव हडप, जालना | आपण हा फॉर्म भरून आपली तक्रार किंवा सूचना आपल्या ग्रामपंचायत ला कळवू शकता | gp.jalna@gmail.com | +91-9730746355</p>',
  headerTitle: 'ग्रामपंचायत सावरगाव हडप',
  headerSubtitle: 'जालना, महाराष्ट्र',
  bannerImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  about: '<div class="about-section"><h2>आमची पदाधिकारी</h2><p>ग्रामपंचायत सावरगाव हडप, जालना: पदाधिकारी वाटणीची गाथा</p><div class="officials-info"><p>ग्रामपंचायत हडप गाव हे जालना तालुक्यातील जिल्हा जालना येथे वसले आहे. ग्रामपंचायत जालना जिल्ह्यात हडप गाव हे जालना तालुक्यातील गावांपैकी एक आहे. ग्रामपंचायत हडप गावातील जनता हे मुख्यतः शेती व्यवसायावर अवलंबून आहे.</p><p>या गावात पोस्ट ऑफिस ग्रामपंचायत आहे हे गाव पालघर रेल्वे स्टेशन जवळ आहे आणि प्रभावशाली व्यक्ती 04 आहे ग्रामपंचायत एकूण जनसंख्या सुमारे 2460 हे ग्रामपंचायत आमची लोकसंख्या 561 आहे एकूण देवस्थानांची संख्या कुटुंबांची एकूण संख्या 563 महिला व 367 पुरुष 196 आहे एवढी आहे -06 वी पास 353 ते 10 वर -01 एसएसी ते 43 इंटर घरात दुकानांची संख्या जा व एकूण कर्मचारी संख्या -05</p></div></div>',
  yashodatha: '<div class="yashodatha-section"><h2>यशोदाथा योजना</h2><p>ग्रामपंचायत सावरगाव हडप येथील यशोदाथा योजनेची माहिती</p><p>या योजनेअंतर्गत गावातील महिलांसाठी विविध सुविधा उपलब्ध करून देण्यात आल्या आहेत.</p></div>',
  header: [
    {
      id: '1',
      title: 'होम',
      url: '/'
    },
    {
      id: '2',
      title: 'पदाधिकारी',
      url: '/padadhikari'
    },
    {
      id: '3',
      title: 'करभारणा',
      url: '/karbharana'
    },
    {
      id: '4',
      title: 'नागरिकांसाठी',
      url: '/nagrik'
    },
    {
      id: '5',
      title: 'फोटो गॅलरी',
      url: '/photo'
    },
    {
      id: '6',
      title: 'योजना',
      subItems: [
        { id: '6-1', title: 'प्रधान मंत्री आवास योजना', url: '/yojana/pradhan-mantri-awas' },
        { id: '6-2', title: 'जल जीवन मिशन', url: '/yojana/jal-jeevan-mission' },
        { id: '6-3', title: '१५ वित्त आयोग', url: '/yojana/15-finance-commission' },
        { id: '6-4', title: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजना', url: '/yojana/mgnrega' },
        { id: '6-5', title: 'तांडा/वस्ती योजना', url: '/yojana/tanda-vasti' },
        { id: '6-6', title: 'अनुसूचीत जाती व नवबौध्द विकास योजना', url: '/yojana/scheduled-castes' },
        { id: '6-7', title: 'रमाई आवास योजना', url: '/yojana/ramai-awas' },
        { id: '6-8', title: 'शबरी आवास योजना', url: '/yojana/shabari-awas' },
        { id: '6-9', title: 'मोदी आवास योजना', url: '/yojana/modi-awas' }
      ]
    },
    {
      id: '7',
      title: 'लाभार्थी',
      subItems: [
        { id: '7-1', title: 'दिव्यांग लाभार्थी जि. प. / पं स्तर', url: '/labharthi/divyang-district' },
        { id: '7-2', title: 'दिव्यांग लाभार्थी ग्रामस्तर', url: '/labharthi/divyang-gram' },
        { id: '7-3', title: '१५-मागासवर्गीय-लाभार्थी', url: '/labharthi/magasvargiya' },
        { id: '7-4', title: 'समाजकल्याण-लाभार्थी', url: '/labharthi/samajkalyan' },
        { id: '7-5', title: 'उज्वला-योजना-लाभार्थी', url: '/labharthi/ujjwala' },
        { id: '7-6', title: 'पीएम किसान लाभार्थी', url: '/labharthi/pm-kisan' }
      ]
    },
    {
      id: '8',
      title: 'तक्रार',
      url: '/takrar'
    }
  ],
  homepage: `
    <div class="space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-green-800 mb-4">ग्रामपंचायत सावरगाव हडप, जालना</h1>
        <p class="text-xl text-gray-700 mb-6">आपल्या गावाची प्रगती, आपली जबाबदारी</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-green-700 mb-4">पदाधिकारी</h2>
          <div class="space-y-3">
            <div class="border-l-4 border-green-500 pl-4">
              <h3 class="font-semibold">श्री. श्रीमती अंलका धांडे</h3>
              <p class="text-gray-600">सरपंच</p>
            </div>
            <div class="border-l-4 border-blue-500 pl-4">
              <h3 class="font-semibold">श्रीमती इंदुबाई जनार्धन राऊत</h3>
              <p class="text-gray-600">उपसरपंच</p>
            </div>
            <div class="border-l-4 border-orange-500 pl-4">
              <h3 class="font-semibold">श्रीमती तुळसाबाई भिमराव डोंगरे</h3>
              <p class="text-gray-600">ग्राम सेवक</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-green-700 mb-4">महत्वाची माहिती</h2>
          <div class="space-y-4">
            <p class="text-gray-700">भारतातील पंचायती राज हे ग्रामीण स्थानिक स्वराज्य प्रणालीचे प्रतीक आहे.</p>
            <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <p class="font-semibold text-yellow-800">महत्वाचे सूचना:</p>
              <p class="text-yellow-700">जन्म, मृत्यू व विवाह यांची नोंदणी अवश्य करा...</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg">
        <h2 class="text-2xl font-semibold text-center text-green-800 mb-6">लोकसंख्या आकडेवारी</h2>
        <div class="grid md:grid-cols-3 gap-6 text-center">
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-gray-800">एकूण लोकसंख्या</h3>
            <p class="text-3xl font-bold text-green-600">2,450</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-gray-800">पुरुष</h3>
            <p class="text-3xl font-bold text-blue-600">1,280</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-gray-800">महिला</h3>
            <p class="text-3xl font-bold text-pink-600">1,170</p>
          </div>
        </div>
      </div>
    </div>
  `,
  administrativeStructureHeading: 'प्रशासकीय संरचना',
  administrativeStructureImage: '',
  officeBearers: [
    {
      id: '1',
      image: '',
      name: 'श्रीमती अलका ढोरे',
      title: 'ग्रामपंचायत अधिकारी',
      desc: ''
    },
    {
      id: '2',
      image: '',
      name: 'श्रीमती इंदुबाई जनार्धन राऊत',
      title: 'सरपंच',
      desc: ''
    },
    {
      id: '3',
      image: '',
      name: 'श्रीमती तुलसाबाई भिमराव डेंगरे',
      title: 'उपसरपंच',
      desc: ''
    }
  ],
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
  lastUpdated: new Date().toISOString(),
};

const defaultAdminProfile: AdminProfile = {
  displayName: 'Admin User',
  email: 'admin@grampanchayat.in'
};

const defaultFooterData: FooterData = {
  column1: [
    { label: 'शासन निर्णय', url: '/decision' },
    { label: 'जालना जिल्हा परिषद', url: '/jalna-zp' },
    { label: 'ग्रामपंचायत कायदा', url: '/panchayat-act' }
  ],
  column2: [
    { label: 'मतदार यादीत नाव शोधण्यासाठी', url: 'https://votersearch.in' },
    { label: 'कृषी विभाग महाडिबिटी', url: 'https://mahadbtmahait.gov.in' },
    { label: 'डिजिटल इंडिया', url: 'https://digitalindia.gov.in' }
  ],
  social: {
    instagram: '',
    twitter: '',
    facebook: '',
    youtube: ''
  },
  address: {
    lines: 'यू. पो. सावरगाव हडप, ता: जालना, जि: जालना, पिन: 423401',
    phone: '+91-9730746355',
    mapLink: 'https://maps.google.com/?q=Savargaon+Hadap',
    code: '037784'
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

const defaultKarbharanaData: KarbharanaData = {
  taxReports: [
    {
      id: '1',
      year: '2023-24',
      title: 'कर वसूली अहवाल',
      table: {
        columns: ['मागील वर्ष येणे बाकी', 'मागणी (2024-25)', 'वसूली'],
        subColumns: [
          ['घरपट्टी', 'पाणीपट्टी'],
          ['घरपट्टी', 'पाणीपट्टी'],
          ['घरपट्टी', 'पाणीपट्टी']
        ],
        rows: [
          {
            'घरपट्टी_बाकी': 0,
            'पाणीपट्टी_बाकी': 0,
            'घरपट्टी_मागणी': 0,
            'पाणीपट्टी_मागणी': 0,
            'घरपट्टी_वसूली': 0,
            'पाणीपट्टी_वसूली': 0
          }
        ]
      },
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
    },
    {
      id: '2',
      year: '2024-25',
      title: 'कर वसूली अहवाल',
      table: {
        columns: ['मागील वर्ष येणे बाकी', 'मागणी (2025-26)', 'वसूली'],
        subColumns: [
          ['घरपट्टी', 'पाणीपट्टी'],
          ['घरपट्टी', 'पाणीपट्टी'],
          ['घरपट्टी', 'पाणीपट्टी']
        ],
        rows: [
          {
            'घरपट्टी_बाकी': 0,
            'पाणीपट्टी_बाकी': 0,
            'घरपट्टी_मागणी': 0,
            'पाणीपट्टी_मागणी': 0,
            'घरपट्टी_वसूली': 0,
            'पाणीपट्टी_वसूली': 0
          }
        ]
      },
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

const defaultNagrikData: NagrikData = {
  accordions: [
    {
      id: '1',
      title: 'स्व: घोषणा पत्र',
      items: [
        {
          id: '1',
          label: 'शौचालय असल्याबाबत स्वयंघोषणापत्र',
          type: 'pdf',
          url: ''
        },
        {
          id: '2',
          label: 'रहिवाशी स्वयंघोषणापत्र',
          type: 'pdf',
          url: ''
        },
        {
          id: '3',
          label: 'वीज जोडणी स्वयंघोषणापत्र',
          type: 'pdf',
          url: ''
        },
        {
          id: '4',
          label: 'हयात असल्याबाबत स्वयंघोषणापत्र',
          type: 'pdf',
          url: ''
        },
        {
          id: '5',
          label: 'विधवा असल्याबाबत स्वयंघोषणापत्र',
          type: 'pdf',
          url: ''
        },
        {
          id: '6',
          label: 'परित्यक्त्या असल्याबाबत स्वयंघोषणापत्र',
          type: 'pdf',
          url: ''
        },
        {
          id: '7',
          label: 'विभक्त कुटुंब असल्यास स्वयंघोषणापत्र',
          type: 'pdf',
          url: ''
        },
        {
          id: '8',
          label: 'कोणत्याही योजनेचा लाभ न घेतल्याचे स्वयंघोषणापत्र',
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
          id: '9',
          label: 'मंजूर नोंदणी अर्ज',
          type: 'pdf',
          url: ''
        },
        {
          id: '10',
          label: 'ऑनलाइन दाखले मिळविण्यासाठी इथे क्लिक करा',
          type: 'link',
          url: 'https://example.gov.in/online-documents'
        },
        {
          id: '11',
          label: 'अर्ज नमुना',
          type: 'pdf',
          url: ''
        },
        {
          id: '12',
          label: 'अर्जा सोबत जोडवायची कागदपत्रांची यादी',
          type: 'pdf',
          url: ''
        },
        {
          id: '13',
          label: 'बांधकाम परवानगी',
          type: 'pdf',
          url: ''
        }
      ]
    },
    {
      id: '3',
      title: 'ग्रामपंचायती मार्फत दिले जाणारे महसूल विभागाचे दाखले',
      items: [
        {
          id: '14',
          label: 'जातीचा दाखला अर्ज',
          type: 'pdf',
          url: ''
        },
        {
          id: '15',
          label: 'अल्पभूधारक फॉर्म',
          type: 'pdf',
          url: ''
        },
        {
          id: '16',
          label: 'वय व अधिवास प्रमाणपत्र अर्ज',
          type: 'pdf',
          url: ''
        },
        {
          id: '17',
          label: 'अल्प उत्पन्न गट प्रमाणपत्र अर्ज',
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
          id: '18',
          label: 'ऑनलाइन तक्रारीसाठी इथे क्लिक करा (शासकीय पोर्टल)',
          type: 'link',
          url: 'https://grievance.maharashtra.gov.in'
        },
        {
          id: '19',
          label: 'ऑनलाइन तक्रार नोंदविण्यासाठी इथे क्लिक करा (थेट ग्रामपंचायत)',
          type: 'link',
          url: 'https://gramtkrportal.in'
        }
      ]
    }
  ]
};

const defaultPhotoGalleryData: PhotoGalleryData = {
  heading: 'आम्ही आरोग्य करीता कटिबद्ध आहोत',
  subheading: 'आमच्या ग्रामपंचायतीत सांस्कृतिक, क्रीडा आणि सामाजिक कार्यक्रमांचे आयोजन केले जाते.',
  images: [
    {
      id: '1',
      src: '',
      caption: 'आरोग्य शिबीर'
    },
    {
      id: '2',
      src: '',
      caption: 'शाळा सभागृह कार्यक्रम'
    },
    {
      id: '3',
      src: '',
      caption: 'महिला गट उपक्रम'
    },
    {
      id: '4',
      src: '',
      caption: 'ग्रामसभा कार्यक्रम'
    },
    {
      id: '5',
      src: '',
      caption: 'आरोग्य जनजागृती शिबीर'
    },
    {
      id: '6',
      src: '',
      caption: 'सामाजिक अभियान'
    }
  ]
};

// Helper functions for file operations
const readContentFromFile = (): ContentData => {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const fileContent = fs.readFileSync(CONTENT_FILE, 'utf8');
      const parsedContent = JSON.parse(fileContent);
      return { ...defaultContentStore, ...parsedContent };
    }
  } catch (error) {
    console.error('Error reading content file:', error);
  }
  return defaultContentStore;
};

const writeContentToFile = (content: ContentData): void => {
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing content file:', error);
  }
};

const readProfileFromFile = (): AdminProfile => {
  try {
    if (fs.existsSync(PROFILE_FILE)) {
      const fileContent = fs.readFileSync(PROFILE_FILE, 'utf8');
      const parsedProfile = JSON.parse(fileContent);
      return { ...defaultAdminProfile, ...parsedProfile };
    }
  } catch (error) {
    console.error('Error reading profile file:', error);
  }
  return defaultAdminProfile;
};

const writeProfileToFile = (profile: AdminProfile): void => {
  try {
    fs.writeFileSync(PROFILE_FILE, JSON.stringify(profile, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing profile file:', error);
  }
};

// Public API functions
export const getContent = (): ContentData => {
  return readContentFromFile();
};

export const updateContent = (newContent: Partial<Omit<ContentData, 'lastUpdated'>>): ContentData => {
  const currentContent = readContentFromFile();
  const updatedContent = {
    ...currentContent,
    ...newContent,
    lastUpdated: new Date().toISOString(),
  };
  writeContentToFile(updatedContent);
  return updatedContent;
};

export const getAdminProfile = (): AdminProfile => {
  return readProfileFromFile();
};

export const updateAdminProfile = (newProfile: AdminProfile): AdminProfile => {
  writeProfileToFile(newProfile);
  return newProfile;
};

export const resetContent = (): ContentData => {
  const resetContent = {
    preheader: '<p>ग्रामपंचायत सावरगाव हडप, जालना</p>',
    headerTitle: 'ग्रामपंचायत सावरगाव हडप',
    headerSubtitle: 'जालना, महाराष्ट्र',
    bannerImage: '',
    about: '<h2>आमची पदाधिकारी</h2><p>ग्रामपंचायत सावरगाव हडप, जालना</p>',
    yashodatha: '<h2>यशोदाथा योजना</h2><p>ग्रामपंचायत सावरगाव हडप येथील यशोदाथा योजनेची माहिती</p>',
    header: [
      { id: '1', title: 'होम', url: '/' },
      { id: '2', title: 'पदाधिकारी', url: '/padadhikari' }
    ],
    homepage: '<h1>ग्रामपंचायत सावरगाव हडप, जालना</h1><p>आपल्या गावाची प्रगती, आपली जबाबदारी</p>',
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
    lastUpdated: new Date().toISOString(),
  };
  writeContentToFile(resetContent);
  return resetContent;
};

// Footer storage functions
const readFooterFromFile = (): FooterData => {
  try {
    if (fs.existsSync(FOOTER_FILE)) {
      const fileContent = fs.readFileSync(FOOTER_FILE, 'utf8');
      const parsedFooter = JSON.parse(fileContent);
      return { ...defaultFooterData, ...parsedFooter };
    }
  } catch (error) {
    console.error('Error reading footer file:', error);
  }
  return defaultFooterData;
};

const writeFooterToFile = (footerData: FooterData): void => {
  try {
    fs.writeFileSync(FOOTER_FILE, JSON.stringify(footerData, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing footer file:', error);
  }
};

// Footer management functions
export const getFooterData = (): FooterData => {
  return readFooterFromFile();
};

export const updateFooterData = (footerData: Partial<FooterData>): FooterData => {
  const currentFooter = readFooterFromFile();
  const updatedFooter = { ...currentFooter, ...footerData };
  writeFooterToFile(updatedFooter);
  return updatedFooter;
};

export const resetFooterData = (): FooterData => {
  writeFooterToFile(defaultFooterData);
  return defaultFooterData;
};

// Padadhikari storage functions
const readPadadhikariFromFile = (): PadadhikariData => {
  try {
    if (fs.existsSync(PADADHIKARI_FILE)) {
      const fileContent = fs.readFileSync(PADADHIKARI_FILE, 'utf8');
      const parsedPadadhikari = JSON.parse(fileContent);
      return { ...defaultPadadhikariData, ...parsedPadadhikari };
    }
  } catch (error) {
    console.error('Error reading padadhikari file:', error);
  }
  return defaultPadadhikariData;
};

const writePadadhikariToFile = (padadhikariData: PadadhikariData): void => {
  try {
    fs.writeFileSync(PADADHIKARI_FILE, JSON.stringify(padadhikariData, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing padadhikari file:', error);
  }
};

// Padadhikari management functions
export const getPadadhikariData = (): PadadhikariData => {
  return readPadadhikariFromFile();
};

export const updatePadadhikariData = (padadhikariData: Partial<PadadhikariData>): PadadhikariData => {
  const currentPadadhikari = readPadadhikariFromFile();
  const updatedPadadhikari = { ...currentPadadhikari, ...padadhikariData };
  writePadadhikariToFile(updatedPadadhikari);
  return updatedPadadhikari;
};

export const resetPadadhikariData = (): PadadhikariData => {
  writePadadhikariToFile(defaultPadadhikariData);
  return defaultPadadhikariData;
};

// Karbharana storage functions
const readKarbharanaFromFile = (): KarbharanaData => {
  try {
    if (fs.existsSync(KARBHARANA_FILE)) {
      const fileContent = fs.readFileSync(KARBHARANA_FILE, 'utf8');
      const parsedKarbharana = JSON.parse(fileContent);
      return { ...defaultKarbharanaData, ...parsedKarbharana };
    }
  } catch (error) {
    console.error('Error reading karbharana file:', error);
  }
  return defaultKarbharanaData;
};

const writeKarbharanaToFile = (karbharanaData: KarbharanaData): void => {
  try {
    fs.writeFileSync(KARBHARANA_FILE, JSON.stringify(karbharanaData, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing karbharana file:', error);
  }
};

// Karbharana management functions
export const getKarbharanaData = (): KarbharanaData => {
  return readKarbharanaFromFile();
};

export const updateKarbharanaData = (karbharanaData: Partial<KarbharanaData>): KarbharanaData => {
  const currentKarbharana = readKarbharanaFromFile();
  const updatedKarbharana = { ...currentKarbharana, ...karbharanaData };
  writeKarbharanaToFile(updatedKarbharana);
  return updatedKarbharana;
};

export const resetKarbharanaData = (): KarbharanaData => {
  writeKarbharanaToFile(defaultKarbharanaData);
  return defaultKarbharanaData;
};

// Nagrik storage functions
const readNagrikFromFile = (): NagrikData => {
  try {
    if (fs.existsSync(NAGRIK_FILE)) {
      const fileContent = fs.readFileSync(NAGRIK_FILE, 'utf8');
      const parsedNagrik = JSON.parse(fileContent);
      return { ...defaultNagrikData, ...parsedNagrik };
    }
  } catch (error) {
    console.error('Error reading nagrik file:', error);
  }
  return defaultNagrikData;
};

const writeNagrikToFile = (nagrikData: NagrikData): void => {
  try {
    fs.writeFileSync(NAGRIK_FILE, JSON.stringify(nagrikData, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing nagrik file:', error);
  }
};

// Nagrik management functions
export const getNagrikData = (): NagrikData => {
  return readNagrikFromFile();
};

export const updateNagrikData = (nagrikData: Partial<NagrikData>): NagrikData => {
  const currentNagrik = readNagrikFromFile();
  const updatedNagrik = { ...currentNagrik, ...nagrikData };
  writeNagrikToFile(updatedNagrik);
  return updatedNagrik;
};

export const resetNagrikData = (): NagrikData => {
  writeNagrikToFile(defaultNagrikData);
  return defaultNagrikData;
};

// Photo Gallery storage functions
const readPhotoGalleryFromFile = (): PhotoGalleryData => {
  try {
    if (fs.existsSync(PHOTO_GALLERY_FILE)) {
      const fileContent = fs.readFileSync(PHOTO_GALLERY_FILE, 'utf8');
      const parsedPhotoGallery = JSON.parse(fileContent);
      return { ...defaultPhotoGalleryData, ...parsedPhotoGallery };
    }
  } catch (error) {
    console.error('Error reading photo gallery file:', error);
  }
  return defaultPhotoGalleryData;
};

const writePhotoGalleryToFile = (photoGalleryData: PhotoGalleryData): void => {
  try {
    fs.writeFileSync(PHOTO_GALLERY_FILE, JSON.stringify(photoGalleryData, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing photo gallery file:', error);
  }
};

// Photo Gallery management functions
export const getPhotoGalleryData = (): PhotoGalleryData => {
  return readPhotoGalleryFromFile();
};

export const updatePhotoGalleryData = (photoGalleryData: Partial<PhotoGalleryData>): PhotoGalleryData => {
  const currentPhotoGallery = readPhotoGalleryFromFile();
  const updatedPhotoGallery = { ...currentPhotoGallery, ...photoGalleryData };
  writePhotoGalleryToFile(updatedPhotoGallery);
  return updatedPhotoGallery;
};

export const resetPhotoGalleryData = (): PhotoGalleryData => {
  writePhotoGalleryToFile(defaultPhotoGalleryData);
  return defaultPhotoGalleryData;
};
