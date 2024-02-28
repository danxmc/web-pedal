'use client';

import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { store } from '@/store';
import AudioProcessGraphProvider from '@/store/providers/AudioProcessGraphProvider';
import UserMediaProvider from '@/store/providers/UserMediaProvider';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <UserMediaProvider>
            <AudioProcessGraphProvider>
              <Provider store={store}>{children}</Provider>
            </AudioProcessGraphProvider>
          </UserMediaProvider>
        </ThemeProvider>
      </SessionProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
