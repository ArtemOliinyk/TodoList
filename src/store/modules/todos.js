import {ADD_TODO, SET_TODOS, ADD_ERROR, CLEAR_ERROR, INITIAL_TODOS, DELETE_TODOS, DELETE_TODO, COMPLETE_TODO, COMPLETE_ALL_TODOS, SET_FILTER} from '../names/todo'
import Vue from 'vue';
import LocalStorageService from '../../Services/LocalStorageService';

const state = {
  todos: [],
  error: '',
  filter: ''
};
const getters = {
  filteredTodos: (state, getters) => {
    switch (state.filter) {
      case 'complete': return state.todos.filter(todo => todo.completed === true);
      case 'notCompleted': return getters.getRemainedTodos;
      default: return state.todos;
    }
  },
  getRemainedTodos: (state) => {
    return state.todos.filter(todo => todo.completed === false);
  },
};

const mutations = {
  [INITIAL_TODOS]: (state) => {
    state.todos = LocalStorageService.getFromLocalStorage('todos');
  },
  [ADD_TODO]: (state, item) => {
    let localeStore = LocalStorageService.getFromLocalStorage('todos');
    localeStore.push(item);
    LocalStorageService.setLocalStorage('todos',  localeStore);
    state.todos = localeStore;
  },

  [SET_TODOS]: (state, data) => {
    LocalStorageService.setLocalStorage('todos',  data);
    state.todos = LocalStorageService.getFromLocalStorage('todos');
  },
  [DELETE_TODO]: (state, id) => {
    let index = state.todos.findIndex(todo => todo.id === id);
    state.todos.splice(index, 1);
    LocalStorageService.setLocalStorage('todos', state.todos);
  },
  [DELETE_TODOS]: (state) => {
    Vue.set(state, 'todos', []);
    LocalStorageService.setLocalStorage('todos', state.todos);
  },
  [COMPLETE_TODO]: (state, id) => {
    let index = state.todos.findIndex(todo => todo.id === id);
    state.todos[index].completed = !state.todos[index].completed;
    LocalStorageService.setLocalStorage('todos', state.todos);
  },
  [COMPLETE_ALL_TODOS]: (state) => {
    state.todos.forEach((todo) => {
      if(!todo.completed)
        todo.completed = true;
    });
    LocalStorageService.setLocalStorage('todos', state.todos);
  },
  [ADD_ERROR]: (state, error) => {
    state.error = error;
  },
  [CLEAR_ERROR]: (state) => {
    state.error = '';
  },
  [SET_FILTER]: (state, value) => {
    state.filter = value;
  }
};

const namespaced = true;

export default {
  namespaced,
  state,
  getters,
  mutations,
}