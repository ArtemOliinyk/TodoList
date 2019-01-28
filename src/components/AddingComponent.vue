<template lang="pug">
    v-container.pa-0
        v-layout(justify-center)
            v-btn(@click="isShowDialog = true" color="blue darken-2" dark )
                v-icon(dark) add
                | Add Task
        v-form(ref="form" v-model="inputData.isFormValid" lazy-validation)
            TodoItemForm(:isShowDialog="isShowDialog" :dataForm="dataForm" :inputData="inputData" :action="addTodo" :changeShowDialog="changeShowDialog")
</template>

<script>
import { names } from "../store/names/todo";
import { mapMutations } from "vuex";
import TodoItemForm from "./TodoItemForm";
export default {
    name: "AddingComponent",
    components: {
        TodoItemForm
    },
    data() {
        return {
            isShowDialog: false,
            dataForm: {
                title: "Add task",
                nameButton: "Add"
            },
            inputData: {
                title: "",
                task: "",
                isFormValid: true,
            },
        }
    },
    methods: {
        ...mapMutations("todos", [names.ADD_TODO]),
        addTodo() {
            if (this.$refs.form.validate()){
                let newTodoItem = {
                    id: Math.floor(Math.random() * 1000 + 1), //random number between 1 and 1000
                    title: this.inputData.title,
                    task: this.inputData.task,
                    completed: false
                };
                this.ADD_TODO(newTodoItem);
                this.inputData.title = "";
                this.inputData.task = "";
                this.isShowDialog = false;
            }
        },
        changeShowDialog(bool) {
            this.isShowDialog = bool;
        },
        validation() {
            if (!this.inputData.title.length || !this.inputData.task.length) {
                return false
            }
            else if (this.inputData.title.length > 20 || this.inputData.task.length > 100) {
                return false
            }
            return true;
        }
    }
};
</script>

<style scoped></style>
