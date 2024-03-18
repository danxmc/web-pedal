import { ROUTES } from '@/constants';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { buttonVariants } from '@/ui/button';
import SignInButton from './ui/SignInButton';
import SignOutButton from './ui/SignOutButton';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className='fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-slate-300 bg-white/75 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/75'>
      <div className='container mx-auto flex w-full max-w-7xl items-center justify-between'>
        <Link
          href={ROUTES.UI.home}
          className={buttonVariants({ variant: 'link' })}
        >
          Audio Effects Pedal Board
        </Link>

        <div className='md:hidden'>
          <ThemeToggle />
        </div>

        <div className='hidden gap-4 md:flex'>
          <ThemeToggle />
          <Link
            href={ROUTES.UI.about}
            className={buttonVariants({ variant: 'ghost' })}
          >
            About
          </Link>
          {session ? (
            <>
              {/* <Link
                className={buttonVariants({ variant: 'ghost' })}
                href='/dashboard'
              >
                Dashboard
              </Link> */}
              {/* <SignOutButton /> */}
            </>
          ) : (
            <>
              {/* <SignInButton /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
