<template>
    <div class="todo-item">
        <div class="description" :class="changeCompletedStyle" @click="completeTodo(todo.id)">
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
    import {names} from '../store/names/todo';
    import {mapState} from 'vuex';
    export default {
        props: {
            todo: Object
        },
        name: "TodoListItem",
        computed: {
            ...mapState('todos', ['error']),
            changeCompletedStyle(){
                return this.todo.completed ? 'completeDesrc' : 'description'
            }
        },
        methods: {
            deleteTodo(id) {
                this.$store.commit('todos/' + names.DELETE_TODO, id);
            },
            completeTodo(id) {
                this.$store.commit('todos/' + names.COMPLETE_TODO, id);
                if (this.error) {
                    this.$store.commit('todos/' + names.CLEAR_ERROR);
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
        background-color: rgba(199, 233, 191, 0.9);
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