import type { Metadata } from 'next';
import { EntryPage } from '../../entries';
import { listEntries, loadEntry } from '../../../lib/content';

export function generateStaticParams() {
  return listEntries('writings').map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = loadEntry('writings', slug);
  if (!entry) return { title: 'Writing' };
  return { title: entry.title, description: entry.description ?? undefined };
}

export default async function WritingEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EntryPage kind="writings" slug={slug} />;
}
