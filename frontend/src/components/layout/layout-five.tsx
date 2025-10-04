import Header from '@components/layout/header/header-five';
import Footer from '@components/layout/footer/footer';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import MobileApp from './footer/moblie-app';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="relative flex-grow">{children}</main>
      <MobileApp />
      <Footer />
      <MobileNavigation />
    </div>
  );
}
