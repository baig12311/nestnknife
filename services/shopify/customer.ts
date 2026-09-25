





import {
  getStoredAccessToken,
  refreshAccessToken,
} from './shopify0Auth';

const SHOP_ID = '81785061622';
const API_VERSION = '2025-01';

const GRAPHQL_ENDPOINT = `https://shopify.com/${SHOP_ID}/account/customer/api/${API_VERSION}/graphql`;


/* =========================================================
   GET FULL CUSTOMER DATA
========================================================= */

export const getFullCustomerData = async () => {
  let token = await getStoredAccessToken();

  if (!token) {
    throw new Error('User not logged in.');
  }

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
          id
          address1
          address2
          city
          province
          country
          firstName
          lastName
          phoneNumber
          territoryCode
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
              firstName
              lastName
              phoneNumber
              territoryCode
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
               cancelledAt
      cancelReason
              totalPrice {
                amount
                currencyCode
              }

              fulfillmentStatus

              fulfillments(first: 10) {
        edges {
          node {
            id
            status
            createdAt
            trackingInformation {
        company
        number
        url
      }
            latestShipmentStatus
            events(first: 20) {
        edges {
          node {
            id
            status
            happenedAt
          }
        }
      }
          }
        }
      }

      
      shippingAddress {
  id
  address1
  address2
  city
  province
  country
  firstName
  lastName
  phoneNumber
  territoryCode
  zip
}

              lineItems(first: 10) {
                edges {
                  node {
                    id
                    title
                    quantity
                    image {
              url
              altText
            }
              price {
          amount,
          currencyCode
        }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;


  /* =========================================================
     API REQUEST FUNCTION
  ========================================================= */

  const makeRequest = async (accessToken: string) => {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },

      body: JSON.stringify({
        query,
      }),
    });

    return response.json();
  };


  /* =========================================================
     FIRST REQUEST
  ========================================================= */

  let json = await makeRequest(token);


  /* =========================================================
     CHECK IF ACCESS TOKEN IS INVALID
  ========================================================= */

  const tokenInvalid = json.errors?.some(
    (error: any) =>
      error.message === 'Access token is invalid or revoked'
  );


  /* =========================================================
     REFRESH TOKEN + RETRY
  ========================================================= */

  if (tokenInvalid) {
    console.log('ACCESS TOKEN INVALID → REFRESHING...');

    const newToken = await refreshAccessToken();

    if (!newToken) {
      throw new Error('Session expired. Please login again.');
    }

    token = newToken;

    console.log(
      'TOKEN REFRESHED → RETRYING CUSTOMER REQUEST...'
    );

    json = await makeRequest(token);
  }


  /* =========================================================
     FINAL ERROR CHECK
  ========================================================= */

  if (json.errors) {
    console.error('GRAPHQL ERROR:', json.errors);

    throw new Error(
      json.errors[0]?.message ?? 'GraphQL error'
    );
  }


  /* =========================================================
     RETURN CUSTOMER DATA
  ========================================================= */

  console.log(
    'FULL CUSTOMER DATA:',
    json.data.customer
  );

  return json.data.customer;
};


/* =========================================================
   CREATE CUSTOMER ADDRESS
========================================================= */

export const createCustomerAddress = async ({
  firstName,
  lastName,
  phoneNumber,
  address1,
  address2,
  city,
  province,
  territoryCode,
  zip,
  defaultAddress,
}: {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  territoryCode: string;
  zip?: string;
  defaultAddress: boolean;
}) => {

  const token = await getStoredAccessToken();

  if (!token) {
    throw new Error('User not logged in.');
  }

  const mutation = `
    mutation CustomerAddressCreate(
      $address: CustomerAddressInput!
      $defaultAddress: Boolean
    ) {
      customerAddressCreate(
        address: $address
        defaultAddress: $defaultAddress
      ) {
        customerAddress {
          id
          address1
          address2
          city
          province
          country
          firstName
          lastName
          phoneNumber
          territoryCode
          zip
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
        address: {
          firstName,
          lastName,
          phoneNumber,
          address1,
          address2,
          city,
          province,
          territoryCode,
          zip,
        },

        defaultAddress,
      },
    }),
  });


  const json = await response.json();


  /* =========================================================
     GRAPHQL ERROR
  ========================================================= */

  if (json.errors) {
    console.error('GRAPHQL ERROR:', json.errors);

    throw new Error(
      json.errors[0]?.message ?? 'GraphQL error'
    );
  }


  /* =========================================================
     ADDRESS CREATE RESULT
  ========================================================= */

  const result = json.data.customerAddressCreate;


  /* =========================================================
     USER ERRORS
  ========================================================= */

  if (result.userErrors?.length) {
    console.error(
      'ADDRESS CREATE ERROR:',
      result.userErrors
    );

    throw new Error(
      result.userErrors
        .map((error: any) => error.message)
        .join(', ')
    );
  }


  /* =========================================================
     RETURN CREATED ADDRESS
  ========================================================= */

  return result.customerAddress;
};


/* =========================================================
   UPDATE CUSTOMER ADDRESS
========================================================= */

export const updateCustomerAddress = async ({
  addressId,
  firstName,
  lastName,
  phoneNumber,
  address1,
  address2,
  city,
  province,
  territoryCode,
  zip,
  defaultAddress,
}: {
  addressId: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  territoryCode: string;
  zip?: string;
  defaultAddress: boolean;
}) => {

  const token = await getStoredAccessToken();

  if (!token) {
    throw new Error('User not logged in.');
  }

  const mutation = `
    mutation CustomerAddressUpdate(
      $addressId: ID!
      $address: CustomerAddressInput
      $defaultAddress: Boolean
    ) {
      customerAddressUpdate(
        addressId: $addressId
        address: $address
        defaultAddress: $defaultAddress
      ) {
        customerAddress {
          id
          address1
          address2
          city
          province
          country
          firstName
          lastName
          phoneNumber
          territoryCode
          zip
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
        addressId,

        address: {
          firstName,
          lastName,
          phoneNumber,
          address1,
          address2,
          city,
          province,
          territoryCode,
          zip,
        },

        defaultAddress,
      },
    }),
  });


  const json = await response.json();


  /* =========================================================
     GRAPHQL ERROR
  ========================================================= */

  if (json.errors) {
    console.error('GRAPHQL ERROR:', json.errors);

    throw new Error(
      json.errors[0]?.message ?? 'GraphQL error'
    );
  }


  /* =========================================================
     ADDRESS UPDATE RESULT
  ========================================================= */

  const result = json.data.customerAddressUpdate;


  /* =========================================================
     USER ERRORS
  ========================================================= */

  if (result.userErrors?.length) {
    console.error(
      'ADDRESS UPDATE ERROR:',
      result.userErrors
    );

    throw new Error(
      result.userErrors
        .map((error: any) => error.message)
        .join(', ')
    );
  }


  /* =========================================================
     RETURN UPDATED ADDRESS
  ========================================================= */

  return result.customerAddress;
};


