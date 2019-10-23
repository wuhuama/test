import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

// 获取当前环境的BASE_URL
function getUrl () {
  let _tempURL = require('../../url_config/config.json')
  // let _tempURL = await axios.get('/url_config/config.json')
  console.log(_tempURL)
}


const base_url = process.env.NODE_ENV == 'development' ? process.env.BASE_API : getUrl()[process.env.ENV_CONFIG]
console.log(base_url);
// 创建axios实例
const $http = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 50000
})

// request 请求拦截器
$http.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone 响应拦截器
$http.interceptors.response.use(
  /**
   * 以下是通过自定义code来表示请求状态
   */
  response => {
    const res = response.data
    if (res && res.code !== 1) {
      if (res.data && res.data.error) {
        message(res.data.error, 'error')
      }else {
        message(res.msg, 'error')
      }
      return Promise.reject(res)
    }
    return res
  },
  error => {
    const res = error.response
    if (res && res.status) {
      switch (res.status) {
        // 401: 未登录
        // 未登录则跳转登录页面,并携带当前页面的路径,登录成功后返回当前页面,这一步需要在登录页操作
        case 401:
          toLogin()
          break
        case 403:
          // message(res.status + '： 登录过期,请重新登录', 'error')
          // 清除token
          // localStorage.removeItem('token')
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            toLogin()
          }, 1000)
          break
        case 500 || 504:
          // message(res.status + '：服务器错误', 'error')
          break
        default:
          // message(res.status + '： ' + res.msg, 'error')
          break
      }
    }
    console.log('err' + error) // for debug
    return Promise.reject(error)
  })

const toLogin = () => {
  router.replace({
    path: '/login'
  })
}

export function message (text, type) {
  Message({
    message: text,
    type: type,
    duration: 5 * 1000
  })
}

export default $http
