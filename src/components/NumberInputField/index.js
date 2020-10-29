import React, {useState} from 'react'

import styles from './number-input-field.module.scss'
import inputSound from '../../sounds/switch.wav'

const NumberInputField = ({name, onChange, value}) => {
    
    const [audio] = useState(typeof window != 'undefined' && new Audio(inputSound));
    
    return(
        <input type='number' name={name} value={value} placeholder={'Odaberi'} className={styles.numberInputField} min="0" onChange={(e) => {audio.pause();audio.currentTime = 0.05;audio.play();onChange(e.currentTarget.value)}}/>
    )
}

export default NumberInputField