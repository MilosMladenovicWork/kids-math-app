import React from 'react'

import styles from './text-input-field.module.scss'

const TextInputField = ({name, onChange, value, placeholder}) => {
    return(
        <input type='text' name={name} value={value} placeholder={placeholder || 'Odaberi'} className={styles.textInputField} onChange={(e) => onChange(e.currentTarget.value)}/>
    )
}

export default TextInputField