import axios from "axios";

export const getAllNotesByID = async (isUserID: string | null | undefined) => {
    
    const urlByID = `http://localhost:3001/users/${isUserID}`;

    try {
        const response = await axios.get(urlByID);
        return response.data.notes;
    } catch (error) {
        return []
    }
};


export const deleteNoteByID = async (isUserID: string | null | undefined, noteID: number) => {
    const urlByID = `http://localhost:3001/users/${isUserID}`;

    try {
        const response = await axios.get(urlByID);
        const user = response.data;

        const updatedNotes = user.notes.filter((note: any) => note.id !== noteID)
        
        await axios.put(urlByID, {
            ...user,
            notes: updatedNotes
        })

        console.log(`Заметка с ID ${noteID} была успешно удалена`);
    } catch (error) {
        console.error("Notes undefined");
    }
}
