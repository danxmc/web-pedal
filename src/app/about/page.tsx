import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import type { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Web Pedal Board | About',
  description: 'Free & open-source Web Audio Effects Pedal Board',
};

const page: FC = () => {
  return (
    <div className='container mx-auto mt-12 max-w-7xl'>
      <div className='flex flex-col items-center gap-6'>
        <LargeHeading>Audio Effects Pedal Board</LargeHeading>
        <Paragraph>About</Paragraph>
      </div>
    </div>
  );
};

export default page;
