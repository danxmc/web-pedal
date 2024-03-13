import Icons from '@/components/Icons';
import { ROUTES } from '@/constants';
import { buttonVariants } from '@/components/ui/button';
import LargeHeading from '@/ui/LargeHeading';
import Paragraph from '@/ui/Paragraph';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Similarity API | Page not found',
  description: 'Free & open-source Web Audio Effects Pedal Board',
};

const PageNotFound: FC = () => {
  return (
    <section className='container mx-auto flex max-w-7xl flex-col items-center gap-6 pt-32 text-center'>
      <LargeHeading>Site not found...</LargeHeading>
      <Paragraph>The site you&apos;re searching for does not exist.</Paragraph>
      <Link
        className={buttonVariants({
          variant: 'ghost',
          className: 'w-fit',
        })}
        href={ROUTES.UI.home}
      >
        <Icons.ChevronLeft className='mr-2 h-4 w-4' />
        Back to home
      </Link>
    </section>
  );
};

export default PageNotFound;
