<template>
  <div id="todos-app">
    <!-- Header -->
    <header class="todos-header">
      <h1>{{header}}</h1>
    </header>
    <!-- Main Content -->
    <TodoLists/>
    <!-- Footer -->
    <footer class="todos-footer"></footer>
  </div>
</template>

<script>
import TodoLists from "./components/TodoLists";

export default {
  name: "App",
  data() {
    return {
      header: "to-do app"
    };
  },
  components: {
    TodoLists
  }
};
</script>

<style>
html {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
}

h1,
h2 {
  margin: 0;
  font-weight: normal;
}

#todos-app {
  font-family: "Lato", sans-serif;
  text-align: center;
  height: 100%;
  background: #f0eee8;
  color: #5c616f;
  padding: 5%;
}

.todos-header > h1 {
  text-align: center;
  font-size: 60px;
}
</style>
