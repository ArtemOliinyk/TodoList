<template>
    <div class="todo-item">
        <div class="description" v-bind:class="[todo.completed ? 'completeDesrc' : 'description']" @click="completeTodo(todo.id)">
            {{ todo.description }}
        </div>
        <div>
            <v-btn class="delete" color="red darken-1" dark @click="deleteTodo(todo.id)">
                <v-icon> close </v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import {SET_TODOS, ADD_ERROR, CLEAR_ERROR} from '../store/names/todo';
    import {mapState} from 'vuex';
    import LocalStorageService from '../Services/LocalStorageService';
    export default {
        props: ['todo'],
        name: "TodoItem",
        computed: {
            ...mapState('todos',
                {
                    errors: 'errors'
                }),
        },
        methods: {
            deleteTodo(id) {
                try {
                    let todosFromStorage = LocalStorageService.getFromLocalStorage('todos');
                    let index = todosFromStorage.findIndex(todo => todo.id === id);
                    todosFromStorage.splice(index, 1);
                    LocalStorageService.setLocalStorage('todos', todosFromStorage);
                    this.$store.commit('todos/'+ SET_TODOS);
                } catch (e) {
                    this.$store.commit('todos/' + ADD_ERROR, e);
                }
            },
            completeTodo(id) {
                try {
                    let todosFromStorage = LocalStorageService.getFromLocalStorage('todos');
                    let index = todosFromStorage.findIndex(todo => todo.id === id);
                    todosFromStorage[index].completed = !todosFromStorage[index].completed;
                    LocalStorageService.setLocalStorage('todos', todosFromStorage);
                    this.$store.commit('todos/'+ SET_TODOS);
                    if (this.errors.length) {
                        this.$store.commit('todos/' + CLEAR_ERROR);
                    }
                } catch (e) {
                    this.$store.commit('todos/' + ADD_ERROR, e);
                }
            },
        }
    }
</script>

<style scoped>
    .todo-item{
        display: flex;
        flex-direction: row;
        height: 5vh;
        width: 100%;
    }
    .description{
        display: flex;
        align-items: center;
        padding: 0 2% 0 2%;
        height: 99%;
        width: 100%;
        font: 2vh arial, sans-serif;
        background-color: rgba(227, 233, 232, 0.9);
        border: 0.01vh solid rgba(177,183,182,0.87)
    }
    .description:hover{
        background-color: rgba(208, 214, 213, 0.9);
    }
    .completeDesrc{
        text-decoration: line-through;
        display: flex;
        align-items: center;
        padding: 0 2% 0 2%;
        height: 99%;
        width: 100%;
        font: 2vh arial, sans-serif;
        background-color: rgba(210, 233, 203, 0.9);
        border: 0.01vh solid rgba(177,183,182,0.87)
    }
    .completeDesrc:hover{
        background-color: rgba(178, 220, 162, 0.9);
    }
    .delete{
        margin: 0 !important;
        height: 99% !important;
        width: 10% !important;
    }
</style>