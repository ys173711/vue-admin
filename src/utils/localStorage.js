/**
 * @desc  用户登录成功后把用户账号信息(账号和密码)存入浏览器 localStorage account
 * @param key 为 account，param 格式为
 *         {
 *            username: ...,
 *            password: ...
 *         }
 * @param key localStorage 存入的 key 值
 */
export const setLocalStorage = (param, key) => {
  if (key === 'account') {
    if (typeof param === 'object' && param.hasOwnProperty('username') && param.hasOwnProperty('password')) {
      let val = localStorage.getItem(key)
      val = !val ? [] : JSON.parse(val)
      // 如果已存在此用户名，则先删除
      const newVal = val.filter((item) => {
        return item.username !== param.username
      })
      newVal.unshift({
        username: param.username,
        password: param.password
      })
      localStorage.setItem(key, JSON.stringify(newVal))
    }
  }
}

/**
 * @desc  登录页获取 自动填充表单列表 数据
 *        给用户设置最多显示三条，第一条显示最新最近成功登陆的账号
 * @param
 */
export const getLocalStorage_account = () => {
  let val = localStorage.getItem('account')
  val = !val ? [] : JSON.parse(val)
  if (val.length > 3) {
    return val.splice(0, 3)
  } else {
    return val
  }
}

/**
 * @desc  用户点击 自动填充列表的此行数据 删除此行数据
 * @param i  此行数组的下标
 */
export const deleteLocalStorage_account = (i) => {
  let val = localStorage.getItem('account')
  val = !val ? [] : JSON.parse(val)
  val.splice(i, 1)
  localStorage.setItem('account', JSON.stringify(val))
}

/**
 * @desc  用户点击 清空所有 删除自动填充列表的所有数据
 * @param
 */
export const deleteLocalStorage_account_all = () => {
  localStorage.setItem('account', null)
}
