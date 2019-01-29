<template lang="pug">
    v-btn(@click="sendDataToApp" color="blue darken-2" dark)
        v-icon(dark) add
        | Add Task
</template>

<script>
import { names } from "../store/names/todo";
import { mapMutations } from "vuex";
export default {
    name: "AddingComponent",
    components: {
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
    }
};
</script>

<style scoped></style>
