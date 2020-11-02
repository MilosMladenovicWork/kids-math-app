import React, {useState} from 'react'

import styles from './index.module.scss'
import Label from '../components/Label'
import SelectField from '../components/SelectField'
import NumberInputField from '../components/NumberInputField'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import { navigate } from 'gatsby'
import BackgroundCanvas from '../components/BackgroundCanvas'
import {useDispatch, useSelector} from 'react-redux'

const BackgroundCanvasMemo = React.memo((props) => {
    return <BackgroundCanvas />
})

const IndexPage = () => {

    const dispatch = useDispatch()

    let typeOfGame = useSelector(state => state.typeOfGame)
    let numberOfCharactersPerNumber = useSelector(state => state.numberOfCharactersPerNumber)
    let numberOfNumbersPerTask = useSelector(state => state.numberOfNumbersPerTask)
    let numberOfTasksPerGame = useSelector(state => state.numberOfTasksPerGame)
    let speed = useSelector(state => state.speed)

    const setTypeOfGame = (value) => {
        dispatch({type:'NEW_VALUE_FOR_TYPE_OF_GAME', payload: value})
    }

    const setNumberOfCharactersPerNumber = (value) => {
        dispatch({type: 'NEW_VALUE_FOR_NUMBER_OF_CHARACTERS_PER_NUMBER', payload: value})
    }

    const setNumberOfNumbersPerTask = (value) => {
        dispatch({type: 'NEW_VALUE_FOR_NUMBER_OF_NUMBERS_PER_TASK', payload: value})
    }

    const setNumberOfTasksPerGame = (value) => {
        dispatch({type: 'NEW_VALUE_FOR_NUMBER_OF_TASKS_PER_GAME', payload: value})
    }

    const setSpeed = (value) => {
        dispatch({type: 'NEW_VALUE_FOR_SPEED', payload: value})
    } 

    const cancelInputs = () => {
        setTypeOfGame('')
        setNumberOfCharactersPerNumber('')
        setNumberOfNumbersPerTask('')
        setNumberOfTasksPerGame('')
        setSpeed('')
    }

    const confirmInputs = () => {
        if(fieldsFilled()){
            navigate(`/${typeOfGame.value}`)
        }
    }

    const fieldsFilled = () => {
        return typeOfGame && numberOfCharactersPerNumber && numberOfNumbersPerTask && numberOfTasksPerGame && speed
    }

    return(
        <main className={styles.verticallyCentered}>
            <div className={styles.background}>
                {typeof window != 'undefined' &&
                    <BackgroundCanvasMemo/>
                }
            </div>
            <div className={styles.slimContainer}>
                <div className={styles.centeredItems}>
                    <h1 className={styles.mainHeading}>Kreiraj novi zadatak</h1>
                    <Label text={'Tip zadatka'}>
                        <SelectField value={typeOfGame.value} text={typeOfGame.text} onChange={(value) => setTypeOfGame(value)} options={[
                            {
                                value: 'sabiranje-oduzimanje',
                                text: 'Sabiranje Oduzimanje'
                            },
                            {
                                value: 'abakus-racunanje',
                                text: 'Abakus Racunanje' 
                            }
                        ]}/>
                    </Label>
                    <div className={styles.rowContainer}>
                        <Label text={'Broj cifara'}>
                            <NumberInputField value={numberOfCharactersPerNumber} onChange={(value) => setNumberOfCharactersPerNumber(value)}/>
                        </Label>
                        <Label text={'Brojeva po zadatku'}>
                            <NumberInputField value={numberOfNumbersPerTask} onChange={(value) => setNumberOfNumbersPerTask(value)}/>
                        </Label>
                    </div>
                    <div className={styles.rowContainer}>
                        <Label text={'Broj zadataka'}>
                            <NumberInputField value={numberOfTasksPerGame} onChange={(value) => setNumberOfTasksPerGame(value)}/>
                        </Label>
                        <Label text={'Brzina'}>
                            <NumberInputField value={speed} onChange={(value) => setSpeed(value)}/>
                        </Label>
                    </div>
                    <div className={styles.rowContainer}>
                        <SecondaryButton onClick={() => {
                            cancelInputs()
                        }}>
                            OTKAŽI
                        </SecondaryButton>
                        <PrimaryButton onClick={() => {
                            confirmInputs()
                        }}>
                            POČNI
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default IndexPage