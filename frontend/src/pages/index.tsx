import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import BestSellerProductFeed from '@components/product/feeds/best-seller-product-feed';
import FreshVegetablesProductFeed from '@components/product/feeds/products-category-feed';
import { usePageQuery } from '@framework/utils/get-pages';
import Layout from '@components/layout/layout-five';
import HeroSliderBlock from '@components/hero/hero-slider-block';
import BannerAllCarousel from '@components/common/banner-all-carousel';
import { Category } from '@framework/types';
import React from 'react';
import BannerCard from '@components/cards/banner-card';
import { useWindowSize } from 'react-use';
import TawkToComponent from '@components/common/tawk-to';

export default function Home() {
  const {
    isFetching: isLoading,
    isError,
    data,
  } = usePageQuery({ route: 'paginas/64c95e345ddaa8ba3c97ccf8' }, '');
  const { width } = useWindowSize();

  return (
    <>
      <Seo
        title="Inicio"
        description="Compra al mayor y detal de productos alimenticios"
        path="classic"
      />

      <Container>
        {/* 
                  <BannerGridTwo
          data={banners}
          className="my-3 md:my-4 lg:mt-0 lg:mb-5 xl:mb-6"
        />
          */}
        <div className="mt-5">
          <BannerAllCarousel data={data?.banners} />
        </div>
      </Container>
      <BestSellerProductFeed
        data={data?.relatedProducts}
        loading={isLoading}
        isError={isError}
      />
      {data?.relatedCategories.map((category: Category, index: number) => {
        // Renderiza el componente FreshVegetablesProductFeed para cada categoría
        const categoryComponent = (
          <FreshVegetablesProductFeed key={category.id} category={category} />
        );

        // Cada tres iteraciones, renderiza un elemento distinto del arreglo de números
        if ((index + 1) % 3 === 0) {
          // Calcula el índice del elemento a renderizar en el arreglo de números
          const numberIndex = Math.floor(index / 3);

          // Si el índice está fuera del rango del arreglo, no renderiza nada
          if (numberIndex >= data?.mainBanner.length) {
            return categoryComponent;
          }

          // Renderiza el número o cualquier componente que necesites aquí
          // Por ejemplo, puedes renderizar un componente que muestra el número
          const numberComponent = (
            <div
              key={`number-${numberIndex}`}
              className="container mx-auto my-5"
            >
              <BannerCard
                useWidht={width}
                banner={data?.mainBanner[numberIndex]}
              />
            </div>
          );

          // Devuelve un fragmento de React con el componente de la categoría y el componente del número
          return (
            <React.Fragment key={index}>
              {categoryComponent}
              {numberComponent}
            </React.Fragment>
          );
        }

        // Si no es una tercera iteración, solo devuelve el componente de la categoría
        return categoryComponent;
      })}
      <TawkToComponent />
      {/**
         * 
         * 
      <CollectionGrid className="mb-12 lg:mb-14 xl:mb-16" />
      <CookiesProductFeed />
      <PopcornJerkyProductFeed />
      <DownloadApps />
         */}
    </>
  );
}

Home.Layout = Layout;
