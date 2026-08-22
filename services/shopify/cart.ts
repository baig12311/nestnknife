import { shopifyFetch } from './client';

type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
};

type CreateCartResponse = {
  cartCreate: {
    cart: ShopifyCart | null;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
};

type AddToCartResponse = {
  cartLinesAdd: {
    cart: ShopifyCart | null;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
};

type GetCartResponse = {
  cart: {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    lines: {
      edges: {
        node: {
          id: string;
          quantity: number;
          merchandise: {
            id: string;
            title: string;
            product: {
              id: string;
              title: string;
            };
            image: {
              url: string;
            } | null;
            price: {
              amount: string;
              currencyCode: string;
            };
          };
        };
      }[];
    };
  } | null;
};

type UpdateCartLineResponse = {
  cartLinesUpdate: {
    cart: ShopifyCart | null;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
};

type RemoveCartLineResponse = {
  cartLinesRemove: {
    cart: ShopifyCart | null;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
};

/* =========================
   CREATE CART
========================= */

const CREATE_CART_MUTATION = `
  mutation CreateCart {
    cartCreate {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const createCart = async () => {
  const data = await shopifyFetch<CreateCartResponse>(
    CREATE_CART_MUTATION,
  );

  const result = data.cartCreate;

  if (result.userErrors.length > 0) {
    throw new Error(result.userErrors[0].message);
  }

  if (!result.cart) {
    throw new Error('Shopify cart was not created.');
  }

  return result.cart;
};

/* =========================
   ADD TO CART
========================= */

const ADD_TO_CART_MUTATION = `
  mutation AddToCart(
    $cartId: ID!
    $lines: [CartLineInput!]!
  ) {
    cartLinesAdd(
      cartId: $cartId
      lines: $lines
    ) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const addToCart = async (
  cartId: string,
  merchandiseId: string,
  quantity: number,
) => {
  const data = await shopifyFetch<AddToCartResponse>(
    ADD_TO_CART_MUTATION,
    {
      cartId,
      lines: [
        {
          merchandiseId,
          quantity,
        },
      ],
    },
  );

  const result = data.cartLinesAdd;

  if (result.userErrors.length > 0) {
    throw new Error(result.userErrors[0].message);
  }

  if (!result.cart) {
    throw new Error('Unable to add product to cart.');
  }

  return result.cart;
};

/* =========================
   GET CART
========================= */

const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity

      lines(first: 100) {
        edges {
          node {
            id
            quantity

            merchandise {
              ... on ProductVariant {
                id
                title

                product {
                  id
                  title
                }

                image {
                  url
                }

                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getCart = async (cartId: string) => {
  const data = await shopifyFetch<GetCartResponse>(
    GET_CART_QUERY,
    { cartId },
  );

  return data.cart;
};

/* =========================
   UPDATE CART LINE
========================= */

const UPDATE_CART_LINE_MUTATION = `
  mutation UpdateCartLine(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
  ) {
    cartLinesUpdate(
      cartId: $cartId
      lines: $lines
    ) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const updateCartLine = async (
  cartId: string,
  lineId: string,
  quantity: number,
) => {
  const data = await shopifyFetch<UpdateCartLineResponse>(
    UPDATE_CART_LINE_MUTATION,
    {
      cartId,
      lines: [
        {
          id: lineId,
          quantity,
        },
      ],
    },
  );

  const result = data.cartLinesUpdate;

  if (result.userErrors.length > 0) {
    throw new Error(result.userErrors[0].message);
  }

  if (!result.cart) {
    throw new Error('Unable to update cart.');
  }

  return result.cart;
};

/* =========================
   REMOVE CART LINE
========================= */

const REMOVE_CART_LINE_MUTATION = `
  mutation RemoveCartLine(
    $cartId: ID!
    $lineIds: [ID!]!
  ) {
    cartLinesRemove(
      cartId: $cartId
      lineIds: $lineIds
    ) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const removeCartLine = async (
  cartId: string,
  lineId: string,
) => {
  const data = await shopifyFetch<RemoveCartLineResponse>(
    REMOVE_CART_LINE_MUTATION,
    {
      cartId,
      lineIds: [lineId],
    },
  );

  const result = data.cartLinesRemove;

  if (result.userErrors.length > 0) {
    throw new Error(result.userErrors[0].message);
  }

  if (!result.cart) {
    throw new Error('Unable to remove item from cart.');
  }

  return result.cart;
};