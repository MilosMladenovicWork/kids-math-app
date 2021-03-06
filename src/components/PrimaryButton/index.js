import React, {useState} from 'react'

import styles from './primary-button.module.scss'
import successSound from '../../sounds/success.wav'
import AudioProxy from '../../utils/AudioProxy'

const PrimaryButton = ({children, onClick, disabled}) => {

    const [audio] = useState(new AudioProxy(successSound));

    return(
        <button onClick={(e) => {
            e.preventDefault()
            if(onClick && !disabled){
                audio.pause()
                audio.currentTime=0.2
                audio.play()
                onClick(e)
            }
            }} className={`${styles.primaryButton} ${disabled && styles.disabled}`}>
            {children}
        </button>
    )
}

export default PrimaryButton