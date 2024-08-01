import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3001'
})

export const createUser = (userData: {}) => api.post('/users', userData)

export const chekAuth = async (login:string, password:string) => {
    const response = await api.get('/users', { params: { login, password } })
    const targetUser = response.data
    console.log(targetUser);
    return targetUser
}

