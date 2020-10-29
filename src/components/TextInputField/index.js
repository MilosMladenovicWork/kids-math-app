import React, {useState} from 'react'

import styles from './text-input-field.module.scss'
import inputSound from '../../sounds/switch.wav'

const TextInputField = ({name, onChange, value, placeholder, autocomplete}) => {

    const [audio] = useState(typeof window != 'undefined' && new Audio(inputSound));

    return(
        <input type='text' name={name} value={value} autocomplete={autocomplete && autocomplete} placeholder={placeholder || 'Odaberi'} className={styles.textInputField} onChange={(e) => {audio.pause();audio.currentTime = 0.05;audio.play();onChange(e.currentTarget.value)}}/>
    )
}

export default TextInputField