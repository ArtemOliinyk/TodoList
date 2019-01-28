<template lang="pug">
    div
        v-layout(align-center px-2)
            v-flex(xs6)
                v-radio-group(:value="filter" @change="filterChange" row)
                    v-radio(label="All" value="all" color="black")
                    v-radio(label="Completed" value="completed" color="green")
                    v-radio(label="Not Completed" value="notCompleted" color="red")
            v-layout(justify-end row)
                v-flex(xs9)
                    v-btn(small color="green darken-1" dark @click="completeAllTodos")
                        v-icon done_all
                        span Complete all
                    v-btn(small color="red darken-1" dark @click="deleteCompletedTodos")
                        v-icon done_all
                        span Delete completed
                    v-btn(small color="red darken-1" dark @click="deleteAllTodos")
                        v-icon delete_forever
                        span Delete All
        include ../assets/pugTemplates/SnackBarTemplate.pug
</template>

<script>
import { names } from "../store/names/todo";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "NavigationBar",
    computed: {
        ...mapState("todos", ["todos", "filter"]),
        ...mapGetters("todos", ["getCompletedTodos", "getRemainedTodos"]),
    },
    data() {
        return {
            error: {
                message: "",
                show: false
            }
        };
    },
    methods: {
        ...mapMutations("todos", [names.SET_FILTER, names.SET_TODOS]),
        ...mapActions("todos", [names.COMPLETE_TODOS, names.DELETE_TODOS]),
        filterChange(value) {
            this.SET_FILTER(value);
        },
        completeAllTodos() {
            if ( this.todos.every( todo => todo.completed )) {
                return (this.error = { message: "All todos are completed yet!", show: true});
            }
            this.COMPLETE_TODOS(this.getRemainedTodos);
        },
        deleteCompletedTodos() {
            if (!this.getCompletedTodos.length) {
                return (this.error = { message: "There are no completed todos! Please click on a todo to do it completed", show: true});
            }
            this.SET_TODOS(this.getRemainedTodos);
        },
        deleteAllTodos() {
            if (!this.todos.length) {
                return (this.error = { message: "There are no todos!", show: true });
            }
            this.DELETE_TODOS(this.todos);
        }
    }
};
</script>

<style scoped></style>
