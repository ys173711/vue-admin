
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
    'result': {
      'resultCode': 0,
      'msg': 'success',
      'resultData': null
    },
    'menus': [
      {
        'id': 1,
        'parentId': 0,
        'menuName': '客户管理',
        'menuIcon': 'customer',
        'menuUrl': null,
        'menuSort': 0,
        'children': [
          {
            'id': 4,
            'parentId': 1,
            'menuName': '客户设置',
            'menuIcon': null,
            'menuUrl': 'customer/set',
            'menuSort': 0,
            'children': null
          },
          {
            'id': 5,
            'parentId': 1,
            'menuName': '我的客户',
            'menuIcon': null,
            'menuUrl': 'customer/my',
            'menuSort': 1,
            'children': null
          }
        ]
      },
      {
        'id': 2,
        'parentId': 0,
        'menuName': '销售管理',
        'menuIcon': 'sale',
        'menuUrl': null,
        'menuSort': 1,
        'children': [
          {
            'id': 6,
            'parentId': 2,
            'menuName': '报价',
            'menuIcon': null,
            'menuUrl': 'sale/price',
            'menuSort': 0,
            'children': null
          },
          {
            'id': 7,
            'parentId': 2,
            'menuName': '订单',
            'menuIcon': null,
            'menuUrl': 'sale/order',
            'menuSort': 1,
            'children': [
              {
                'id': 9,
                'parentId': 7,
                'menuName': '历史订单',
                'menuIcon': null,
                'menuUrl': 'sale/order/history',
                'menuSort': 0,
                'children': null
              },
              {
                'id': 10,
                'parentId': 7,
                'menuName': '正在跟进订单',
                'menuIcon': null,
                'menuUrl': 'sale/order/doing',
                'menuSort': 1,
                'children': null
              }
            ]
          }
        ]
      },
      {
        'id': 3,
        'parentId': 0,
        'menuName': '供应商管理',
        'menuIcon': 'srm',
        'menuUrl': null,
        'menuSort': 2,
        'children': [
          {
            'id': 8,
            'parentId': 3,
            'menuName': '全部供应商',
            'menuIcon': null,
            'menuUrl': 'srm/all',
            'menuSort': 0,
            'children': null
          }
        ]
      }
    ],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    'result': {
      'resultCode': 0,
      'msg': 'success',
      'resultData': null
    },
    'menus': [
      {
        'id': 1,
        'parentId': 0,
        'menuName': '客户管理',
        'menuIcon': 'customer',
        'menuUrl': null,
        'menuSort': 0,
        'children': [
          {
            'id': 4,
            'parentId': 1,
            'menuName': '客户设置',
            'menuIcon': null,
            'menuUrl': 'customer/set',
            'menuSort': 0,
            'children': null
          },
          {
            'id': 5,
            'parentId': 1,
            'menuName': '我的客户',
            'menuIcon': null,
            'menuUrl': 'customer/my',
            'menuSort': 1,
            'children': null
          }
        ]
      },
      {
        'id': 2,
        'parentId': 0,
        'menuName': '销售管理',
        'menuIcon': 'sale',
        'menuUrl': null,
        'menuSort': 1,
        'children': [
          {
            'id': 6,
            'parentId': 2,
            'menuName': '报价',
            'menuIcon': null,
            'menuUrl': 'sale/price',
            'menuSort': 0,
            'children': null
          },
          {
            'id': 7,
            'parentId': 2,
            'menuName': '订单',
            'menuIcon': null,
            'menuUrl': 'sale/order',
            'menuSort': 1,
            'children': [
              /* {
                'id': 9,
                'parentId': 7,
                'menuName': '历史订单',
                'menuIcon': null,
                'menuUrl': 'sale/order/history',
                'menuSort': 0,
                'children': null
              }, */
              {
                'id': 10,
                'parentId': 7,
                'menuName': '正在跟进订单',
                'menuIcon': null,
                'menuUrl': 'sale/order/doing',
                'menuSort': 1,
                'children': null
              }
            ]
          }
        ]
      },
      {
        'id': 3,
        'parentId': 0,
        'menuName': '供应商管理',
        'menuIcon': 'srm',
        'menuUrl': null,
        'menuSort': 2,
        'children': [
          {
            'id': 8,
            'parentId': 3,
            'menuName': '全部供应商',
            'menuIcon': null,
            'menuUrl': 'srm/all',
            'menuSort': 0,
            'children': null
          }
        ]
      }
    ],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'visitor-token': {
    'result': {
      'resultCode': 0,
      'msg': 'success',
      'resultData': null
    },
    'menus': [
      {
        'id': 1,
        'parentId': 0,
        'menuName': '客户管理',
        'menuIcon': 'customer',
        'menuUrl': null,
        'menuSort': 0,
        'children': [
          /* {
            'id': 4,
            'parentId': 1,
            'menuName': '客户设置',
            'menuIcon': null,
            'menuUrl': 'customer/set',
            'menuSort': 0,
            'children': null
          }, */
          {
            'id': 5,
            'parentId': 1,
            'menuName': '我的客户',
            'menuIcon': null,
            'menuUrl': 'customer/my',
            'menuSort': 1,
            'children': null
          }
        ]
      },
      {
        'id': 2,
        'parentId': 0,
        'menuName': '销售管理',
        'menuIcon': 'sale',
        'menuUrl': null,
        'menuSort': 1,
        'children': [
          {
            'id': 6,
            'parentId': 2,
            'menuName': '报价',
            'menuIcon': null,
            'menuUrl': 'sale/price',
            'menuSort': 0,
            'children': null
          },
          {
            'id': 7,
            'parentId': 2,
            'menuName': '订单',
            'menuIcon': null,
            'menuUrl': 'sale/order',
            'menuSort': 1,
            'children': [
              {
                'id': 9,
                'parentId': 7,
                'menuName': '历史订单',
                'menuIcon': null,
                'menuUrl': 'sale/order/history',
                'menuSort': 0,
                'children': null
              },
              {
                'id': 10,
                'parentId': 7,
                'menuName': '正在跟进订单',
                'menuIcon': null,
                'menuUrl': 'sale/order/doing',
                'menuSort': 1,
                'children': null
              }
            ]
          }
        ]
      },
      {
        'id': 3,
        'parentId': 0,
        'menuName': '供应商管理',
        'menuIcon': 'srm',
        'menuUrl': null,
        'menuSort': 2,
        'children': [
          {
            'id': 8,
            'parentId': 3,
            'menuName': '全部供应商',
            'menuIcon': null,
            'menuUrl': 'srm/all',
            'menuSort': 0,
            'children': null
          }
        ]
      }
    ],
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
            'result': {
              'resultCode': 20000,
              'msg': '登陆成功',
              'resultData': token
            }
          }
        } else {
          return {
            'result': {
              'resultCode': 60203,
              'msg': '密码错误',
              'resultData': null
            }
          }
        }
      } else {
        return {
          'result': {
            'resultCode': 60204,
            'msg': '不存在此用户',
            'resultData': null
          }
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
          'result': {
            'resultCode': 50008,
            'msg': '登陆失败，无法获取用户相关信息',
            'resultData': null
          }
        }
      }

      return info
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        'result': {
          'resultCode': 20001,
          'msg': '登出成功',
          'resultData': null
        }
      }
    }
  }
]
