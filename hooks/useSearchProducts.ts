import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '../services/shopify/search';

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['searchProducts', query],
    queryFn: () => searchProducts(query),
    enabled: query.trim().length > 0,
  });
};