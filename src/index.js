import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ScoreProvider } from './contexts/ScoreContext';

/*Wrapping App in ScoreProvider context so all components can have access to its state values.  */

ReactDOM.render(
  <ScoreProvider>
    <App />
  </ScoreProvider>

  ,document.getElementById('root')
);

