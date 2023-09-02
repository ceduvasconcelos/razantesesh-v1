// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/carrinho',
    name: 'Cart',
    component: () => import('@/views/Cart.vue'),
  },
  {
    path: '/produtos',
    children: [
      {
        path: ':slug',
        name: 'Product',
        component: () => import('@/views/Product.vue'),
        props: true
      },
      {
        path: '',
        name: 'Products',
        component: () => import('@/views/Products.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
