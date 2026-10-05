import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
import { I18nProvider } from '../lib/i18n-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'O-YES EMIS',
  description: 'O-YES Enterprise Management Information System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <Providers>{children}</Providers>
        </I18nProvider>
      </body>
    </html>
  );
}
