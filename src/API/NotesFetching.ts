import axios from "axios";

const { isUserID } = useAuthContext();

const urlByID = `http://localhost:3001/users/${isUserID}`;

export const getAllNotesByID = async () => {
    try {
        const response = await axios.get(urlByID);
        return response.data.notes;
    } catch (error) {
        console.error("Notes undefined");
    }
};
