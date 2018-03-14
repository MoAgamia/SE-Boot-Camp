<template>
    <div>
        <ul>
            <li  v-for="task in tasks" :key="task._id">
                {{task.description}}
            </li>
        </ul>
    </div>
</template>
<script>

    export default {
        name:'Tasks',  
        props: [
            'tasks',
            'createTask',
            'updateTask',
            'deleteTask'
        ],
        data (){
            return {
                description
            }
        },
        methods:{
            addTask(taskId) {
                this.createTask(taskId, description)
            },
            updateTask(taskId){
                this.updateTask(taskId, description)
            },
            deleteTask(taskId){
                this.deleteTask(taskId, description)
            }
        }
    }
</script>
<style>

</style>
