<template>
  <main class="todos-section" v-show="lists.length">
    <ul>
      <li v-for="list in lists" :key="list._id">
        <single-list v-bind="list"></single-list>
      </li>
      <li>
        <input 
          type="text"
          class="new-list" 
          v-model="newListName"
          placeholder="Add New List"
          @keyup.enter="createList">
      </li>
    </ul>
  </main>
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
        this.newListName = '';
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

.todos-section {
  margin: 50px auto;
  padding: 1%;
  width: 50%;
  height: 80%;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
