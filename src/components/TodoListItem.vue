<template lang="pug">
    v-list-tile
        v-list-tile-action
            v-checkbox(@change="completeTodo(index)" )
        v-list-tile-content
            v-list-tile-title {{ todo.description }}
            v-list-tile-sub-title {{ todo.task }}
        v-list-tile-action
            v-flex(column)
                v-btn.ma-1(@click="dialog = true" small color="blue darken-1" dark)
                    v-icon edit
                v-btn.ma-1(@click="deleteTodo(index)" small color="red darken-1" dark )
                    v-icon close
        include ../assets/pugTemplates/DialogTemplate.pug

</template>

<script>
    import {names} from '../store/names/todo';
    import {formMixin} from '../mixins/formMixin';
    import Vue from 'vue';
    export default {
        props: {
            todo: Object,
            index: Number
        },
        mixins: [formMixin],
        name: "TodoListItem",
        data() {
            return {
                description: this.todo.description,
                task: this.todo.task,
                dialog: false,
            }
        },
        methods: {
            editTodo(index){
                let newTodo = this.todo;
                if (this.description.length && this.task.length ){
                    Vue.set(newTodo, 'description', this.description);
                    Vue.set(newTodo, 'task', this.task);
                    this.$store.commit('todos/' + names.EDIT_TODO, {index: index, todo: newTodo});
                    this.dialog = false
                }
            },
            deleteTodo(index) {
                this.$store.commit('todos/' + names.DELETE_TODO, index);
            },
            completeTodo(index) {
                this.$store.commit('todos/' + names.COMPLETE_TODO, index);
            },
        }
    }
</script>

<style scoped>
</style>