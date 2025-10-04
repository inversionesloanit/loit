import isEmpty from 'lodash/isEmpty';
interface Item {
  id: string | number;
  name: string;
  slug: string;
  tax?: number;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}
interface Variation {
  id: string | number;
  title: string;
  price: number;
  tax?: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item, variation: Variation) {
  const { id, title, images, price, sale_price, quantity, unit, tax } = item;
  if (!isEmpty(variation)) {
    return {
      id: `${id}.${variation.id}`,
      productId: id,
      tax,
      name: `${title} - ${variation.title}`,
      unit,
      stock: variation.quantity,
      price: variation.sale_price ? variation.sale_price : variation.price,
      image: images[0].image.url,
    };
  }
  return {
    id,
    title,
    unit,
    tax,
    image: images[0].image.url,
    stock: quantity,
    price: sale_price ? sale_price : price,
  };
}
