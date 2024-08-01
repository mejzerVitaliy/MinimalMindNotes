import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { deleteNoteByID, getAllNotesByID } from '../../../../API/NotesFetching';
import { authContext } from '../../../context/CreateContext';
import FormButton from '../../../UI/Button/FormButton';
import cl from './Notes.module.scss';

const Notes: React.FC = () => {
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
        const getNotesArray = await getAllNotesByID(isUserID)
        setNotesArray(getNotesArray)
        
        return notesArray
    }


    const deleteNote = async (noteID: number) => {
        const currentNoteID = noteID
        console.log(noteID);
        await deleteNoteByID(isUserID, currentNoteID)
        await getNotesArray()
    }

    useEffect(() => {
        const loggedUser = Cookies.get("userID")
        console.log(loggedUser)

        setIsUserID(loggedUser)
        
        
    }, [isUserID])

    useEffect(() => {
        getNotesArray();
    }, [notesArray.length])


    return (
        <ul className={cl.notes}>
            {
            notesArray.length
                ? notesArray.reverse().map(note => (
                    <li key={note.id} className={cl.note}>
                        <h1>{note.title}</h1>
                        <FormButton onClick={() => deleteNote(note.id)}>delete note</FormButton>
                    </li>
                ))
                : <h1 className={cl.haveNotNotes}> you don't have any notes yet </h1>
            }
        </ul>
    )
}

export default Notes