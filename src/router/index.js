import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import { Table } from 'element-ui'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BaiduMap',
      component: resolve => require(['@/views/pages/index1'], resolve)
    },{
      path: '/prop',
      name: 'Prop',
      component: resolve => require(['@/components/props/parent'], resolve)
    }, {
      path: '/logins',
      name: 'login',
      component: resolve => require(['@/views/logins/index'], resolve)
    }, {
      path: '/login',
      name: 'logins',
      component: resolve => require(['@/views/form/complexform'], resolve)
    }, {
      path: '/a',
      name: 'dispatch',
      component: resolve => require(['@/views/dispatch/A'], resolve)
    },{
      path: '/menu',
      name: 'Menu',
      component: resolve => require(['@/views/menu/index'], resolve),

      children:[{
        path: 'test',
        component: resolve => require(['@/views/login/index'], resolve)
      }]
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
