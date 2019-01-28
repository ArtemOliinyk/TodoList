<template lang="pug">
    v-layout(row)
        v-flex(xs12)
            v-list.pa-0(two-line style="background-color:#fafafa")
                v-layout(column reverse)
                    div(v-for="(todo, index) in filteredTodos" :key="todo.id")
                        TodoListItem(:todo="todo" :index="index")
                        v-divider
</template>
<script>
import { names } from "../store/names/todo";
import { mapGetters, mapMutations} from 'vuex';
import TodoListItem from "./TodoListItem";
export default {
    name: "TodoList",
    components: {
        TodoListItem
    },
    computed: {
        ...mapGetters("todos", ["filteredTodos"])
    },
    methods: {
        ...mapMutations("todos", [names.INITIAL_TODOS]),
    },
    created() {
        this.INITIAL_TODOS();
        },
};
</script>

<style scoped></style>
