import React,{useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { navigate, Link } from 'gatsby'
import GameInterface from '../../components/GameInterface'
import Background from '../../components/Background'
import gameBackground from '../../img/game-background.jpg'

const SabiranjeOduzimanjePage = () => {

    const data = useSelector(state => state)

    const createNumArray = (setNumbers, setComputedResult) => {
        let maxNum = 10 ** data.numberOfCharactersPerNumber
        let minNum = -(10 ** data.numberOfCharactersPerNumber) + 1
        let interval = maxNum - minNum

        let numArray = []

        for(let i = 0; i < data.numberOfNumbersPerTask; i++){

            let randomNum = Math.floor(Math.random() * interval) + minNum
            
            let positiveResultTillNow = numArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0) + randomNum >= 0

            if(positiveResultTillNow){
                numArray.push(randomNum)
            }else{
                i-=1
            }
        }

        let positiveResult = numArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0) >= 0

        if(positiveResult){
            setNumbers(numArray)
            setComputedResult(numArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
        }else{
            createNumArray(setNumbers, setComputedResult)
        }
    }

    return(
        <main>
            <Background img={gameBackground}/>
            <GameInterface createNumArray={createNumArray}/>
        </main>
    )
}

export default SabiranjeOduzimanjePage