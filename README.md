# ग्रामपंचायत CMS - Next.js 15 + TinyMCE with Vercel KV

A complete, modern CMS built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and TinyMCE, specifically designed for Gram Panchayat websites. Features persistent storage with Vercel KV and a comprehensive admin panel.

## 🚀 Features

- **Next.js 15** with App Router and TypeScript
- **Vercel KV Storage** - Persistent data across deployments
- **Authentication System** with login protection
- **TinyMCE Integration** for rich text editing
- **Dynamic Content Management** - Header, Homepage, Photo Gallery, Nagrik Services, Padadhikari, Footer, Karbharana
- **Responsive Design** matching government website aesthetics
- **Admin Dashboard** with sidebar navigation
- **Safe HTML Rendering** with DOMPurify sanitization
- **Mobile-First Design** with professional animations

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx                 # Global layout
│   ├── page.tsx                   # Public homepage
│   ├── login/page.tsx             # Admin login
│   ├── admin/                     # Admin panel
│   │   ├── page.tsx               # Dashboard
│   │   ├── homepage/page.tsx      # Content editor
│   │   ├── header/page.tsx        # Header management
│   │   ├── settings/page.tsx      # Settings
│   │   ├── photo/page.tsx         # Photo gallery
│   │   ├── nagrik/page.tsx        # Citizen services
│   │   ├── padadhikari/page.tsx   # Office bearers
│   │   ├── footer/page.tsx        # Footer management
│   │   └── karbharana/page.tsx    # Tax collection
│   └── api/                       # API routes with KV storage
│       ├── content/route.ts
│       ├── photo/route.ts
│       ├── nagrik/route.ts
│       ├── padadhikari/route.ts
│       ├── footer/route.ts
│       └── karbharana/route.ts
├── src/
│   ├── components/                # React components
│   ├── lib/
│   │   ├── kv-storage.ts          # Vercel KV storage
│   │   ├── auth.ts                # Authentication
│   │   └── storage.ts             # Data interfaces
│   └── styles/globals.css         # Tailwind + custom styles
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_TINYMCE_KEY=your-tinymce-api-key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Access Admin Panel

Visit [http://localhost:3000/admin](http://localhost:3000/admin)
- Email: `gp.manepuri@gmail.com`
- Password: `12345`

## 🚀 Deployment with Vercel KV

### Step 1: Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Step 2: Set Up Vercel KV (Required for persistence)

1. **Vercel Dashboard** → **Storage** → **Create Database**
2. Select **"KV"** (Redis) → Choose region → **Create**
3. Click **"Connect"** → Select your project → **Connect**
4. Vercel auto-adds environment variables:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
5. **Redeploy** your project to apply environment variables

### Step 3: Verify Everything Works

Test your APIs after deployment:
```bash
curl https://your-project.vercel.app/api/content
curl https://your-project.vercel.app/api/photo
```

Should return your actual data, not defaults.

## 📝 Content Management Features

### Main Sections
- **Homepage Content** - Rich text editor with TinyMCE
- **Header Management** - Dynamic navigation menus
- **Photo Gallery** - Image upload with captions
- **Nagrik Services** - Citizen services with PDF/links
- **Padadhikari** - Office bearers management
- **Footer** - Global footer with links and info
- **Karbharana** - Tax collection reports
- **Settings** - Preheader and admin profile

### Admin Features
- **Rich Text Editor** - Full TinyMCE with formatting
- **Image Upload** - Photo gallery and member photos
- **Dynamic Menus** - Drag-and-drop header navigation
- **Tabbed Interface** - Organized content sections
- **Live Preview** - See changes before saving
- **Responsive Design** - Works on all devices

## 🔧 Troubleshooting

### Data Not Appearing on Frontend?

**Most Common Cause: KV Database Not Connected**

1. Check Vercel Dashboard → Storage → Your KV database
2. Status should show: "Connected to your-project"
3. If not connected, click KV database → "Connect" → Select project
4. Redeploy after connecting

### API Errors?

1. Check environment variables in Vercel dashboard
2. Verify KV_URL, KV_REST_API_URL, KV_REST_API_TOKEN exist
3. Check Vercel Function logs for errors

### Clear Caches

- **Browser**: `Ctrl+Shift+R` (hard refresh)
- **Vercel**: Redeploy latest deployment

## 📦 Dependencies

### Core Dependencies
- `next` - React framework
- `react` & `react-dom` - React library
- `@tinymce/tinymce-react` - TinyMCE editor
- `@vercel/kv` - Vercel KV storage
- `dompurify` - HTML sanitization

### Development Dependencies
- `typescript` - Type checking
- `tailwindcss` - CSS framework
- `@types/*` - TypeScript definitions

## 🔒 Security

- **HTML Sanitization** - DOMPurify prevents XSS attacks
- **Input Validation** - API routes validate all content
- **Environment Variables** - Secure API key storage
- **Authentication** - Session-based admin access

## 📱 Browser Support

- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **Mobile Responsive** - iOS Safari, Chrome Mobile
- **TinyMCE Compatibility** - Full editor support

## 🎯 Expected Behavior

When properly set up:
1. **You add content in CMS** → Saves to Vercel KV ✅
2. **You refresh frontend** → Fetches from KV ✅
3. **Data appears within 1-2 seconds** ✅
4. **Data persists across deployments** ✅

## 🆘 Quick Help

### If Something Doesn't Work:

1. **Check KV Connection**: Vercel Dashboard → Storage → Connected?
2. **Test APIs**: `curl https://your-project.vercel.app/api/content`
3. **Check Console**: F12 → Look for JavaScript errors
4. **Clear Caches**: Browser hard refresh + Vercel redeploy
5. **Check Logs**: Vercel Dashboard → Functions → Logs

### Most Common Issues:
- KV database not connected to project
- Environment variables missing after KV connection
- Browser caching old data
- Data not saving to KV properly

---

**Built with ❤️ using Next.js 15, TinyMCE, Tailwind CSS, and Vercel KV**
