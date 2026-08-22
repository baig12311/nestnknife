const SHOPIFY_STORE_DOMAIN =
  process.env.EXPO_PUBLIC_SHOPIFY_STORE_DOMAIN;

const SHOPIFY_STOREFRONT_TOKEN =
  process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

const SHOPIFY_API_VERSION = '2026-07';

const SHOPIFY_API_URL =
  `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        SHOPIFY_STOREFRONT_TOKEN ?? '',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Shopify request failed: ${response.status}`,
    );
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(
      result.errors[0]?.message ?? 'Shopify API error',
    );
  }

  return result.data;
}