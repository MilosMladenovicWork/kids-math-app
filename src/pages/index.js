import React, {useState} from 'react'

import styles from './index.module.scss'
import Label from '../components/Label'
import SelectField from '../components/SelectField'
import NumberInputField from '../components/NumberInputField'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import { navigate } from 'gatsby'
import BackgroundCanvas from '../components/BackgroundCanvas'

const BackgroundCanvasMemo = React.memo((props) => {
    return <BackgroundCanvas />
})

const IndexPage = () => {

    const [typeOfGame, setTypeOfGame] = useState('')
    const [numberOfCharactersInNumber, setNumberOfCharactersInNumber] = useState()
    const [numberOfNumbersPerTask, setNumberOfNumbersPerTask] = useState('')
    const [numberOfTasksPerGame, setNumberOfTasksPerGame] = useState('')
    const [speed, setSpeed] = useState('')

    const cancelInputs = () => {
        setTypeOfGame('')
        setNumberOfCharactersInNumber('')
        setNumberOfNumbersPerTask('')
        setNumberOfTasksPerGame('')
        setSpeed('')
    }

    console.log(typeOfGame ,numberOfCharactersInNumber, numberOfNumbersPerTask, numberOfTasksPerGame,speed)

    const confirmInputs = () => {
        if(fieldsFilled()){
            navigate('/google')
        }
    }

    const fieldsFilled = () => {
        return typeOfGame && numberOfCharactersInNumber && numberOfNumbersPerTask && numberOfTasksPerGame && speed
    }

    return(
        <main>
            <div className={styles.background}>
                {typeof window != 'undefined' &&
                    <BackgroundCanvasMemo/>
                }
            </div>
            <div className={styles.slimContainer}>
                <div className={styles.centeredItems}>
                    <h1 className={styles.mainHeading}>Kreiraj novi zadatak</h1>
                    <Label text={'Tip zadatka'}>
                        <SelectField value={typeOfGame} onChange={(value) => setTypeOfGame(value)} options={[
                            {
                                value: 'sabiranjeOduzimanje',
                                text: 'Sabiranje Oduzimanje'
                            },
                            {
                                value: 'abakusRacunanje',
                                text: 'Abakus Racunanje' 
                            }
                        ]}/>
                    </Label>
                    <div className={styles.rowContainer}>
                        <Label text={'Broj cifara'}>
                            <NumberInputField value={numberOfCharactersInNumber} onChange={(value) => setNumberOfCharactersInNumber(value)}/>
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