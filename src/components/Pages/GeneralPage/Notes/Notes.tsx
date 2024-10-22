import React, { useState } from 'react';
import FormButton from '../../../UI/Button/FormButton';
import Modal from '../../../UI/ModalWindow/Modal';
import Searcher from '../../../UI/Searcher/Searcher';
import { useNavigate } from 'react-router-dom';

interface NotesTypes{
    title: string
    body: string
    id: number
    liked: boolean
    date: string
    
}
interface NotesPropsArray{
    notesArray: NotesTypes[] | null ,
    deleteNote: (value: number) => void
    likeNote: (value: number) => void
    onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void
    searchValue: string
    onChangeSorter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className: string
}

const Notes: React.FC<NotesPropsArray> = ({ className, notesArray, deleteNote, onChange, searchValue, likeNote, onChangeSorter }) => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [noteIdToDelete, setNoteIdToDelete] = useState<number>(0);
    const currentTheme = localStorage.getItem('theme')

    const modalOpening = (id: number) => {
        setIsModalOpen(true)
        setNoteIdToDelete(id)
    }

    const cancelModal = () => {
        setIsModalOpen(false)
        setNoteIdToDelete(0)
    }

    const toThisNote = (noteID: number) => {
        navigate(`/note/${noteID}`)
    }


    return (
        <main className={className}>
            {notesArray && notesArray.length >= 0 && (
                <Searcher
                    value={searchValue}
                    onChangeSearcher={onChange}
                    onChangeSorter={onChangeSorter}
                    option1="Title"
                    option2="Body"
                    option3="Date"
                    option4="Liked"
                />
            )}

            {!notesArray ? (
                <h1 className="text-center text-gray-400 text-[20px] sm:text-[24px] md:text-[28px] lg:text-[36px] ">You don't have any notes yet</h1>
            ) : notesArray.length === 0 ? (
                <h1 className="text-center text-gray-400 text-[20px] sm:text-[24px] md:text-[28px] lg:text-[36px] ">No notes found for your search query</h1>
            ) : (
                <ul className="list-none w-full">
                    {notesArray.map(note => (
                        <li
                            key={note.id}
                            className="relative flex justify-start items-center cursor-pointer bg-[#2d2d2d] transition-transform p-1 my-2 lg:my-4 h-12 xl:h-20  md:h-14 lg:h-16 z-[100] border-[1px] border-solid border-[#888] rounded-[20px] hover:bg-zinc-700"
                            data-aos="zoom-in"
                            onClick={() => toThisNote(note.id)}
                        >
                            <h1 className='text-[18px] md:text-[24px] lg:text-[30px] xl:text-[36px] ml-3'>{note.title.length > 15 ? `${note.title.slice(0,15)}...` : `${note.title}`}</h1>
                            <p className=' absolute bottom-1 left-2 text-gray-400 text-[10px] md:text-[14px] lg:text-[18px] '>latest changes: <i>{note.date}</i></p>
                            <FormButton
                                className='bg-transparent p0 absolute top-1 right-7 sm:right-8 md:right-12 md:top-2  border-none transition-all cursor-pointer hover:scale-125 '
                                onClick={(e) => {
                                    e.stopPropagation()
                                    likeNote(note.id)
                                }}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className={!note.liked
                                        ? 'fill-none stroke-[2px] stroke-[#888] w-4  h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 '
                                        : ' fill-red-500 stroke-[2px] stroke-red-500 w-4  h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 '
                                    }
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                            </FormButton>
                            
                            <FormButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    modalOpening(note.id);
                                }}
                                className= {currentTheme === 'dark' ? 'p-0 h-4 w-4 sm:w-5 sm:h-5 md:w-7 md:h-7  rounded-full border-none absolute top-1 md:top-2 right-2 transition-transform cursor-pointer hover:scale-125 hover:bg-red-800' : 'p-0 h-4 w-4 sm:w-5 sm:h-5 md:w-7 md:h-7 rounded-full border-none absolute top-1 md:top-2 right-2 transition-transform cursor-pointer hover:scale-125 hover:bg-red-800 bg-slate-400' } 
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="fill-current text-white w-3 h-3 md:w-5 md:h-5"
                                >
                                    <path d="M 10 2 L 9 3 L 5 3 C 4.447 3 4 3.447 4 4 L 4 5 C 4 5.553 4.447 6 5 6 L 19 6 C 19.553 6 20 5.553 20 5 L 20 4 C 20 3.447 19.553 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 8 L 19 8 L 18.1875 19.09375 C 18.0745 20.59075 16.82425 21.75 15.3125 21.75 L 8.6875 21.75 C 7.17575 21.75 5.9255 20.59075 5.8125 19.09375 L 5 8 z M 9.5 10.5 C 9.224 10.5 9 10.724 9 11 L 9 18 C 9 18.276 9.224 18.5 9.5 18.5 C 9.776 18.5 10 18.276 10 18 L 10 11 C 10 10.724 9.776 10.5 9.5 10.5 z M 14.5 10.5 C 14.224 10.5 14 10.724 14 11 L 14 18 C 14 18.276 14.224 18.5 14.5 18.5 C 14.776 18.5 15 18.276 15 18 L 15 11 C 15 10.724 14.776 10.5 14.5 10.5 z" />
                                </svg>
                            
                            </FormButton>
                        </li>
                    )).reverse()}
                </ul>
            )}

            {isModalOpen && (
                <Modal message='Are you sure? The note will be permanently deleted' onClose={cancelModal}>
                    <FormButton className="bg-gray-600 rounded-lg border border-gray-800 transition-transform w-[100px] h-[40px] cursor-pointer hover:scale-125" onClick={cancelModal}>CANCEL</FormButton>
                    <FormButton className="bg-gray-600 rounded-lg border border-gray-800 transition-transform w-[100px] h-[40px] cursor-pointer hover:scale-125" onClick={() => {
                        deleteNote(noteIdToDelete);
                        setIsModalOpen(false);
                    }}>
                        DELETE
                    </FormButton>
                </Modal>
            )}
        </main>
    );
}

export default Notes;


