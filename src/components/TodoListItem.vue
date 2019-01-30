<template lang="pug">
    v-layout(row)
        v-flex.xs11
            v-list-tile(@click="toggleTodo(todo.completed)" ripple)
                v-list-tile-action
                    v-checkbox(v-model="isCompleted" readonly)
                v-list-tile-content
                    v-list-tile-title {{ todo.title }}
                    v-list-tile-sub-title {{ todo.task }}
        v-flex.xs1.mr-1
            v-flex(column)
                v-btn.ma-1(@click="edit" small color="blue darken-1" dark)
                    v-icon edit
                v-btn.ma-1(@click="deleteTodo(todo)" small color="red darken-1" dark)
                    v-icon close
</template>

<script>
import { names } from "../store/names/todo";
import { mapMutations } from 'vuex';
export default {
    name: "TodoListItem",
    inject: ["taskView"],
    props: {
        todo: Object,
        index: Number
    },
    data() {
        return {
            formDialog: false,
            formMode: "editing",
        };
    },
    computed: {
        isCompleted() {
            return this.todo.completed;
        }
    },
    methods: {
        ...mapMutations("todos", [names.DELETE_TODO, names.TOGGLE_TODO]),
        deleteTodo(todo) {
            this.DELETE_TODO(todo);
        },
        edit() {
            this.formDialog = true;
            this.taskView(this.todo, this.formMode, this.formDialog)
        },
        toggleTodo(value){
            this.TOGGLE_TODO({ index: this.index, isComplete: !value });
        }
    }
};
</script>

<style scoped></style>
