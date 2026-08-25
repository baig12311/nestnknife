// searching products from shopify store
import { ShopifyProduct } from "./products";
import { shopifyFetch } from "./client";

/* =========================
   GLOBAL SEARCH (poore store me)
========================= */

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

/* =========================
   SCOPED SEARCH (ek collection ke andar)
========================= */

/* =========================
   SCOPED SEARCH (ek collection ke andar)
========================= */

const SEARCH_IN_COLLECTION_QUERY = `
  query SearchInCollection(
    $handle: String!
    $first: Int!
  ) {
    collection(handle: $handle) {
      products(first: $first) {
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
  }
`;

type ShopifySearchInCollectionResponse = {
  collection: {
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
  } | null;
};

export const searchInCollection = async (
  handle: string,
  query: string,
  first: number = 100,   // zyada products fetch karo taake filter karne ke liye pool bada ho
): Promise<ShopifyProduct[]> => {
  const data = await shopifyFetch<ShopifySearchInCollectionResponse>(
    SEARCH_IN_COLLECTION_QUERY,
    {
      handle,
      first,
    },
  );

  if (!data.collection) return [];

  const allProducts = data.collection.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    price: node.priceRange.minVariantPrice.amount,
    image: node.featuredImage?.url ?? null,
  }));

  // Client-side filtering — title match
  const searchTerm = query
    .replace(/title:\*/g, '')
    .replace(/\*/g, '')
    .trim()
    .toLowerCase();

  if (!searchTerm) return allProducts;

  return allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
};