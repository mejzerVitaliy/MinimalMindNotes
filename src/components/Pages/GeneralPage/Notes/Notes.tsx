import React from 'react';
import FormButton from '../../../UI/Button/FormButton';
import cl from './Notes.module.scss';

interface NotesPropsArray{
    notesArray: any[],
    deleteNote: (value: number) => void
}

const Notes: React.FC<NotesPropsArray> = ({notesArray, deleteNote}) => {

    return (
        <ul className={cl.notes}>
            {
            notesArray.length
                ? notesArray.map(note => (
                    <li key={note.id} className={cl.note}>
                        <h1>{note.title}</h1>
                        <FormButton onClick={() => deleteNote(note.id)}>delete note</FormButton>
                    </li>
                )).reverse()
                : <h1 className={cl.haveNotNotes}> you don't have any notes yet </h1>
            }
        </ul>
    )
}

export default Notes