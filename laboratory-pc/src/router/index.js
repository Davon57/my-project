import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const routes = [{
  path: '/',
  name: 'login',
  component: () => import('../views/login/loginPc.vue'),
},
{
  path: '/home',
  name: 'Home',
  component: () => import('../views/Home/homePc.vue'),
  children: [{
    path: '/user',
    name: 'User',
    component: () => import('../components/userPc.vue'),
  },
  {
    path: '/laboratory',
    name: 'Laboratory',
    component: () => import('../components/laboratoryPc.vue'),
  },
  {
    path: '/evaluation',
    name: 'Evaluation',
    component: () => import('../components/evaluationPc.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../components/orderPc.vue'),
  },
  ],
  beforeEnter(to, from, next) {
    if (store.state.loginUser.data) {
      // 有用户
      next();
    } else {
      next('/');
    }
  },
},
{
  path: '/404',
  name: '404',
  component: () => import('../views/404Pc.vue'),
},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
