import React from 'react'

import styles from './label.module.scss'

const Label = ({children, text}) => {
    return(
        <label className={styles.label}>
            <span>
                {text}
            </span>
            {children}
        </label>
    )
}

export default Label