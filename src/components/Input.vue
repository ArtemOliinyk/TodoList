<template lang="pug">
  v-form(ref="form")
    v-container.pa-0
      include  ../assets/pugTemplates/FormTemplate.pug
      v-btn(color="blue darken-2" dark @click="addToLocalStore")
          v-icon(dark) add
</template>

<script>
  import {names} from '../store/names/todo';
  import {formMixin} from '../mixins/formMixin';
  export default {
      name: "Input",
      props: {
          value: {
              type: Object,
              require: true
          }
      },
      mixins: [formMixin],
      methods: {
          addToLocalStore() {
              if (this.$refs.form.validate()){
                  let newTodoItem = {
                      id: Math.floor((Math.random()*1000) + 1), //random number between 1 and 1000
                      description: this.description,
                      task: this.task,
                      completed: false
                  };
                  this.$store.commit('todos/'+ names.ADD_TODO , newTodoItem);
                  this.description = '';
                  this.task = '';
              }
          },
      },
  }
</script>

<style scoped>
</style>
