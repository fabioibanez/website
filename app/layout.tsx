import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, PT_Serif } from 'next/font/google';
import './globals.css';
import { getAllPosts } from '../lib/posts';

const serif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
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
  // Drafts are excluded in production, so the link hides until a post is published.
  const hasPosts = getAllPosts().length > 0;
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div className="shell">
          <header className="top">
            <a className="brand" href="/">
              Fabio Ibanez
            </a>
            {hasPosts && (
              <nav className="nav">
                <a href="/blog">Writing</a>
              </nav>
            )}
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
