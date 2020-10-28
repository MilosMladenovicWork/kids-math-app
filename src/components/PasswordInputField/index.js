import React from 'react'

import styles from './password-input-field.module.scss'

const PasswordInputField = ({name, onChange, value, placeholder}) => {
    return(
        <input type='password' name={name} value={value} placeholder={placeholder || 'Odaberi'} className={styles.passwordInputField} onChange={(e) => onChange(e.currentTarget.value)}/>
    )
}

export default PasswordInputField