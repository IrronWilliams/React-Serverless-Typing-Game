import React, {useState, useEffect} from 'react'
import { ScoresList, ScoreLI } from '../styled/HighScores';

export default function HighScore() {
    //using state to display high scores
    const [highScores, setHighScores] = useState([])

    //use fetch API to call getHighScores function
    useEffect(() => {
        const loadHighScores = async () => {
            try {
                const res = await fetch('/.netlify/functions/getHighScores') //getting raw response by using relative path
                const scores = await res.json() //converting response to json
                setHighScores(scores) 
            } catch (err) {
                console.error(err) 
            }
        } 
        loadHighScores() 
    }, []) 
    return (
        <div>
             <h1>High Scores</h1>
            <ScoresList>
                {highScores.map((score) => (
                    <ScoreLI key={score.id} >
                       {score.fields.name} - {score.fields.score}
                    </ScoreLI>         
                    
                ))} 
            </ScoresList>                
        </div>
    )
}