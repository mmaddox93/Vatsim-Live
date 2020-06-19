import Vue from 'vue';
import VueRouter from 'vue-router';
import MapHome from '../views/MapHome.vue';
import DevLogin from '../views/DevLogin.vue';
import SectorEditor from '../views/SectorEditor.vue';
import DivisionDashboard from '../views/DivisionDashboard.vue';
import FallbackRoute from '../views/FallbackRoute.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    name: 'Not Found',
    component: FallbackRoute,
  },
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
  {
    path: '/developer/dashboard/:id',
    name: 'Division Dashboard',
    component: DivisionDashboard,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
