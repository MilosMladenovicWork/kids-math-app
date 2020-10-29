import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { navigate } from 'gatsby'
import {
    TransitionGroup,
    Transition as ReactTransition,
} from "react-transition-group"

import styles from './layout.module.scss'
import themeSong from '../sounds/theme-song.mp3'

const timeout = 450
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 0,
  },
}


const Layout = ({children, location}) => {
    
    const data = useSelector(state => state)
    const [audio] = useState(typeof window != 'undefined' && new Audio(themeSong));

    audio.loop = true
    if(!audio.currentTime){
      audio.play()
    }
    

    useEffect(() => {
      if(!data.authenticatedUser){
        navigate('/log-in')
      }
    }, [data.authenticatedUser])

    return(
        <TransitionGroup>
        <ReactTransition
          key={location.pathname}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {status => (
            <div
              className={styles.layoutWrapper}
              style={{
                ...getTransitionStyles[status],
              }}
            >
                {children}
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
}

export default Layout