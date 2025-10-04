import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import DownloadApps from '@components/common/download-apps';
import { aboutSetting } from '@settings/about-setting';
import Image from '@components/ui/image';
import Seo from '@components/seo/seo';

const backgroundThumbnail = '/assets/images/about-us.png';
const aboutUs1 = '/assets/images/about-us/1.webp';
const aboutUs2 = '/assets/images/about-us/2.webp';

export default function TermsPage() {
  const { t } = useTranslation('about');
  return (
    <>
      <Seo
        title="SOBRE inverloan.com"
        description="Bienvenido al supermercado en línea más completo de Carabobo, Venezuela En nuestro sitio web, encontrarás una amplia variedad de productos."
        path="sobre-loan"
      />
      {/* End of seo */}
      <div
        className="flex justify-center w-[1920px] h-[300px] lg:h-96 2xl:h-[315px] w-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(https://adonai.inverloan.com/media/nosotros.jpg)`,
        }}
      ></div>
      <div className="py-8 lg:py-16 2xl:py-20">
        <Container>
          <div className="flex flex-col w-full mx-auto max-w-[1200px]">
            <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
              {t(aboutSetting.titleOne)}
            </h2>
            <div className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
              <p>
                Inversiones Loan 1904, C.A. es el supermercado online líder en 
                Venezuela estamos ubicados en valencia estado Carabobo. 
                Ofrecemos una amplia variedad de alimentos de alta calidad a precios competitivos.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 my-8 lg:my-14">
              <Image
                src={aboutUs1}
                alt={t('text-map')}
                className="ltr:mr-5 rtl:ml-5"
                width={576}
                height={390}
              />
              <Image
                src={aboutUs2}
                alt={t('text-map')}
                className=""
                width={576}
                height={390}
              />
            </div>
            <div className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
              <p>
                Nuestra misión es ofrecer una experiencia de compra excepcional a 
                nuestros clientes, brindando un servicio de entrega eficiente y 
                oportuno, y un enfoque en la innovación y la excelencia. 
                Para cumplir con esta misión, nos enfocamos en los siguientes pilares:
              </p>
              <ul className='list-disc px-10 lg:px-5'>
                  <li>Calidad: Nos comprometemos a ofrecer productos alimenticios de alta calidad que cumplan con los más altos estándares de seguridad y nutrición.</li>
                  <li>Precio: Ofrecemos precios competitivos para que los clientes puedan acceder a productos de alta calidad sin tener que pagar un alto precio.</li>
                  <li>Servicio: Nos enfocamos en brindar un servicio de entrega eficiente y oportuno para que los clientes reciban sus productos cuando los necesitan.</li>
                  <li>Innovación: Buscamos constantemente nuevas formas de ofrecer una experiencia de compra excepcional a nuestros clientes.</li>
              </ul>
            </div>
            <div className="flex flex-col grid-cols-3 gap-4 my-8 lg:my-14 sm:grid"></div>
            <div className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose">
              <p>
                En particular, distribuimos productos de las siguientes marcas:
              </p>
              <ul className='list-disc px-10 lg:px-5'>
                  <li>El Tunal: Productos alimenticios de origen vegetal, como huevos, leche, mantequilla, mortadela, jugos y néctares, té, y embutidos.</li>
                  <li>Alimex: Productos alimenticios de origen animal, como pollo, cerdo, res, y pescado.</li>
                  <li>Purisima: Productos alimenticios de origen lácteo, como queso, yogurt, y crema.</li>
              </ul>
              <p>Nuestro objetivo es ser el supermercado online líder en Venezuela. Con nuestro enfoque en la calidad, el precio, el servicio de la innovación, estamos bien posicionados para lograr nuestro objetivo.</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

TermsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'about',
        'footer',
      ])),
    },
  };
};
