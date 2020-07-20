/*Style for navbar will be a grid where the links take up a % of grid and brand takes up the rest. Or the brand takes up as 
much space as possible and the links just takes up the space they need. grid-template-columns 1fr auto means the 1st space
takes up 1 fraction of the available space. Wrap this around the components in Navbar.js */

import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledNavbar = styled.nav`
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 20px;

`

/*Making font on the brand bigger. Using Saas to remove the underline on the anchor tag. (line under Learn.Build.Type). 
Using Saas to target...from the element that I am in (which is the StyleNavBrand), grab any childern of the a tag and add
text-decoration to none. Can now replace the <div> surrounding the brand with StyledNavBrand.  
*/
export const StyledNavbrand = styled.div`
    font-size: 1.4rem;

    & > a {
        text-decoration: none;
    }

`

/*Removing the bullets from the nav items. Removing the default padding that is included with lists.  
Grid will add all items after the 1st on same row but in new column. Grid-grap adds space between nav itesm. 
On Navbar.js, replace ul with StyledNavItems. 
*/
export const StyledNavItems = styled.ul`
    list-style: none;
    padding-left: 0;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 20px;

`
/*Instead of defining an html element like a div, can sytle a component. Styling the <Link> component. To style the link, 
need to pass it as a component to styled. Adding color when hovering over links. The transition adds a slight delay of 
color change when hovering. 
Replace <Link> with StyledLink on Navbar.js */

export const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 200ms;

    &:hover {
        color: #e16365
    }
`



    
    



