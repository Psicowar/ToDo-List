import WishListProvider from './context/WishListProvider.jsx';
import Router from './Routes/Router';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin + "/wishes/all"
      }}
      useRefreshTokens
      cacheLocation="localstorage"
    >

      <WishListProvider>
        <Router />
      </WishListProvider>
    </Auth0Provider>

  );
}

export default App;
