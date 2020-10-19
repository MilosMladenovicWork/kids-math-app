import React from 'react'

import styles from './count-sticker.module.scss'

const CountSticker = ({children, count}) => {
    return(
        <div className={styles.countSticker}>
            {children}
            <span className={styles.count}>
                {count}
            </span>
        </div>
    )
}

export default CountSticker