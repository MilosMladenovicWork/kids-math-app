import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { navigate } from 'gatsby'

import {
    TransitionGroup,
    Transition as ReactTransition,
} from "react-transition-group"

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