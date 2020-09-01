// const baseUrl = '';
// 请求http
import {toPage} from "./toPages";

export const baseUrl = 'http://localhost:3000';

let needA = ['/api/cartlist', '/api/cartadd', '/api/cartedit', '/api/cartdelete', '/api/orderadd', '/api/orders']

/**
 * 请求数据
 * @param url 请求地址
 * @param data 请求需要传的数据
 * @param method 请求模式GET POST
 * @param header 请求头
 * @returns {Promise<any>}
 */
export const req = async (url, data = {}, method = 'GET', header = {}) => {
  if (needA.some(item => item === url)) {
    let {token} = uni.getStorageSync('user')
    if (!token) {
      uni.showToast({
        title: '请先登录',
        icon: 'none'
      })
      toPage('/pages/send/send')
      return {data: {}}// 防止报错
    }
    let res = await checkToken(token)
    if (res.data){
      uni.showToast({
        title: '登录已过期',
        icon: 'none'
      })
      toPage('/pages/send/send')
      return {data: {}}// 防止报错
    }
    header = {
      authorization: token
    }
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + url,
      data,
      method,
      header,
      success: res => {
        console.group('本次请求api：' + url)
        console.log(res)
        console.groupEnd()
        resolve(res)
      },
      fail(res) {
        console.log(res)
        reject(res)
      }
    })
  })
}

/**
 * 检验token过期
 * @param token
 * @returns {Promise<unknown>}
 */
async function checkToken(token) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + '/api/checktoken',
      header: {
        authorization: token
      },
      success(res) {
        console.log(res)
        resolve(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}
