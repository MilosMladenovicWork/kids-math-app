import React, {useState} from 'react'
import neutralSound from '../../sounds/neutral.wav'
import AudioProxy from '../../utils/AudioProxy'

import styles from './neutral-action-button.module.scss'

const NeutralActionButton = ({children, onClick, disabled}) => {
    
    const [audio] = useState(new AudioProxy(neutralSound));
    
    return(
        <button onClick={(e) => {
            e.preventDefault();
            if(onClick && !disabled){
                audio.pause()
                audio.currentTime=0.1
                audio.play()
                onClick(e)
            } 
            }} className={`${styles.neutralActionButton} ${disabled && styles.disabled}`}>
            {children}
        </button>
    )
}

export default NeutralActionButton