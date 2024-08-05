import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserNote } from "../../../API/notesServise";
import { authContext } from "../../context/CreateContext";
import FormButton from "../../UI/Button/FormButton";
import Navbar from "../../UI/Navbar/Navbar";
import cl from "./CreateNote.module.scss";
import Modal from "../../UI/ModalWindow/Modal";

const CreateNote: React.FC = () => {
    const navigate = useNavigate();
    const [note, setNote] = useState({ title: "", body: "" })
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    
    const useAuthCtx = () => {
        const context = useContext(authContext);
        if (!context) {
            throw new Error('authContext must be used within an AuthProvider');
        }
        return context;
    }
    const { isUserID } = useAuthCtx()

    const back = () => {
        navigate("/myNotes");
    }

    const addNewNote = () => {
        setIsModalOpen(true)
        
        setTimeout(async () => {
            setIsModalOpen(false)

            const newNote = {
                ...note,
                id: Date.now(),
            };
    
            await addUserNote(isUserID, newNote);
    
            setNote({ title: "", body: "" });
            navigate("/myNotes");
        }, 2500)

    };

    return (
        <section>
            <Navbar title="Create new Note" />

            <FormButton onClick={back} className={cl.back}>
                <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M7.33337 22L6.62627 21.2929L5.91916 22L6.62627 22.7071L7.33337 22ZM34.8334 23C35.3857 23 35.8334 22.5523 35.8334 22C35.8334 21.4477 35.3857 21 34.8334 21V23ZM17.6263 10.2929L6.62627 21.2929L8.04048 22.7071L19.0405 11.7071L17.6263 10.2929ZM6.62627 22.7071L17.6263 33.7071L19.0405 32.2929L8.04048 21.2929L6.62627 22.7071ZM7.33337 23H34.8334V21H7.33337V23Z"
                    fill="#DDDDDD"
                />
                </svg>
            </FormButton>

            <main className={cl.note}>
                <textarea
                maxLength={40}
                className={cl.titleOfNote}
                placeholder="title of note"
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                ></textarea>

                <textarea
                className={cl.descriptionOfNote}
                placeholder="description"
                onChange={(e) => setNote({ ...note, body: e.target.value })}
                ></textarea>
            </main>

            <FormButton
                className={cl.createNote}
                onClick={addNewNote}
                disabled={note.body && note.title ? false : true}
            >
                Save
            </FormButton>

            {isModalOpen && <Modal style={{animation: 'none'}} message="The note was successfully saved and added!" />}
        </section>
    );
};

export default CreateNote;
