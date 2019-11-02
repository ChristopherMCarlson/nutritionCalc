import Vue from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
// @ts-ignore
Vue.use(require('vue-moment'));


Vue.config.productionTip = false

// @ts-ignore
new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("authenticate");
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
