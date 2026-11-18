import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import './globals.css';

const serif = localFont({
  src: [
    { path: '../fonts/Newsreader[opsz,wght].ttf', style: 'normal' },
    { path: '../fonts/Newsreader-Italic[opsz,wght].ttf', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  weight: '200 800',
});

export const metadata: Metadata = {
  title: {
    default: 'Fabio Ibanez',
    template: '%s · Fabio Ibanez',
  },
  description:
    'Fabio Ibanez — AI security and model evaluation at SpaceX.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={serif.variable}>
      <body>
        <div className="shell">
          <header className="top">
            <a className="brand" href="/">
              Fabio Ibanez
            </a>
          </header>
          <main>{children}</main>
          <footer className="site-footer">
            <span>Palo Alto</span>
            <a href="https://github.com/fabioibanez">GitHub</a>
            <a href="mailto:fabioi@stanford.edu">Email</a>
            <span>made in 🇨🇺</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
