import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './App.vue';

const SearchPage = () => import('./components/SearchPage.vue');
const DetailsPage = () => import('./components/DetailsPage.vue');

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.config.devtools = true

const router = new VueRouter({
  base: process.env.NODE_ENV === 'production' ? '/package-analyzer-vue/' : '/',
  mode: 'history',
  routes: [
    { path: '/', name: 'search', component: SearchPage },
    { path: '/details/:packageName', name: 'details', component: DetailsPage, props: true }
  ]
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
