/**
 * 创建于 2018/2/27
 * 作者: SHERlocked93
 * 功能: 基础通信的API
 */

import fetch from 'utils/fetch'

/**
 * 商家信息
 */
export function seller() {
  return fetch({
    url: '/seller'
  })
}

/**
 * 商品信息
 */
export function goods() {
  return fetch({
    url: '/goods'
  })
}

/**
 * 评分信息
 */
export function ratings() {
  return fetch({
    url: '/ratings'
  })
}
