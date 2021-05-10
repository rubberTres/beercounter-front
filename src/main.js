import Vue from 'vue'
import App from './App.vue'
import vuex from './store/store.js'
import { BootstrapVue } from 'bootstrap-vue'
import './App.scss'
Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  store: vuex,
  render: h => h(App),
  mounted() {
    this.$store.dispatch("checkIfLogged");
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getBeerList");
    this.$store.dispatch("getUserRanking");
  }
}).$mount('#app')
