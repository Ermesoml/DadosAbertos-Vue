// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VueChartkick, { Chartkick })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
