<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" @confirm="searchGood($event)" placeholder="搜索商品" placeholder-class="placeholder"/>
		</view>
		<view v-if="list" class="list">
			<view class="row" v-for="(item,index) in list" :key="item.id">
				<image :src="$imgpre+item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>￥{{item.price}}</text>
					<text>3565评论</text>
				</view>
			</view>
		</view>
		<view v-if="!list" class="tishi">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {getCateGoodPage, getCateGoods, search} from "../../utils/api";
	import {baseUrl} from "../../utils/request";
	import {toSearchPage} from "../../utils/toPages";

	export default {
		data(){
			return{
			  list:[],
				$imgpre:baseUrl
			}
		},
		methods:{
			/**
			 * 根据id获取商品列表
			 * @param id
			 * @returns {Promise<void>}
			 */
			async getList(id){
				let res = await getCateGoodPage({fid:id,page:1,size:10})
				this.list = res.data.list[1]
			},
			/**
			 * 跳转搜索页面
			 * @param e 事件对象
			 */
			searchGood(e){
				// 如果没有输入内容，就不跳转页面
				let keywords = e.detail.value
				toSearchPage(keywords)
			}
		},
		onLoad(e){
			if (e.id)
				this.getList(e.id)
		}
	}
</script>

<style>
	.search{
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	icon{
		margin:0 10rpx 0 250rpx;
	}
	.placeholder{
		color: white;
		font-size: 25rpx;
	}
	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
