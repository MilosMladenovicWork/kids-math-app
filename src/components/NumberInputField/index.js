import React from 'react'

import styles from './number-input-field.module.scss'

const NumberInputField = ({name, onChange, value}) => {
    return(
        <input type='number' name={name} value={value} placeholder={'Odaberi'} className={styles.numberInputField} min="0" onChange={(e) => onChange(e.currentTarget.value)}>
        </input>
    )
}

export default NumberInputField