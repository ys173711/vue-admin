// 错误提示页

// import Layout from '@/layout'

const errorPage_routes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true // (默认 false)当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

export default errorPage_routes
