import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Article from './components/article'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(mavonEditor)

Vue.component('Article', Article)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
