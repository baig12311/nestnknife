import { shopifyFetch } from "./client";

/* =========================
   TYPES
========================= */

export type ShopifyCustomer = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
};

type UserError = {
  field: string[] | null;
  message: string;
};

/* =========================
   SIGN UP
========================= */

const CUSTOMER_CREATE_MUTATION = `
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
        phone
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

type CustomerCreateResponse = {
  customerCreate: {
    customer: ShopifyCustomer | null;
    customerUserErrors: UserError[];
  };
};

export const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<ShopifyCustomer> => {
  const data = await shopifyFetch<CustomerCreateResponse>(
    CUSTOMER_CREATE_MUTATION,
    {
      input: {
        firstName,
        lastName,
        email,
        password,
      },
    },
  );

  const result = data.customerCreate;

  if (result.customerUserErrors.length > 0) {
    throw new Error(result.customerUserErrors[0].message);
  }

  if (!result.customer) {
    throw new Error("Unable to create account.");
  }

  return result.customer;
};

/* =========================
   LOGIN (create access token)
========================= */

const ACCESS_TOKEN_CREATE_MUTATION = `
  mutation CustomerAccessTokenCreate(
    $input: CustomerAccessTokenCreateInput!
  ) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

type AccessTokenCreateResponse = {
  customerAccessTokenCreate: {
    customerAccessToken: {
      accessToken: string;
      expiresAt: string;
    } | null;
    customerUserErrors: UserError[];
  };
};

export const login = async (
  email: string,
  password: string,
): Promise<{ accessToken: string; expiresAt: string }> => {
  const data = await shopifyFetch<AccessTokenCreateResponse>(
    ACCESS_TOKEN_CREATE_MUTATION,
    {
      input: {
        email,
        password,
      },
    },
  );

  const result = data.customerAccessTokenCreate;

  if (result.customerUserErrors.length > 0) {
    throw new Error(result.customerUserErrors[0].message);
  }

  if (!result.customerAccessToken) {
    throw new Error("Invalid email or password.");
  }

  return result.customerAccessToken;
};

/* =========================
   LOGOUT (delete access token)
========================= */

const ACCESS_TOKEN_DELETE_MUTATION = `
  mutation CustomerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      userErrors {
        field
        message
      }
    }
  }
`;

type AccessTokenDeleteResponse = {
  customerAccessTokenDelete: {
    deletedAccessToken: string | null;
    userErrors: UserError[];
  };
};

export const logout = async (accessToken: string): Promise<void> => {
  const data = await shopifyFetch<AccessTokenDeleteResponse>(
    ACCESS_TOKEN_DELETE_MUTATION,
    {
      customerAccessToken: accessToken,
    },
  );

  const result = data.customerAccessTokenDelete;

  if (result.userErrors.length > 0) {
    throw new Error(result.userErrors[0].message);
  }
};

/* =========================
   GET CUSTOMER (using token)
========================= */

const GET_CUSTOMER_QUERY = `
  query GetCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;

type GetCustomerResponse = {
  customer: ShopifyCustomer | null;
};

export const getCustomer = async (
  accessToken: string,
): Promise<ShopifyCustomer | null> => {
  const data = await shopifyFetch<GetCustomerResponse>(
    GET_CUSTOMER_QUERY,
    {
      customerAccessToken: accessToken,
    },
  );

  return data.customer;
};

/* =========================
   FORGOT PASSWORD (recover)
========================= */

const CUSTOMER_RECOVER_MUTATION = `
  mutation CustomerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        field
        message
      }
    }
  }
`;

type CustomerRecoverResponse = {
  customerRecover: {
    customerUserErrors: UserError[];
  };
};

export const recoverPassword = async (email: string): Promise<void> => {
  const data = await shopifyFetch<CustomerRecoverResponse>(
    CUSTOMER_RECOVER_MUTATION,
    { email },
  );

  const result = data.customerRecover;

  if (result.customerUserErrors.length > 0) {
    throw new Error(result.customerUserErrors[0].message);
  }
};