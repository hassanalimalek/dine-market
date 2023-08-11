import { getGenderAgeGroup } from '@/lib/sanityQueries';
import Footer from '../views/Footer';
import Navbar from '../views/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/store';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let genderAgeGroupData = await getGenderAgeGroup();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <ClerkProvider>
          <Providers>
            <Toaster position='top-right' />
            <div className='font-sora p-0 m-auto container '>
              <Navbar genderAgeGroupData={genderAgeGroupData} />

              {children}
            </div>
            <Footer />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
