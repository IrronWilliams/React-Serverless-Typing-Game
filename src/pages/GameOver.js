/*Have access to score because of custom hook. Want to discourage user from getting to GameOVer page w/o playing game. 
Page components get access to history objects. Can use history to push player to homepage. 

When GameOver page is rendered, if score is negative 1 (context is initialized a value of -1 for the score), push user to 
homepage. This prevents user from going directly to the localhost3000/gameOver page w/o playing the game 1st. 

Added StyleLinks to ask user to Go Home or Play Again. 

*/

import React, { useEffect, useState } from 'react' 
import { useScore } from '../contexts/ScoreContext' 
import { StyledLink } from '../styled/NavBar' 
import { StyledCharacter } from '../styled/Game' 

export default function GameOver({ history }) {
    const [score] = useScore() 
    const [scoreMessage, setScoreMessage] = useState('') 

    if (score === -1) {
        history.push('/') 
    }

     /*When this component mounts, will try to save the high score. When saveHighScore function will determine if the score
    was saved or not. Based upon what the function returns, determine what message to display to user. */
    useEffect(() => {
        const saveHighScore = async () => {
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({ name: 'Asha', score }),
                } 
                const res = await fetch(
                    '/.netlify/functions/saveHighScores',
                    options
                ) 
                const data = await res.json() 
                console.log(data)
                
                if (data.id) {
                    setScoreMessage('Congrats! You got a high score!!') 
                } else {
                    setScoreMessage('Sorry, not a high score. Keep trying!') 
                }
            } catch (err) {
                console.error(err) 
            }
        } 
        saveHighScore() 
    }, [score]) 
    return (
        <div>
            <h1>Game Over</h1>
            <h2>{scoreMessage}</h2>

            <StyledCharacter>{score}</StyledCharacter>
            <div>
                <StyledLink to="/">Go Home</StyledLink>
            </div>
            <div>
                <StyledLink to="/game">Play Again</StyledLink>
            </div>
        </div>
    ) 
}

