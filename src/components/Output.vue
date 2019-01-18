<template>
  <div>
    <transition-group name="list" tag="div" class="containerArea">
      <div v-for="todo in todos" :key="todo.id" class="inline">
        <TodoItem :todo="todo" ></TodoItem>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import {SET_TODOS,} from '../store/names/todo';
  import {mapState} from 'vuex';
  import TodoItem from './TodoItem'
  export default {
    name: "Output",
    components: {
      TodoItem
    },
    created() {
      this.$store.commit('todos/' + SET_TODOS);
    },
    computed: {
      ...mapState('todos',
          {
            todos: 'todos'
          }),
    },
  }
</script>

<style scoped>
  .containerArea{
    display: flex;
    flex-direction: column-reverse;
    margin: 0 2vh 2vh 2vh;
  }
  .inline{
    height: 5vh;
    margin-top: 0.5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  /*Animations*/

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateX(-2vh);
  }
  .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateX(2vh);
  }
  .list-move {
    transition: transform 1s;
  }
</style>
