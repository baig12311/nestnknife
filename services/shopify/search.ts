// searching products from shopify store
import { ShopifyProduct } from "./products";
import { shopifyFetch } from "./client";
const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title

          featuredImage {
            url
          }

          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

type ShopifySearchProductsResponse = {
  products: {
    edges: {
      node: {
        id: string;
        title: string;
        featuredImage: {
          url: string;
        } | null;
        priceRange: {
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }[];
  };
};

export const searchProducts = async (
  query: string,
  first: number = 20,
): Promise<ShopifyProduct[]> => {
  const data = await shopifyFetch<ShopifySearchProductsResponse>(
    SEARCH_PRODUCTS_QUERY,
    {
      query,
      first,
    },
  );

  return data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    price: node.priceRange.minVariantPrice.amount,
    image: node.featuredImage?.url ?? null,
  }));
};