import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SocialFi Connect - Empower Creators. Reward Fans.',
  description: 'Build Communities on Base through direct subscriptions, pay-per-view content, and tokenized rewards.',
  keywords: ['SocialFi', 'Base', 'Creator Economy', 'Web3', 'Subscriptions'],
  authors: [{ name: 'SocialFi Connect Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
