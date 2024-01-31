import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueElectron from './vue_electron';
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueElectron)

Vue.prototype.$http = axios
Vue.prototype.$version = "0.1.0"

import {ipcRenderer} from 'electron'

// 初始化Steam信息
ipcRenderer.send('getSteamPath', "")

// 获取Steam路径
ipcRenderer.on('steamPath_result', (_, data) => {
  Vue.prototype.$steamPath = data
})
// 获取SteamLibrary路径
ipcRenderer.on('steamLibraryInfo',(_,data)=>{
  Vue.prototype.$steamLibrary = data
})
// 获取SteamUserInfo
ipcRenderer.on('steamUserInfo',(_,data)=>{
  Vue.prototype.$steamUser = data
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
