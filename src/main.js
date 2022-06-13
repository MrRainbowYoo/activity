import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Directives from './utils/Directives'
import VueRouter from 'vue-router'
import Main from './components/Main.vue'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.use(Directives)

Vue.use(VueRouter)

// console.log = function() {}

const router = new VueRouter({
  routes : [
    {
      path:'/',
      component: Main
    },
    {
      path:'/thanks',
      component: () => import('./views/Thanks.vue'),
      beforeEnter(to,from, next) {
        console.log(to, from);
        if(localStorage.getItem('done'))
          next()
        else{
          alert('请先答完问题哦')
          next('/')
        }
      }
    },
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
