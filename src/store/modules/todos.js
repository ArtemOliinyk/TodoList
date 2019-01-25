import {names} from '../names/todo'
import Vue from 'vue';
import LocalStorageService from '../../Services/LocalStorageService';

const state = {
  todos: [],
  filter: 'all'
};
const getters = {
  filteredTodos: (state, getters) => {
    switch (state.filter) {
      case 'complete': return getters.getCompletedTodos;
      case 'notCompleted': return getters.getRemainedTodos;
      default: return state.todos;
    }
  },
  getCompletedTodos: (state) => {
    return state.todos.filter(todo => todo.completed);
  },
  getRemainedTodos: (state) => {
    return state.todos.filter(todo => !todo.completed);
  },
};

const mutations = {
  [names.INITIAL_TODOS]: (state) => {
    state.todos = LocalStorageService.getFromLocalStorage('todos');
  },
  [names.ADD_TODO]: (state, item) => {
    state.todos.push(item);
    LocalStorageService.setLocalStorage('todos',  state.todos);
  },
  [names.SET_TODOS]: (state, data) => {
    LocalStorageService.setLocalStorage('todos',  data);
    state.todos = data;
  },
  [names.DELETE_TODO]: (state, index) => {
    state.todos.splice(index, 1);
    LocalStorageService.setLocalStorage('todos', state.todos);
  },

  [names.EDIT_TODO]: (state, data) => {
    Vue.set(state.todos, data.index, data.todo);
    LocalStorageService.setLocalStorage('todos', state.todos);
  },
  [names.COMPLETE_TODO]: (state, index) => {
    if (!state.todos[index].completed){
      Vue.set(state.todos[index], 'completed', true)
    }
    // state.todos[index].completed = !state.todos[index].completed;
    LocalStorageService.setLocalStorage('todos', state.todos);
  },
  // [names.COMPLETE_ALL_TODOS]: (state) => {
  //   state.todos.forEach((todo) => {
  //     if(!todo.completed)
  //       todo.completed = true;
  //   });
  //   LocalStorageService.setLocalStorage('todos', state.todos);
  // },
  [names.SET_FILTER]: (state, value) => {
    state.filter = value;
  }
};

const actions = {
  [names.DELETE_TODOS]: ( {state,commit}) => {
    for (let i = state.todos.length; i > 0; i--){
      commit(names.DELETE_TODO, state.todos.indexOf(state.todos[i]));
    }
  },
  [names.COMPLETE_ALL_TODOS]: (state, commit) => {
    commit(names.COMPLETE_TODO, )
    state.todos.forEach((todo) => {
      if(!todo.completed)
        todo.completed = true;
    });
  },
};


const namespaced = true;

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}