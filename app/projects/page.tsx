import type { Metadata } from 'next';
import { EntryIndex } from '../entries';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects by Fabio Ibanez.',
};

export default function ProjectsPage() {
  return <EntryIndex kind="projects" base="/projects" />;
}
