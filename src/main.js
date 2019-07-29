import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue';

const SearchPage = () => import('./components/SearchPage.vue');
const DetailsPage = () => import('./components/DetailsPage.vue');

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'search', component: SearchPage },
    { path: '/details/:packageName', name: 'details', component: DetailsPage, props: true }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
