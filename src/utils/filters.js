/**
 * 创建于 2018/3/3
 * 作者: SHERlocked93
 * 功能: vue过滤器
 */

/* 活动类型 */
export const activityTypeFilter = type => {
  if (type < 0) return undefined
  return ['decrease', 'discount', 'guarantee', 'invoice', 'special'][type]
}

/* 时间戳 按照fmt格式化
*  fmt为格式 ex: yyyy-MM-dd hh:mm:ss   =>   2018-07-23 21:52:44
*/
export const formatTime = (timestamp, fmt) => {
  const time = new Date(timestamp)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const types = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds()
  }
  for (const type in types) {
    if (new RegExp(`(${type})`).test(fmt)) {
      const str = types[type] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : `00${str}`.substr(str.length))
    }
  }
  return fmt
}
