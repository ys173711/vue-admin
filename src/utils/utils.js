/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export const debounce = (func, wait, immediate) => {
  let timeout

  return function() {
    const context = this
    const args = arguments

    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        func.apply(context, args)
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，在持续触发事件的过程中，函数会立即执行，并且同一个时间段内只执行一次。2 表定时器版，在持续触发事件的过程中，函数不会立即执行，并且每 1s 执行一次，在停止触发事件后，函数还会再执行一次
 */
export const throttle = (func, wait, type) => {
  let previous = 0
  let timeout
  return function() {
    const context = this
    const args = arguments
    if (type === 1) {
      const now = Date.now()
      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}
