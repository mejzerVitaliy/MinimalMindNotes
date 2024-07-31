import React from 'react'
import cl from './GeneralPage.module.scss'
import Navbar from '../../UI/Navbar/Navbar'
import FormButton from '../../UI/Button/FormButton'
import { useNavigate } from 'react-router-dom'
import Notes from './Notes/Notes'

const GeneralPage:React.FC = () => {
    const navigate = useNavigate()

    const addNote = () => {
        navigate('/createNote')
    }


    return (
        <main>
            <Navbar title='MyNotes' />
            
            <Notes />

            <FormButton className={cl.themeSwither}>Dark/Light</FormButton>

            <FormButton className={cl.addNote} onClick={addNote}>
                add new note
            </FormButton>
        </main>
    )
}

export default GeneralPage