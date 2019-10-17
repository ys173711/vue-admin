import { asyncRoutes, constantRoutes, errorRoutes } from '@/router'
// import { Message } from 'element-ui'
// import _ from 'lodash'

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
 * 将请求得到的用户 权限路由表 映射到我们前端的动态routes对象
 * @param {collection} routesTable 前端存一份完整权限表
 * @param {collection} routes 数组里元素是json对象格式
 */
const filterRoutesMap = (routesTable, routes) => {
  // btnArr存放 fn 执行时的用户按钮权限id
  const btnArr = []
  const fn = (routesTable, routes) => {
    const arr = []
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].menuType === 'F') {
        btnArr.push(routes[i].menuId)
      } else {
        for (let j = 0; j < routesTable.length; j++) {
          if (routesTable[j].menuId === routes[i].menuId) {
            if (routes[i].children.length > 0) {
              routesTable[j].children = fn(routesTable[j].children, routes[i].children)
            }
            arr.push(routesTable[j])
          }
        }
      }
    }
    return arr
  }
  const routesArr = fn(routesTable, routes)
  return { routesArr, btnArr }
}

const state = {
  routes: [], // 用户的所有路由表
  addRoutes: [], // 用户动态加载的权限路由
  permission_button: [], // 用户的权限按钮
  permission_status: false // 用户的权限表状态
}

const mutations = {
  SET_PERMISSION_ADD_ROUTES: (state, routes) => {
    state.addRoutes = routes
  },
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes).concat(errorRoutes)
  },
  SET_PERMISSION_BUTTON: (state, btnArr) => {
    state.permission_button = btnArr
  },
  SET_PERMISSION_STATUS: (state, status) => {
    state.permission_status = status
  }
}

const actions = {
  generatePermissionRoutes({ commit }, routes) { // 初始化用户的权限路由
    return new Promise(resolve => {
      let routesMap, temp
      if (routes === undefined || (Array.isArray(routes) && routes.length === 0)) {
        routesMap = []
      } else {
        temp = filterRoutesMap(asyncRoutes, routes)
        routesMap = temp.routesArr

        commit('SET_PERMISSION_ADD_ROUTES', routesMap)
        commit('SET_ROUTES', routesMap)
        commit('SET_PERMISSION_BUTTON', temp.btnArr)
      }
      // 当vuex使用严格模式时，动态添加路由的时候使用deepClone就可以了，因为vue-router不会通过提交mutation改变路由对象
      commit('SET_PERMISSION_STATUS', true)
      resolve(routesMap.concat(errorRoutes))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
