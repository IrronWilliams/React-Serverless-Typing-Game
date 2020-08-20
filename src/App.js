

/*Wrap everything in the router. Inside the router, create a switch. Inside switch, will be different routes. Each route will
have a path and component. The home page was listed last intentionally. Within a switch, router will stop at the 1st match. 
The '/' will match each path. Could have used the exact property and list the home page as the 1st path. 
  <Route path='/' exact component={Home} /> 
  

 */


import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Game from './pages/Game'
import GameOver from './pages/GameOver'
import HighScores from './pages/HighScores'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Container } from './styled/Container'
import { Main } from './styled/Main'
import Global  from './styled/Global'
import { useAuth0 } from './auth'


  /*destructuring loading property from useAuth0. If page is loading return a <p> tag showing
  page is Loading. The Auth0 SDK has some behind the scenes processing to determine when user
  refreshes the page if user is actually logged in. While process is occurring, get access 
  to the loading property.  */
  function App() {
    const { loading } = useAuth0();

    if (loading) {
        return <p>Loading...</p>;
    }



  return (
    <Router>
      <Global />
      <Main>
      <Container>
      <Navbar />
        <Switch>
          <Route path='/game' component={Game} />
          <Route path='/highScores' component={HighScores} />
          <Route path='/gameOver' component={GameOver} /> 
          <Route path='/' component={Home} /> 
        </Switch>
      </Container>
      </Main>
    </Router>
    
  );
}
export default App;

