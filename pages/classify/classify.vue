<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view @click="changeRight(index)" v-for="(item,index) in cateList" :key="item.id" :class="leftIndex===index?'left_list activeList':'left_list'" >
				<label for="">{{item.catename}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view @click="cateClick(item.pid)" v-for="
(item,index) in cateList[leftIndex].children" :key="item.id" class="bottom_list">
						<!-- 每个最多显示6个 -->
						<view >
							<image :src="$imgpre+item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {baseUrl} from "../../utils/request";
	import {getCates} from "../../utils/api";

	export default {
		data(){
			return{
				cateList: [],
				$imgpre: baseUrl,
				leftIndex:0
			}
		},
		methods:{
			/** 获取分类列表*/
			async getCateList(){
				let res = await getCates();
				this.cateList = res.data.list
			},
			/** 切换分类*/
			changeRight(index){
				this.leftIndex = index;
			},
			/** 分类点击事件*/
			cateClick(id){
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			}
		},
		onLoad(){
			this.getCateList()
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
