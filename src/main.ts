import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mapboxgl from 'mapbox-gl';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/index.scss';

// plugins
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
