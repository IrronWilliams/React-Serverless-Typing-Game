/*
height: 75vh means this should take up 75% of the height of screen. use grid to define 2 different rows with the 1st being
50px and the 2nd row is 1fr which is 1 fractional unit or the rest of the available space. using min/max property to define
columns. calling a function and passing it 2 variables:
    1st column = min of 50px and auto means at max take up as much space as you need. 
    middle column 1rf = will take up all of the remaining available space.
    last column = same as 1st 
    
The goal is to have the middle <p> take up as much space as it can that the other 2 do not take up. The 2nd p will take up
as much space as it can while the other 2 <p> takes up as much space as they need. 
    <p>Score:0</p>
    <p>A</p>
    <p>Time: 144</p>

    update Game.js accordingly. 
*/

import styled from 'styled-components'

export const StyledGame = styled.div`
    height: 75vh;
    max-height: 500px;
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: minmax(50px, auto) 1fr minmax(50px, auto);
    
`
/*setting font on score */
export const StyledScore = styled.p`
    font-size: 1.5rem;

`

/*setting font on timer.
grid-column: 3 means start at 3 column and go to column 4.
 */
export const StyledTimer = styled.p`
    font-size: 1.5rem;
    grid-column: 3;

`

/*setting font on text and position it in 2nd row of grid, below the score and timer. Ensure the text spans across the 3 
columns in the grid and centered. grid-column 1/4 means start the text at 1 and go all the way across 4 (where 1-4 is the
number of grid lines). This results in the text taking up the entire width and will take up the remaining space accordingly
as the screen size adjusts. 
*/
export const StyledCharacter = styled.p`
    font-size: 15rem;
    grid-row: 2;
    grid-column: 1/4;
    text-align: center;
    color: #e16365;

`