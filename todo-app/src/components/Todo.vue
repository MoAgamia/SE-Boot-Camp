<template>
  <section class="todo-section">
    <h1>{{ header }}</h1>
    <input type="text" name="todo-input" v-model="listText">
    <Lists/>
  </section>
</template>

<script>
import Lists from './Lists'

export default {
  name: 'Todo',
  data () {
    return {
      header: 'To Do List',
      listText:''
    }
  },
  components:{Lists}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.todo-section{
  padding: 1%;
  width: 50%;
  height: 80%;
  background: #ffffff;
}

.todo-section > h1{
  font-size: 30px;
}

.todo-section > input{
  width: 80%;
}

</style>
