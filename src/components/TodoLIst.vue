<template>
    <div class="containerArea">
            <div v-for="todo in filteredTodos" :key="todo.id" class="inline">
                <TodoListItem :todo="todo" ></TodoListItem>
            </div>
    </div>
</template>
<script>
  import {names} from '../store/names/todo';
  import { mapGetters} from 'vuex';
  import TodoListItem from './TodoListItem'
  export default {
    name: "TodoList",
    components: {
        TodoListItem
    },
    created() {
      this.$store.commit('todos/' + names.INITIAL_TODOS);
    },
    computed: {
      ...mapGetters('todos' , ['filteredTodos'])
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
</style>
