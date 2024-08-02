import Cookies from 'js-cookie'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteNoteByID, getAllNotesByID } from '../../../API/NotesFetching'
import { authContext } from '../../context/CreateContext'
import FormButton from '../../UI/Button/FormButton'
import Navbar from '../../UI/Navbar/Navbar'
import cl from './GeneralPage.module.scss'
import Notes from './Notes/Notes'

const GeneralPage:React.FC = () => {
    const navigate = useNavigate()
    const [notesArray, setNotesArray] = useState<any[]>([])

    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    };
    const { isUserID, setIsUserID } = useAuthCtx();

    const getNotesArray = async () => {
        const notes = await getAllNotesByID(isUserID)
        setNotesArray(notes)
        
        return notesArray
    }

    const deleteNote = async (noteID: number) => {
        const currentNoteID = noteID
        console.log(noteID);
        await deleteNoteByID(isUserID, currentNoteID)
        await getNotesArray()
    }
     
    const addNote = () => {
        navigate('/createNote')
    }

    const getUserIDfromCookies = useCallback(() => {
        const loggedUser = Cookies.get("userID")
        setIsUserID(loggedUser)
    }, [isUserID])

    useEffect(() => {
        getUserIDfromCookies()
        getNotesArray();
        
    }, [ isUserID, notesArray.length])

    return (
        <main>
            <Navbar title='MyNotes' />
            
            <Notes notesArray={notesArray} deleteNote={deleteNote}/>

            <FormButton className={cl.themeSwither}>Dark/Light</FormButton>

            <FormButton className={cl.addNote} onClick={addNote}>
                add new note
            </FormButton>
        </main>
    )
}

export default GeneralPage