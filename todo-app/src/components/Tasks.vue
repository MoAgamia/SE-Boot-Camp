<template>
    <div class="tasks-container" v-show="tasks.length">
      <ul>
          <li class="single-task"
              v-for="(task, index) in tasks" 
              :key="task._id"
              :class="{'task--completed': task.done, 'task--editing' : task === editedTask}">
              <div class="main-view">
                  <input class="toggle" type="checkbox" v-model="task.done">
                  <label @dblclick="editTask(index)">{{ todo.title }}</label>
                  <button type="button" @click="deleteTask(index)">
                      <img src="../../static/images/remove.svg" alt="remove button">
                  </button>
              </div>
              <input 
                  class="task--editing" 
                  type="text"
                  v-model="task.description"
                  @blur="doneEdit(todo)"
                  @keyup.enter="doneEdit(todo)"
                  @keyup.esc="cancelEditTask(todo)">
          </li>
          <li>
              <input 
              type="text"
              class="edit-view" 
              v-model="newTaskDescription"
              placeholder="Add New Task"
              @keyup.enter="createTask">
          </li>
      </ul>
    </div>
</template>
<script>
import api from "../api/api.js";

export default {
  name: "tasks",
  props: ["_id", "name", "tasks"],

  data() {
    return {
      newTaskDescription: "",
      listId: this._id,
      editedTask: null
    };
  },
  methods: {
    editTask(list) {
      this.editedTask = list;
    },
    cancelEditTask() {
      this.editedTask = null;
    },
    createTask(description) {
      api.createTask(listId, description).then(res => {
        this.tasks.push(res.data.data);
        this.msg = res.msg;
      });
    },
    doneEdit(taskId, description) {
      api.updateTask(listId, taskId, description).then(res => {
        this.$set(this.tasks, taskId, res.data.data);
        this.msg = res.msg;
      });
    },
    deleteTask(index, taskId) {
      api.deleteTask(listId, taskId).then(res => {
        this.$delete(this.tasks, index);
        this.msg = res.msg;
      });
    },
    finishTask(taskId) {
      api.finishTask(listId, taskId).then(res => {
        this.$set(this.tasks, taskId, { done });
        this.msg = res.msg;
      });
    }
  }
};
</script>
<style scoped>
.single-task {
  height: 30px;
}

.task--completed {
  background: #42b983;
}
</style>
