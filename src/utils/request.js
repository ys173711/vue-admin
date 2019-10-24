import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  ctx => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      ctx.headers['X-Token'] = getToken()
    }
    return ctx
  },
  error => {
    // do something with request error
    console.log(error)
    /* return new Promise((resolve, reject) => {
      reject(error)
    }) */
    return Promise.reject(error) // 把错误抛到外层处理
  }
)

// response拦截器
service.interceptors.response.use(
  /**
   * 通过自定义代码确定请求状态
   */
  ctx => {
    const data = ctx.data
    const res = data.result
    if (res.resultCode !== 0) {
      if (res.resultCode === 20000) {
        Message({
          message: '登录成功',
          type: 'success',
          duration: 5 * 1000
        })
        return data
      }
      if (res.resultCode === 20001) {
        Message({
          message: '登出成功',
          type: 'success',
          duration: 5 * 1000
        })
        return data
      }
      if (res.resultCode === 60203 || res.resultCode === 60204) {
        Message({
          message: res.msg,
          type: 'info',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.message || 'Error'))
      }
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.resultCode === 50008 || res.resultCode === 50012 || res.resultCode === 50014) {
      // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
