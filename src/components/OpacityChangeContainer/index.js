import React from 'react'
import { animated, useSpring } from 'react-spring'

import styles from './opacity-change-container.module.scss'

const OpacityChangeContainer = ({children}) => {

    const props = useSpring({
        from:{opacity:0.5},
        to:{opacity:1}
    })

    return(
        <animated.div style={props}>
            {children}
        </animated.div>
    )
}

export default OpacityChangeContainer