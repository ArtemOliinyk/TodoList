export const formMixin = {
    data() {
        return {
            title: '',
            task: '',
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
    methods:{
        validation() {
            if (!this.title.length || !this.task.length) {
                return false
            }
            else if (this.title.length > 20 || this.task.length > 100) {
                return false
            }
            return true;
        }
    }
};