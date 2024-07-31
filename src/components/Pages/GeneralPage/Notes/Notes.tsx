import React, { useContext, useEffect, useState } from 'react';
import { deleteNoteByID, getAllNotesByID } from '../../../../API/NotesFetching';
import { authContext } from '../../../context/CreateContext';
import cl from './Notes.module.scss';
import FormButton from '../../../UI/Button/FormButton';


const Notes: React.FC = () => {
    const [notesArray, setNotesArray] = useState<any[]>([])
    
    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    };
    
    const { isUserID } = useAuthCtx();

    const getNotesArray = async () => {
        const notesArray = await getAllNotesByID(isUserID)
        setNotesArray(notesArray || [])
        
        return notesArray
    }


    const deleteNote = async (noteID: number) => {
        const currentNoteID = noteID
        console.log(noteID);
        await deleteNoteByID(isUserID, currentNoteID)
        await getNotesArray()
    }

    useEffect(() => {
        getNotesArray()
    }, [])
    
    return (
        <ul className={cl.notes}>
            {notesArray.map(note => (
                <li key={note.id} className={cl.note}>
                    <h1>{note.title}</h1>
                    <FormButton onClick={() => deleteNote(note.id)}>delete note</FormButton>
                </li>
            ))}
        </ul>
    )
}

export default Notes