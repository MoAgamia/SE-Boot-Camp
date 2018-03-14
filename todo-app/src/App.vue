<template>
  <div id="app">
    <Todo/>
  </div>
</template>

<script>
import Todo from './components/Todo'

export default {
  name: 'App',
  components: {
    Todo
  }
}
</script>

<style>
html{
  height: 100%;
}

body{
  margin: 0;
  height: 100%;
}

#app {
  font-family: 'Lato', sans-serif;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:#F0EEE8;
  color: #5C616F;
}
</style>
