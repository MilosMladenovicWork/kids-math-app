import React from 'react'
import {animated, useSpring, interpolate} from 'react-spring'

import styles from './appear-and-disappear.module.scss'

const AppearAndDisappearContainer = ({children}) => {

    const {scale} = useSpring({
        to:[{scale: 1.2}, {scale: 1}, {scale: 0}],
        from:{scale: 0},
    })

    return (
        <animated.div className={styles.appearAndDisappearContainer} style={{
            transform:scale.interpolate((scale) => `scale(${scale})`)
        }}>
            {children}
        </animated.div>
    )
}

export default AppearAndDisappearContainer