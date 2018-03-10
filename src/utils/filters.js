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
