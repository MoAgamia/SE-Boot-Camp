import axios from 'axios'

const BASE_URL = 'https://nodejs-to-do.herokuapp.com/api/'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(config => {
    config.headers['authorization'] = localStorage.getItem('jwt-token') || ''
    return config
})

export default {
    register: (user) => {
        return axiosInstance.post('auth/register', user)
    },
    login: (user) => {
        return axiosInstance.post('auth/login', user)
    },
    getLists: () => {
        return axiosInstance.get('list/getLists')
    },
    createList: (name) => {
        return axiosInstance.post('list/createList', { name })
    },
    updateListName: (listId, name) => {
        return axiosInstance.patch(`list/updateListName/${listId}`, { name })
    },
    deleteList: (listId) => {
        return axiosInstance.delete(`list/deleteList/${listId}`)
    },
    getTasks: (listId) => {
        return axiosInstance.get('list/getLists')
    },
    createTask: (listId, description) => {
        return axiosInstance.patch(`list/${listId}/createTask`, { description })
    },
    updateTask: (listId, taskId, task) => {
        return axiosInstance.patch(`list/${listId}/updateTask/${taskId}`, task)
    },
    deleteTask: (listId, taskId) => {
        return axiosInstance.patch(`list/${listId}/deleteTask/${taskId}`)
    },
    saveLoginToken: (newToken) => {
        localStorage.setItem('jwt-token', newToken)
    }
}
