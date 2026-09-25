import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addToCart,
  updateCartLine,
  removeCartLine,
} from '../services/shopify/cart';

/* =========================
   ADD TO CART
========================= */

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      merchandiseId,
      quantity,
    }: {
      cartId: string;
      merchandiseId: string;
      quantity: number;
    }) => addToCart(cartId, merchandiseId, quantity),

    onSuccess: (result) => {
  queryClient.invalidateQueries({
    queryKey: ['cart', result.cart.id],
  });
},
  });
}

/* =========================
   UPDATE CART LINE
========================= */

export function useUpdateCartLine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      lineId,
      quantity,
    }: {
      cartId: string;
      lineId: string;
      quantity: number;
    }) => updateCartLine(cartId, lineId, quantity),

    /* =========================
       OPTIMISTIC UPDATE
    ========================= */

    onMutate: async ({
      cartId,
      lineId,
      quantity,
    }) => {
      await queryClient.cancelQueries({
        queryKey: ['cart', cartId],
      });

      const previousCart =
        queryClient.getQueryData<any>([
          'cart',
          cartId,
        ]);

      queryClient.setQueryData(
        ['cart', cartId],
        (oldCart: any) => {
          if (!oldCart) {
            return oldCart;
          }

          const currentLine =
            oldCart.lines.edges.find(
              ({ node }: any) =>
                node.id === lineId,
            );

          const currentQuantity =
            currentLine?.node.quantity ?? 0;

          const quantityDifference =
            quantity - currentQuantity;

          return {
            ...oldCart,

            totalQuantity:
              oldCart.totalQuantity +
              quantityDifference,

            lines: {
              ...oldCart.lines,

              edges:
                oldCart.lines.edges.map(
                  ({ node }: any) => {
                    if (
                      node.id !== lineId
                    ) {
                      return { node };
                    }

                    return {
                      node: {
                        ...node,
                        quantity,
                      },
                    };
                  },
                ),
            },
          };
        },
      );

      return {
        previousCart,
      };
    },

    /* =========================
       SHOPIFY RESPONSE
    ========================= */

    onSuccess: (
      updatedCart,
      { cartId },
    ) => {
      queryClient.setQueryData(
        ['cart', cartId],
        (oldCart: any) => {
          if (!oldCart) {
            return oldCart;
          }

          return {
            ...oldCart,

            totalQuantity:
              updatedCart.totalQuantity,

            lines: {
              ...oldCart.lines,

              edges:
                oldCart.lines.edges.map(
                  ({ node }: any) => {
                    const updatedLine =
                      updatedCart.lines.edges.find(
                        ({
                          node: updatedNode,
                        }: any) =>
                          updatedNode.id ===
                          node.id,
                      );

                    if (!updatedLine) {
                      return { node };
                    }

                    return {
                      node: {
                        ...node,
                        quantity:
                          updatedLine.node.quantity,
                      },
                    };
                  },
                ),
            },
          };
        },
      );
    },

    /* =========================
       ROLLBACK ON ERROR
    ========================= */

    onError: (
      _error,
      { cartId },
      context,
    ) => {
      if (context?.previousCart) {
        queryClient.setQueryData(
          ['cart', cartId],
          context.previousCart,
        );
      }
    },
  });
}

/* =========================
   REMOVE CART LINE
========================= */

export function useRemoveCartLine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      lineId,
    }: {
      cartId: string;
      lineId: string;
    }) => removeCartLine(cartId, lineId),

    /* =========================
       OPTIMISTIC REMOVE
    ========================= */

    onMutate: async ({
      cartId,
      lineId,
    }) => {
      await queryClient.cancelQueries({
        queryKey: ['cart', cartId],
      });

      const previousCart =
        queryClient.getQueryData<any>([
          'cart',
          cartId,
        ]);

      queryClient.setQueryData(
        ['cart', cartId],
        (oldCart: any) => {
          if (!oldCart) {
            return oldCart;
          }

          const removedLine =
            oldCart.lines.edges.find(
              ({ node }: any) =>
                node.id === lineId,
            );

          const removedQuantity =
            removedLine?.node.quantity ?? 0;

          return {
            ...oldCart,

            totalQuantity:
              oldCart.totalQuantity -
              removedQuantity,

            lines: {
              ...oldCart.lines,

              edges:
                oldCart.lines.edges.filter(
                  ({ node }: any) =>
                    node.id !== lineId,
                ),
            },
          };
        },
      );

      return {
        previousCart,
      };
    },

    /* =========================
       ROLLBACK ON ERROR
    ========================= */

    onError: (
      _error,
      { cartId },
      context,
    ) => {
      if (context?.previousCart) {
        queryClient.setQueryData(
          ['cart', cartId],
          context.previousCart,
        );
      }
    },
  });
}