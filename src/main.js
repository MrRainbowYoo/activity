import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Directives from './utils/Directives'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.use(Directives)

new Vue({
  render: h => h(App),
}).$mount('#app')
