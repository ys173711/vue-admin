import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import errorPage_routes from './modules/errorPage'
import permissionTest_routes from './modules/permissionTest'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   默认 false ，当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面
 * redirect: noRedirect           当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * alwaysShow: true               当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                若你想不管路由下面的 children 声明的个数都显示你的根路由，你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * name:'router-name'             设置路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题，比如本项目的快捷导航（标签栏导航），keep-alive 和 router-view 是强耦合的，keep-alive 的 include 默认优先匹配组件的 name ，所以路由和对应的组件一定保持name一致，默认不写name就不会被缓存
 * meta : {
    title: 'title'                设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'              设置该路由的svg图标
    breadcrumb: false             默认true，如果设置为false，则不会在breadcrumb面包屑中显示
    noCache: true                 默认false，如果设置为true，则不会被<keep-alive> 缓存
    activeMenu: '/example/list'   如果设置了，侧边栏会高亮显示你设置的path
  }
    affix: true                   默认false，若true则被固定在快捷导航 tags-view 组件中，不会被移除
 */

// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
// detail: https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { title: 'login', icon: 'login' }
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '外链', icon: 'link' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'NestedMenu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'NestedMenu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'NestedMenu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'NestedMenu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'NestedMenu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'NestedMenu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'NestedMenu2',
        meta: { title: 'Menu2' }
      }
    ]
  },

  {
    path: '/systemManagement',
    component: Layout,
    // alwaysShow: true, // will always show the root menu
    redirect: '/systemManagement/userManagement',
    name: 'SystemManagement',
    meta: { title: '系统管理', icon: 'systemManagement' },
    children: [
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () => import('@/views/table/index'),
        meta: { title: '用户管理', icon: 'userManagement' }
      },
      {
        path: 'permissionConfig',
        name: 'PermissionConfig',
        component: () => import('@/views/tree/index'),
        meta: { title: '权限管理', icon: 'permissionConfig' }
      }
    ]
  },

  /* Router Modules */
  errorPage_routes

]

/**
 * asyncRoutes
 * 需要根据 用户角色权限 动态加载的路由
 */
export const asyncRoutes = [
  /* Router Modules */
  permissionTest_routes
]

/**
 * errorRoutes
 * 拼接在最后面
 */
export const errorRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // vue-router 默认 hash 模式，使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载
  // mode: 'history', // require service support
  routes: constantRoutes,
  scrollBehavior() { // 这个功能只在 history 模式下可用
    return { y: 0 }
  }
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
