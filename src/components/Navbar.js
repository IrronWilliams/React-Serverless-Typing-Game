/*Link component allows me to switch/navigate to different pages w/o full page/application reload.

Create an unordered list of nav items. Game and GameOVer links will be referenced with a button 
*/

import React from 'react'
import { Link } from 'react-router-dom'
import { StyledNavbar, StyledNavbrand, StyledNavItems, StyledLink, StyledButtonLink  } from '../styled/NavBar'
import { Accent } from '../styled/Random'
import { useAuth0 } from '../auth'
import { StyledButton } from '../styled/Buttons'

export default function Navbar({toggleTheme}) {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0() //getting properties from the AuthoContext Provider via auth.js  
    return (
        <StyledNavbar>
            <StyledNavbrand>
                <Link to='/'>
                    Practice.Patience.<Accent>Program</Accent>
                </Link>
            </StyledNavbrand>
            <StyledNavItems>
                <li><StyledLink to='/'>Home</StyledLink></li>
                <li><StyledLink to='/highScores'>HighScores</StyledLink></li> 

                {/*Setting onclick handlers. Different functions will run based upon user clicking Login/Logout. Functions in auth.js  */}
                {!isAuthenticated && (
                    <li>
                        <StyledButtonLink onClick={loginWithRedirect}>Login</
                        StyledButtonLink>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <StyledButtonLink onClick={logout}>Logout</
                        StyledButtonLink>
                    </li>
                )}
                <StyledButton onClick={toggleTheme}>Toggle Theme</StyledButton>

            </StyledNavItems>
        </StyledNavbar>   
    )
}
