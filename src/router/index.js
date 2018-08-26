import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/views/Dashboard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})

export default router