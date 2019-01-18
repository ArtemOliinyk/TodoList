import {SET_TODO_FROM_INPUT, CLEAR_INPUT, SET_TODOS, ADD_ERROR, CLEAR_ERROR,} from '../names/todo'
import Vue from 'vue';
import LocalStorageService from '../../Services/LocalStorageService';

const state = {
  todos: [],
  errors: []
};
const getters = {
  getCompletedTodos: (state) => {
    return state.todos.filter(todo => todo.completed === false ).length;
  },
};

const mutations = {

  [SET_TODOS]: (state) => {
    let todosFromLocalStorage = LocalStorageService.getFromLocalStorage('todos');
    Vue.set(state, 'todos', todosFromLocalStorage);
  },
  [ADD_ERROR]: (state, error) => {
    Vue.set(state, 'errors', error);
  },
  [CLEAR_ERROR]: (state) => {
    Vue.set(state, 'errors', '');
  },
};

const namespaced = true;

export default {
  namespaced,
  state,
  getters,
  mutations,
}
