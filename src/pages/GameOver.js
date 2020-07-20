/*Have access to score because of custom hook. Want to discourage user from getting to GameOVer page w/o playing game. 
Page components get access to history objects. Can use history to push player to homepage. 

When GameOver page is rendered, if score is negative 1 (context is initialized a value of -1 for the score), push user to 
homepage. This prevents user from going directly to the localhost3000/gameOver page w/o playing the game 1st. 

Added StyleLinks to ask user to Go Home or Play Again. 

*/


import React from 'react'
import { useScore } from '../contexts/ScoreContext'
import { StyledLink } from '../styled/NavBar'

export default function GameOver( {history} ) {
    const [score] = useScore()

    if (score === -1) {
        history.push('/')
    }

    return (
        <div>
            <h1>GameOver</h1>
            <p>{score}</p>
            <StyledLink to='/'>Go Home</StyledLink>
            <StyledLink to='/game'>Play Again?</StyledLink>
        </div>
        
)
}