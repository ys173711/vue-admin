const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  // 用户 权限路由表
  permission_addRoutes: state => state.permission.addRoutes,
  permission_routes: state => state.permission.routes,
  // 用户 按钮权限
  permission_button: state => state.permission.permission_button,
  // 用户 权限表状态，是否已经拿到
  permission_status: state => state.permission.permission_status
}
export default getters
