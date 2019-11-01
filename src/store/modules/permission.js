import { constantRoutes, errorRoutes } from '@/router'
// import { Message } from 'element-ui'
// import _ from 'lodash'

const localMap = {
  'Layout': require('@/layout').default,
  'Customer': () => import('@/views/customer'),
  'Set': () => import('@/views/customer/set'),
  'My': () => import('@/views/customer/my'),
  'Sale': () => import('@/views/sale'),
  'Price': () => import('@/views/sale/price'),
  'Order': () => import('@/views/sale/order'),
  'History': () => import('@/views/sale/order/history'),
  'Doing': () => import('@/views/sale/order/doing'),
  'Srm': () => import('@/views/srm'),
  'All': () => import('@/views/srm/all')

}
const handleRoutesMap = serverMap => {
  return serverMap.map((route, i) => {
    const obj = {
      meta: {
        title: route.menuName,
        icon: route.menuIcon
      }
    }
    if (route.parentId === 0) { // 如果是菜单栏根目录
      obj.path = `/${route.menuIcon}`
      obj.name = route.menuIcon.charAt(0).toUpperCase() + route.menuIcon.slice(1)
      obj.component = localMap['Layout'] // 菜单根目录一致用 Layout
    } else {
      route.menuUrl = route.menuUrl === null ? '' : route.menuUrl
      obj.path = route.menuUrl.slice(route.menuUrl.lastIndexOf('/') + 1)
      obj.name = obj.path.charAt(0).toUpperCase() + obj.path.slice(1)
      obj.component = localMap[obj.name]
    }
    if (route.children) {
      if (route.children.length === 1) {
        obj.alwaysShow = true // 子菜单只有一个时，父级菜单也显示
      }
      obj.children = handleRoutesMap(route.children)
    }

    return obj
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
