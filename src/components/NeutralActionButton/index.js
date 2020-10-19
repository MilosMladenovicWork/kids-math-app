import React from 'react'

import styles from './neutral-action-button.module.scss'

const NeutralActionButton = ({children, onClick, disabled}) => {
    return(
        <button onClick={() => onClick && !disabled && onClick()} className={`${styles.neutralActionButton} ${disabled && styles.disabled}`}>
            {children}
        </button>
    )
}

export default NeutralActionButton