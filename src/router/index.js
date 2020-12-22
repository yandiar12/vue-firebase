import Vue from 'vue'
import VueRouter from 'vue-router'
import { storageData } from '../services/StorageService'
// import store from '../store/index'

const Page404 = () => import('@/views/Page404')

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    alias: "/home",
    component: () => import("../views/Home"),
    children: [
      {
        path: "/",
        alias: "/home",
        name: "tutorials",
        component: () => import("../views/tutorials/TutorialsList")
      },
      {
        path: "/add",
        name: "add",
        component: () => import("../views/tutorials/AddTutorial")
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/Register")
  },
  { path: "*", component: Page404 }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const userData = storageData.getAuthData()
  const loggedIn = !!userData

  if (authRequired && !loggedIn) {
    // console.log("must login!")
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (!authRequired && loggedIn) { 
    // console.log("next home!")
    return next('/')
  } else {
    // console.log("next!")
    return next()
  }
})

export default router
