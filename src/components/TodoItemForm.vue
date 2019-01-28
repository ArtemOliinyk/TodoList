<template lang="pug">
    v-dialog(v-model="isShowDialog" persistent max-width="600px")
        v-card
            v-card-title
                span.headline {{dataForm.title}}
            v-card-text
                v-container(grid-list-md)
                    include  ../assets/pugTemplates/FormTemplate.pug
                small *indicates required field
            v-card-actions
                v-spacer
                v-btn(@click="changeShowDialog(false)" color="blue darken-1" flat ) Close
                v-btn(@click="action()" color="blue darken-1" flat :disabled="!inputData.isFormValid") {{dataForm.nameButton}}

</template>

<script>
    export default {
        name: "TodoItemForm",
        props: {
            isShowDialog: Boolean,
            dataForm: Object,
            inputData: Object,
            action: Function,
            changeShowDialog: Function
        },
        data() {
            return {
                titleRules: [
                    v => !!v || 'Task title is required',
                    v => (v && v.length <= 20) || 'Title must be less than 20 characters'
                ],
                taskRules: [
                    v => !!v || 'Task is required',
                    v => (v && v.length <= 100) || 'Task must be less than 150 characters'
                ],
            }
        },

    }
</script>

<style scoped>

</style>