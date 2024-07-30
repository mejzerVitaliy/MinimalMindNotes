import React, { useContext } from 'react'
import cl from './GeneralPage.module.scss'
import Navbar from '../../UI/Navbar/Navbar'
import FormButton from '../../UI/Button/FormButton'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../context/CreateContext'
import { getAllNotesByID } from '../../../API/NotesFetching'
// import { getAllNotesByID } from '../../../API/NotesFetching'

const GeneralPage:React.FC = () => {
    const navigate = useNavigate()

    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    };
    
    
    
    const { isUserID } = useAuthCtx();


    const notesArray = getAllNotesByID(isUserID)

    const addNote = () => {
        navigate('/createNote')
        console.log(notesArray);
    }

    


    return (
        <main>
            <Navbar title='MyNotes' />
            
            <FormButton className={cl.themeSwither}>Dark/Light</FormButton>

            <FormButton className={cl.addNote} onClick={addNote}>
                add new note
            </FormButton>
        </main>
    )
}

export default GeneralPage