import Vue from 'vue'
import App from './components/App.vue'
import store from './store/index'
import Vuetify from 'vuetify'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.css'

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
