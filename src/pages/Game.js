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
that is passed the parameter currentTime that runs every millisecond. 
getTime() returns the total # of milliseconds from 1/1/70. 

A route/page will receive a property called history. Can use history to navigate to the next page I want to go to. This can
be used to direct user to GameOver page when timer is below 0/negative. 


*/


import React, {useState, useEffect, useCallback } from 'react'
import { StyledGame, StyledScore, StyledTimer, StyledCharacter} from '../styled/Game'
import { Strong } from '../styled/Random'
import { useScore } from '../contexts/ScoreContext'

export default function Game({history}) {  //this is a route page so has the prop history. 
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789' //array for randomly selecting index inside string
    const [currentCharacter, setCurrentCharacter] = useState('')
    
    const MAX_SECONDS = 10
    //const [score, setScore] = useState(0) //using useState to display initial value of state. replaced with useScore
    const [score, setScore] = useScore() //updated to use the custom useScore hook to track state for score
    const [ms, setMs] = useState(0)
    const [seconds, setSeconds] = useState(MAX_SECONDS)

    useEffect(() => {
        setRandomCharacter()
        setScore(0) //initializing score to 0. 
        const currentTime = new Date()
        const interval = setInterval(() => updateTime(currentTime) ,1) //updates current time every mil sec. calls updateTime.         return () => clearInterval(interval)  //gets rid of previous interval before the component re-renders
     
    }, [])  //has no dependencies so should only run 1x. 

    const updateTime = (startTime) => { //receives previous (former current) time from useEffect
        const endTime = new Date()      //gets current time in order to compare current time and prev time. 
        //console.log(endTime.getTime() - startTime.getTime())  //returns # of milliseconds passed since startTime
        const msPassedStr = (endTime.getTime() - startTime.getTime()).toString() //converts milliseconds passed to string
        const formattedMSString = ('0000' + msPassedStr).slice(-5) //prepend with zeros and gets last 5 digit of the string
        
        /*of the 5 characters in string the 1st 2 are seconds and last 3 are milliseconds that have passed */
        const updatedSeconds = MAX_SECONDS - parseInt(formattedMSString.substring(0,2)) -1
        const updatedMs = 1000 - parseInt(formattedMSString.substring(formattedMSString.length-3)) //start at end of string and get index of 3rd to last position + all else from that position
        //console.log(addLeadingZeros(updatedSeconds, 2) + ':' + addLeadingZeros(updatedMs, 3))
        
        setSeconds(addLeadingZeros(updatedSeconds, 2)) //passing formatted seconds into state setter function 
        setMs(addLeadingZeros(updatedMs, 3))           //passing formatted milliseconds into state setter function 
    }

    /*Helper function to always show 2 characters for seconds and 3 for milliseconds. Need to pad the string . 
    padStart() pads the current string with another string. 
    */
     const addLeadingZeros = (num, length) =>{
            return num.toString().padStart(length, 0)
        }
    
    /*Prevents timer from displaying negative time. useEffect() listens for changes/will run code when state variables ms
    and seconds change.  A route/page will receive a property called history. Can use history to navigate/push user to the 
    gameOver page when timer become negative.   */

    useEffect(() => {
        if (seconds <=1) {
           history.push('/gameOver')
        }

    }, [ms, seconds, history]) //history will never change

    /*Receives event and takes info about what key has been pressed by user. compares user input to randomly selected 
    character. If user typed correct key, add 1 point to current score. If user keyed wrong character, penalize user by 
    deducting 1 point. Then select another random character. 
    
    w/o useCallback(), currentCharacter is not being updated inside of the function because keyupHandler is not a function 
    that is part of specifically React hooks. Consequently, React doesn't know how to update the function keyupHandler's 
    reference to the currentCharacter state. Basically, when keyupHandler is defined, initially it gets the value of empty 
    string for currentCharacter but it does not have a way to update the value. To address this issue, can use useCallback
    hook.  
    
    useCallback(), which is very similar to useEffect in that it has an array of dependencies that determine when the 
    function needs to be recalculated. The dependency that I care about is currentCharacter. Whenever currentCharacter 
    changes (which is whenever user types) the function returned from useCallBack will be recreated and provided with 
    the newest value of currentCharacter. 
    */
    const keyupHandler = useCallback((e) =>{
        console.log(e.key, currentCharacter)
        if (e.key===currentCharacter){
            setScore((prevScore)=> prevScore+1)
        } else {
            if (score > 0){
                setScore((prevScore)=> prevScore -1)
            }
        }
        setRandomCharacter()
    },[currentCharacter])

    /*Adding event listener to document for a key up command, then call a function to handle logic to update score among 
    other logic. Also adding cleanup function to remove event listener in the event the component re-mounts.
    
    Initially added event listener to the document and referenced keyupHandler function 1x. When useEffect has no 
    dependencies, keyupHandler gets an initial value of empty string, then because of the useCallback() hook in the 
    keyupHandler function, it then references the initial value in currentCharacter. So the currentCharacter needs to 
    point to the keyupHandler function in this particular useEffect hook. Can add the keyupHandler function as a dependency. 
    As a result, anytime keyupHandler changes, which it does every time currentCharacter changes, re-register keyupHandler 
    as the callback function for the keyup event on the document.  
    */
    useEffect(()=> {
        document.addEventListener('keyup', keyupHandler)
        return () => {
            document.removeEventListener('keyup', keyupHandler)
        }

    }, [keyupHandler])

    /*
    Function will called at start of game. Function goes thru the characters array, randomly select a character and assign 
    that value to the currentCharacter that is tracked in state. The random character is displayed on screen. 
    The keyUpHandler function checks if user keyed the correct random character. 

    math.random() will return a decimal between 0 and 1 but not including 1. multiplying by 36 will give me a decimal 
    between 0 and 35. Math.floor 'floors' the decimal to get an integer between 0 and 35. Call function setter and set it
    equal to the random character from the characters array */
    const setRandomCharacter = () => {
        const randomInt = Math.floor(Math.random() *36)
        setCurrentCharacter(characters[randomInt])
    }
    
    return (

        <StyledGame>
            <StyledScore>Score: <Strong>{score}</Strong></StyledScore>
            <StyledCharacter>{currentCharacter}</StyledCharacter>
            <StyledTimer>Time: <Strong>{seconds}: {ms}</Strong></StyledTimer>
        </StyledGame>

    )
}

    // useEffect(() => {
    //     if (seconds <= -1) {
    //         history.push('/gameOver');
    //     }
    // }, [seconds, ms, history]);