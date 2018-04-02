// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

// router setup
import routes from './routes/routes'

Vue.config.productionTip = false

// plugin setup
Vue.use(VueRouter)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
})

router.beforeEach((to, from, next) => {
  // check if logged in by checking the jwt-token in the browser's local storage
  if (to.matched.some(route => route.meta.requiresAuth) && !localStorage.getItem('jwt-token')) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next(); // if logged in, then continue
  }
});

new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>'
})
