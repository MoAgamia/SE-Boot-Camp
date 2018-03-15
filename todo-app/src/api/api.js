import axios from 'axios'

const BASE_URL = 'https://nodejs-to-do.herokuapp.com/api/'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt-token') || ''
    }
})

export default {
    register: (username, password, confirmPassword) => {
        return axiosInstance.post('auth/register', { username, password, confirmPassword })
    },
    login: (username, password) => {
        axiosInstance.post('auth/login', { username, password })
            .then((res) => {
                axiosInstance.defaults.headers.common['Authorization'] = res.data;
                localStorage.setItem('jwt-token')
                return res
            })
            .catch((err) => err)
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
    createTask: (listId) => (description) => {
        return axiosInstance.patch(`list/${listId}/createTask`, { description })
    }
    , updateTask: (listId) => (taskId, description) => {
        return axiosInstance.patch(`list/${listId}/updateTask/${taskId}`, { description })
    },
    deleteTask: (listId) => (taskId, description) => {
        return axiosInstance.patch(`list/${listId}/deleteTask/${taskId}`, { description })
    }
}
