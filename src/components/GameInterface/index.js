import React,{useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { navigate, Link } from 'gatsby'

import NumberAppearContainer from '../../components/NumberAppearContainer'
import PrimaryButton from '../../components/PrimaryButton'
import styles from './game-interface.module.scss'
import Label from '../../components/Label'
import NumberInputField from '../../components/NumberInputField'
import AppearAndDisappearContainer from '../../components/AppearAndDisappearContainer'
import OpacityChangeContainer from '../../components/OpacityChangeContainer'
import NeutralActionButton from '../../components/NeutralActionButton'
import backArrowImg from '../../img/back-arrow.svg'
import CountSticker from '../../components/CountSticker'
import numberAppearSound from '../../sounds/switch.wav'
import successSound from '../../sounds/success.wav'
import AudioProxy from '../../utils/AudioProxy'

const GameInterface = ({createNumArray}) => {
    const [audio] = useState(new AudioProxy(numberAppearSound));
    const [correctAnswerAudio] = useState(new AudioProxy(successSound));
    const [resultInput, setResultInput] = useState('')
    const [gameStarted, setGameStarted] = useState(false)
    const [computedResult, setComputedResult] = useState(undefined)
    const [activeNumIndex, setActiveNumIndex] = useState(0)
    const [numbersAppeared, setNumbersAppeared] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState(undefined)
    const [currentTask, setCurrentTask] = useState(0)
    const [finishedGame, setFinishedGame] = useState(false)
    const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState(0)
    const [numOfIncorrectAnswers, setNumOfIncorrectAnswers] = useState(0)

    const [numbers, setNumbers] = useState([])

    const data = useSelector(state => state)

    useEffect(() => {
        createNumArray(setNumbers, setComputedResult)
        if(gameStarted){
            audio.currentTime = 0.05
            audio.play()
            setCurrentTask(prevState => {
                return prevState + 1
            })
        }
    }, [gameStarted])

    const changeActiveNumIndex = () =>{
        return setInterval(() => {
            if(!numbersAppeared){
                audio.currentTime = 0.05
                audio.play()
                setActiveNumIndex((prevState) => {
                    return prevState + 1
                })
            }
        }, data.speed)
    }

    useEffect(() => {
        if(activeNumIndex >= data.numberOfNumbersPerTask){
            setNumbersAppeared(true)
            audio.pause()
        }
    }, [activeNumIndex])

    useEffect(() => {
        if(gameStarted && !numbersAppeared){
            var interval = changeActiveNumIndex()
        }

        return () => clearInterval(interval)
    }, [gameStarted, numbersAppeared])

    useEffect(() => {
        if(!(data.typeOfGame && data.numberOfCharactersPerNumber && data.numberOfNumbersPerTask && data.numberOfTasksPerGame && data.speed)){
            navigate('/')
        }
    }, [])
    
    const checkResult = () => {
        setCorrectAnswer(computedResult == resultInput)
        if(computedResult == resultInput){
            correctAnswerAudio.play()
            setNumOfCorrectAnswers(prevState => prevState + 1)
        }else{
            setNumOfIncorrectAnswers(prevState => prevState + 1)
        }
        setGameStarted(false)
        setNumbersAppeared(false)
        setActiveNumIndex(0)
        setResultInput('')
    }
    
    useEffect(() => {
        setTimeout(() => {
            setCorrectAnswer(undefined)
        }, 2000)
    }, [correctAnswer])
    
    useEffect(() => {
        if(currentTask == data.numberOfTasksPerGame && correctAnswer != undefined){
            setTimeout(() => {
                correctAnswerAudio.play()
                setFinishedGame(true)
            }, 2000)
        }
    }, [currentTask, correctAnswer])

    return(
        <React.Fragment>
            <nav className={styles.gameNavigation}>
                <NeutralActionButton onClick={() => navigate('/')}>
                    <img src={backArrowImg} alt='go back'/>
                </NeutralActionButton>
            </nav>
            <div className={styles.nextTaskButton}>
                <NeutralActionButton disabled={gameStarted || finishedGame ? true : false} onClick={() => !gameStarted && setGameStarted(prevState => !prevState)}>
                    {
                        currentTask == 0 ?
                        'POČNI'
                        :
                        'SLEDEĆI'
                    }
                </NeutralActionButton>
            </div>
            <NumberAppearContainer>
                <div className={styles.blankArea}>
                    {
                        numbers && gameStarted &&
                        <OpacityChangeContainer key={activeNumIndex}>
                            {numbers[activeNumIndex]}
                        </OpacityChangeContainer>
                    }
                    {
                        !gameStarted && correctAnswer != undefined && (correctAnswer ? 
                            <AppearAndDisappearContainer key={'Correct'}>TAČNO</AppearAndDisappearContainer>
                            :
                            <AppearAndDisappearContainer key={'Incorrect'}>NETAČNO</AppearAndDisappearContainer>
                        )
                    }
                    {
                        finishedGame && <AppearAndDisappearContainer>
                            KRAJ VEŽBE
                        </AppearAndDisappearContainer>
                    }
                </div>
                <div className={styles.resultBar}>
                    <Label text='Rezultat' row>
                        <NumberInputField value={resultInput} onChange={(value) => setResultInput(value)}/>
                    </Label>
                    <PrimaryButton onClick={() => checkResult()} disabled={numbersAppeared ? false : true}>
                        UNESI
                    </PrimaryButton>
                </div>
            </NumberAppearContainer>
            <div className={`${styles.row} ${styles.answerStatus}`}>
                <CountSticker count={numOfCorrectAnswers}>
                    <div className={styles.correctAnswerCounter}>
                        <svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Checkmark Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M352 176L217.6 336 160 272'/></svg>
                    </div>
                </CountSticker>
                <CountSticker count={numOfIncorrectAnswers}>
                    <div className={styles.wrongAnswerCounter}>
                        <svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M320 320L192 192M192 320l128-128'/></svg>
                    </div>
                </CountSticker>
            </div>
        </React.Fragment>
    )
}

export default GameInterface