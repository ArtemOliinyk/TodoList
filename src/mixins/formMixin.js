export const formMixin = {
    data() {
        return {
            description: '',
            task: '',
            descriptionRules: [v => !!v || 'Task name is required'],
            taskRules: [v => !!v || 'Task is required'],
        }
    }
};