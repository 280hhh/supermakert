import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Pay from '../components/pay.vue'
import Login from '../components/login.vue'
import List from '../components/good/List.vue'
import Add from '../components/good/Add.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/login',
    children: [{
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/add',
      component: Add
    }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()
})
export default router
