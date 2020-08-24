import React from 'react'
import CTA from '../styled/CTA' //not using {} because its a default export and not a named export
import { Accent, StyledTitle} from '../styled/Random'
import {useAuth0} from '../auth'  //bringing in to console log the user credential when creating account

export default function Home() {
    const { user } = useAuth0()
    console.log(user)

    return (
        <div>
            <StyledTitle>How Fast Can You Type?</StyledTitle>
            <CTA to='/game'>Click here to start playing!</CTA>
        </div>
    )
}