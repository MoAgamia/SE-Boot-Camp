import TodoLists from '../components/TodoLists.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

const routes = [
    {
        path: '/',
        component: TodoLists,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }
]

export default routes
