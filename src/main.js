import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import announcements from './components/announcements.vue';

Vue.config.productionTip = false
Vue.component('announcements', announcements)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
