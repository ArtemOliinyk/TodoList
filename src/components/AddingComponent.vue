<template lang="pug">
    v-btn(@click="sendDataToApp" color="blue darken-2" dark)
        v-icon(dark) add
        | Add Task
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
    inject: ["onForm"],
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
            },
        }
    },
    methods: {
        ...mapMutations("todos", [names.ADD_TODO]),
        addTodo() {
            if (this.validation()){
                let newTodoItem = {
                    id: Math.floor(Math.random() * 1000 + 1), //random number between 1 and 1000
                    title: this.inputData.title,
                    task: this.inputData.task,
                    completed: false
                };
                this.ADD_TODO(newTodoItem);
                this.inputData.title = "";
                this.inputData.task = "";
                this.onForm({isShowDialog: false});
            }
        },
        sendDataToApp() {
          this.onForm({
              dataForm: this.dataForm,
              inputData: this.inputData,
              action: this.addTodo,
              isShowDialog: true,
          })
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
