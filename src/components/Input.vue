<template lang="pug">
    extends ../assets/pugTemplates/DialogTemplate.pug
    block above
        v-container.pa-0
            v-layout(justify-center)
                v-btn(color="blue darken-2" dark @click="dialog = true")
                    v-icon(dark) add
                    | Add Task
    block title
        span.headline Add Task
    block action
        v-btn(@click="addTodo" color="blue darken-1" flat ) Add
</template>

<script>
import { names } from "../store/names/todo";
import { formMixin } from "../mixins/formMixin";
export default {
    name: "Input",
    data(){
        return {
            dialog: false
        }
    },
    mixins: [formMixin],
    methods: {
        addTodo() {
            if (this.validation() === true){
                let newTodoItem = {
                    id: Math.floor(Math.random() * 1000 + 1), //random number between 1 and 1000
                    title: this.title,
                    task: this.task,
                    completed: false
                };
                this.$store.commit("todos/" + names.ADD_TODO, newTodoItem);
                this.title = "";
                this.task = "";
                this.dialog = false;
            }
        },
    }
};
</script>

<style scoped></style>
