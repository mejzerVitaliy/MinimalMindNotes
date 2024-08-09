import Cookies from 'js-cookie'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteNoteByID, getAllNotesByID } from '../../../API/NotesFetching'
import { authContext } from '../../context/CreateContext'
import FormButton from '../../UI/Button/FormButton'
import Navbar from '../../UI/Navbar/Navbar'
import cl from './GeneralPage.module.scss'
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
    const [theme, setTheme] = useState<boolean>(true) 

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
        console.log(notesArray);
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


    // ДОБАВИТЬ ПРОВЕРКУ НА НАЛИЧИЕ ТЕЛА И ТАЙТЛА

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
                return dateA.getTime() - dateB.getTime()
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


    const switchTheme = () => {
        const newTheme = !theme
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme ? 'dark' : 'white')
        document.body.classList.toggle('dark', newTheme)
    }

    const filteredNotes = filterAndSearch(sortBy, searchQuery, notesArray) || null 

    useEffect(() => {
        getUserIDfromCookies()
        getNotesArray();
        console.log(notesArray);
        
        
    }, [isUserID, notesArray.length])
    
    useEffect(() => {
        setSearchQuery(localStorage.getItem('searchQuery') || '')
        const savedTheme = localStorage.getItem('theme')    
        const isDarkTheme = savedTheme === 'dark'
        setTheme(isDarkTheme)
        document.body.classList.toggle('dark', isDarkTheme)
    }, [])

    useEffect(() => {
        setSortBy(sortBy)
        filterAndSearch(sortBy, searchQuery, notesArray)
    }, [sortBy])
    

    return (
        
        <main>
        {}
            <Navbar title='MyNotes' />

            <section className={cl.notes}>
                <Notes
                    likeNote={likeNote}
                    searchValue={searchQuery}
                    onChange={handleChangeSearcher}
                    notesArray={filteredNotes}
                    deleteNote={deleteNote}
                    onChangeSorter={handleChangeSorter}
                />
            </section>
        
            <FormButton
                className="fixed right-[40px] bottom-[40px] w-[50px] h-[50px] rounded-full border-none transition-transform duration-[0.5s] ease-in-out text-center cursor-pointer flex justify-center items-center hover:w-[150px] hover:p-[10px_20px] hover:rounded-[20px]"
                onClick={addNote}
            >
                <span className="text-[30px] transition-transform duration-[1s] ease-in-out opacity-100">+</span>
                <span className="opacity-0 whitespace-nowrap transition-opacity duration-[1s] ease-in-out ml-[4px] hidden hover:inline">
                    Add Note
                </span>
            </FormButton>

            <FormButton
                className="fixed top-[140px] right-[40px] p-0 bg-transparent border-none transition-transform duration-300 cursor-pointer hover:scale-125"
                onClick={switchTheme}
            >
                {theme
                    ? <svg width="34" height="51" viewBox="0 0 34 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M30.5164 0.930043C32.4262 1.28859 33.3811 1.46787 33.5142 2.12895C33.6473 2.79003 32.7259 3.39742 30.8831 4.61219C24.1008 9.08324 19.625 16.7689 19.625 25.5C19.625 34.2311 24.1008 41.9168 30.8831 46.3878C32.7259 47.6026 33.6473 48.21 33.5142 48.8711C33.3811 49.5321 32.4262 49.7114 30.5164 50.07C29.0124 50.3523 27.461 50.5 25.875 50.5C12.0679 50.5 0.875 39.3071 0.875 25.5C0.875 11.6929 12.0679 0.5 25.875 0.5C27.461 0.5 29.0124 0.647681 30.5164 0.930043Z" fill="#888" />
                    </svg>
                    : <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="37.5" cy="37.5" r="12.5" fill="#222222" />
                        <path d="M37.5 15.625V9.375" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                        <path d="M37.5 65.625V59.375" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                        <path d="M52.968 22.0311L57.3875 17.6117" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                        <path d="M17.6128 57.3888L22.0322 52.9694" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                        <path d="M59.375 37.5L65.625 37.5" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                        <path d="M9.375 37.5L15.625 37.5" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                        <path d="M52.968 52.9689L57.3875 57.3883" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                        <path d="M17.6128 17.6112L22.0322 22.0306" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                    </svg>
                }
                
            </FormButton>
        </main>
    )
}

export default GeneralPage