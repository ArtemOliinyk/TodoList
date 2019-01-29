<template lang="pug">
    div#app
        v-app
            div
                p.text-xs-center.display-2 To Do List
                v-layout(column)
                    v-flex
                        span.pr-4.headline Tasks: {{todos.length}}
                        span.pr-4.headline Completed: {{getCompletedTodos.length}}
                        span.pr-4
                            AddingComponent
                    v-flex
                        v-progress-linear(v-model="progress" color="teal")
                NavigationBar
                TodoList
                TodoItemForm(:formData="formData")

</template>/?

<script>
import AddingComponent from './AddingComponent';
import NavigationBar from './NavigationBar'
import TodoList from './TodoList';
import { mapState, mapGetters } from 'vuex';
import TodoItemForm from "./TodoItemForm";
export default {
    name: "app",
    provide() {
        return {
            onForm: (formData) =>  this.formData = {...this.formData,...formData}
        }
    },
    data() {
        return {
            formData: {
                isShowDialog:false,
                changeShowDialog: () =>this.formData.isShowDialog = false
            },
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
