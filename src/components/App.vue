<template lang="pug">
    div#app
        v-app
            div
                p.text-xs-center.display-2 To Do List
                v-layout(column)
                    v-flex
                        span.pl-2.headline Tasks: {{todos.length}}
                        span.pl-4.headline Completed: {{getCompletedTodos.length}}
                        span.pl-4
                            AddingComponent
                    v-flex
                        v-progress-linear(v-model="progress" color="teal")
                NavigationBar
                TodoList
                TodoItemForm(:todo="todo" :formMode="formMode" :formDialog="formDialog")

</template>/?

<script>
import AddingComponent from './AddingComponent';
import NavigationBar from './NavigationBar'
import TodoList from './TodoList';
import { mapState, mapGetters } from 'vuex';
import TodoItemForm from "./TodoItemForm";
export default {
    name: "app",
    data() {
        return {
            todo: {},
            formMode: "",
            formDialog: false,
        }
    },
    provide() {
        return {
            taskView: (todo, formMode, formDialog) => {
                this.todo = {...todo};
                this.formMode = formMode;
                this.formDialog = formDialog;
            }
        }
    },
    components: {
        AddingComponent,
        NavigationBar,
        TodoList,
        TodoItemForm
    },
    computed: {
        ...mapState("todos", ["todos"]),
        ...mapGetters("todos", ["getCompletedTodos"]),
        progress() {
            if (!this.todos.length) {
                return 0;
            }
            return (this.getCompletedTodos.length / this.todos.length) * 100;
        }
    }
};
</script>

<!-- Local CSS -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  display: flex;
  flex-flow: row wrap;
  height: 100%;
}
#app {
  width: 100%;
}
</style>
