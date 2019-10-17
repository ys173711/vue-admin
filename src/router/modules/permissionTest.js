// 权限测试页面

import Layout from '@/layout'

const permissionTest_routes = {
  path: '/permissionTest',
  component: Layout,
  redirect: '/permissionTest/menu1/menu1-1',
  name: 'PermissionTest',
  alwaysShow: true,
  menuId: '1',
  meta: {
    title: '权限测试页',
    icon: 'lock'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index'),
      name: 'Menu1',
      'menuId': '1_1',
      meta: { title: 'Menu1' },
      children: [
        {
          path: 'menu1-1',
          component: () => import('@/views/nested/menu1/menu1-1'),
          name: 'Menu1-1',
          'menuId': '1_1_1',
          meta: { title: 'Menu1-1' }
        },
        {
          path: 'menu1-2',
          component: () => import('@/views/nested/menu1/menu1-2'),
          name: 'Menu1-2',
          'menuId': '1_1_2',
          meta: { title: 'Menu1-2' },
          children: [
            {
              path: 'menu1-2-1',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
              name: 'Menu1-2-1',
              'menuId': '1_1_2_1',
              meta: { title: 'Menu1-2-1' }
            },
            {
              path: 'menu1-2-2',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
              name: 'Menu1-2-2',
              'menuId': '1_1_2_2',
              meta: { title: 'Menu1-2-2' }
            }
          ]
        },
        {
          path: 'menu1-3',
          component: () => import('@/views/nested/menu1/menu1-3'),
          name: 'Menu1-3',
          'menuId': '1_1_3',
          meta: { title: 'Menu1-3' }
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      'menuId': '1_2',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: 'menu2' }
    }
  ]
}

export default permissionTest_routes
