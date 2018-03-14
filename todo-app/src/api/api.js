import axios from 'axios'

const BASE_URL = 'https://nodejs-to-do.herokuapp.com/api/'

axios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt-token') || ''
    }
})

export default {
    register: (username, password, confirmPassword) => {
        axios.post('auth/register', { username, password, confirmPassword })
            .then((res) => res)
            .catch((err) => err)
    },
    login: (username, password) => {
        axios.post('auth/login', { username, password })
            .then((res) => {
                axios.defaults.headers.common['Authorization'] = res.data;
                localStorage.setItem('jwt-token')
                return res
            })
            .catch((err) => err)
    },
    getLists: () => {
        axios.get('list/getLists')
            .then((res) => res)
            .catch((err) => err)
    }
    ,
    createList: (name) => {
        axios.post('list/createList', { name })
            .then((res) => res)
            .catch((err) => err)
    },
    updateListName: (listId, name) => {
        axios.patch(`list/updateListName/${listId}`, { name })
            .then((res) => res)
            .catch((err) => err)
    },
    deleteList: (listId) => {
        axios.delete(`list/deleteList/${listId}`)
            .then((res) => res)
            .catch((err) => err)
    },
    createTask: (listId, description) => {
        axios.patch(`list/${listId}/createTask`, { description })
            .then((res) => res)
            .catch((err) => err)
    },
    updateTask: (listId, taskId, description) => {
        axios.patch(`list/${listId}/updateTask/${taskId}`, { description })
            .then((res) => res)
            .catch((err) => err)
    },
    deleteTask: (listId, taskId, description) => {
        axios.patch(`list/${listId}/deleteTask/${taskId}`, { description })
            .then((res) => res)
            .catch((err) => err)
    },
}
