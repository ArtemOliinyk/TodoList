import {names} from '../names/todo'
import Vue from 'vue';
import LocalStorageService from '../../Services/LocalStorageService';

const state = {
  todos: [],
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
  [names.INITIAL_TODOS]: (state) => {
    state.todos = LocalStorageService.getFromLocalStorage('todos');
  },
  [names.ADD_TODO]: (state, item) => {
    let localeStore = LocalStorageService.getFromLocalStorage('todos');
    localeStore.push(item);
    LocalStorageService.setLocalStorage('todos',  localeStore);
    state.todos = localeStore;
  },

  [names.SET_TODOS]: (state, data) => {
    LocalStorageService.setLocalStorage('todos',  data);
    state.todos = LocalStorageService.getFromLocalStorage('todos');
  },
  [names.DELETE_TODO]: (state, id) => {
    let index = state.todos.findIndex(todo => todo.id === id);
    state.todos.splice(index, 1);
    LocalStorageService.setLocalStorage('todos', state.todos);
  },
  [names.DELETE_TODOS]: (state) => {
    Vue.set(state, 'todos', []);
    LocalStorageService.setLocalStorage('todos', state.todos);
  },
  [names.COMPLETE_TODO]: (state, id) => {
    let index = state.todos.findIndex(todo => todo.id === id);
    state.todos[index].completed = !state.todos[index].completed;
    LocalStorageService.setLocalStorage('todos', state.todos);
  },
  [names.COMPLETE_ALL_TODOS]: (state) => {
    state.todos.forEach((todo) => {
      if(!todo.completed)
        todo.completed = true;
    });
    LocalStorageService.setLocalStorage('todos', state.todos);
  },
  [names.SET_FILTER]: (state, value) => {
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