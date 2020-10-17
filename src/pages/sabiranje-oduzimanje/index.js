import React from 'react'
import {useSelector} from 'react-redux'

const SabiranjeOduzimanjePage = () => {

    const data = useSelector(state => state)

    return(
        <main>
            <h3>Broj preostalih zadataka {data.numberOfTasksPerGame - 1}</h3>
        </main>
    )
}

export default SabiranjeOduzimanjePage