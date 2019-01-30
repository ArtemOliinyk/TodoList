<template lang="pug">
    v-form(v-if="formDialog" v-model="isFormValid")
        v-dialog(v-model="formDialog" persistent max-width="600px")
            v-card
                v-card-title
                    span.headline {{title}}
                v-card-text
                    v-container(grid-list-md)
                        include  ../assets/pugTemplates/FormTemplate.pug
                    small *indicates required field
                v-card-actions
                    v-spacer
                    v-btn(@click="close" color="blue darken-1" flat ) Close
                    v-btn(@click="action" color="blue darken-1" flat :disabled="!isFormValid") Save

</template>

<script>
import { names } from "../store/names/todo";
import { mapState, mapMutations } from "vuex";
export default {
    name: "TodoItemForm",
    inject: ["taskView"],
    data() {
        return {
            isFormValid: false,
        }
    },
    props: {
        todo: {
            type: Object
        },
        formMode: {
            type: String
        },
        formDialog: {
            type: Boolean
        }
    },
    computed: {
        ...mapState("todos", ["todos"]),
        title() {
            if (this.formMode === "adding"){
                return "Add task";
            }
            else return "Edit Task"
        },
        action() {
            if (this.formMode === "adding") {
                return this.addTodo;
            }
            else return this.editTodo;
            },
        rules() {
            return {
                titleRules: [
                    v => !!v || 'Task title is required',
                ],
                taskRules: [
                    v => !!v || 'Task is required',
                ],
            }
        }
    },
    methods: {
        ...mapMutations("todos", [names.ADD_TODO, names.EDIT_TODO]),
        addTodo() {
            let newTodoItem = {
                id: Math.floor(Math.random() * 1000 + 1), //random number between 1 and 1000
                title: this.todo.title,
                task: this.todo.task,
                completed: false
            };
            this.ADD_TODO(newTodoItem);
            this.todo.title = "";
            this.todo.task = "";
            this.taskView(null, null, false);
        },
        editTodo() {
            let index = this.todos.findIndex(item => item.id === this.todo.id);
            this.EDIT_TODO({ index: index, todo: this.todo });
            this.taskView(null, null, false);
        },
        close() {
            this.taskView(null, null, false);
        }
    }
}
</script>

<style scoped>

</style>