# ग्रामपंचायत CMS - Next.js 15 + TinyMCE

A complete, modern CMS built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and TinyMCE, specifically designed for Gram Panchayat websites. Features a comprehensive admin panel with authentication and dynamic content management.

## 🚀 Features

- **Next.js 15** with App Router and TypeScript
- **Authentication System** with login protection
- **TinyMCE Integration** for rich text editing
- **Dynamic Header Menus** with dropdown navigation
- **Responsive Design** matching reference site structure
- **Admin Dashboard** with sidebar navigation
- **Content Management** for Header, Homepage, and PreHeader
- **Safe HTML Rendering** with DOMPurify sanitization
- **Mobile-First Design** with marquee animations
- **Modern UI/UX** inspired by government websites

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx                 # Global layout with Tailwind
│   ├── page.tsx                   # Public homepage
│   ├── login/page.tsx             # Admin login page
│   ├── admin/
│   │   ├── layout.tsx             # Admin layout with sidebar
│   │   ├── page.tsx               # Admin dashboard
│   │   ├── header/page.tsx        # Header menu management
│   │   ├── homepage/page.tsx      # Homepage content editor
│   │   ├── settings/page.tsx      # Settings and preheader
│   │   └── api/content/route.ts   # Content management API
├── src/
│   ├── components/
│   │   ├── Header.tsx             # Fixed header with dropdowns
│   │   ├── PreHeader.tsx          # Scrolling announcement bar
│   │   ├── Homepage.tsx           # Main content renderer
│   │   ├── Sidebar.tsx            # Admin navigation sidebar
│   │   ├── LoginForm.tsx          # Authentication form
│   │   ├── EditorClient.tsx       # TinyMCE wrapper
│   │   └── Viewer.tsx             # Safe HTML renderer
│   ├── lib/
│   │   ├── auth.ts                # Authentication logic
│   │   ├── storage.ts             # Enhanced content storage
│   │   └── sanitizeHtml.ts        # HTML sanitization
│   └── styles/
│       └── globals.css            # Tailwind + custom styles
├── .env.example                   # Environment variables template
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure TinyMCE API Key

1. Sign up for a free TinyMCE account at [tiny.cloud](https://www.tiny.cloud/)
2. Get your API key from the dashboard
3. Update the `.env.local` file:

```env
NEXT_PUBLIC_TINYMCE_KEY=your-actual-tinymce-api-key-here
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your website.

### 4. Access Admin Panel

Visit [http://localhost:3000/admin](http://localhost:3000/admin) to edit content.

## 📝 Content Management

The CMS includes three editable sections:

1. **PreHeader** - Top banner (announcements, contact info)
2. **Header** - Main title and subtitle
3. **Homepage** - Main body content with rich formatting

### Admin Features

- **Rich Text Editor** - Full TinyMCE editor with formatting tools
- **Live Preview** - Preview changes before saving
- **Auto-save** - Content is saved to memory storage
- **Responsive Interface** - Works on desktop and mobile

## 🎨 Styling

The project uses Tailwind CSS with:

- **Custom Components** - Reusable button and card styles
- **Responsive Design** - Mobile-first approach
- **Modern Typography** - Clean, readable fonts
- **Professional Color Scheme** - Blue primary with gray accents

## 🔧 Customization

### Adding New Content Sections

1. Update the `ContentData` interface in `src/lib/storage.ts`
2. Add new editor in `app/admin/page.tsx`
3. Create component in `src/components/`
4. Update API routes to handle new fields

### Database Integration

Replace the in-memory storage in `src/lib/storage.ts` with your preferred database:

- **MongoDB** with Mongoose
- **PostgreSQL** with Prisma
- **Supabase** for serverless
- **Firebase** Firestore

### Styling Customization

- Modify `tailwind.config.js` for theme changes
- Update `src/styles/globals.css` for custom styles
- Customize TinyMCE appearance in `EditorClient.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The project works on any platform supporting Next.js:

- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 📦 Dependencies

### Core Dependencies
- `next` - React framework
- `react` & `react-dom` - React library
- `@tinymce/tinymce-react` - TinyMCE editor
- `dompurify` - HTML sanitization

### Development Dependencies
- `typescript` - Type checking
- `tailwindcss` - CSS framework
- `@types/*` - TypeScript definitions

## 🔒 Security

- **HTML Sanitization** - DOMPurify prevents XSS attacks
- **Input Validation** - API routes validate content
- **Environment Variables** - Secure API key storage

## 📱 Browser Support

- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **Mobile Responsive** - iOS Safari, Chrome Mobile
- **TinyMCE Compatibility** - Supports all TinyMCE features

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For issues and questions:

1. Check the [TinyMCE Documentation](https://www.tiny.cloud/docs/)
2. Review [Next.js Documentation](https://nextjs.org/docs)
3. Open an issue in this repository

---

**Built with ❤️ using Next.js 15, TinyMCE, and Tailwind CSS**
