import React from 'react'

import styles from './number-appear-container.module.scss'

const NumberAppearContainer = ({children}) => {
    return(
        <div className={styles.numberAppearContainer}>
            {children}
        </div>
    )
}

export default NumberAppearContainer