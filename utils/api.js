import {req} from "./request";

/**
 * 获取一级分类信息(首页快速分类导航)
 * @returns {Promise<*>}
 */
export const getCate = async () => {
  return await req('/api/getcate');
}

/**
 * 获取轮播图信息(首页)
 * @returns {Promise<*>}
 */
export const getBanner = async () => {
  return await req('/api/getbanner');
}

/**
 * 获取限时秒杀信息(首页)
 * @returns {Promise<*>}
 */
export const getSeckill = async () => {
  return await req('/api/getseckill');
}

/**
 * 获取商品信息(首页)
 * @returns {Promise<*>}
 */
export const getIndexGoods = async () => {
  return await req('/api/getindexgoods')
}

/**
 * 获取一个商品信息
 * @param data 查询的id对象格式
 * @returns {Promise<void>}
 */
export const getGoodsInfo = async (data) => {
  return await req('/api/getgoodsinfo',data)
}

/**
 * 获取一级分类下的所有商品（分页版本）
 * @returns {Promise<*>}
 */
export const getCateGoodPage= async (data)=>{
  return await req('/api/getcategoodPage',data)
}


/**
 * 获取一级分类下的所有商品
 * @returns {Promise<*>}
 */
export const getCateGoods= async (data)=>{
  return await req('/api/getcategoods',data)
}

/**
 * 获取商品全部分类信息(首页全部分类，数据呈递归树状)
 * @returns {Promise<*>}
 */
export const getCates = async ()=>{
  return await req('/api/getcates');
}

/**
 * 购物车添加
 * @param data 添加数据
 * @param header 请求头- 登录后做
 * @returns {Promise<*>}
 */
export const cartAdd = async (data,header={})=>{
  return await req('/api/cartadd',data,'GET',header)
}

/**
 * 购物车列表
 * @param data 属性{uid:}
 * @param header
 * @returns {Promise<*>}
 */
export const cartList = async (data,header={})=>{
  return await req('/api/cartlist',data,'GET',header)
}

/**
 * 购物车修改
 * @param data
 * @returns {Promise<*>}
 */
export const cartEdit = async (data)=>{
  return await req('/api/cartedit',data)
}

/**
 * 购物车删除
 * @param data
 * @returns {Promise<*>}
 */
export const cartDelete = async (data)=>{
  return await req('/api/cartdelete',data)
}

/**
 * 发送短信验证码
 * @param data
 * @returns {Promise<*>}
 */
export const getSms = async (data) => {
  return await req('/api/sms',data)
}

/**
 * 微信登录
 * @param data
 * @param header
 * @returns {Promise<*>}
 */
export const wxLogin = async (data,header={'cookie':'session-name'}) => {
  return await req('/api/wxlogin',data,'GET',header)
}


/**
 * 添加订单
 * @param data
 * @returns {Promise<*>}
 */
export const orderAdd = async (data)=>{
  return await req('/api/orderadd',data)
}

/**
 * 订单查询
 * @param data 用户uid
 * @returns {Promise<*>}
 */
export const getOrders = async (data)=>{
  return await req('/api/orders',data)
}

/**
 * 搜索
 * @param data 搜索关键字 keywords
 * @returns {Promise<*>}
 */
export const search = async (data) =>{
  return await req('/api/search',data)
}
