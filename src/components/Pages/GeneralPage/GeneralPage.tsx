import Cookies from 'js-cookie'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteNoteByID, getAllNotesByID } from '../../../API/NotesFetching'
import { authContext } from '../../context/CreateContext'
import FormButton from '../../UI/Button/FormButton'
import Navbar from '../../UI/Navbar/Navbar'
import cl from './GeneralPage.module.scss'
import Notes from './Notes/Notes'

interface NotesTypes{
    title: string
    body: string
    id: number
}


const GeneralPage: React.FC = () => {
    const navigate = useNavigate()
    const [notesArray, setNotesArray] = useState<NotesTypes[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')

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


    

    const searching = (query: string, notes: NotesTypes[]) => {
        if (!query) return notes;
        return notes.filter(note =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.body.toLowerCase().includes(query.toLowerCase())
        )
    }
    

    const handleChangeSearcher = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSearchQuery(e.target.value)
        localStorage.setItem('searchQuery', e.target.value)
    }

    
    
    const filteredNotes = searching(searchQuery, notesArray)

    useEffect(() => {
        getUserIDfromCookies()
        getNotesArray();
        
    }, [isUserID, notesArray.length])
    
    useEffect(() => {
        setSearchQuery(localStorage.getItem('searchQuery') || '')
    }, [])

    return (
        <main>
            <Navbar title='MyNotes' />

            <section className={cl.notes}>
                <Notes value={searchQuery} onChange={handleChangeSearcher} notesArray={filteredNotes} deleteNote={deleteNote}/>
            </section>
        
            <FormButton className={cl.themeSwither}>Dark/Light</FormButton>

            <FormButton className={cl.addNote} onClick={addNote}>
                <span className={cl.plusIcon}>+</span>
                <span className={cl.addNoteText}>Add Note</span>
            </FormButton>
        </main>
    )
}

export default GeneralPage