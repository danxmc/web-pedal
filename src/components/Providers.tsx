'use client';

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
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <UserMediaProvider>
        <AudioProcessGraphProvider>
          <Provider store={store}>
            <SessionProvider>{children}</SessionProvider>
          </Provider>
        </AudioProcessGraphProvider>
      </UserMediaProvider>
    </ThemeProvider>
  );
};

export default Providers;
