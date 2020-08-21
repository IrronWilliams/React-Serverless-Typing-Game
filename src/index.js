import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ScoreProvider } from './contexts/ScoreContext';
import { Auth0Provider } from './auth';
import history from './utils/history';
import config from './auth_config.json';

/*Wrapping App in ScoreProvider context so all components can have access to its state values.  
Also wrapping everything in Auth0Provider for authentication. The onRedirectCallback function is 
used by the redirect_uri for Auth0. audience is used for backend JWT API verification.
*/

const onRedirectCallback = (appState) => {
  history.push(
      appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
  );
};

ReactDOM.render(

<Auth0Provider
  domain={config.domain}
  client_id={config.clientId}
  redirect_uri={window.location.origin}
  onRedirectCallback={onRedirectCallback}
  audience={config.audience}
>
  <ScoreProvider>
      <App />
  </ScoreProvider>
</Auth0Provider>
  ,document.getElementById('root')
);



{/* <ScoreProvider>
<App />
</ScoreProvider> */}