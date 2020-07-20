/*createGlobalStyle function can be used to globally apply css to application. can write regular CSS within back-ticks. */


import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    *{
        box-sizing: border-box;
        color: #333;
        margin: 0;
        font-family: sans-serif;
        font-weight: 300;
    }
    
    h1, h2 {
        margin-bottom: 2rem;
    }

`

