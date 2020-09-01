<template>
	<view>
		<uni-search-bar radius="100" @confirm="toSearch($event)" bgColor="#ffff"></uni-search-bar>
		<view class="list">
			<view class="row" v-for="(item,index) in orderList" :key="item.id">
				<view class="products" v-for="(child,cIndex) in item.child" :key="cIndex">
					<view class="imagebox" v>
						<image :src="$imgpre+child.img" mode="widthFix"></image>
						<text>{{child.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text space="nbsp">总计{{item.countnumber}}商品 </text>
					<text>应付金额 ￥{{item.countmoney}}</text>
				</view>
			</view>
		</view>
		<view v-if="!orderList.length" class="tishi">
			暂无订单！
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import {getOrders} from "../../utils/api";
	import {baseUrl} from "../../utils/request";
	import {toSearchPage} from "../../utils/toPages";
	export default {
		components: {
			uniSearchBar
		},
		data(){
			return{
				user:uni.getStorageSync('user'),
				orderList: [],
				$imgpre:baseUrl
			}
		},
		methods:{
			/**获取订单列表*/
			async getOrderList(){
				let res = await getOrders({uid:this.user.uid})
				this.orderList = res.data.list
			},
			/**跳转搜素页面*/
			toSearch(e){
				let key = e.value;
				toSearchPage(key)
			}
		},
		onLoad(){
			if (this.user){
				this.getOrderList()
			}
		}

	}
</script>
<style>
	.row {
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}

	.imagebox {
		float: left;
		margin: 10rpx;
	}

	.products {
		overflow: hidden;
	}

	image {
		width: 160rpx;
		margin-left: 10rpx;
	}

	.info {
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
	}

	.info text:nth-of-type(2) {
		color: red;
	}

	.info text:nth-of-type(3) {
		font-size: 20rpx;
		color: #AAAAAA;
	}

	.tishi {
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
