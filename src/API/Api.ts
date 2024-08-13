import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3001'
})

export const createUser = (userData: {}) => api.post('/users', userData)

export const checkAuth = async (login: string, password: string) => {
    const response = await api.get('/users', { params: { login } });
    const users = response.data;
    console.log(users);
    

    // Проверка пользователя и пароля
    const targetUser = users.find((user: { login: string, password: string }) => user.password === password);
    console.log(targetUser);
    
    if (targetUser) return [targetUser]
    else return [];
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

