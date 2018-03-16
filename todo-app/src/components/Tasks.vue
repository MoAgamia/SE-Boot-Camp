<template>
  <ul class="tasks-list">
    <li class="single-task" 
        v-for="(task, index) in tasks" 
        :key="task._id">
          <!-- Task completion button -->
          <button v-if="!task.done" type="button" class="task-status-btn" @click="completeTask(index, task)">
            <img src="../../static/images/not-done.svg" alt="complete button">
          </button>
          <!-- Task undo button -->
          <button v-else type="button" class="task-status-btn" @click="undoTask(index, task)">
            <img src="../../static/images/done.svg" alt="undo button">
          </button>
          <!-- Task description -->
          <label v-if="task !== editedTask" 
                class = "single-task-description"
                :class="{'completed-task': task.done}"
                @click="editTask(task)">{{ task.description }}
          </label>
          <!-- Edit task description -->
          <input v-else
              class = "single-task-description"
              type="text"
              v-model="task.description"
              @blur="doneEdit(index, task)"
              @keyup.enter="doneEdit(index, task)"
              @keyup.esc="cancelEditTask"
              maxlength="10">
          <!-- Remove task button -->
          <button type="button" class="remove-btn" @click="deleteTask(index, task)">
            <img src="../../static/images/remove.svg" alt="remove button">
          </button>
          <!-- Divider line -->
          <div class="divider"></div>
    </li>
    <!-- Add new task-->
    <li class="single-task new-task">
        <input 
          type="text"
          v-model="newTaskDescription"
          placeholder="+add task"
          @keyup.enter="createTask"
          maxlength="10">
    </li>
  </ul>
</template>
<script>
import api from "../api/api.js";

export default {
  name: "tasks",
  props: ["_id", "name", "tasks"],

  data() {
    return {
      newTaskDescription: "",
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
    createTask() {
      api.createTask(this._id, this.newTaskDescription).then(res => {
        this.tasks.push(res.data.data);
        this.newTaskDescription = "";
        this.msg = res.msg;
      });
    },
    doneEdit(index, task) {
      api
        .updateTask(this._id, task._id, { description: task.description })
        .then(res => {
          this.$set(this.tasks, index, res.data.data);
          this.msg = res.msg;
        });
    },
    completeTask(index, task) {
      api
        .updateTask(this._id, task._id, {
          description: task.description,
          done: true
        })
        .then(res => {
          this.$set(this.tasks, index, res.data.data);
          this.msg = res.msg;
        });
    },
    undoTask(index, task) {
      api
        .updateTask(this._id, task._id, {
          description: task.description,
          done: false
        })
        .then(res => {
          this.$set(this.tasks, index, res.data.data);
          this.msg = res.msg;
        });
    },
    deleteTask(index, task) {
      api.deleteTask(this._id, task._id).then(res => {
        this.$delete(this.tasks, index);
        this.msg = res.msg;
      });
    }
  }
};
</script>
<style scoped>
.single-task {
  height: 100px;
  position: relative;
  padding-left: 20%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: 300;
}

.single-task > label {
  font-size: 30px;
}

.single-task > input {
  font-size: 25px;
  color: #5c616f;
}

.task-status-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 5%;
  opacity: 0.5;
}

.task-status-btn > img {
  width: 30px;
  height: 30px;
}

.completed-task {
  text-decoration: line-through;
}

.remove-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10%;
}

.remove-btn > img {
  width: 10px;
  height: 10px;
}

.divider {
  width: 90%;
  height: 1px;
  margin-top: 3%;
  background: #5c616f;
  opacity: 0.2;
}
</style>
