<template lang="pug">
    div#app
        v-app
            v-layout(column wrap)
                v-flex(xs12)
                    v-layout(justify-center)
                        p.display-2 To Do List
                v-flex(xs12 px-2)
                    v-layout(row wrap)
                        p.headline Tasks: {{todos.length}}
                v-flex(xs12 px-2)
                    v-layout(align-center justify-space-between row wrap)
                        p.headline Completed: {{getCompletedTodos.length}}
                        v-progress-circular(:size="50" :value="progress" color="teal")
                AddingComponent
                NavigationBar
                TodoLIst

</template>/?

<script>
import AddingComponent from './AddingComponent';
  import NavigationBar from './NavigationBar'
  import TodoLIst from './TodoLIst';
  import { mapState, mapGetters } from 'vuex';
export default {
    name: "app",
    components: {
        AddingComponent,
        NavigationBar,
        TodoLIst
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
