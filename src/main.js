// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import Vuex from 'vuex'
import Router from 'vue-router'
import Moment from 'vue-moment'
import { sync } from 'vuex-router-sync'
import store from '@/store/'
import router from '@/router'
import App from '@/App'


import { CHECK_LOGIN } from '@/store/user/types'

Vue.config.productionTip = false

Vue.use(Moment)
Vue.use(Router)
Vue.use(Vuex)
Vue.use(ElementUI)

sync(store, router)

Vue.filter('pricelize', function (value) {
  return (parseFloat(value) / 100.0).toFixed(2);
})

Vue.filter('orderStatus', function (value) {
  if (value == 'padding') {
    return '进行中';
  } else if (value == 'success') {
    return '完成';
  } else if (value == 'cancel') {
    return '取消';
  } else {
    return value;
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate() {
    this.$store.dispatch(CHECK_LOGIN);
    this.$moment.locale('zh-CN')
	},
})
