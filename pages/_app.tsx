import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import type { AppProps } from 'next/app'
import MainLayout from '../components/layouts/main-layout/MainLayout';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <MainLayout framerKey={router.route}>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp
