import axios from "axios";

const baseUrl = 'https://minimalmindnotes-2.onrender.com/api'


export const getUserByID = async (userID: string| null | undefined) => {
    try {
        const response = await axios.get(`${baseUrl}/users/${userID}`)
        return response.data
    } catch (error) {
        console.error('Error getting user by id:', error);
        throw error;
    }
}

export const updateUserData = async (userID: string| null | undefined, updatedUser: any) => {
    try {
        const response = await axios.put(`${baseUrl}/users/${userID}`, updatedUser)
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
export const addUserNote = async (userID: string | null | undefined, note: any) => {
    try {
        const user = await getUserByID(userID)
        user.notes.push(note)
        await updateUserData(userID, user)
    } catch (error) {
        console.error('Error adding post to user:', error);
        throw error;
    }
}
export const updateUserNote = async (
    userID: string | null | undefined,
    updatedNote: {
        title: string | null | undefined,
        body: string | null | undefined,
        id: number
    },
    noteID: number
) => {
    try {
        const user = await getUserByID(userID);

        if (!user.notes || !Array.isArray(user.notes)) {
            console.error('Notes array is undefined or not an array');
            return;
        }

        const noteIndex = user.notes.findIndex((note: any) => note.id === noteID);

        if (noteIndex === -1) {
            console.error(`Note with ID ${noteID} not found`);
            return;
        }

        user.notes[noteIndex] = { ...user.notes[noteIndex], ...updatedNote };

        await updateUserData(userID, user);
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
};

export const likeNoteByID = async (userID:string | null | undefined, noteID: number) => {
    try {
        const user = await getUserByID(userID)
        const noteIndex = user.notes.findIndex((note: any) => note.id === noteID)

        user.notes[noteIndex] = { ...user.notes[noteIndex], liked: !user.notes[noteIndex].liked }
        await updateUserData(userID, user);
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
}

