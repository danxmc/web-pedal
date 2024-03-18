import Icons from '@/components/Icons';
import UserAuthForm from '@/components/UserAuthForm';
import { buttonVariants } from '@/ui/button';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import { ROUTES } from '@/constants';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Web Pedal Board | Login',
  description: 'Free & open-source Web Audio Effects Pedal Board',
};

const page: FC = () => {
  return (
    <>
      <div className='container absolute inset-0 mx-auto flex h-screen flex-col items-center justify-center'>
        <div className='mx-auto flex w-full max-w-lg flex-col justify-center space-y-6'>
          <div className='flex flex-col items-center gap-6 text-center'>
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

            <LargeHeading>Welcome back!</LargeHeading>
            <Paragraph>Please sign in using your Google account.</Paragraph>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </>
  );
};

export default page;
