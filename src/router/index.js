import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store'

import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import SessionNew from '@/views/SessionNew'
import SessionExisting from '@/views/SessionExisting'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/s/new',
      component: SessionNew,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/s/:id',
      component: SessionExisting,
      meta: {
        requiresAuth: true
      },
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = store.getters['userDoc/signedIn']

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router