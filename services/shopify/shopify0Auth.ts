import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';

/*
|--------------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------------
|
| SHOP_ID      -> Shopify Customer Account API se mila (81785061622)
| CLIENT_ID    -> Shopify "Customer Account API credentials" se milega
|                 (neeche daalna hai jab aap dekh len)
| REDIRECT_URI -> Expo Auth Proxy (HTTPS) - Shopify ko HTTPS chahiye,
|                 custom scheme (nestnknife://) direct accept nahi karta
|
*/

const SHOP_ID = '81785061622';
const CLIENT_ID = '6c4fcd92-b439-4d9d-be66-87612ec983e3'; // 👈 Shopify se copy karke yahan daalo

const AUTHORIZATION_ENDPOINT = `https://shopify.com/authentication/${SHOP_ID}/oauth/authorize`;
const TOKEN_ENDPOINT = `https://shopify.com/authentication/${SHOP_ID}/oauth/token`;
const LOGOUT_ENDPOINT = `https://shopify.com/authentication/${SHOP_ID}/logout`;

// const REDIRECT_URI = 'https://auth.expo.io/@baig1212/nestnknife';

const REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: 'shop.81785061622.app',
  path: 'callback',
});

console.log('REDIRECT URI:', REDIRECT_URI);

const TOKEN_KEY = 'shopify_oauth_access_token';
const REFRESH_TOKEN_KEY = 'shopify_oauth_refresh_token';
const ID_TOKEN_KEY = 'shopify_oauth_id_token';

/* =========================
   DISCOVERY DOCUMENT
========================= */

const discovery: AuthSession.DiscoveryDocument = {
  authorizationEndpoint: AUTHORIZATION_ENDPOINT,
  tokenEndpoint: TOKEN_ENDPOINT,
};

/* =========================
   LOGIN — OAuth flow shuru karta hai
========================= */

export const startLogin = async () => {
  const request = new AuthSession.AuthRequest({
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'email', 'customer-account-api:full'],
    responseType: AuthSession.ResponseType.Code,
    usePKCE: true,
  });

  const result = await request.promptAsync(discovery);

  if (result.type !== 'success') {
    throw new Error('Login was cancelled or failed.');
  }

  const { code } = result.params;

  const tokenResult = await AuthSession.exchangeCodeAsync(
    {
      clientId: CLIENT_ID,
      code,
      redirectUri: REDIRECT_URI,
      extraParams: {
        code_verifier: request.codeVerifier ?? '',
      },
    },
    discovery,
  );

  await SecureStore.setItemAsync(TOKEN_KEY, tokenResult.accessToken);

  if (tokenResult.refreshToken) {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokenResult.refreshToken);
  }


  if (tokenResult.idToken) {
    await SecureStore.setItemAsync(ID_TOKEN_KEY, tokenResult.idToken);
  }

  console.log('ACCESS TOKEN EXISTS:', !!tokenResult.accessToken);
console.log('REFRESH TOKEN EXISTS:', !!tokenResult.refreshToken);
console.log('ID TOKEN EXISTS:', !!tokenResult.idToken);
  return tokenResult;
};

/* =========================
   LOGOUT
========================= */

export const logoutOAuth = async () => {
  const idToken = await SecureStore.getItemAsync(ID_TOKEN_KEY);

  console.log('LOGOUT: clearing tokens...');

  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(ID_TOKEN_KEY);

  const accessTokenAfter = await SecureStore.getItemAsync(TOKEN_KEY);
  const refreshTokenAfter = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  const idTokenAfter = await SecureStore.getItemAsync(ID_TOKEN_KEY);

  console.log('ACCESS TOKEN AFTER LOGOUT:', !!accessTokenAfter);
  console.log('REFRESH TOKEN AFTER LOGOUT:', !!refreshTokenAfter);
  console.log('ID TOKEN AFTER LOGOUT:', !!idTokenAfter);

  if (idToken) {
    const logoutUrl = `${LOGOUT_ENDPOINT}?id_token_hint=${idToken}`;

    try {
      await fetch(logoutUrl);
    } catch (error) {
      console.error('SHOPIFY LOGOUT ERROR:', error);
    }
  }
};
/* =========================
   GET STORED TOKEN
========================= */

export const getStoredAccessToken = async (): Promise<string | null> => {
  return SecureStore.getItemAsync(TOKEN_KEY);
};

/* =========================
   REFRESH TOKEN
========================= */

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

  console.log('REFRESH TOKEN EXISTS BEFORE REFRESH:', !!refreshToken);

  if (!refreshToken) return null;

  try {
    const tokenResult = await AuthSession.refreshAsync(
      {
        clientId: CLIENT_ID,
        refreshToken,
      },
      discovery,
    );

    console.log('REFRESH SUCCESS:', !!tokenResult.accessToken);
    console.log('NEW REFRESH TOKEN:', !!tokenResult.refreshToken);

    await SecureStore.setItemAsync(
      TOKEN_KEY,
      tokenResult.accessToken
    );

    if (tokenResult.refreshToken) {
      await SecureStore.setItemAsync(
        REFRESH_TOKEN_KEY,
        tokenResult.refreshToken
      );
    }

    return tokenResult.accessToken;
  } catch (error) {
    console.error('REFRESH TOKEN ERROR:', error);
    return null;
  }
};