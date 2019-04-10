import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/prop',
      name: 'Prop',
      component: resolve => require(['@/components/props/parent'], resolve)
    }, {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/logins/index'], resolve)
    }, {
      path: '/logins',
      name: 'logins',
      component: resolve => require(['@/views/login/index'], resolve)
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
    }
  ]
})
