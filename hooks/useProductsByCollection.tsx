import { useQuery } from '@tanstack/react-query';
import { getProductsByCollection } from '../services/shopify/products';

export const useProductsByCollection = (
  handle: string,
  first: number = 50,
) => {
  return useQuery({
    queryKey: ['products', 'collection', handle, first],
    queryFn: () => getProductsByCollection(handle, first),
    enabled: !!handle,
  });
};