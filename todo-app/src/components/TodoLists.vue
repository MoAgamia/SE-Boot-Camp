<template>
    <ul class="todos-lists">
      <li class="single-list" v-for="(list, index) in lists" :key="list._id">
        <header class="single-list-header">
          <label @dblclick="editTask(index)">{{ list.name }}</label>
          <button type="button" class="remove-btn" @click="deleteList(index, list._id)">
            <img src="../../static/images/remove.svg" alt="remove button">
          </button>
        </header>
        <tasks v-bind="list"></tasks>
      </li>
      <li class="single-list">
        <header class="single-list-header">
          <input 
            type="text"
            class="new-list" 
            v-model="newListName"
            placeholder="+add list"
            @keyup.enter="createList">
        </header>
      </li>
    </ul>
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
      lists: []
    };
  },
  methods: {
    editList(id) {
      this.$set(this.lists, id, { edit: true });
    },
    cancelEditList(id) {
      this.$set(this.lists, id, { edit: false });
    },
    createList() {
      api.createList(this.newListName).then(res => {
        this.lists.push(res.data.data);
        this.newListName = "";
        this.msg = res.msg;
      });
    },
    updateList(listIndex, listId, name) {
      api.updateList(listId, name).then(res => {
        this.$set(this.lists, listIndex, res.data);
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
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

.single-list {
  height: 500px;
  width: 400px;
  margin: 15px;
  /* background: #00e5a1; */
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.single-list-header {
  padding: 3%;
  position: relative;
}

.single-list-header > label {
  font-size: 50px;
}

.single-list-header > input{
  height: 40px;
  font-size: 30px;
  text-align: center;
  color: #5c616f;
  border: none;
}

.remove-btn {
  position: absolute;
  top: 30px;
  right: 30px;
}

.remove-btn > img {
  width: 20px;
  height: 20px;
}
</style>
