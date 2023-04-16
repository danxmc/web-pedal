import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web Pedal Board | Home',
  description: 'Free & open-source Web Audio Effects Pedal Board',
};

export default function Home() {
  return <div></div>;
}
