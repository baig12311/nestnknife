import { shopifyFetch } from './client';

export type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: {
    url: string;
  } | null;
};

export type ShopifyCollectionProduct = {
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

type ShopifyCollectionsResponse = {
  collections: {
    edges: {
      node: ShopifyCollection;
    }[];
  };
};

type ShopifyCollectionProductsResponse = {
  collection: {
    id: string;
    title: string;
    products: {
      edges: {
        node: ShopifyCollectionProduct;
      }[];
    };
  } | null;
};

const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
          }
        }
      }
    }
  }
`;

export const getCollections = async (): Promise<
  ShopifyCollection[]
> => {
  const data =
    await shopifyFetch<ShopifyCollectionsResponse>(
      COLLECTIONS_QUERY,
      {
        first: 20,
      },
    );

  return data.collections.edges.map(
    ({ node }) => node,
  );
};

const COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts(
    $handle: String!
    $first: Int!
  ) {
    collectionByHandle(handle: $handle) {
      id
      title

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

export const getCollectionProducts = async (
  handle: string,
): Promise<ShopifyCollectionProduct[]> => {
  const data =
    await shopifyFetch<ShopifyCollectionProductsResponse>(
      COLLECTION_PRODUCTS_QUERY,
      {
        handle,
        first: 50,
      },
    );

  return (
    data.collection?.products.edges.map(
      ({ node }) => node,
    ) ?? []
  );
};