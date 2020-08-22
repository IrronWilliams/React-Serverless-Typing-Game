/*creating hook to track user theme and to update the theme. use state to track changes
and create a toggle theme function. useEffect, getting value associated with the theme
and setting theme to either the local storage or default value of light. empty dependency
array indicates this will run once and will use the default value light. 

*/

import {useEffect, useState} from 'react'

export default () => {
    const [theme, setTheme] = useState('light')
    
    useEffect(()=> {
        const localStorageTheme = window.localStorage.getItem('theme')
        setTheme(localStorageTheme || 'light')
    }, [])

    const toggleTheme = () => {
        if (theme ==='light') {
            setTheme('dark')
            window.localStorage.setItem('theme', 'dark')
        } else {
            setTheme('light')
            window.localStorage.setItem('theme', 'light')
        }
    }

    return [theme, toggleTheme]

}