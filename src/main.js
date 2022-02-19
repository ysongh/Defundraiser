import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import Donations from './components/project-sections/Donations.vue'
import Comments from './components/project-sections/Comments.vue'
import Announcements from './components/project-sections/Announcements.vue'
import Mint from './components/project-sections/Mint.vue'

Vue.config.productionTip = false
Vue.component('Donations', Donations)
Vue.component('Comments', Comments)
Vue.component('Announcements', Announcements)
Vue.component('Mint', Mint)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
