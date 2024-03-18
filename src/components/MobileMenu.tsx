'use client';

import { ROUTES } from '@/constants';
import { Button } from '@/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { toast } from '@/ui/toast';
import { Info, LayoutDashboard, Loader2, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const MobileMenu = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const signUserOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      toast({
        title: 'Error signing out',
        message: 'Please try again later.',
        type: 'error',
      });
    }
  };

  return (
    <nav className='fixed bottom-20 left-0 right-0 z-50 flex justify-center md:hidden'>
      <div className='rounded-md shadow-2xl outline outline-2 outline-white dark:outline-slate-900'>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            asChild
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Button variant='outline' size='lg'>
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuGroup onClick={() => setIsOpen(false)}>
              {session ? (
                <DropdownMenuItem onClick={signUserOut} className='gap-1.5'>
                  <User className='mr-2 h-5 w-5' />
                  <span>{isLoading ? 'Signing out' : 'Sign out'}</span>
                  {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link
                    href={ROUTES.UI.login}
                    className='flex w-full items-center gap-1.5'
                  >
                    <LayoutDashboard className='mr-2 h-5 w-5' />
                    <span>Sign in</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={ROUTES.UI.about}
                  className='flex w-full items-center gap-1.5'
                >
                  <Info className='mr-2 h-5 w-5' />
                  <span>About</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default MobileMenu;
