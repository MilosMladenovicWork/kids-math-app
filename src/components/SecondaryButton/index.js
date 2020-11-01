import React, {useState} from 'react'
import negativeSound from '../../sounds/out-of-place.wav'
import AudioProxy from '../../utils/AudioProxy'

import styles from './secondary-button.module.scss'

const SecondaryButton = ({children, onClick, disabled}) => {

    const [audio] = useState(new AudioProxy(negativeSound));

    return(
        <button onClick={(e) => {
            e.preventDefault();
            if(onClick && !disabled){
                audio.pause()
                audio.currentTime=0.1
                audio.play()
                onClick(e)
            } 
            }} className={`${styles.secondaryButton} ${disabled && styles.disabled}`}>
            {children}
        </button>
    )
}

export default SecondaryButton