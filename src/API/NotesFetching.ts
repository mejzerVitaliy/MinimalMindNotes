import axios from "axios";

export const getAllNotesByID = async (isUserID: string | null | undefined) => {
    
    const urlByID = `http://localhost:3001/users/${isUserID}`;

    try {
        const response = await axios.get(urlByID);
        return response.data.notes;
    } catch (error) {
        console.error("Notes undefined");
    }
};
