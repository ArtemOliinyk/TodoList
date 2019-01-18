<template>
  <div class="containerInpButt">
    <input class="inputTodo"
           placeholder="New task"
           type="text"
           v-model="inputValue"
           @keyup.enter="addToLocalStore">
    <v-btn class="addButtonTodo" color="blue darken-2" dark @click="addToLocalStore">
      <v-icon dark>add</v-icon>
      <span>Add</span>
    </v-btn>
  </div>

</template>

<script>
  import {SET_TODOS, CLEAR_INPUT, SET_TODO_FROM_INPUT, ADD_ERROR, CLEAR_ERROR} from '../store/names/todo';
  import {mapState} from 'vuex';
  import LocalStorageService from '../Services/LocalStorageService';
  export default {
    name: "Input",
    data() {
      return {
        inputValue: ''
      }
    },
    computed: {
      ...mapState('todos',
        {
          errors: 'errors'
        }),
    },
    methods: {
      addToLocalStore() {
        try {
          if (!this.inputValue.length){
            throw ('This field musn`t be empty');
          }
          if (this.inputValue.length > 30) {
            throw 'Too much symbols';
          }
          let oldItems = LocalStorageService.getFromLocalStorage('todos');
          let newTodoItem = {
            id: Math.floor((Math.random()*1000) + 1), //random number between 1 and 1000
            description: this.inputValue,
            completed: false
          };
          oldItems.push(newTodoItem);
          LocalStorageService.setLocalStorage('todos', oldItems);
          this.$store.commit('todos/'+ SET_TODOS);
          this.inputValue = '';
          if (this.errors.length) {
            this.$store.commit('todos/' + CLEAR_ERROR);
          }
        } catch (e) {
          console.log(e);
          this.$store.commit('todos/' + ADD_ERROR, e);
          this.inputValue = '';
        }
      },
    },
  }
</script>

<style scoped>
  .containerInpButt{
    display: flex;
    flex-direction: row;
    margin: 0 2vh 2vh 2vh;
    height: 4.5vh;
    box-sizing: border-box;
  }
  .inputTodo{
    padding: 2vh;
    width: 100%;
    border: 0.1vh rgba(193, 199, 198, 0.9) solid;
    font: 2.2vh arial, sans-serif;
  }
  .addButtonTodo{
    width: 15vh;
    height: 100% !important;
    font: 1.8vh arial, sans-serif !important;
    margin: 0 !important;
  }
  .addButtonTodo:hover{
    background-color: rgba(78, 114, 201, 0.88);
  }
</style>
