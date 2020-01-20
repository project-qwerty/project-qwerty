<template>
    <div id="app">
      <Header />
      <AddTodo v-on:add-todo="addTodo" />
      <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
  </div>
</template>


<script>
  import Header from './components/layout/Header';
  import Todos from './components/Todos';
  import AddTodo from './components/AddTodo';

  export default {
    name: 'app',
    components: {
      Header,
      Todos,
      AddTodo
    },
    data() {
      return {
        todos: []
      }
    },
    methods: {
      deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      addTodo(newTodo) {
        this.todos = [...this.todos, newTodo];
      }
    },
    created() {
    }
  }
</script>


<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  body {
    line-height: 1.4;
  }
  
  .btn {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
  }
</style>
