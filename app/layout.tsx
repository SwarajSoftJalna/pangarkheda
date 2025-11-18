import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ग्रामपंचायत पांगरखेडा',
  description: 'A modern content management system for Gram Panchayat websites',
  keywords: 'ग्रामपंचायत, पांगरखेडा, ग्रामपंचायत संस्था, ग्रामपंचायत संस्था, Manepuri, Gram Panchayat, Gram Panchayat CMS, Gram Panchayat Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
