import { asyncRoutes, constantRoutes } from '@/router'

/**
 * deep clone
 * 在这里处理 动态路由变化不会通过 vuex 的 mutations 改变路由状态
 * @param {object, array} obj
 * 内部已做类型判断
 */
export function deepClone(obj) {
  if (typeof obj === 'object' && obj !== null) {
    const newObj = Array.isArray(obj) ? [] : {}
    /* for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key])
      }
    } */
    Object.keys(obj).map(key => {
      newObj[key] = deepClone(obj[key])
    })
    return newObj
  } else {
    return obj
  }
}

/**
 * Use meta.role to determine if the current user has permission
 * @param {Array} roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true // 没有权限的页面
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) { // 对路由进行递归
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) { // 初始化用户的权限路由
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) { // 'admin' 默认所有管理员权限
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes) // 动态添加路由的时候使用deepClone就可以了，因为vue-router不会通过提交mutation改变路由对象
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
