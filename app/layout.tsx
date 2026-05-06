import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'opsz']
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap'
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'ABC Leasing & Financing — Equipment Financing Done Right Since 1979',
  description:
    'Veteran-owned equipment and truck financing. 45+ lender network. $0 down. Decisions in 24 hours. Trucks, paving, landscaping, waste & recycling, used and private-party purchases. Family-operated since 1979 in Delmar, NY.',
  keywords: [
    'equipment financing',
    'truck financing',
    'commercial leasing',
    'used equipment loans',
    'private party equipment financing',
    'paving equipment financing',
    'waste equipment financing',
    'working capital loans',
    'invoice factoring'
  ],
  openGraph: {
    title: 'ABC Leasing & Financing — Equipment Done Right Since 1979',
    description:
      'Veteran-owned. Family-operated. 45+ lenders. $0 down. Decisions in 24 hours.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
