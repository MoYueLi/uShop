<template>
	<view>
		<uni-search-bar :radius="100" @confirm="searchList" bgColor="#ffffff" class="input_"></uni-search-bar>
		<view v-if="goodList.length" class="list">
			<view class="row" v-for="(item,index) in goodList" :key="item.id">
				<image :src="$imgpre+item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>原价￥{{item.price}}</text>
					<text>现价￥{{item.market_price}}</text>
					<text>3565评论</text>
				</view>
			</view>
		</view>
		<view v-else class="tishi">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {search} from "../../utils/api";
	import {baseUrl} from "../../utils/request";

	export default {
		data(){
			return{
				$imgpre:baseUrl,
				goodList: []
			}
		},
		methods:{
			/**
			 * 搜索商品
			 * @param keywords 关键字
			 * @returns {Promise<void>}
			 */
			async searchGood(keywords){
				let res = await search({keywords})
				this.goodList = res.data.list;
			},
			async searchList(e){
				let keywords = e.detail.value;
				let res = await search({keywords})
				this.goodList = res.data.list;
			}
		},
		onLoad(e){
			if (e.keywords){
				this.searchGood(e.keywords)
			}
		}
	}
</script>

<style>

	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
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
