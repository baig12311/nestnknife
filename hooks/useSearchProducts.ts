// import { useQuery } from '@tanstack/react-query';
// import { searchProducts } from '../services/shopify/search';

// export const useSearchProducts = (query: string) => {
//   return useQuery({
//     queryKey: ['searchProducts', query],
//     queryFn: () => searchProducts(query),
//     enabled: query.trim().length > 0,
//   });
// };


import { useQuery } from '@tanstack/react-query';
import { searchProducts, searchInCollection } from '../services/shopify/search';

export const useSearchProducts = (
  query: string,
  collectionHandle?: string,
) => {
  return useQuery({
    queryKey: ['searchProducts', collectionHandle ?? 'global', query],

    queryFn: () => {
      const formattedQuery = `title:*${query}*`;

      if (collectionHandle) {
        return searchInCollection(collectionHandle, formattedQuery);
      }

      return searchProducts(formattedQuery);
    },

    enabled: query.trim().length > 0,
  });
};