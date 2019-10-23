import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import { Table } from 'element-ui'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'BaiduMap',
    //   component: resolve => require(['@/views/pages/index1'], resolve)
    // }, 
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/views/login/uploadFile'], resolve)
    }, {
      path: '/a',
      name: 'dispatch',
      component: resolve => require(['@/views/dispatch/A'], resolve)
    },{
      path: '/form',
      name: '4Form',
      component: resolve => require(['@/views/form/index'], resolve)
    }, {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/views/test/index'], resolve)
    }, {
      path: '/line',
      name: 'screenline',
      component: resolve => require(['@/views/map/screenLineDefine'], resolve)
    }, {
      path: '/map',
      name: 'map',
      component: resolve => require(['@/views/map/index'], resolve)
    },
    {
      path: '/dmf',
      name: 'dmf',
      component: resolve => require(['@/views/xingneng/index'], resolve)
    },
    {
      path: '/scroll',
      name: 'happy',
      component: resolve => require(['@/views/scroll/index'], resolve)
    },
    {
      path: '/table',
      name: Table,
      component: resolve => require(['@/views/tabledata/list'], resolve)
    }
  ]
})
