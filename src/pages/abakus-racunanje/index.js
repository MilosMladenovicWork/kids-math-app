import React from 'react'
import {useSelector} from 'react-redux'

import styles from './abakus-racunanje.module.scss'
import GameInterface from '../../components/GameInterface'
import numberOne from '../../img/number-one.png'
import numberTwo from '../../img/number-two.png'
import numberTen from '../../img/number-ten.jpg'

const numbers = [
    {
        number:1,
        img:numberOne
    },
    {
        number:2,
        img:numberTwo
    },
    {
        number:10,
        img:numberTen
    }
]

const AbakusRacunanjePage = () => {

    const data = useSelector(state => state)

    const createNumArray = (setNumbers, setComputedResult) => {
        let maxNum = 10 ** data.numberOfCharactersPerNumber
        let minNum = -(10 ** data.numberOfCharactersPerNumber) + 1
        
        let selectedDigitNumbers = numbers.filter(number => {
            
            if((number.number >= minNum && number.number < maxNum)){
                return number
            }
        })
        let interval = selectedDigitNumbers.length

        let numArray = []
        let imgArray = []

        for(let i = 0; i < data.numberOfNumbersPerTask; i++){
            let randomNum = Math.floor(Math.random() * interval)
        
            let randomNumFromNumbers = selectedDigitNumbers[randomNum].number
            let randomImageFromNumbers = selectedDigitNumbers[randomNum].img
            
            let positiveResultTillNow = numArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0) + randomNum >= 0

            if(positiveResultTillNow){
                numArray.push(randomNumFromNumbers)
                imgArray.push(<img className={styles.numImage} src={randomImageFromNumbers} alt=''/>)
            }else{
                i-=1
            }
        }
        let positiveResult = numArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0) >= 0

        if(positiveResult){
            setNumbers(imgArray)
            setComputedResult(numArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
        }else{
            createNumArray(setNumbers, setComputedResult)
        }
    }

    return(
        <main>
            <div className={styles.invisiblePreloadImages}>
                {numbers.map(number => <img src={number.img} alt=''/>)}
            </div>
            <GameInterface createNumArray={createNumArray}/>
        </main>
    )
}

export default AbakusRacunanjePage