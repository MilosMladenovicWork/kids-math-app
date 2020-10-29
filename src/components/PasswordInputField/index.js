import React, {useState} from 'react'

import styles from './password-input-field.module.scss'
import inputSound from '../../sounds/switch.wav'

const PasswordInputField = ({name, onChange, value, placeholder, autocomplete}) => {
    
    const [audio] = useState(typeof window != 'undefined' && new Audio(inputSound));
    
    return(
        <input type='password' name={name} value={value} autocomplete={autocomplete && autocomplete} placeholder={placeholder || 'Odaberi'} className={styles.passwordInputField} onChange={(e) => {audio.pause();audio.currentTime = 0.05;audio.play();onChange(e.currentTarget.value)}}/>
    )
}

export default PasswordInputField