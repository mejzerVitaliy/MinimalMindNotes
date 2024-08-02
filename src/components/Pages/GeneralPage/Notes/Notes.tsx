import React, { useRef } from 'react';
import FormButton from '../../../UI/Button/FormButton';
import cl from './Notes.module.scss';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

interface NotesPropsArray{
    notesArray: any[],
    deleteNote: (value: number) => void
}

const Notes: React.FC<NotesPropsArray> = ({notesArray, deleteNote}) => {
    const nodeRef = useRef(null);

    return (
        <TransitionGroup>
            <ul className={cl.notes}>
            {
            notesArray.length
                ? notesArray.map(note => (
                    <CSSTransition
                        in={true}
                        key={note.id}
                        timeout={500}
                        classNames={cl.notesAnimation}
                        nodeRef={nodeRef}
                        unmountOnExit
                    >
                        <li key={note.id} ref={nodeRef} className={cl.note}>
                            <h1>{note.title}</h1>
                            <FormButton onClick={() => deleteNote(note.id)} className={cl.removeBtn}>delete note</FormButton>
                        </li>
                    </CSSTransition>
                    
                )).reverse()
                : <h1 className={cl.haveNotNotes}> you don't have any notes yet </h1>
            }
            </ul>
        </TransitionGroup>
        
    )
}
// className={cl.note}
export default Notes