'use client';
import { signOut } from 'next-auth/react';
import { FC, useState } from 'react';
import { Button } from './button';

/**
 * NextJS does not allow to pass function from server -> client components,
 * hence this unreusable component.
 */

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUserOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      // toast({
      //   title: 'Error signing out',
      //   message: 'Please try again later.',
      //   type: 'error',
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={signUserOut}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
