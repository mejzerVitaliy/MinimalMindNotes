import Cookies from 'js-cookie'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteNoteByID, getAllNotesByID } from '../../../API/NotesFetching'
import { authContext } from '../../context/CreateContext'
import FormButton from '../../UI/Button/FormButton'
import Navbar from '../../UI/Navbar/Navbar'
import Notes from './Notes/Notes'
import { likeNoteByID } from '../../../API/notesServise'

interface NotesTypes{
    title: string
    body: string
    id: number
    liked: boolean
    date: string
}


const GeneralPage: React.FC = () => {
    const navigate = useNavigate()
    const [notesArray, setNotesArray] = useState<NotesTypes[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [sortBy, setSortBy] = useState<string>('Title')
    

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
        await deleteNoteByID(isUserID, currentNoteID)
        await getNotesArray()
    }

    const likeNote = async (noteID: number) => {
        await likeNoteByID(isUserID, noteID)
        await getNotesArray()
    }
     
    const addNote = () => {
        navigate('/createNote')
    }

    const getUserIDfromCookies = useCallback(() => {
        const loggedUser = Cookies.get("userID")
        setIsUserID(loggedUser)
    }, [isUserID])

    const filterAndSearch = (sortBy: string, query: string , notes: NotesTypes[]) => {
        if (notes.length === 0) return null

        if (sortBy === 'Title') {
            if (!query) return notes;
            return notes.filter(note =>
                note.title.toLowerCase().includes(query.toLowerCase())
            ) || []
        } else if (sortBy === 'Body') {
            if (!query) return notes;
            return notes.filter(note =>
                note.body.toLowerCase().includes(query.toLowerCase())
            ) || []
        } else if (sortBy === 'Date') {
            return notes.sort((a, b) => {
                const dateA = new Date(a.date.split('.').reverse().join('-'));
                const dateB = new Date(b.date.split('.').reverse().join('-'));
                return  dateB.getTime() - dateA.getTime() 
            });
        } else if (sortBy === 'Liked') {
            return notes.filter(note => note.liked === true) || notes
        }
        return notes
    }


    const handleChangeSearcher = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSearchQuery(e.target.value)
        localStorage.setItem('searchQuery', e.target.value)
    }

    const handleChangeSorter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        console.log(sortBy);
    };

    const filteredNotes = filterAndSearch(sortBy, searchQuery, notesArray) || null 

    useEffect(() => {
        getUserIDfromCookies()
        getNotesArray();
    }, [isUserID, notesArray.length, sortBy])
    
    useEffect(() => {
        setSearchQuery(localStorage.getItem('searchQuery') || '')
    }, [])

    useEffect(() => {
        setSortBy(sortBy)
        filterAndSearch(sortBy, searchQuery, notesArray)
    }, [sortBy])
    
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');    
        const isDarkTheme = savedTheme === 'dark';
        document.body.classList.toggle('dark', isDarkTheme);
    }, []);

    return (
        
        <main className=' w-full'>
            <Navbar title='MyNotes' />

            <section className='flex justify-center w-full'>
                <Notes
                    likeNote={likeNote}
                    searchValue={searchQuery}
                    onChange={handleChangeSearcher}
                    notesArray={filteredNotes}
                    deleteNote={deleteNote}
                    onChangeSorter={handleChangeSorter}
                    className=" flex flex-col  justify-center items-center my-[100px] lg:my-[130px] mb-[50px] w-[85%] sm:w-[75%] xl:w-3/5 "
                />
            </section>
        
            <FormButton
                className="w-[50px] h-[50px] z-[1000] rounded-full border-none fixed right-4 bottom-4 xl:right-7 xl:bottom-7 transition-[width,height,padding] duration-[0.5s] ease-in-out bg-[#888] text-center cursor-pointer flex justify-center items-center lg:hover:w-[150px] lg:hover:py-[10px] lg:hover:px-[20px] group "
                onClick={addNote}
            >
                <span className="text-[30px] m-0 transition-transform duration-[1s] ease-in-out group-hover:rotate-180 group-hover:text-left">+</span>
                <span className=" whitespace-nowrap transition-opacity duration-[1s] ease-in-out ml-[4px] hidden lg:group-hover:inline">
                    Add Note
                </span>

            </FormButton>
            
        </main>
    )
}
export default GeneralPage