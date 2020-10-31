import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
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
    
    const dispatch = useDispatch()
    const data = useSelector(state => state)
    const [audio] = useState(new AudioProxy(themeSong));

    audio.loop = true

    useEffect(() => {
      if(!audio.currentTime && data.themeSongPlaying){
        audio.play()
      }else{
        audio.pause()
      }
    }, [data.themeSongPlaying])

    

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
                  <NeutralActionButton onClick={() => dispatch({type:'TOGGLE_THEME_SONG'})}>
                    <span className={!data.themeSongPlaying && styles.textLineThrough}>Music</span>
                  </NeutralActionButton>
                </div>
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
}

export default Layout