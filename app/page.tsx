import { PuppyImages } from '@/lib/constants';
import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Begin'
    }
  ],
  image: PuppyImages.first,
  post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame?id=1`
});

export const metadata: Metadata = {
  title: 'Donnie Testing Frames',
  description: 'A frame where bugs happens wrapped in magic',
  openGraph: {
    title: 'Donnie Testing Frames',
    description: 'A frame where bugs happens wrapped in magic',
    images: [PuppyImages.first]
  },
  other: {
    ...frameMetadata
  }
};

export default function Page() {
  return (
    <>
      <h1>Donnie Testing Frames</h1>
    </>
  );
}
