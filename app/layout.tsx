import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Newsreader } from 'next/font/google';
import './globals.css';

const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-serif',
  display: 'swap',
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
          </footer>
        </div>
      </body>
    </html>
  );
}
