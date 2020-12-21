import Vue from 'vue'
import VueRouter from 'vue-router'
// import { AuthHeader } from '../services/StorageService'

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
  { path: "*", component: Page404 }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/*router.beforeEach((to, from, next) => {
  const publicPages = ['/sign-in', '/sign-up']
  const authRequired = !publicPages.includes(to.path)
  const token = AuthHeader.getAuthData()
  const loggedIn = !!token

  if (authRequired && !loggedIn) {
    return next({
      path: '/sign-in',
      query: { redirect: to.fullPath }
    })
  } else if (!authRequired && loggedIn) { 
    return next('/')
  } else {
    return next()
  }
})*/

export default router
