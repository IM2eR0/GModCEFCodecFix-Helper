import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/pages/index'
import About from '@/components/pages/about'
import Setting from '@/components/pages/settings'
import FeedBack from '@/components/pages/feedback'
import SetUpMain from '@/components/setup/main'
 
Vue.use(VueRouter)
 
export default new VueRouter({
  routes: [                 //配置路由，这里是个数组
    {                       //每一个链接都是一个对象
        path: '/',         //链接路径
        name: 'Index',     //路由名称，
        component: Index   //对应的组件模板
    },
    {
      path: '/setup',
      name: 'SetUp',
      component: SetUpMain
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
      path: '/feedback',
      name: 'FeedBack',
      component: FeedBack
    },
    {
      path: '/settings',
      name: 'SettingPage',
      component: Setting
    }
  ]
})
