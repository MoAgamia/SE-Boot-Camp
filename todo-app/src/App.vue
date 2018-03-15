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
      header: "simple to-do app"
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

#todos-app {
  font-family: "Lato", sans-serif;
  text-align: center;
  background: #f0eee8;
  color: #5c616f;
  padding: 1px;
  overflow-y: hidden;
  overflow-x: auto;
  height: 100%;
}

.todos-header {
  position: fixed;
  width: 100%;
  height: 10%;
  padding: 2%;
}
.todos-header > h1 {
  text-align: center;
  font-size: 60px;
  font-style: italic;
}

.todos-section {
  margin: 10% auto;
  padding: 0 2%;
  display: flex;
}
</style>
