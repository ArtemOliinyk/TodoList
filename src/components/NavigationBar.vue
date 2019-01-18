<template>
    <div class="change-todos">
        <v-radio-group v-model="filter" row >
            <v-radio label="All" value="all" color="black"></v-radio>
            <v-radio label="Completed" value="complete" color="green"></v-radio>
            <v-radio label="Not Completed" value="notCompleted" color="red"></v-radio>
        </v-radio-group>

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
    import {SET_TODOS, ADD_ERROR, CLEAR_ERROR, DELETE_TODOS, COMPLETE_ALL_TODOS, SET_FILTER} from '../store/names/todo';
    import {mapState} from 'vuex';

    export default {
        name: "NavigationBar",
        computed: {
            ...mapState('todos', ['todos', 'error',]),
            filter: {
                get () {
                    return this.$store.filter;
                },
                set (value) {
                    this.$store.commit('todos/' + SET_FILTER, value);
                }
            }
        },
        methods:{
            completeAllTodos(){
                if (this.todos.every((todo) => {return todo.completed})){
                    return this.$store.commit('todos/' + ADD_ERROR, 'All todos are completed yet!');
                }
                this.$store.commit('todos/'+ COMPLETE_ALL_TODOS);
                if (this.error) {
                    this.$store.commit('todos/' + CLEAR_ERROR);
                }
            },
            deleteCompletedTodos() {
                if (this.todos.filter(todo => todo.completed === true).length === 0){
                    return this.$store.commit('todos/' + ADD_ERROR, 'There are no completed todos! Please click on a todo to do it completed');
                }
                let notCompletedArray = this.todos.filter(todo => todo.completed === false);
                this.$store.commit('todos/' + SET_TODOS, notCompletedArray);
            },
            deleteAllTodos() {
                if (this.error) {
                    this.$store.commit('todos/' + CLEAR_ERROR);
                }
                if (!this.todos.length){
                    return this.$store.commit('todos/' + ADD_ERROR, 'There are no todos!');
                }
                this.$store.commit('todos/' + DELETE_TODOS);
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