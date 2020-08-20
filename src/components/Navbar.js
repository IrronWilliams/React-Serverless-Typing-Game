/*Link component allows me to switch/navigate to different pages w/o full page/application reload.

Create an unordered list of nav items. Game and GameOVer links will be referenced with a button 
*/

import React from 'react'
import { Link } from 'react-router-dom'
import { StyledNavbar, StyledNavbrand, StyledNavItems, StyledLink } from '../styled/NavBar'
import { Accent } from '../styled/Random'
import { useAuth0 } from '../auth'

export default function Navbar() {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0() //getting properties from the AuthoContext Provider via auth.js  
    return (
        <StyledNavbar>
            <StyledNavbrand>
                <Link to='/'>
                    Learn.Build.<Accent>Type</Accent>
                </Link>
            </StyledNavbrand>
            <StyledNavItems>
                <li><StyledLink to='/'>Home</StyledLink></li>
                <li><StyledLink to='/highScores'>HighScores</StyledLink></li> 

                {/*Setting onclick handlers. Different functions will run based upon user clicking Login/Logout. Funtions in auth.js  */}
                {!isAuthenticated && (
                    <li>
                        <button onClick={loginWithRedirect}>Login</button>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                )}

            </StyledNavItems>
        </StyledNavbar>   
    )
}