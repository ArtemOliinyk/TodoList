<template lang="pug">
    v-form(v-if="formData.isShowDialog" v-model="isFormValid")
        v-dialog(v-model="formData.isShowDialog" persistent max-width="600px")
            v-card
                v-card-title
                    span.headline {{formData.dataForm.title}}
                v-card-text
                    v-container(grid-list-md)
                        include  ../assets/pugTemplates/FormTemplate.pug
                    small *indicates required field
                v-card-actions
                    v-spacer
                    v-btn(@click="formData.changeShowDialog" color="blue darken-1" flat ) Close
                    v-btn(@click="formData.action()" color="blue darken-1" flat :disabled="!isFormValid") {{formData.dataForm.nameButton}}

</template>

<script>
    export default {
        name: "TodoItemForm",
        props: {
            formData: {
                type:Object,
            },
        },
        data() {
            return {
                isFormValid: false,
            }
        },
        computed:{
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
        }
    }
</script>

<style scoped>

</style>