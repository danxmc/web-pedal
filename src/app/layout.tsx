import MobileMenu from '@/components/MobileMenu';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toast';
import { cn } from '@/lib/utils/classNameUtils';
import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className='h-full'
      // className={cn('bg-white text-slate-900 antialiased', fontSans.className)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          'relative h-full min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <Navbar />
          <Toaster position='bottom-right' />

          <MobileMenu />

          <main className='relative flex min-h-screen flex-col'>
            <div className='flex-1 flex-grow'>{children}</div>
          </main>
        </Providers>

        {/* Allow more height for mobile menu on mobile */}
        <div className='h-40 md:hidden' />
      </body>
    </html>
  );
}
