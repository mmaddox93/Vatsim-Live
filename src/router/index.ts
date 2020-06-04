import Vue from 'vue';
import VueRouter from 'vue-router';
import MapHome from '../views/MapHome.vue';
import DevLogin from '../views/DevLogin.vue';
import SectorEditor from '../views/SectorEditor.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MapHome,
  },
  {
    path: '/developer/login',
    name: 'Login',
    component: DevLogin,
  },
  {
    path: '/developer/sector',
    name: 'Sector Editor',
    component: SectorEditor,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
