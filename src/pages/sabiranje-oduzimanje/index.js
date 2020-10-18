import React,{useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

import NumberAppearContainer from '../../components/NumberAppearContainer'
import PrimaryButton from '../../components/PrimaryButton'
import styles from './sabiranje-oduzimanje.module.scss'
import Label from '../../components/Label'
import NumberInputField from '../../components/NumberInputField'
import { navigate } from 'gatsby'

const SabiranjeOduzimanjePage = () => {
    
    const [resultInput, setResultInput] = useState('')
    const [startGame, setStartGame] = useState(false)
    const [computedResult, setComputedResult] = useState(undefined)
    const [activeNumIndex, setActiveNumIndex] = useState(0)


    const [numbers, setNumbers] = useState([])

    const data = useSelector(state => state)

    useEffect(() => {
        createNumArray()
    }, [])

    const changeActiveNumIndex = () =>{
        return setInterval(() => {
            setActiveNumIndex((prevState) => {
                return prevState + 1
            })
        }, data.speed)
    }

    useEffect(() => {
        if(startGame){
            var interval = changeActiveNumIndex()
        }

        return () => clearInterval(interval)
    }, [startGame])

    const createNumArray = () => {
        let maxNum = 10 ** data.numberOfCharactersPerNumber
        let minNum = -(10 ** data.numberOfCharactersPerNumber) + 1
        let interval = maxNum - minNum

        let numArray = []

        for(let i = 0; i < data.numberOfNumbersPerTask; i++){

            let randomNum = Math.floor(Math.random() * interval) + minNum
            
            numArray.push(randomNum)
        }

        let positiveResult = numArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0) >= 0

        console.log(numArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
        if(positiveResult){
            setNumbers(numArray)
            setComputedResult(numArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
        }else{
            createNumArray()
        }
    }

    useEffect(() => {
        if(!(data.typeOfGame && data.numberOfCharactersPerNumber && data.numberOfNumbersPerTask && data.numberOfTasksPerGame && data.speed)){
            navigate('/')
        }
    }, [])

    return(
        <main>
            <div className={styles.nextTaskButton}>
                <PrimaryButton onClick={() => setStartGame(prevState => !prevState)}>
                    SLEDEĆI
                </PrimaryButton>
            </div>
            <NumberAppearContainer>
                <div className={styles.blankArea}>
                    {numbers && startGame &&
                        numbers[activeNumIndex]
                    }
                </div>
                <div className={styles.resultBar}>
                    <Label text='Rezultat' row>
                        <NumberInputField value={resultInput} onChange={(value) => setResultInput(value)}/>
                    </Label>
                    <PrimaryButton>
                        UNESI
                    </PrimaryButton>
                </div>
            </NumberAppearContainer>
        </main>
    )
}

export default SabiranjeOduzimanjePage