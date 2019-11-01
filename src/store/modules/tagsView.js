const state = {
  visitedViews: [], // 用户访问过的页面 就是标签栏导航显示的一个个 tag 数组集合
  cachedViews: [] // 实际 keep-alive 的路由。可以在配置路由的时候通过 meta.noCache 来设置是否需要缓存这个路由。默认都缓存。
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
