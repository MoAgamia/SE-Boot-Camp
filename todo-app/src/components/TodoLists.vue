<template>
  <section class="todos-section">
    <ul class="todos-lists">
      <li class="single-list" 
          v-for="(list, index) in lists" 
          :key="list._id">
          <!-- List header -->
          <header class="single-list-header">
            <!-- List name -->
            <label v-if="list !== editedList" 
                  class = "single-list-name"
                  @click="editList(list)">{{ list.name }}
            </label>
            <!-- Edit list name -->
            <input v-else
                class = "single-list-name"
                type="text"
                v-model="list.name"
                @blur="doneEdit(index, list)"
                @keyup.enter="doneEdit(index, list)"
                @keyup.esc="cancelEditList"
                maxlength="10">
            <!-- Remove list button -->
            <button type="button" class="remove-btn" @click="deleteList(index, list._id)">
              <img src="../../static/images/remove.svg" alt="remove button">
            </button>
          </header>
          <!-- Tasks in list -->
          <div class="tasks-container">
            <tasks v-bind="list"></tasks>
          </div>
      </li>
      <!-- Add new list-->
      <li class="single-list">
        <header class="single-list-header">
          <input type="text"
            class="new-list" 
            v-model="newListName"
            placeholder="+add list"
            @keyup.enter="createList"
            maxlength="10">
        </header>
      </li>
    </ul>
  </section>
</template>
<script>
import api from "../api/api.js";
import Tasks from "./Tasks";

export default {
  name: "lists",
  created() {
    api.getLists().then(res => {
      this.lists = res.data.data;
      this.msg = res.msg;
    });
  },
  components: {
    Tasks
  },
  data() {
    return {
      newListName: "",
      editedList: null,
      lists: []
    };
  },
  methods: {
    editList(list) {
      this.editedList = list;
    },
    cancelEditList() {
      this.editedList = null;
    },
    createList() {
      api.createList(this.newListName).then(res => {
        this.lists.push(res.data.data);
        this.newListName = "";
        this.msg = res.msg;
      });
    },
    doneEdit(listIndex, list) {
      api.updateListName(list._id, list.name).then(res => {
        this.$set(this.lists, listIndex, res.data.data);
        this.msg = res.msg;
      });
    },
    deleteList(listIndex, listId) {
      api.deleteList(listId).then(res => {
        this.$delete(this.lists, listIndex);
        this.msg = res.msg;
      });
    }
  }
};
</script>
<style scoped>
.todos-lists {
  display: flex;
  justify-content: space-around;
}

input{
    background: none;
    border: none;
}

button {
  background: none;
  border: none;
}

.single-list {
  /* height: 500px; */
  width: 400px;
  margin: 15px;
  background: #f8f8f8;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.single-list-header {
  height: 90px;
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 300;
}

.single-list-header > label {
  margin-left: 10%;
  font-size: 50px;
}

.single-list-header > input {
  margin-left: 10%;
  width: 60%;
  height: 50px;
  font-size: 30px;
  color: #5c616f;
}

.remove-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 30px;
}

.remove-btn > img {
  width: 20px;
  height: 20px;
}

.todos-section {
  margin: 2% auto;
  padding: 0 2%;
  display: flex;
}
</style>
