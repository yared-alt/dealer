import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer2';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default:"Car brand",
    template: " %s -Amanual Car Import",
  },
  description: 'Experience luxury and super exiting momment in our carefully selected mountain retreats. Perfect destinations for your next unforgettable vacation. Woliso Hotel - Yours Luxury Hotel In Ethiopia |Luxury Hotel in Oromia |Luxury Hotel in Woliso Town',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=''>
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
