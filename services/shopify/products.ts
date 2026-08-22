import { shopifyFetch } from './client';

export type ShopifyProduct = {
  id: string;
  title: string;
  price: string;
  image: string | null;
};
// fetching all products from shopify store
type ShopifyProductsResponse = {
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
          };
        };
      };
    }[];
  };
};

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
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
            }
          }
        }
      }
    }
  }
`;

export async function getProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ShopifyProductsResponse>(
    PRODUCTS_QUERY,
    {
      first: 50,
    },
  );

  return data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    price: node.priceRange.minVariantPrice.amount,
    image: node.featuredImage?.url ?? null,
  }));
}

//fetching a single product from shopify store
const PRODUCT_QUERY = `
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
      descriptionHtml

      featuredImage {
        url
      }

      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }

      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

type ShopifyProductResponse = {
  product: {
    id: string;
    title: string;
    description: string;
    descriptionHtml:string

    featuredImage: {
      url: string;
    } | null;

    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };

    variants: {
      edges: {
        node: {
          id: string;
          title: string;
          availableForSale: boolean;
          price: {
            amount: string;
            currencyCode: string;
          };
        };
      }[];
    };
  } | null;
};

export async function getProduct(id: string) {
  const data = await shopifyFetch<ShopifyProductResponse>(
    PRODUCT_QUERY,
    { id },
  );

  return data.product;
}

//fetching products by collection handle from shopify store
const FEATURED_PRODUCTS_QUERY = `
  query GetFeaturedProducts($handle: String!, $first: Int!) {
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

type ShopifyFeaturedProductsResponse = {
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

export const getFeaturedProducts = async (): Promise<
  ShopifyProduct[]
> => {
  const data =
    await shopifyFetch<ShopifyFeaturedProductsResponse>(
      FEATURED_PRODUCTS_QUERY,
      {
        handle: 'featured-products',
        first: 4,
      },
    );

  return (
    data.collection?.products.edges.map(
      ({ node }) => ({
        id: node.id,
        title: node.title,
        price:
          node.priceRange.minVariantPrice.amount,
        image:
          node.featuredImage?.url ?? null,
      }),
    ) ?? []
  );
};




type ShopifyCollectionProductsResponse = {
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

const COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts($handle: String!, $first: Int!) {
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

export const getProductsByCollection = async (
  handle: string,
  first: number = 4,
): Promise<ShopifyProduct[]> => {
  const data = await shopifyFetch<ShopifyCollectionProductsResponse>(
    COLLECTION_PRODUCTS_QUERY,
    {
      handle,
      first,
    },
  );

  return (
    data.collection?.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      price: node.priceRange.minVariantPrice.amount,
      image: node.featuredImage?.url ?? null,
    })) ?? []
  );
};