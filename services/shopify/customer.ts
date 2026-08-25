
import { getStoredAccessToken } from './shopify0Auth';

const SHOP_ID = '81785061622';
const API_VERSION = '2025-01'; // apne dashboard se confirm karo
const GRAPHQL_ENDPOINT = `https://shopify.com/${SHOP_ID}/account/customer/api/${API_VERSION}/graphql`;

export const getFullCustomerData = async () => {
  const token = await getStoredAccessToken();
  if (!token) throw new Error('User not logged in.');

  const query = `
    query {
      customer {
        id
        firstName
        lastName
        displayName
        emailAddress {
          emailAddress
        }
        phoneNumber {
          phoneNumber
        }
        defaultAddress {
          address1
          address2
          city
          province
          country
          zip
        }
        addresses(first: 10) {
          edges {
            node {
              address1
              city
              country
              zip
            }
          }
        }
        orders(first: 10) {
          edges {
            node {
              id
              name
              processedAt
              totalPrice {
                amount
                currencyCode
              }
              fulfillmentStatus
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token, // note: kuch versions me "Bearer " prefix chahiye — dono try karo
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('GRAPHQL ERROR:', json.errors);
    throw new Error(JSON.stringify(json.errors));
  }

  console.log('FULL CUSTOMER DATA:', json.data.customer);
  return json.data.customer;
};


//UPDAET CUSTOMER DATA 

export const updateCustomer = async ({
  firstName,
  lastName,
}: {
  firstName?: string;
  lastName?: string;
}) => {
  const token = await getStoredAccessToken();

  if (!token) {
    throw new Error('User not logged in.');
  }

  const mutation = `
    mutation customerUpdate($input: CustomerUpdateInput!) {
      customerUpdate(input: $input) {
        customer {
          id
          firstName
          lastName
          displayName
          emailAddress {
            emailAddress
          }
          phoneNumber {
            phoneNumber
          }
        }

        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        input: {
          firstName,
          lastName,
        },
      },
    }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('GRAPHQL ERROR:', json.errors);
    throw new Error(json.errors[0]?.message ?? 'GraphQL error');
  }

  const result = json.data.customerUpdate;

  if (result.userErrors?.length) {
    console.error('CUSTOMER UPDATE ERROR:', result.userErrors);

    throw new Error(
      result.userErrors.map((error: any) => error.message).join(', ')
    );
  }

  return result.customer;
};