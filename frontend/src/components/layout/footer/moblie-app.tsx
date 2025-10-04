import PlayStore from '@components/icons/play-store';
import AppStore from '@components/icons/app-store';
import Link from '@components/ui/link';

export default function MobileApp() {
  return (
    <div className="hidden lg:flex py-3 mb-14 flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-center mx-5 mb-2 font-bold text-2xl">
        ¡Descarga nuestra aplicación móvil y disfruta de una experiencia de
        compra única!
      </h1>
      <h1 className="text-center mx-5 mb-2 font-medium text-lg">
        Descubre la forma más fácil y rápida de hacer tus comprar desde tu
        dispositivo móvil.
      </h1>
      <div className="flex gap-5">
        <Link href="https://play.google.com/store/apps/details?id=app.project.loanapp">
          <PlayStore />
        </Link>
        <Link href="https://apps.apple.com/us/app/inversiones-loan/id1627049947?l=es-MX">
          <AppStore />
        </Link>
      </div>
    </div>
  );
}
