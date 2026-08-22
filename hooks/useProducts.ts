import { useQuery } from '@tanstack/react-query';
import { getCart } from '../services/shopify/cart';
import { getCollections, getCollectionProducts} from '../services/shopify/collections';
import {
  getProducts,
  getProduct,
  getFeaturedProducts
} from '../services/shopify/products';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

export function useCart(cartId: string | null) {
  return useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => getCart(cartId!),
    enabled: !!cartId,
  });
}

export const useCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: getCollections,
  });
};

export const useCollectionProducts = (
  handle: string,
) => {
  return useQuery({
    queryKey: ['collection-products', handle],
    queryFn: () => getCollectionProducts(handle),
    enabled: !!handle,
  });
};


export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: getFeaturedProducts,
  });
};