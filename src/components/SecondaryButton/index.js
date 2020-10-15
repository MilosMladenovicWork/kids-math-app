import React from 'react'

import styles from './secondary-button.module.scss'

const SecondaryButton = ({children, onClick}) => {
    return(
        <button onClick={() => onClick && onClick()} className={styles.secondaryButton}>
            {children}
        </button>
    )
}

export default SecondaryButton