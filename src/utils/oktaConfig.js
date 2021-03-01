const config = {
  issuer: process.env.REACT_APP_OKTA_ISSUER_URI + '/oauth2/default',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: process.env.REACT_APP_CLIENT_ID,
  pkce: true,
  scopes: ['openid', 'email', 'profile'],
};

export { config };
