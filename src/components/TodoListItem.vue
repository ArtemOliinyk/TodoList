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
import Vue from "vue";
import { mapMutations } from "vuex";
import TodoItemForm from "./TodoItemForm";
export default {
    name: "TodoListItem",
    inject: ["onForm"],
    components: {  TodoItemForm },
    props: {
        todo: Object,
        index: Number
    },
    data() {
        return {
            isShowDialog: false,
            inputData: {
                title: this.todo.title,
                task: this.todo.task,
            },
            dataForm: {
                title: "Edit Task",
                nameButton: "Save"
            },
        };
    },
    computed: {
        isCompleted(){
            return this.todo.completed;
        }
    },
    methods: {
        ...mapMutations("todos", [names.TOGGLE_TODO, names.EDIT_TODO, names.DELETE_TODO]),
        editTodo(index) {
            let newTodo = this.todo;
            Vue.set(newTodo, "title", this.inputData.title);
            Vue.set(newTodo, "task", this.inputData.task);
            this.EDIT_TODO({ index: index, todo: newTodo });
            this.onForm({isShowDialog: false});
        },
        deleteTodo(todo) {
            this.DELETE_TODO(todo);
        },
        edit(){
            this.onForm({
                dataForm: this.dataForm,
                inputData: this.inputData,
                action: this.editTodo,
                isShowDialog: true,
            });
        },
        toggleTodo(value){
            this.TOGGLE_TODO({ index: this.index, isComplete: !value });

        }
    }
};
</script>

<style scoped></style>
