import Vue from 'vue';
import VueRouter from 'vue-router';
import Map from '../views/Map.vue';
import Data from '../views/Data.vue';
import Weather from '../views/Weather.vue';
import StatisticsView from '../views/Data/StatisticsView.vue';
import PilotsData from '../components/DataComponents/PilotsData.vue';
import ControllersData from '../components/DataComponents/ControllersData.vue';
import FacilityEngineers from '../views/FacilityEngineers.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Map',
    component: Map,
  },
  {
    path: '/data',
    name: 'Data',
    component: Data,
    children: [
      {
        path: '/data/',
        name: 'Statistics',
        component: StatisticsView,
      },
      {
        path: '/data/pilots',
        name: 'Pilots',
        component: PilotsData,
      },
      {
        path: '/data/controllers',
        name: 'Controllers',
        component: ControllersData,
      },
    ],
  },
  {
    path: '/weather',
    name: 'Weather',
    component: Weather,
  },
  {
    path: '/engineers',
    name: 'Facility Engineers',
    component: FacilityEngineers,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = `${to.name} - VATSIM Map` || 'VATSIM Map';
  });
});

export default router;
