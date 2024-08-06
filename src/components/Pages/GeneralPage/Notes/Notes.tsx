import React, { useState } from 'react';
import FormButton from '../../../UI/Button/FormButton';
import cl from './Notes.module.scss';
import Modal from '../../../UI/ModalWindow/Modal';
import Searcher from '../../../UI/Searcher/Searcher';

interface NotesTypes{
    title: string
    body: string
    id: number
}


interface NotesPropsArray{
    notesArray: NotesTypes[] | null,
    deleteNote: (value: number) => void
    onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void
    value: string
}



const Notes: React.FC<NotesPropsArray> = ({ notesArray, deleteNote, onChange, value }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [noteIdToDelete, setNoteIdToDelete] = useState<number>(0);

    const modalOpening = (id: number) => {
        setIsModalOpen(true)
        setNoteIdToDelete(id)
    }

    const cancelModal = () => {
        setIsModalOpen(false)
        setNoteIdToDelete(0)
    }

    // useEffect(() => {
    //     const getSearchQuery = localStorage.getItem('searchQuery') || ''

    //     setSearchQuery(getSearchQuery)
    // }, [searchQuery])

    return (
        <main className={cl.notes}>
            <Searcher value={value} onChange={onChange}></Searcher>
    
            {!notesArray || notesArray.length === 0 ? (
                <h1 className={cl.haveNotNotes}>No such notes found</h1>
            ) : (
                <ul>
                    {notesArray.map(note => (
                        <li key={note.id} className={cl.note} data-aos="zoom-in">
                            <h1>{note.title}</h1>
                            <FormButton onClick={() => modalOpening(note.id)} className={cl.removeBtn}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="28px"
                                    height="28px"
                                    fill="#000000">
                                    <path d="M 10 2 L 9 3 L 5 3 C 4.447 3 4 3.447 4 4 L 4 5 C 4 5.553 4.447 6 5 6 L 19 6 C 19.553 6 20 5.553 20 5 L 20 4 C 20 3.447 19.553 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 8 L 19 8 L 18.1875 19.09375 C 18.0745 20.59075 16.82425 21.75 15.3125 21.75 L 8.6875 21.75 C 7.17575 21.75 5.9255 20.59075 5.8125 19.09375 L 5 8 z M 9.5 10.5 C 9.224 10.5 9 10.724 9 11 L 9 18 C 9 18.276 9.224 18.5 9.5 18.5 C 9.776 18.5 10 18.276 10 18 L 10 11 C 10 10.724 9.776 10.5 9.5 10.5 z M 14.5 10.5 C 14.224 10.5 14 10.724 14 11 L 14 18 C 14 18.276 14.224 18.5 14.5 18.5 C 14.776 18.5 15 18.276 15 18 L 15 11 C 15 10.724 14.776 10.5 14.5 10.5 z" />
                                </svg>
                            </FormButton>
                        </li>
                    )).reverse()}
                </ul>
            )}
    
            {isModalOpen && (
                <Modal message='Are you sure? The note will be permanently deleted' onClose={cancelModal}>
                    <FormButton className={cl.modalBtns} onClick={cancelModal}>CANCEL</FormButton>
                    <FormButton className={cl.modalBtns} onClick={() => {
                        deleteNote(noteIdToDelete);
                        setIsModalOpen(false)
                    }}>
                        DELETE
                    </FormButton>
                </Modal>
            )}
        </main>
    )
}
export default Notes


