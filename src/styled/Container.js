/*
The way style components work is that you type styled and the name of the html element that I want to create. Then use ``
to put CSS directly within the back-ticks. Basically writing CSS within Javascript template literals.  Within App.js, 
import Container and wrap 'Container' around the components I want to apply CSS to. Idea is to create a styled component
for everything I want to style. 
*/

import styled from 'styled-components'

export const Container = styled.div`
    padding: 20px;
    margin: 0 auto;
    max-width: 800px;
    text-align: center;
`
//margin-top: 20px; -> removed from container because was a bit distracting when toggling to dark theme