/* =========================================================
   DELETE CUSTOMER ADDRESS
========================================================= */

export const deleteCustomerAddress = async (
  addressId: string
) => {

  const token = await getStoredAccessToken();

  if (!token) {
    throw new Error('User not logged in.');
  }

  const mutation = `
    mutation CustomerAddressDelete(
      $addressId: ID!
    ) {
      customerAddressDelete(
        addressId: $addressId
      ) {
        deletedAddressId

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
        addressId,
      },
    }),
  });


  const json = await response.json();


  /* =========================================================
     GRAPHQL ERROR
  ========================================================= */

  if (json.errors) {
    console.error('GRAPHQL ERROR:', json.errors);

    throw new Error(
      json.errors[0]?.message ?? 'GraphQL error'
    );
  }


  /* =========================================================
     ADDRESS DELETE RESULT
  ========================================================= */

  const result = json.data.customerAddressDelete;


  /* =========================================================
     USER ERRORS
  ========================================================= */

  if (result.userErrors?.length) {
    // console.error(
    //   'ADDRESS DELETE ERROR:',
    //   result.userErrors
    // );

    throw new Error(
      result.userErrors
        .map((error: any) => error.message)
        .join(', ')
    );
  }


  /* =========================================================
     RETURN DELETED ADDRESS ID
  ========================================================= */

  return result.deletedAddressId;
};


/* =========================================================
   UPDATE CUSTOMER
========================================================= */

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
    mutation customerUpdate(
      $input: CustomerUpdateInput!
    ) {
      customerUpdate(
        input: $input
      ) {
        customer {
          id
          firstName
          lastName
          displayName
         
          
          emailAddress {
            emailAddress
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


  /* =========================================================
     CREATE INPUT
  ========================================================= */

  const input: any = {};


  if (firstName !== undefined) {
    input.firstName = firstName;
  }


  if (lastName !== undefined) {
    input.lastName = lastName;
  }


  // if (phoneNumber !== undefined) {
  //   input.phoneNumber = phoneNumber;
  // }


  /* =========================================================
     ADDRESS
  ========================================================= */

  if (address) {

    input.defaultAddress = {};


    if (address.address1 !== undefined) {
      input.defaultAddress.address1 =
        address.address1;
    }


    if (address.address2 !== undefined) {
      input.defaultAddress.address2 =
        address.address2;
    }


    if (address.city !== undefined) {
      input.defaultAddress.city =
        address.city;
    }


    if (address.province !== undefined) {
      input.defaultAddress.province =
        address.province;
    }


    if (address.country !== undefined) {
      input.defaultAddress.country =
        address.country;
    }


    if (address.zip !== undefined) {
      input.defaultAddress.zip =
        address.zip;
    }
  }


  /* =========================================================
     UPDATE REQUEST
  ========================================================= */

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },

    body: JSON.stringify({
      query: mutation,

      variables: {
        input,
      },
    }),
  });


  const json = await response.json();


  /* =========================================================
     GRAPHQL ERROR
  ========================================================= */

  if (json.errors) {
    console.error('GRAPHQL ERROR:', json.errors);

    throw new Error(
      json.errors[0]?.message ?? 'GraphQL error'
    );
  }


  /* =========================================================
     CUSTOMER UPDATE RESULT
  ========================================================= */

  const result = json.data.customerUpdate;


  /* =========================================================
     USER ERRORS
  ========================================================= */

  if (result.userErrors?.length) {
    console.error(
      'CUSTOMER UPDATE ERROR:',
      result.userErrors
    );

    throw new Error(
      result.userErrors
        .map((error: any) => error.message)
        .join(', ')
    );
  }


  /* =========================================================
     RETURN UPDATED CUSTOMER
  ========================================================= */

  return result.customer;
};