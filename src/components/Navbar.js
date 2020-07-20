/*Link component allows me to switch/navigate to different pages w/o full page/application reload.

Create an unordered list of nav items. Game and GameOVer links will be referenced with a button 
*/

import React from 'react'
import { Link } from 'react-router-dom'
import { StyledNavbar, StyledNavbrand, StyledNavItems, StyledLink } from '../styled/NavBar'
import { Accent } from '../styled/Random'


export default function Navbar() {
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
            </StyledNavItems>
        </StyledNavbar>   
    )
}