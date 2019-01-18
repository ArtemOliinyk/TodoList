<template>
  <div class="containerInpButt">
    <input class="inputTodo"
           placeholder="New task"
           type="text"
           v-model.trim="inputValue"
           @keyup.enter="addToLocalStore">
    <v-btn class="addButtonTodo" color="blue darken-2" dark @click="addToLocalStore">
      <v-icon dark>add</v-icon>
      <span>Add</span>
    </v-btn>
  </div>

</template>

<script>
  import {names} from '../store/names/todo';
  export default {
    name: "Input",
    props:{
      value:{
        type: Object,
        require: true
      }
    },
    data() {
      return {
        inputValue: ''
      }
    },
    methods: {
      addToLocalStore() {
        if (!this.inputValue.length){
          return this.$emit('input',{message: 'Input field musn`t be empty', show: true});
        }
        if (this.inputValue.length > 30) {
          return this.$emit('input',{message: 'Too much symbols', show: true});
        }
        let newTodoItem = {
          id: Math.floor((Math.random()*1000) + 1), //random number between 1 and 1000
          description: this.inputValue,
          completed: false
        };
        this.$store.commit('todos/'+ names.ADD_TODO , newTodoItem);
        this.inputValue = '';
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
