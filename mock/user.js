
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
  visitor: {
    token: 'visitor-token'
  }
}

const users = {
  'admin-token': {
    permissionRoutesMap: [{
      path: '/permissionTest',
      component: 'Layout',
      redirect: '/permissionTest/menu1/menu1-1',
      name: 'PermissionTest',
      alwaysShow: true,
      meta: {
        title: '权限测试页',
        icon: 'lock'
      },
      children: [
        {
          path: 'menu1',
          component: 'Menu1',
          name: 'Menu1',
          meta: { title: 'Menu1' },
          children: [
            {
              path: 'menu1-1',
              component: 'Menu1c1',
              name: 'Menu1c1',
              meta: { title: 'Menu1-1' }
            },
            {
              path: 'menu1-2',
              component: 'Menu1c2',
              name: 'Menu1c2',
              meta: { title: 'Menu1-2' },
              children: [
                {
                  path: 'menu1-2-1',
                  component: 'Menu1c2c1',
                  name: 'Menu1c2c1',
                  meta: { title: 'Menu1-2-1' }
                },
                {
                  path: 'menu1-2-2',
                  component: 'Menu1c2c2',
                  name: 'Menu1c2c2',
                  meta: { title: 'Menu1-2-2' }
                }
              ]
            },
            {
              path: 'menu1-3',
              component: 'Menu1c3',
              name: 'Menu1c3',
              meta: { title: 'Menu1-3' }
            }
          ]
        },
        {
          path: 'menu2',
          name: 'Menu2',
          component: 'Menu2',
          meta: { title: 'menu2' }
        }
      ]
    }],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    permissionRoutesMap: [{
      path: '/permissionTest',
      component: 'Layout',
      redirect: '/permissionTest/menu1/menu1-1',
      name: 'PermissionTest',
      alwaysShow: true,
      meta: {
        title: '权限测试页',
        icon: 'lock'
      },
      children: [
        {
          path: 'menu1',
          component: 'Menu1',
          name: 'Menu1',
          meta: { title: 'Menu1' },
          children: [
            {
              path: 'menu1-1',
              component: 'Menu1c1',
              name: 'Menu1c1',
              meta: { title: 'Menu1-1' }
            },
            {
              path: 'menu1-2',
              component: 'Menu1c2',
              name: 'Menu1c2',
              meta: { title: 'Menu1-2' },
              children: [
                {
                  path: 'menu1-2-1',
                  component: 'Menu1c2c1',
                  name: 'Menu1c2c1',
                  meta: { title: 'Menu1-2-1' }
                }
                /* {
                  path: 'menu1-2-2',
                  component: 'Menu1c2c2',
                  name: 'Menu1c2c2',
                  meta: { title: 'Menu1-2-2' }
                } */
              ]
            },
            {
              path: 'menu1-3',
              component: 'Menu1c3',
              name: 'Menu1c3',
              meta: { title: 'Menu1-3' }
            }
          ]
        }
        /* {
          path: 'menu2',
          name: 'Menu2',
          component: 'Menu2',
          meta: { title: 'menu2' }
        } */
      ]
    }],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'visitor-token': {
    permissionRoutesMap: [],
    introduction: 'I am an visitor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'visitor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body

      // 用户校验，规则自定义
      const token = tokens[username]
      if (token) {
        if (password.length) {
          return { // 登陆成功
            code: 20000,
            message: '登陆成功',
            data: token
          }
        } else {
          return {
            code: 60203,
            message: '密码错误'
          }
        }
      } else {
        return {
          code: 60204,
          message: '不存在此用户'
        }
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
