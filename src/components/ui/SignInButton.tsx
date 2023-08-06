'use client';
import { FC, useState } from 'react';

import { signIn } from 'next-auth/react';
import { Button } from './Button';
import { toast } from './toast';

/**
 * NextJS does not allow to pass function from server -> client components,
 * hence this unreusable component.
 */

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn('google');
    } catch (error) {
      toast({
        title: 'Error signing in',
        message: 'Please try again later.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={signInWithGoogle} isLoading={isLoading}>
      Sign in
    </Button>
  );
};

export default SignInButton;
