<template lang="pug">
    extends ../assets/pugTemplates/DialogTemplate.pug
    block above
        v-list-tile
            v-list-tile-action
                v-checkbox(v-model="isCompleted")
            v-list-tile-content
                v-list-tile-title {{ todo.title }}
                v-list-tile-sub-title {{ todo.task }}
            v-list-tile-action
                v-flex(column)
                    v-btn.ma-1(@click="dialog = true" small color="blue darken-1" dark)
                        v-icon edit
                    v-btn.ma-1(@click="deleteTodo(todo)" small color="red darken-1" dark )
                        v-icon close
    block title
        span.headline Edit Task
    block action
        v-btn(@click="editTodo(index)" color="blue darken-1" flat ) Save

</template>

<script>
import { names } from "../store/names/todo";
import { formMixin } from "../mixins/formMixin";
import Vue from "vue";
import { mapMutations } from "vuex";
export default {
    props: {
        todo: Object,
        index: Number
    },
    mixins: [formMixin],
    name: "TodoListItem",
    data() {
        return {
            title: this.todo.title,
            task: this.todo.task,
            dialog: false
        };
        },
    computed: {
        isCompleted: {
            get() {
                return this.todo.completed;
                },
            set(value) {
                this.TOGGLE_TODO({ index: this.index, isComplete: value });
            }
        }
        },
    methods: {
        ...mapMutations("todos", [names.TOGGLE_TODO, names.EDIT_TODO, names.DELETE_TODO]),
        editTodo(index) {
            let newTodo = this.todo;
            if (this.title.length && this.task.length) {
                Vue.set(newTodo, "title", this.title);
                Vue.set(newTodo, "task", this.task);
                this.EDIT_TODO({ index: index, todo: newTodo });
                this.dialog = false;
            }
        },
        deleteTodo(todo) {
            this.DELETE_TODO(todo);
        }
    }
};
</script>

<style scoped></style>
