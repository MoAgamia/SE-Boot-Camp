<template>
    <ul class="todos-lists" v-show="lists.length">
      <li class="todos-single-list" v-for="list in lists" :key="list._id">
        <single-list v-bind="list"></single-list>
      </li>
      <li class="todos-single-list">
        <input 
          type="text"
          class="new-list" 
          v-model="newListName"
          placeholder="Add New List"
          @keyup.enter="createList">
      </li>
    </ul>
</template>
<script>
import api from "../api/api.js";
import SingleList from "./SingleList";

export default {
  name: "lists",
  created() {
    api.getLists().then(res => {
      this.lists = res.data.data;
      this.msg = res.msg;
    });
  },
  components: {
    SingleList
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
        this.$set(this.lists, listIndex, null);
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

.todos-single-list {
  height: 500px;
  width: 400px;
  margin: 15px;
}
</style>
