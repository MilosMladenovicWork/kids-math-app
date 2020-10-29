import React, {useState, useEffect} from 'react'
import {navigate} from 'gatsby'
import {useDispatch, useSelector} from 'react-redux'

import styles from './log-in.module.scss'
import TextInputField from '../../components/TextInputField'
import PasswordInputField from '../../components/PasswordInputField'
import PrimaryButton from '../../components/PrimaryButton'

const LogInPage = () => {

    const dispatch = useDispatch()
    const data = useSelector(state => state)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submiting, setSubmiting] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [successMessage, setSuccessMessage] = useState(undefined)

    useEffect(() => {
        if(data.authenticatedUser){
          navigate('/')
        }
      }, [data.authenticatedUser])

    const submitCredentials = (e) => {
        e.preventDefault()
        setErrorMessage('')
        setSuccessMessage('')
        if (
          !username ||
          !password
        ) {
          setErrorMessage('Popunite prazna polja!')
        } else {
          setErrorMessage(undefined)
          setSubmiting(true)
          fetch(
            `/.netlify/functions/authentication?username=${username}&pass=${password}`,
            {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                }, 
              method: 'POST'
            }
          )
          .then((response) => response.json())
            .then((data) => {
              setSubmiting(false)
              if (data.status == 'success') {
                dispatch({type:'AUTHENTICATED'})
                return setSuccessMessage(data.message)
              } else if (data.status == 'error') {
                return setErrorMessage(data.message)
              }
            })
            .catch((error) => {
              setSubmiting(false)
              setErrorMessage(
                'Došlo je do greške na našim serverima, pokušajte kasnije!'
              )
            })
        }
    }

    return(
        <main>
            <form className={styles.logInForm}>
                <h1>Prijavite Se</h1>
                <div>
                    <div className={styles.input}>
                        <TextInputField autocomplete placeholder='Korisničko ime' onChange={setUsername}/>
                    </div>
                    <div className={styles.input}>
                        <PasswordInputField autocomplete  placeholder='Šifra' onChange={setPassword}/>
                    </div>
                </div>
                {
                    successMessage || errorMessage &&
                    <p className={styles.status}>
                        {successMessage || errorMessage}
                    </p>
                }
                <PrimaryButton disabled={submiting} onClick={(e) => submitCredentials(e)}>
                    Potvrdi
                </PrimaryButton>
            </form>
        </main>
    )
}

export default LogInPage