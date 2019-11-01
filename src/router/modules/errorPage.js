// 错误提示页

import Layout from '@/layout'

const errorPage_routes = {
  path: '/error',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ErrorPages',
  meta: {
    title: '错误页',
    icon: '404'
  },
  children: [
    {
      path: '404',
      name: 'Page404',
      component: () => import('@/views/error-page/404'),
      meta: { title: '404' }
    },
    {
      path: '401',
      name: 'Page401',
      component: () => import('@/views/error-page/401'),
      meta: { title: '401' }
    }
  ]
}

export default errorPage_routes
