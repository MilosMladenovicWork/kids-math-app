import React from 'react'

import styles from './label.module.scss'

const Label = ({children, text, row}) => {
    return(
        <label className={`${styles.label} ${row && styles.row}`}>
            <span>
                {text}
            </span>
            {children}
        </label>
    )
}

export default Label