import { Category } from '@framework/types';
import http from '@framework/utils/http';
import { useQuery } from 'react-query';

export type PageType = {
  banners: FirtsBannerType[];
  createdAt: string;
  description: string;
  id: string;
  title: string;
  mainBanner: Banner[];
  relatedCategories: Category[];
  relatedProducts: any[];
};

export type FirtsBannerType = {
  banners: Banner[];
};

export type Banner = {
  banners: Banners;
  redirectTo?: string;
  id: string;
};

export type Banners = {
  id: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes: Sizes;
  createdAt: string;
  updatedAt: string;
  url: string;
};

export type Sizes = {
  card: Card;
  feature: Feature;
};

export type Card = {
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
  url: string;
};

export type Feature = {
  url: any;
  width: any;
  height: any;
  mimeType: any;
  filesize: any;
  filename: any;
};

export const fetchPages = async (route: any) => {
  const { data } = await http.get(
    'https://adonai.inverloan.com/api/' + route.queryKey[1].route
  );
  return data as PageType;
};

export const usePageQuery = (options: any, route: any) => {
  return useQuery<PageType, Error>(
    ['http://localhost:3000/api/', options, route],
    fetchPages
  );
};
