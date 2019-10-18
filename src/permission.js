import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 禁用进度环

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // debugger  // eslint-disable-line

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否已获得其权限角色
      if (store.getters.permission_status) {
        next()
      } else {
        try {
          const { permissionRoutesMap } = await store.dispatch('user/getInfo')
          // 根据用户拿到 动态权限路由
          const accessRoutes = await store.dispatch('permission/generatePermissionRoutes', permissionRoutesMap)
          // 动态添加有权访问的路由
          router.addRoutes(accessRoutes)
          // 这里还有一个小hack的地方，就是router.addRoutes之后的next()可能会失效，因为可能next()的时候路由并没有完全add完成
          // hack方法 确保 addRoutes 已完成，设置 replace: true 则history记录不会新增，而是替代上条记录
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
