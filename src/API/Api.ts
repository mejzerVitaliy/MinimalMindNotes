import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3001'
})

export const createUser = (userData: {}) => api.post('/users', userData)

export const checkAuth = async (login:string, password:string) => {
    const response = await api.get('/users', { params: { login, password } })
    const targetUser = response.data
    return targetUser
}

export const checkLogins = async (login:string) => {
    try {
        const response = await api.get('/users', { params: { login } })
        const targetUserLogins = response.data
        if (!targetUserLogins) {
            return []
        } else return targetUserLogins
        
    } catch (error) {
        console.error("Error checking logins:", error);
    }
    
}

