import { constantRoutes, errorRoutes } from '@/router'
// import { Message } from 'element-ui'
// import _ from 'lodash'

const localMap = {
  'Layout': require('@/layout').default,
  'Menu1': () => import('@/views/nested/menu1'),
  'Menu1c1': () => import('@/views/nested/menu1/menu1-1'),
  'Menu1c2': () => import('@/views/nested/menu1/menu1-2'),
  'Menu1c2c1': () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  'Menu1c2c2': () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  'Menu1c3': () => import('@/views/nested/menu1/menu1-3'),
  'Menu2': () => import('@/views/nested/menu2')
}
const handleRoutesMap = serverMap => {
  return serverMap.map((route, i) => {
    route.component = localMap[route.component]
    if (route.children && route.children.length > 0) {
      route.children = handleRoutesMap(route.children)
    }
    return route
  })
}

const state = {
  routes: [], // 用户的所有路由表 (保留)
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
      const routesMap = handleRoutesMap(routes)
      commit('SET_PERMISSION_ADD_ROUTES', routesMap)
      commit('SET_ROUTES', routesMap)
      // commit('SET_PERMISSION_BUTTON', temp.btnArr)
      commit('SET_PERMISSION_STATUS', true)
      resolve(routesMap.concat(errorRoutes))
    })
  },
  resetPermissionRoutes({ commit }) { // 重置用户权限路由
    commit('SET_PERMISSION_STATUS', false)
    commit('SET_PERMISSION_ADD_ROUTES', [])
    commit('SET_ROUTES', [])
    commit('SET_PERMISSION_BUTTON', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
