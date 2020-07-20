/*
Will only have 1 thing in file, so can export default. Since styling component, can pass the component as a prop. 
By default, anchor tags do not take up the entire width. Display block will center the anchor tag "Click to start playing"
Getting rid of underline unit hovering
Update Home.js accordingly. CTA.js (Call To Action) will now render the Link component. All props passed to a style 
component will be passed to the actual component that gets rendered. 
*/

import styled from 'styled-components'
import { Link } from 'react-router-dom'


export default styled(Link)`
    font-size: 1.5rem;
    text-align: center;
    display: block;
    text-decoration: none;

  &:hover{
      text-decoration: underline
  }
`