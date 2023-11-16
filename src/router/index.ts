// Composables
import { createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import TokenService from '@/service/TokenService'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    beforeEnter: (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
      if (TokenService.isSignedIn() && !TokenService.isExpired() && TokenService.isAdmin()) {
        next();
        return
      }
      next('/login')
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User.vue'),
    beforeEnter: (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
      if (TokenService.isSignedIn() && !TokenService.isExpired()) {
        next();
        return
      }
      next('/login')
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
