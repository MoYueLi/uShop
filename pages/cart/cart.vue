<template>
	<view class="container">
		<view class="tishi" v-if="!cartList">
			购物车空空如也，快去添加商品吧
		</view>
		<view v-else class="top">
			<scroll-view v-for="(item,index) in cartList" :key="item.id" class="scroll-view_H" scroll-x="true" scroll-left="0">
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch @change="checkItem(index)" type="checkbox" :checked="item.checked" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="$imgpre+item.img" mode=""></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label @click="changeCart(item.id,item.num,index,true)" for="">-</label>
								<label for="">{{item.num}}</label>
								<label @click="changeCart(item.id,item.num,index)" for="">+</label>
							</view>
						</view>
					</view>

					<!-- 购物车商品信息 -->
				</view>

				<view @click="delCart(item.id,index)" class="cartDel" id="demo2"><label for="">删除</label></view>
			</scroll-view>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="allCheck" :disabled="!cartList" @change="checkAll" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{toalPrice}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3">
				<!-- 被选中的商品的个数 -->
				<label @click="addOrder">去结算({{toalNum}}件)</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cartDelete,
		cartEdit,
		cartList, orderAdd
	} from "../../utils/api";
	import {
		baseUrl
	} from "../../utils/request";

	export default {
		data() {
			return {
				cartList: [],
				$imgpre: baseUrl,
				btnInter: false,
				uid:uni.getStorageSync('user').uid||null
			}
		},
		computed: {
			/** 是否全选*/
			allCheck: {
				get(){
					// 有数据
					if (this.cartList)
						return this.cartList.every(item => item.checked)
					else
						return false
				},
				set(val){
					this.cartList.forEach(item => {
						item.checked = val
					})
				}
			},
			/** 总价*/
			toalPrice() {
				// 有数据
				if (this.cartList)
					return this.cartList.reduce((per, cur) => {
						if (cur.checked)
							return per + cur.price * cur.num;
						else
							return per
					}, 0)
				else
					return 0
			},
			/** 总数*/
			toalNum() {
				// 有数据
				if (this.cartList)
					return this.cartList.reduce((per, cur) => {
						if (cur.checked)
							return per + cur.num;
						else
							return per
					}, 0)
				else
					return 0
			}
		},
		methods: {
			/**
			 * 处理购物车列表数据
			 * @param list 列表数据
			 * @returns Object[] 处理好的数据
			 */
			handleList(list){
				return list.map((item, index) => {
					if (this.cartList && this.cartList.length && this.cartList.some(olditem=>{
						if (olditem.id === item.id){
							item.checked = olditem.checked
						}
						return olditem.id === item.id
					})){
					}
					else
						item.checked = false;
					return item
				})
			},
			/** 获取购物车列表*/
			async getCartList() {
				let res = await cartList({
					uid: this.uid
				});
				let list = null
				if (res.data.list) {
					list = this.handleList(res.data.list)
				}
				this.cartList = list
			},
			/**全选购物车*/
			checkAll() {
				this.allCheck = !this.allCheck
			},
			/**选中单个购物车*/
			checkItem(index) {
				this.cartList[index].checked = !this.cartList[index].checked
			},
			/**
			 * 修改购物车
			 * @param id 购物车id
			 * @param num 购物车数量
			 * @param index 购物车索引
			 * @param type 修改类型
			 * @returns {Promise<void>}
			 */
			async changeCart(id, num, index,type=false) {
				if (this.btnInter)
					return
				this.btnInter = true
				if (type) {
					if (num <= 1) {
						uni.showToast({
							title: '不能再少了',
							icon: 'none'
						})
						this.btnInter = false
						return
					}else {
						num--;
					}
				}else {
					num++;
				}
				await cartEdit({
					id,
					num,
					checked:0,
				})
				this.getCartList()
				this.btnInter = false
			},
			/**
			 * 删除商品
			 * @param id
			 * @returns {Promise<void>}
			 */
			async delCart(id) {
				uni.showModal({
					title: '是否删除该商品',
					success: async (res) => {
						if (res.confirm) {
							await cartDelete({
								id
							});
							uni.showToast({
								title: '删除成功',
							})
							this.getCartList();
						}
					}
				})
			},
			/**添加订单*/
			async addOrder(){
				// 购物车为空
				if (!this.cartList){
					uni.showToast({
						title:'请先添加商品到购物车',
						icon:'none'
					})
					return
				}
				// 没有选中购物车
				if (!this.cartList.some(item=>item.checked)){
					uni.showToast({
						title:'请先添加商品',
						icon:'none'
					})
					return
				}
				let selItem = [];
				this.cartList.forEach(item=>{
					if (item.checked){
						selItem.push(item);
					}
				})
				// 先清空列表再去存储
				uni.removeStorageSync('orderList')
				uni.setStorageSync('orderList',selItem)
				uni.navigateTo({url:'/pages/confirm/confirm'})
			}
		},
		onShow() {
			this.getCartList()
		}
	}
</script>

<style>
	@import url('../../common/css/cart.css');

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
