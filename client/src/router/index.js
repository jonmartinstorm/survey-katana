import Vue from 'vue';
import VueRouter from 'vue-router';
import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';
import Home from '../views/Home.vue';
import Details from '../views/Details.vue';
import Statistics from '../views/Statistics.vue';

Vue.use(VueRouter);
Vue.use(Chartkick.use(Chart));

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
  },
  {
    path: '/:articleId',
    name: 'Details',
    component: Details,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
