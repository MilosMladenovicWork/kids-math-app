import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { navigate } from 'gatsby'
import {
    TransitionGroup,
    Transition as ReactTransition,
} from "react-transition-group"

import styles from './layout.module.scss'
import themeSong from '../sounds/theme-song.mp3'
import AudioProxy from '../utils/AudioProxy'
import NeutralActionButton from '../components/NeutralActionButton'

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
    const [audio] = useState(new AudioProxy(themeSong));
    const [musicToggled, setMusicToggled] = useState(true)
    
    audio.loop = true

    useEffect(() => {
      if(!audio.currentTime && musicToggled){
        audio.play()
      }else{
        audio.pause()
      }
    }, [musicToggled])

    

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
                <div className={styles.musicButton}>
                  <NeutralActionButton onClick={() => setMusicToggled(prevState => !prevState)}>
                    <span className={!musicToggled && styles.textLineThrough}>Music</span>
                  </NeutralActionButton>
                </div>
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
}

export default Layout