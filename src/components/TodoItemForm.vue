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
    export default {
        name: "TodoItemForm"
    }
</script>

<style scoped>

</style>