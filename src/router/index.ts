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
      } else if (TokenService.isExpired()) {
        alert('O seu acesso foi expirado e estará sendo redirecionado para a página de login')
        next('/login')
        return
      }
      next(from.path)
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
      } else if (TokenService.isExpired()) {
        alert('O seu acesso foi expirado e estará sendo redirecionado para a página de login')
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
