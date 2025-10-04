import { ILFlag } from '@components/icons/language/ILFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { CNFlag } from '@components/icons/language/CNFlag';
import { USFlag } from '@components/icons/language/USFlag';
import { DEFlag } from '@components/icons/language/DEFlag';
import { ESFlag } from '@components/icons/language/ESFlag';
// deleted about loan
/*
{
        id: 3,
        path: '/sobre-loan',
        label: 'Sobre loan',
      },
*/
export const siteSettings = {
  name: 'Inversiones Loan',
  description: 'Casate conmigo',
  author: {
    name: 'Inversiones Loan',
    websiteUrl: 'https://inverloan.com/',
    address: '',
  },
  logo: {
    url: 'http://148.113.136.150:3001/media/logo-blanco-loan.webp',
    alt: 'LoanShop',
    href: '/',
    width: 115,
    height: 48,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  site_header: {
    menu: [
      {
        id: 1,
        path: '/',
        label: 'Inicio',
      },
      {
        id: 2,
        path: '/preguntas',
        label: 'Preguntas frecuentes',
      },
      {
        id: 3,
        path: '/ofertas',
        label: 'Ofertas',
      },
      {
        id: 4,
        path: 'https://api.whatsapp.com/send?phone=584144995714',
        label: 'Compras al mayor',
      },
    ],
    pagesMenu: [
      {
        id: 1,
        path: '/buscar',
        label: 'menu-best-deals',
      },
      {
        id: 2,
        path: '/sobre-loan',
        label: 'Sobre loan',
      },
      {
        id: 3,
        path: '/contactenos',
        label: 'menu-contact-us',
      },
      {
        id: 4,
        path: '/preguntas',
        label: 'menu-faq',
      },
    ],
  },
};
