import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../../UI/Navbar/Navbar'
import FormButton from '../../../UI/Button/FormButton'
import { authContext } from '../../../context/CreateContext'
import Cookies from 'js-cookie'
import { getNoteByID } from '../../../../API/NotesFetching'
import { updateUserNote } from '../../../../API/notesServise'
import Modal from '../../../UI/ModalWindow/Modal'
import TextAreas from '../../../UI/TextAreas/TextAreas'

const Note: React.FC = () => {
    const { noteID } = useParams<{ noteID: string }>()
    const noteIdNum = parseInt(noteID || "", 10);
    const navigate = useNavigate()
    const [noteTitle, setNoteTitle] = useState<string | null>()
    const [noteBody, setNoteBody] = useState<string | null>()
    const [noteLiked, setNoteLiked] = useState<boolean>()
    const [note, setNote] = useState({ title: noteTitle, body: noteBody, id: noteIdNum, liked: noteLiked })
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [is2ModalOpen, setIs2ModalOpen] = useState<boolean>(false)
    const currentTheme = localStorage.getItem('theme')

    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    };
    const { setIsUserID, isUserID } = useAuthCtx();
    
    const open2Modal = () => {
        setIs2ModalOpen(true)
    }

    const cancelModal = () => {
        setIs2ModalOpen(false)
    }

    const back = () => {
        navigate('/myNotes')
    }

    const getNoteData = async () => {
        if (!noteIdNum) {
            console.error('noteIdNum undefined');
            return;
        }
        
        const note = await getNoteByID(isUserID, noteIdNum)

        if (note) {
            setNoteTitle(note.title)
            setNoteBody(note.body)
            setNoteLiked(note.liked)
            setNote(note)
        }
    }

    const saveUdatedNotes = () => {
        setIsModalOpen(true)

        setTimeout(async () => {
            setIsModalOpen(false)
            const newNote = {
                ...note,
                date: new Date().toLocaleDateString()
            }

            await updateUserNote(isUserID, newNote, noteIdNum)

            navigate("/myNotes");
        }, 2500)
    }
        
    useEffect(() => {
        const userID = Cookies.get('userID')
        setIsUserID(userID)
    }, [isUserID])
    useEffect(() => {
        getNoteData()

    }, [noteIdNum])
    
    return (
        <section className="flex justify-center items-center">
            <Navbar title={`${noteTitle?.slice(0, 5)}...`} />

            <FormButton
                onClick={note.title===noteTitle && note.body===noteBody
                    ? back
                    : open2Modal  
                }
                className="fixed z-[1000] top-14 md:top-16 lg:top-20 xl:top-24  left-3 xl:left-7 p-0 m-0 bg-transparent border-none cursor-pointer transition-transform duration-200 hover:scale-125"
            >
                <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M7.33337 22L6.62627 21.2929L5.91916 22L6.62627 22.7071L7.33337 22ZM34.8334 23C35.3857 23 35.8334 22.5523 35.8334 22C35.8334 21.4477 35.3857 21 34.8334 21V23ZM17.6263 10.2929L6.62627 21.2929L8.04048 22.7071L19.0405 11.7071L17.6263 10.2929ZM6.62627 22.7071L17.6263 33.7071L19.0405 32.2929L8.04048 21.2929L6.62627 22.7071ZM7.33337 23H34.8334V21H7.33337V23Z"
                    fill={ currentTheme === 'dark' ? "#DDDDDD" : '#000'}
                />
                </svg>
            </FormButton>

            <TextAreas
                className1='flex flex-col justify-center items-center transform mt-[90px] sm:mt-[110px] lg:mt-[130px] w-4/5 sm:w-3/5 xl:w-3/6'
                className2='w-full h-[40px] xl:h-[60px] bg-[#525252] text-center rounded-[12px] border-2 border-[#888] font-inter font-bold text-[22px] sm:text-[24px] lg:text-[28px] xl:text-[32px] text-[#fdfdfd] mb-[20px] p-[16px] break-words whitespace-pre-wrap resize-none placeholder:text-center placeholder:text-[24px] xl:placeholder:text-[30px]'
                className3='w-full h-[300px] xl:h-[400px] bg-[#525252] rounded-[12px] border-2 border-[#888] font-inter font-normal text-[16px] sm:text-[18px] lg:text-[24px] xl:text-[28px] text-[#fdfdfd] p-[16px] break-words whitespace-pre-wrap resize-none scrollbar-width-[12px] scrollbar-thumb-[#888] scrollbar-rounded-[50px] placeholder:text-center placeholder:font-bold placeholder:text-[24px] xl:placeholder:text-[30px]'
                onChange2={(e) => {
                    setNote({
                        ...note, title: e.target.value    
                    })
                    setIs2ModalOpen
                }}
                onChange3={(e) => setNote({ ...note, body: e.target.value })}
                defaultValue2={noteTitle || ''}
                defaultValue3={noteBody || ''}
            />

            <FormButton
                className= { currentTheme === 'dark' ? "fixed bottom-[20px] w-[90%] sm:w-[496px] lg:w-28 xl:w-32 lg:right-6 xl:right-14 xl:bottom-9 h-[40px]  bg-[#525252] rounded-[20px] border-solid border-2 border-[#888] disabled:border-none cursor-pointer transition-transform duration-300 hover:scale-125 disabled:scale-100" : "fixed bottom-[20px] w-[90%] sm:w-[496px] lg:w-28 xl:w-32 lg:right-6 xl:right-14 xl:bottom-9 h-[40px] bg-[#525252] rounded-[20px] border-solid border-2 border-[#888] disabled:border-none cursor-pointer transition-transform duration-300 hover:scale-125 disabled:scale-100 disabled:text-gray-300 text-white"}
                onClick={saveUdatedNotes}
                disabled={(note.title !== noteTitle || note.body !== noteBody) &&
                    (note.body || note.title)
                    ? false
                    : true
                }
            >
                Save changes
            </FormButton>

            {isModalOpen && <Modal
                style={{
                    animation: 'none',
                    height: '80px'
                }}
                message="Note successfully updated!!"
            />}

            {is2ModalOpen && <Modal
                message="Are you sure you want to return to the menu? "
                message2='Changes will be lost'
                onClose={cancelModal}
                style={{height: "200px"}}
            >
                <FormButton
                    className="modalBtns bg-[#525252] rounded-[20px] border-none transition duration-[300ms] ease-in-out w-[100px] h-[40px] border-[2px] border-[#2d2d2d] cursor-pointer hover:scale-125"
                    onClick={cancelModal}
                >
                    CANCEL
                </FormButton>
                
                <FormButton
                    className="modalBtns bg-[#525252] rounded-[20px] border-none transition duration-[300ms] ease-in-out w-[100px] h-[40px] border-[2px] border-[#2d2d2d] cursor-pointer hover:scale-125"
                    onClick={back}
                >
                    BACK
                </FormButton>
            </Modal>}
        </section>
    );
    
}
// (e) => {
//                         setNote({
//                             ...note, title: e.target.value    
//                         })
//                         setIs2ModalOpen
//                     }(e) => setNote({ ...note, body: e.target.value })
export default Note