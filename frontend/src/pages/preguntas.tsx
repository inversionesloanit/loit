import React, { useState } from 'react';
import Layout from '@components/layout/layout';
import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import DownloadApps from '@components/common/download-apps';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Accordion from '@components/ui/accordion';
import { faq } from '@settings/faq-settings';
import Seo from '@components/seo/seo';
import TawkToComponent from '@components/common/tawk-to';
import AccordionWT from '@components/ui/AccordionWT';

export default function TermsPage() {
  return (
    <>
      <Seo
        title="Preguntas frecuentes"
        description="Bienvenido al supermercado en línea más completo de Carabobo, Venezuela En nuestro sitio web, encontrarás una amplia variedad de productos."
        path="preguntas"
      />
      <PageHeroSection heroTitle="text-page-faq" className="faq-banner-area" />
      <Container>
        <div className="flex flex-col max-w-2xl py-12 mx-auto 2xl:max-w-4xl md:py-20">
          {faq?.map((item, index) => (
            <AccordionWT key={`${item.title}-${index}`} item={item} />
          ))}
          <p>
            Horario de atención: De Lunes a Sabado de 8:00 a.m. a 7:00 p.m.
                                            Domingos de 8:30 a.m. a 3:00 p.m.
          </p>
        </div>
      </Container>

      <TawkToComponent />
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
        'faq',
        'footer',
      ])),
    },
  };
};
