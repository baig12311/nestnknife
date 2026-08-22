import { getProducts } from './products';

export async function testShopifyConnection() {
  const products = await getProducts();

  console.log('SHOPIFY PRODUCTS:', products);

  return products;
}