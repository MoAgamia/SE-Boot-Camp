<template>
    <div>
        <input v-model="newTask.description" type="text" name="task-description">
        <button @click="createTask(newTask.description)">Add Task</button>                
        <ul>
            <li v-for="task in tasks" :key="task._id">
                <form v-if="!task.edit">
                    <p>{{task.description}}</p>
                    <button @click="editTask(task._id)">Edit Task</button>
                    <button @click="deleteTask(task._id)">Delete Task</button>
                    <button @click="finishTask(task._id)">Finish Task</button>
                </form>
                <form v-else>
                    <input  v-model="task.description" type="text" name="task-description">
                    <button v-show="task.edit" @click="cancelEditTask(task._id)">Cancel Edit</button>                
                    <button v-show="task.edit" @click="updateTask(task._id, task.description)">Save Changes</button>
                </form>
            </li>
        </ul>
    </div>
</template>
<script>
import { getTasks, createTask, updateTask, deleteTask } from "../api/api.js";
export default {
  name: "Tasks",
  props: ["listId"],

  created() {
    getTasks(listId).then(res => {
      this.tasks = res.data.find(list => list.id === listId).tasks;
      this.msg = res.msg
    });
  },
  data() {
    return {
      newTask: {
        description: ""
      },
      tasks: []
    };
  },
  methods: {
    editTask(id) {
      tasks.$set(id, { edit: true });
    },
    cancelEditTask(id) {
      tasks.$set(id, { edit: false });
    },
    createTask(description) {
      createTask(listId, description).then(res => {
        this.tasks.push(res.data);
        this.msg = res.msg;
      });
    },
    updateTask(taskId, description) {
      updateTask(listId, taskId, description).then(res => {
        this.tasks.$set(taskId, res.data);
        this.msg = res.msg;
      });
    },
    deleteTask(taskId) {
      deleteTask(listId, taskId).then(res => {
        this.tasks.$set(taskId, null);
        this.msg = res.msg;
      });
    },
    finishTask(taskId) {
      finishTask(listId, taskId).then(res => {
        this.tasks.$set(taskId, {done});
        this.msg = res.msg;
      });
    }

  }
};
</script>
<style>

</style>
