// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import * as Filters from 'utils/filters'

import 'element-ui/lib/theme-chalk/index.css'
import 'styles/index.scss'
import 'assets/icon/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

Object.keys(Filters).forEach(T => Vue.filter(T, Filters[T])) // VUE注册全局filters

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
