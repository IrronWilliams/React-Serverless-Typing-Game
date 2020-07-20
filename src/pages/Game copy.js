/*
setInterval() function accepts a callback as 1st parameter and time in milliseconds of how long it will take to call the 
function. 1000 milliseconds = 1 second.  using setInterval alone will cause the score to exponentially increase because
setInterval is looping over and over. Will need to useEffect to explicitly define when I want something to run. Can put
setInterval inside of useEffect to define that I only want setInterval to run when the score changes. 

In essence, the useEffect hook determines it has a dependency to consider (which is the state score variable) and will 
only run the setInterval function when the score changes. The score will continue to exponentially grow because when the 
score changes, setInterval will run and a time will be set. Because the score changed, setInterval will run again and 
another time will be set. This pattern continues over and over, thus resulting in a score that increases exponentially. 
To manage this, return a cleanup function inside of useEffect. The cleanup function will run before the functional 
component re-renders. I can set the value returned from setInterval to a variable and pass the variable to the 
clearInterval function (cleanup function). This demonstrates how intervals can have some strange behavior inside of a 
useEffect or functional component. 

useEffect(() => {
        const interval = setInterval(() => {
            setScore( (prevScore) => prevScore+1 )  //calling state function, using callback to add 1 to previous score 
    
        }, 1000)
        return () => {
            clearInterval(interval)  //cleanup function to prevent score from growing exponentially. 
        }
    }, [score])

The empty array ensures the callback function is only run once when the component loads. This allows me to grab the current
date and store value in a variable. Variable interval receives results from having setInterval call the updateTime function
that is passed the parameter currentTime that runs every millisecond. getTime returns the total # of milliseconds from 1/1/70. 




*/

import React, {useState, useEffect } from 'react'
import { StyledGame, StyledScore, StyledTimer, StyledCharacter} from '../styled/Game'
import { Strong } from '../styled/Random'

export default function Game() {
    const [score, setScore] = useState(0) //using useState to display initial value of state
    const MAX_SECONDS = 5
    const [ms, setMs] = useState(0)
    const [seconds, setSeconds] = useState(MAX_SECONDS)

    useEffect(() => {
        const currentTime = new Date()
        const interval = setInterval(() => updateTime(currentTime) ,1) //calling updateTime. runs every 1ms
        return () => clearInterval(interval)  //gets rid of previous interval before the component re-renders

        
    }, [])

    const updateTime = (startTime) => { //receives current time from useEffect
        const endTime = new Date()
        //console.log(endTime.getTime() - startTime.getTime())  //returns # of milliseconds passed since startTime
        const msPassedStr = (endTime.getTime() - startTime.getTime()).toString() //converts milliseconds passed to string
        const formattedMSString = ('0000' + msPassedStr).slice(-5) //takes the last 5 digit of the string
        
        /*of the 5 characters in string the 1st 2 are seconds and last 3 are milliseconds that have passed */
        const updatedSeconds = MAX_SECONDS - parseInt(formattedMSString.substring(0,2)) -1
        const updatedMs = 1000 - parseInt(formattedMSString.substring(formattedMSString.length-3)) //start at end of string and get index of 3rd to last position + all else from that position
        console.log(addLeadingZeros(updatedSeconds, 2) + ':' + addLeadingZeros(updatedMs, 3))

        /*want to always show 2 characters for seconds and milliseconds */
        // const addLeadingZeros = (num, length) =>{
        //     return num.toString().padStart(length, 0);
        // }

        const addLeadingZeros = (num, length) =>{
            let zeros = ''
            for (let i=0; 1<length; i++) {
                zeros +='0'
            }
            return (zeros + num).slice(-length)
        }
    }

    return (
        <StyledGame>
            <StyledScore>Score: <Strong>{score}</Strong></StyledScore>
            <StyledCharacter>A</StyledCharacter>
            <StyledTimer>Time: <Strong>00: 000</Strong></StyledTimer>
        </StyledGame>
    )
}