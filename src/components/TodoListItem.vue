<template lang="pug">
    v-list-tile
        v-list-tile-action
            v-checkbox(v-model="isCompleted")
        v-list-tile-content
            v-list-tile-title {{ todo.title }}
            v-list-tile-sub-title {{ todo.task }}
        v-list-tile-action
            v-flex(column)
                v-btn.ma-1(@click="isShowDialog = true" small color="blue darken-1" dark)
                    v-icon edit
                v-btn.ma-1(@click="deleteTodo(todo)" small color="red darken-1" dark)
                    v-icon close
            v-form(ref="form" v-model="inputData.isFormValid" lazy-validation)
                TodoItemForm(:isShowDialog="isShowDialog" :dataForm="dataForm" :inputData="inputData" :action="editTodo" :changeShowDialog="changeShowDialog")

</template>

<script>
import { names } from "../store/names/todo";
import Vue from "vue";
import { mapMutations } from "vuex";
import TodoItemForm from "./TodoItemForm";
export default {
    props: {
        todo: Object,
        index: Number
    },
    components: {
        TodoItemForm
    },
    name: "TodoListItem",
    data() {
        return {
            isShowDialog: false,
            inputData: {
                title: this.todo.title,
                task: this.todo.task,
                isFormValid: true,
            },
            dataForm: {
                title: "Edit Task",
                nameButton: "Save"
            },
        };
    },
    computed: {
        isCompleted: {
            get() {
                return this.todo.completed;
                },
            set(value) {
                this.TOGGLE_TODO({ index: this.index, isComplete: value });
            }
        }
        },
    methods: {
        ...mapMutations("todos", [names.TOGGLE_TODO, names.EDIT_TODO, names.DELETE_TODO]),
        editTodo(index) {
            let newTodo = this.todo;
            if (this.$refs.form.validate()) {
                Vue.set(newTodo, "title", this.inputData.title);
                Vue.set(newTodo, "task", this.inputData.task);
                this.EDIT_TODO({ index: index, todo: newTodo });
                this.isShowDialog = false;
            }
        },
        changeShowDialog(bool) {
            this.isShowDialog = bool;
        },
        deleteTodo(todo) {
            this.DELETE_TODO(todo);
        }
    }
};
</script>

<style scoped></style>
