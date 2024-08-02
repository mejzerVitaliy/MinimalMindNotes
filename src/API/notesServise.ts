import axios from "axios";

const baseUrl = 'http://localhost:3001'


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



export const addUserNote = async (userID: string| null | undefined, note: any) => {
    try {
        const user = await getUserByID(userID)

        user.notes.push(note)

        await updateUserData(userID, user)
    } catch (error) {
        console.error('Error adding post to user:', error);
        throw error;
    }
}

