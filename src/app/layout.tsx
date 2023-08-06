import MobileMenu from '@/components/MobileMenu';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toast';
import { cn } from '@/lib/utils/classNameUtils';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={cn('bg-white text-slate-900 antialiased', inter.className)}
    >
      <body className='min-h-screen bg-slate-50 antialiased dark:bg-slate-900'>
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          <Toaster position='bottom-right' />

          <MobileMenu />

          <main>{children}</main>
        </Providers>

        {/* Allow more height for mobile menu on mobile */}
        <div className='h-40 md:hidden' />
      </body>
    </html>
  );
}
