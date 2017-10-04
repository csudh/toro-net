import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)
import App from './components/App.vue'
import Home from './components/Home.vue'
import Counter from './components/Counter.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/counter', component: Counter },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
  ]
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
