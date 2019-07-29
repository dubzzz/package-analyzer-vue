import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue';
import { baseUrl } from '../vue.config'

const SearchPage = () => import('./components/SearchPage.vue');
const DetailsPage = () => import('./components/DetailsPage.vue');

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.config.devtools = true

const extractBase = (url) => {
  try {
    const u = new URL(url);
    // eslint-disable-next-line no-console
    console.log(`(success) Extracted base url: `, u.pathname);
    return u.pathname;
  }
  catch (err) {
    // eslint-disable-next-line no-console
    console.log(`(failure) Extracted base url: `, url);
    return url;
  }
}

const router = new VueRouter({
  base: extractBase(baseUrl),
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
