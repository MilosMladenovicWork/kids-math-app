import React from 'react'

import styles from './background.module.scss'

const Background = ({img}) => {
    return (
        <img className={styles.backgroundImg} src={img} alt=''/>
    )
}

export default Background