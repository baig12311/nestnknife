import { getStoredAccessToken } from './shopify0Auth';

const SHOP_ID = '81785061622';
const API_VERSION = '2025-01';
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
              id
              address1
              address2
              city
              province
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
              lineItems(first: 10) {
                edges {
                  node {
                    id
                    title
                    quantity
                    
                  }
                }
              }
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
      'Authorization': token,
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

export const updateCustomer = async ({
  firstName,
  lastName,
  phoneNumber,
  address,
}: {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: {
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    country?: string;
    zip?: string;
  };
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
          defaultAddress {
            address1
            address2
            city
            province
            country
            zip
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const input: any = {};
  
  if (firstName !== undefined) input.firstName = firstName;
  if (lastName !== undefined) input.lastName = lastName;
  if (phoneNumber !== undefined) input.phoneNumber = phoneNumber;
  
  if (address) {
    input.defaultAddress = {};
    if (address.address1 !== undefined) input.defaultAddress.address1 = address.address1;
    if (address.address2 !== undefined) input.defaultAddress.address2 = address.address2;
    if (address.city !== undefined) input.defaultAddress.city = address.city;
    if (address.province !== undefined) input.defaultAddress.province = address.province;
    if (address.country !== undefined) input.defaultAddress.country = address.country;
    if (address.zip !== undefined) input.defaultAddress.zip = address.zip;
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({
      query: mutation,
      variables: { input },
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