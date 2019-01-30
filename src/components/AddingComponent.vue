<template lang="pug">
    v-btn(@click="add" color="blue darken-2" dark)
        v-icon(dark) add
        | Add Task
</template>

<script>
import { names } from "../store/names/todo";
import { mapMutations } from "vuex";
export default {
    name: "AddingComponent",
    inject: ["taskView"],
    data() {
        return {
            inputData: {
                title: "",
                task: ""
            },
            dataForm: {
                title: "Add task",
                nameButton: "Add"
            },
            formDialog: false
        }
    },
    methods: {
        ...mapMutations("todos", [names.ADD_TODO]),
        addTodo() {
            let newTodoItem = {
                id: Math.floor(Math.random() * 1000 + 1), //random number between 1 and 1000
                title: this.inputData.title,
                task: this.inputData.task,
                completed: false
            };
            this.ADD_TODO(newTodoItem);
            this.inputData.title = "";
            this.inputData.task = "";
            this.formDialog = false;
            this.taskView(null, this.formDialog);
        },
        add() {
            this.formDialog = true;
            this.taskView({
                inputData: this.inputData,
                dataForm: this.dataForm,
                action: this.addTodo
            }, this.formDialog);
        }
    }
};
</script>

<style scoped></style>
