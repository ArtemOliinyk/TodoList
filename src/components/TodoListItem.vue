<template lang="pug">
    v-layout(row)
        v-flex.xs11
            v-list-tile(@click="toggleTodo(todo.completed)" ripple)
                v-list-tile-action
                    v-checkbox(v-model="isCompleted")
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
import { mapMutations } from "vuex";
import Vue from "vue";
import TodoItemForm from "./TodoItemForm";
export default {
    name: "TodoListItem",
    components: {  TodoItemForm },
    inject: ["taskView"],
    props: {
        todo: Object,
        index: Number
    },
    data() {
        return {
            inputData: {
                title: this.todo.title,
                task: this.todo.task,
            },
            dataForm: {
                title: "Edit Task",
                nameButton: "Save"
            },
            formDialog: false
        };
    },
    computed: {
        isCompleted(){
            return this.todo.completed;
        }
    },
    methods: {
        ...mapMutations("todos", [names.TOGGLE_TODO, names.EDIT_TODO, names.DELETE_TODO]),
        deleteTodo(todo) {
            this.DELETE_TODO(todo);
        },
        edit() {
            this.formDialog = true;
            this.taskView({
                inputData: this.inputData,
                dataForm: this.dataForm,
                action: this.editTodo
            }, this.formDialog)
        },
        editTodo(index) {
            let newTodo = this.todo;
            Vue.set(newTodo, "title", this.inputData.title);
            Vue.set(newTodo, "task", this.inputData.task);
            this.EDIT_TODO({ index: index, todo: newTodo });
            this.formDialog = false;
            this.taskView(null, this.formDialog);
        },
        toggleTodo(value){
            this.TOGGLE_TODO({ index: this.index, isComplete: !value });
        }
    }
};
</script>

<style scoped></style>
