import type { Metadata } from 'next';
import { EntryIndex } from '../entries';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Writing by Fabio Ibanez.',
};

export default function WritingPage() {
  return <EntryIndex kind="writings" base="/writing" />;
}
