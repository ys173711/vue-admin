import store from '../store'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
const valid_map = ['admin', 'editor', 'visitor']
export { valid_map }
export function validUsername(str) {
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 判断用户是否有该按钮的权限
 * @param {string} btnId
 * */
export function hasPermission(btnId) {
  const permission_button = store.getters.permission_button
  return permission_button.indexOf(btnId) > -1
}
