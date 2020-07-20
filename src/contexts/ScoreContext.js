/*Setting context to -1 to prevent user from navigating to Game Over screen w/o playing the game. The min
score user can receive is 0.

The useScore is a custom hook which uses the useContext hook and the context of the createContext hook is passed to it.
The benefit of useScore is that it is a hook that can be used directly inside a component. Similar to how we use useState
and will be able to access things I want in a more concise way. 

ScoreProvider is a React component that takes in children and returns the Context.Provider. Will wrap the application inside
the StoreContext Provider. And because it wraps the component, it will have children as property. The provider is initialized
with value={score, SetScore}. All components will have access to these values. 

So in summary, ScoreContext allows me to store values that are accessible throughout application. From the ScoreContext, 
created a hook called useScore that will give me an easy way to pull in the value of the context. Then defined the 
ScoreProvider which will ultimately wrap the application and any component within it will be given access to 
the 'value'. The 'value' uses an internal useState to track a score property and a SetScore function. And whatever is 
inside of the score context it is displayed in this component. Lastly export the ScoreProvider and useScore hook. 

Within index.js, wrap the App within StoreContext. By doing this means anything inside of the App can use the useScore hook
which will give me a value for score and SetScore. Consequently can go to Game.js and can update the state hook for score
and setScore
    const [score, setScore] = useState(0) //using useState to display initial value of state
    const [score, setScore] = useState(0) //updated to use the custom useScore hook to track state for score

*/

import React, { useContext, useState } from 'react'

const ScoreContext = React.createContext(-1) //creates acutal context. will be able to use to access from different places. 
const useScore = () => useContext(ScoreContext)

const ScoreProvider = (({children}) =>   {
    const [score, SetScore] = useState(-1)

    return (<ScoreContext.Provider value={[score, SetScore]}>
        {children}
    </ScoreContext.Provider>

    )

})

export { ScoreProvider , useScore }