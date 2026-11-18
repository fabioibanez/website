'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SiteNav({
  showWriting,
  showProjects,
}: {
  showWriting: boolean;
  showProjects: boolean;
}) {
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'About' },
    ...(showWriting ? [{ href: '/writing', label: 'Writing' }] : []),
    ...(showProjects ? [{ href: '/projects', label: 'Projects' }] : []),
  ];

  if (links.length < 2) return null;

  return (
    <ul className="top-links">
      {links.map(({ href, label }) => {
        const active =
          href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <li key={href}>
            <Link href={href} aria-current={active ? 'page' : undefined}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
