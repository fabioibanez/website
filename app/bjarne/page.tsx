import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Bjarne',
  description: 'A photograph with Bjarne Stroustrup.',
};

export default function BjarnePage() {
  return (
    <figure className="figure">
      <Image
        src="/bjarne.jpg"
        alt="Fabio Ibanez and Bjarne Stroustrup standing in front of a chalkboard."
        width={600}
        height={825}
        priority
      />
      <figcaption>With Bjarne Stroustrup.</figcaption>
    </figure>
  );
}
