/*createGlobalStyle function can be used to globally apply css to application. can write regular CSS within back-ticks. 
using css variables for the light/dark theme. switching out colors based upon isDarkThemEnabled.  
*/

import { createGlobalStyle } from 'styled-components'

//const isDarkThemeEnabled = false
export const GlobalStyle = createGlobalStyle`

:root {
    --main-bg-color: ${(props) => props.theme.mainBgColor};
    --main-text-color: ${(props) => props.theme.mainTextColor};
    --accent-color: #e16365;
}
* {
    box-sizing: border-box; 
    color: var(--main-text-color);
    margin: 0;
    font-family: sans-serif; 
    font-weight: 300;
}

h1, h2 {
    margin-bottom: 2rem 
}
`

