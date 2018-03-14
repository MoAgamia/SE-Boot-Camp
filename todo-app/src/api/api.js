import axios from 'axios'

const BASE_URL = 'https://nodejs-to-do.herokuapp.com/api/'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt-token') || ''
    }
})

export const register = (username, password, confirmPassword) => {
    return axiosInstance.post('auth/register', { username, password, confirmPassword })
}

export const login = (username, password) => {
    axiosInstance.post('auth/login', { username, password })
        .then((res) => {
            axiosInstance.defaults.headers.common['Authorization'] = res.data;
            localStorage.setItem('jwt-token')
            return res
        })
        .catch((err) => err)
}

export const getLists = () => {
    return axiosInstance.get('list/getLists')
}

export const createList = (name) => {
    return axiosInstance.post('list/createList', { name })
}

export const updateListName = (listId, name) => {
    return axiosInstance.patch(`list/updateListName/${listId}`, { name })
}

export const deleteList = (listId) => {
    return axiosInstance.delete(`list/deleteList/${listId}`)
}

export const getTasks = (listId) => {
    return axiosInstance.get('list/getLists')
}

export const createTask = (listId) => (description) => {
    return axiosInstance.patch(`list/${listId}/createTask`, { description })
}

export const updateTask = (listId) => (taskId, description) => {
    return axiosInstance.patch(`list/${listId}/updateTask/${taskId}`, { description })
}

export const deleteTask = (listId) => (taskId, description) => {
    return axiosInstance.patch(`list/${listId}/deleteTask/${taskId}`, { description })
}

