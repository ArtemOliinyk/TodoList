<template lang="pug">
    v-form(v-if="formDialog" v-model="isFormValid")
        v-dialog(v-model="formDialog" persistent max-width="600px")
            v-card
                v-card-title
                    span.headline {{todo.dataForm.title}}
                v-card-text
                    v-container(grid-list-md)
                        include  ../assets/pugTemplates/FormTemplate.pug
                    small *indicates required field
                v-card-actions
                    v-spacer
                    v-btn(@click="close" color="blue darken-1" flat ) Close
                    v-btn(@click="todo.action   " color="blue darken-1" flat :disabled="!isFormValid") {{todo.dataForm.nameButton}}

</template>

<script>
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
                type: Object,
            },
            formDialog: {
                type: Boolean
            }
        },
        computed: {
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
            close() {
                this.taskView(null, false);
            }
        }
    }
</script>

<style scoped>

</style>