import React from 'react'

import styles from './primary-button.module.scss'

const PrimaryButton = ({children, onClick}) => {
    return(
        <button onClick={() => onClick && onClick()} className={styles.primaryButton}>
            {children}
        </button>
    )
}

export default PrimaryButton