<template>
  <div id="app">
    <div class="main">
      <p class="titleTodo">To Do List </p>
      <div class="tasks">
        <span>Tasks</span>
        <span class="remained">({{getRemainedTodos.length}})</span>
        <span class="errors"> {{error}}</span>
      </div>
      <Input></Input>
      <NavigationBar></NavigationBar>
      <TodoLIst></TodoLIst>
    </div>
  </div>
</template>

<script>
  import Input from './Input';
  import NavigationBar from './NavigationBar'
  import TodoLIst from './TodoLIst';
  import { mapState, mapGetters } from 'vuex';
  export default {
    name: 'app',
    components: {
      Input,
      NavigationBar,
      TodoLIst
    },
    computed: {
      ...mapState('todos', {
          error: 'error'
        }),
      ...mapGetters('todos', {
        getRemainedTodos: 'getRemainedTodos',
        }),
    },
  }
</script>

<!-- Local CSS -->
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  body{
    display: flex;
    flex-flow: row wrap;
    height: 100%;
  }
  #app{
    width: 100%;
  }
  .main{
    display: flex;
    flex-direction: column;
  }
  .titleTodo{
    text-align: center;
    padding: 1vh;
    font: 4vh arial, sans-serif;
  }
  .tasks{
    margin: 0 0 1vh 2vh;
    font: 4vh arial, sans-serif;
  }
  .remained{
    font: 3vh arial, sans-serif;
    color: rgba(115, 111, 119, 0.88);
  }
  .errors{
    font: 1.5vh arial, sans-serif;
    color: red;
  }
</style>
