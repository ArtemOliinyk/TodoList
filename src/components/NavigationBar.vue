<template>
    <div class="change-todos">
        <v-btn class="button-complete-all" color="green darken-1" dark @click="completeAllTodos">
            <v-icon> done_all</v-icon>
            <span> Complete all todos</span>
        </v-btn>
        <v-btn class="button-delete-completed" color="red darken-1" dark @click="deleteCompletedTodos">
            <v-icon> done_all</v-icon>
            <span> Delete completed</span>
        </v-btn>
        <v-btn class="button-delete-all" color="red darken-1" dark @click="deleteAllTodos">
            <v-icon> delete_forever</v-icon>
            <span> Delete All</span>
        </v-btn>
    </div>
</template>

<script>
    import {SET_TODOS, ADD_ERROR, CLEAR_ERROR} from '../store/names/todo';
    import LocalStorageService from '../Services/LocalStorageService';
    import {mapState} from 'vuex';

    export default {
        name: "NavigationBar",
        computed: {
            ...mapState('todos',
                {
                    errors: 'errors'
                }),
        },
        methods:{
            completeAllTodos(){
                try {
                    let todosFromStorage = LocalStorageService.getFromLocalStorage('todos');
                    if (todosFromStorage.every((todo) => {return todo.completed})){
                        throw 'All todos are completed yet!';
                    }
                    todosFromStorage.forEach((todo) => {
                        todo.completed ? null : todo.completed = true;
                    });
                    LocalStorageService.setLocalStorage('todos', todosFromStorage);
                    this.$store.commit('todos/'+ SET_TODOS);
                    if (this.errors.length) {
                        this.$store.commit('todos/' + CLEAR_ERROR);
                    }
                } catch (e) {
                    this.$store.commit('todos/' + ADD_ERROR, e);
                }
            },
            deleteCompletedTodos() {
                try {
                    let todosFromStorage = LocalStorageService.getFromLocalStorage('todos');
                    if (todosFromStorage.filter(todo => todo.completed === true).length === 0){
                        throw 'There are no completed todos! Please click on a todo to do it completed';
                    }
                    let notCompletedArray = todosFromStorage.filter(todo => todo.completed === false);
                    LocalStorageService.setLocalStorage('todos', notCompletedArray);
                    this.$store.commit('todos/' + SET_TODOS);
                } catch (e) {
                    this.$store.commit('todos/' + ADD_ERROR, e);
                }
            },
            deleteAllTodos() {
                try {
                    if (this.errors.length) {
                        this.$store.commit('todos/' + CLEAR_ERROR);
                    }
                    if (!LocalStorageService.getFromLocalStorage('todos').length){
                        throw 'There are no todos!';
                    }
                    LocalStorageService.removeItemFromLocalStorage('todos');
                    this.$store.commit('todos/' + SET_TODOS);
                } catch (e) {
                    this.$store.commit('todos/' + ADD_ERROR, e);
                }
            },
        }
    }
</script>

<style scoped>
    .change-todos{
        height: 5vh;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin: 0 2vh 2vh 2vh;
        box-sizing: border-box;
    }
    .button-complete-all{
        height: 4.8vh !important;
        margin: 0 1vh 0 0 !important;
        font: 1.4vh arial, sans-serif !important;
    }
    .button-delete-completed{
        height: 4.8vh !important;
        margin: 0 1vh 0 0 !important;
        font: 1.4vh arial, sans-serif !important;
    }
    .button-delete-all{
        height: 4.8vh !important;
        margin: 0 !important;
        font: 1.4vh arial, sans-serif !important;
    }
</style>