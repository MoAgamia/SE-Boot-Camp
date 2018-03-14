import axios from 'axios'

const BASE_URL = 'https://nodejs-to-do.herokuapp.com/api/'

axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt-token') || ''
    }
})

export default {
    register: (username, password, confirmPassword) => {
        axiosInstance.post('auth/register', { username, password, confirmPassword })
            .then((res) => res)
            .catch((err) => err)
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
        axiosInstance.get('list/getLists')
            .then((res) => res)
            .catch((err) => err)
    }
    ,
    createList: (name) => {
        axiosInstance.post('list/createList', { name })
            .then((res) => res)
            .catch((err) => err)
    },
    updateListName: (listId, name) => {
        axiosInstance.patch(`list/updateListName/${listId}`, { name })
            .then((res) => res)
            .catch((err) => err)
    },
    deleteList: (listId) => {
        axiosInstance.delete(`list/deleteList/${listId}`)
            .then((res) => res)
            .catch((err) => err)
    },
    createTask: (listId) => (description) => {
        axiosInstance.patch(`list/${listId}/createTask`, { description })
            .then((res) => res)
            .catch((err) => err)
    },
    updateTask: (listId) => (taskId, description) => {
        axiosInstance.patch(`list/${listId}/updateTask/${taskId}`, { description })
            .then((res) => res)
            .catch((err) => err)
    },
    deleteTask: (listId) => (taskId, description) => {
        axiosInstance.patch(`list/${listId}/deleteTask/${taskId}`, { description })
            .then((res) => res)
            .catch((err) => err)
    },
}
