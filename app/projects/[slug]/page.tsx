import type { Metadata } from 'next';
import { EntryPage } from '../../entries';
import { listEntries, loadEntry } from '../../../lib/content';

export function generateStaticParams() {
  return listEntries('projects').map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = loadEntry('projects', slug);
  if (!entry) return { title: 'Projects' };
  return { title: entry.title, description: entry.description ?? undefined };
}

export default async function ProjectEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EntryPage kind="projects" slug={slug} />;
}
