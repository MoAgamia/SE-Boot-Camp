<template>
  <div id="todos-app">
    <!-- Header -->
    <header class="todos-header">
      <h1>{{header}}</h1>
    </header>
    <!-- Main Content -->
    <main class="todos-section">
      <TodoLists/>
    </main>
  </div>
</template>

<script>
import TodoLists from "./components/TodoLists";

export default {
  name: "App",
  data() {
    return {
      header: "todos app"
    };
  },
  components: {
    TodoLists
  }
};
</script>

<style>
*{
  box-sizing: border-box;
}
html {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}

h1,
h2 {
  margin: 0;
  font-weight: normal;
}

button {
  background: none;
  border: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

input{
    background: none;
    border: none;
}
#todos-app {
  font-family: "Lato", sans-serif;
  background: #f0eee8;
  color: #5c616f;
  padding: 1px;
  overflow-x: auto;
  height: 100%;
}

.todos-header {
  /* position: fixed; */
  width: 100%;
  height: 10%;
  padding: 2%;
}
.todos-header > h1 {
  text-align: center;
  font-size: 80px;
  font-style: italic;
  font-weight: 300;
}

.todos-section {
  margin: 2% auto;
  padding: 0 2%;
  display: flex;
}
</style>
