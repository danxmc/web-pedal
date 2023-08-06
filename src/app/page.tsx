import Stage from '@/components/Pedal/Stage';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web Pedal Board | Home',
  description: 'Free & open-source Web Audio Effects Pedal Board',
};

export default function Home() {
  return (
    <div className='relative flex h-screen items-center justify-center overflow-x-hidden'>
      <div className='container mx-auto h-full w-full max-w-7xl pt-28'>
        <div className='flex h-full flex-col items-start justify-start gap-6'>
          <Stage />
        </div>
      </div>
    </div>
  );
}
