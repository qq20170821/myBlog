import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决重复触发一个路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/home',
    name: 'layout',
    component: () => import(/* webpackChunkName: "layout" */ '../layout/index.vue'),
    redirect: '/find',
    children: [
      {
        path: '/find',
        name: 'find',
        component: () => import(/* webpackChunkName: "find" */ '../views/find.vue')
      },
      {
        path: '/write',
        name: 'write',
        component: () => import(/* webpackChunkName: "write" */ '../views/write.vue')
      },
      {
        path: '/profile/:userId',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/profile.vue')
      },
      {
        path: '/articleDetail',
        name: 'articleDetail',
        component: () => import(/* webpackChunkName: "articleDetail" */ '../views/articleDetail.vue')
      },
      {
        path: '/attention',
        name: 'attention',
        component: () => import(/* webpackChunkName: "attention" */ '../views/attention.vue')
      },
      {
        path: '/message',
        name: 'message',
        component: () => import(/* webpackChunkName: "message" */ '../views/message.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import(/* webpackChunkName: "my" */ '../views/my.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
  console.log(to)
  console.log(userInfo)
  if (to.path == '/login') {
    if (userInfo.token) {
      router.push('/home')
    }
    next()
  } else {
    if (!userInfo.token) {
      router.push('/login')
    }
    next()
  }
})

export default router
