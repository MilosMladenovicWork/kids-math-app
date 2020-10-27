import React, {useState, useEffect} from 'react'

import styles from './select-field.module.scss'

const SelectField = ({name, onChange, options, extendTop, value, text}) => {

    const [selectFieldClicked, setSelectFieldClicked] = useState(false)

    return(
                
        <div name={name} className={`${styles.selectField}  ${selectFieldClicked && styles.selectFieldExtended}`} onClick={() => setSelectFieldClicked(prevState => !prevState)}>
            <div className={styles.selectedValue}>
                {text ? text : <span className={styles.placeholder}>Odaberi</span>}
            </div>
            <div className={`${styles.options} ${extendTop ? styles.appearOnTop : styles.appearOnBottom}`}>
                {options.map((option, index) => {
                    return <div className={styles.option} key={index} onClick={() => onChange({value:option.value, text: option.text})}>
                        {option.text}
                    </div>
                })}
            </div>
        </div>
    )
}

export default SelectField