<template>
    <div>
        <input v-model="newList.name" type="text" name="list-name">
        <button type="button" @click="createList(newList.name)">Add List</button>                
        <ul>
            <li v-if="lists.length" v-for="(list,index) in lists" :key="list._id">
                <form v-if="!list.edit">
                    <p>{{list.name}}</p>
                    <button type = "button" @click="editList(index)">Edit List</button>
                    <button type = "button" @click="deleteList(index, list._id)">Delete List</button>
                </form>
                <form v-else>
                    <input type="text" v-model="list.name" name="list-name">
                    <button type = "button" v-show="list.edit" @click="cancelEditList(index)">Cancel Edit</button>                
                    <button type = "button" v-show="list.edit" @click="updateList(index, list._id, list.name)">Save Changes</button>
                </form>
            </li>
        </ul>
    </div>
</template>
<script>
import {
  getLists,
  createList,
  updateListName,
  deleteList
} from "../api/api.js";

export default {
  name: "Lists",
  props: ['selectList'],
  created() {
    getLists().then(res => {
      this.lists = res.data.data;
      this.msg = res.msg;
    });
  },
  data() {
    return {
      newList: {
        name: ""
      },
      lists: []
    };
  },
  methods: {
    editList(id) {
        console.log(this.lists)
      this.$set(this.lists, id, { edit: true });
    },
    cancelEditList(id) {
      this.$set(this.lists, id, { edit: false });
      console.log(this.lists)
    },
    createList(name) {
      createList(name).then(res => {
        this.lists.push(res.data);
        this.msg = res.msg;
      });
    },
    updateList(listIndex, listId, name) {
      updateList(listId, name).then(res => {
        this.$set(this.lists, listIndex, res.data);
        this.msg = res.msg;
      });
    },
    deleteList(listIndex, listId) {
      deleteList(listId).then(res => {
        this.$set(this.lists, listIndex, null);
        this.msg = res.msg;
      });
    }
  }
};
</script>
<style>

</style>
