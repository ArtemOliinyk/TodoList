<template lang="pug">
    v-btn(@click="add" color="blue darken-2" dark)
        v-icon(dark) add
        | Add Task
</template>

<script>
export default {
    name: "AddingComponent",
    inject: ["taskView"],
    data() {
        return {
            todo: {
                title: "",
                task: ""
            },
            formMode: "adding",
            formDialog: false
        }
    },
    methods: {
        add() {
            this.formDialog = true;
            this.taskView(this.todo, this.formMode, this.formDialog);
        }
    }
};
</script>

<style scoped></style>
