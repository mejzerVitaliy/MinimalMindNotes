import React from 'react'
import cl from './GeneralPage.module.scss'
import Navbar from '../../UI/Navbar/Navbar'
import FormButton from '../../UI/Button/FormButton'
import { useNavigate } from 'react-router-dom'

const GeneralPage:React.FC = () => {
    const navigate = useNavigate()

    const addNote = () => {
        navigate('/createNote')
    }


    return (
        <>
            <Navbar title='MyNotes' />

            <FormButton className={cl.themeSwither}>Dark/Light</FormButton>

            <FormButton className={cl.addNote} onClick={addNote}>
                add new note
            </FormButton>
        </>
    )
}

export default GeneralPage