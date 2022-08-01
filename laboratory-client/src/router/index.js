import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  path: '/',
  name: 'login',
  component: function () {
    return import('../views/loginClient.vue')
  }
},
{
  path: '/home',
  name: 'home',
  component: function () {
    return import('../views/homeClient.vue')
  },
  children: [{
    path: '/homePage',
    name: 'homePage',
    component: function () {
      return import('../components/homePage.vue')
    }
  },
  {
    path: '/orderPage',
    name: 'orderPage',
    component: function () {
      return import('../components/orderPage.vue')
    }
  },
  {
    path: '/userPage',
    name: 'userPage',
    component: function () {
      return import('../components/userPage.vue')
    }
  }
  ]
},
{
  path: '/register',
  name: 'register',
  component: function () {
    return import('../views/registerClient.vue')
  }
},
{
  path: '/forget',
  name: 'forget',
  component: function () {
    return import('../views/forgetClient.vue')
  }
},
{
  path: '/orderDetail/:id',
  name: 'orderDetail',
  component: function () {
    return import('../components/orderDetail.vue')
  }
},
{
  path: '/orderRecord',
  name: 'orderRecord',
  component: function () {
    return import('../components/orderRecord.vue')
  }
},
{
  path: '/contactUs',
  name: 'contactUs',
  component: function () {
    return import('../components/contactUs.vue')
  }
},
{
  path: '/feedback',
  name: 'feedback',
  component: function () {
    return import('../components/feedbackPage.vue')
  }
},
{
  path: '/checkOrder',
  name: 'checkOrder',
  component: function () {
    return import('../components/checkOrder.vue')
  }
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
