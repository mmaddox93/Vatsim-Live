import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import VueContext from 'vue-context';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mapboxgl from 'mapbox-gl';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/scss/index.scss';

// plugins
Vue.use(VueCompositionApi);

// components
Vue.component('VueContext', VueContext);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
