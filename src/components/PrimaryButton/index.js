import React from 'react'

import styles from './primary-button.module.scss'

const PrimaryButton = ({children, onClick, disabled}) => {
    return(
        <button onClick={(e) => onClick && !disabled && onClick(e)} className={`${styles.primaryButton} ${disabled && styles.disabled}`}>
            {children}
        </button>
    )
}

export default PrimaryButton