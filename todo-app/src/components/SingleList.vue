<template>
  <div class="single-list">
      <h2>{{name}}</h2>
      <div class="tasks-container" v-show="tasks.length">
        <ul>
            <li v-for="(task, index) in tasks" :key="task._id">
                <div class="single-task">
                    <div class="main-view">
                        <input class="toggle" type="checkbox" v-model="task.done">
                        <label @dblclick="editTask(index)">{{ todo.title }}</label>
                        <button @click="deleteTask(index)">
                            <img src="../../static/images/remove.svg" alt="remove button">
                        </button>
                    </div>
                    <input class="edit-view" 
                    type="text"
                    v-model="task.description"
                    @blur="doneEdit(todo)"
                    @keyup.enter="doneEdit(todo)"
                    @keyup.esc="cancelEditTask(todo)">
                </div>
            </li>
            <li>
                <input 
                type="text"
                class="new-task" 
                v-model="newTaskDescription"
                placeholder="Add New Task"
                @keyup.enter="createTask">
            </li>
        </ul>
      </div>
  </div>
</template>
<script>
import api from "../api/api.js";

export default {
  name: "single-list",
  props: ["_id", "name", "tasks"],

  data() {
    return {
      newTaskDescription: "",
      listId: this._id
    };
  },
  methods: {
    editTask(id) {
      this.$set(tasks, id, { edit: true });
    },
    cancelEditTask(id) {
      this.$set(tasks, id, { edit: false });
    },
    createTask(description) {
      api.createTask(listId, description).then(res => {
        tasks.push(res.data);
        this.msg = res.msg;
      });
    },
    doneEdit(taskId, description) {
      api.updateTask(listId, taskId, description).then(res => {
        this.$set(tasks, taskId, res.data);
        this.msg = res.msg;
      });
    },
    deleteTask(taskId) {
      api.deleteTask(listId, taskId).then(res => {
        this.$set(tasks, taskId, null);
        this.msg = res.msg;
      });
    },
    finishTask(taskId) {
      api.finishTask(listId, taskId).then(res => {
        this.$set(tasks, taskId, { done });
        this.msg = res.msg;
      });
    }
  }
};
</script>
<style>
.single-task {
  height: 30px;
}

.task--completed {
  background: #42b983;
}
</style>
