<template>
  <div id="todos-app">
    <!-- Header -->
    <header class="todos-header">
      <h1>{{header}}</h1>
    </header>
    <!-- Main Content -->
    <router-view></router-view>
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

ul {
  list-style-type: none;
  padding: 0;
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
  padding: 2%;
}
.todos-header > h1 {
  text-align: center;
  font-size: 80px;
  font-style: italic;
  font-weight: 300;
}

</style>
