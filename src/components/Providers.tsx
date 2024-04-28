'use client';

import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { store } from '@/store';
import AudioProcessGraphProvider from '@/store/providers/AudioProcessGraphProvider';
import UserMediaProvider from '@/store/providers/UserMediaProvider';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { FC, ReactNode } from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <NextAuthSessionProvider>
        <UserMediaProvider>
          <AudioProcessGraphProvider>
            <ReactReduxProvider store={store}>
              <NextThemesProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </NextThemesProvider>
            </ReactReduxProvider>
          </AudioProcessGraphProvider>
        </UserMediaProvider>
      </NextAuthSessionProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
