<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text v-if="yzmDisabled">{{countdown}}</text>
				<text @click="getYzm" v-else>{{yzmTip}}</text>
			</view>
			<input type="text" v-model="code" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button :disabled="canLogin" type="primary" @click="login" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;">通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {
		getSms,
		wxLogin
	} from "../../utils/api";
	import {toPage} from "../../utils/toPages";

	export default {
		data() {
			return {
				phone: '',
				code: '',
				yzmCode: '',
				yzmDisabled: false,
				countdown: 45,
				second: 45,
				yzmTip: '获取验证码'
			}
		},
		computed:{
			canLogin(){
				return !this.code
			}
		},
		methods: {
			/** 获取验证码*/
			async getYzm() {
				if (!this.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return
				}
				if (!/^1[3456789]\d{9}$/.test(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return
				}
				let res = await getSms({
					phone: this.phone
				})
				this.yzmCode = res.data.list.code;
				this.yzmDisabled = true;
				let i = setInterval(() => {
					this.countdown -= 1;
					if (this.countdown === 0) {
						this.yzmDisabled = false;
						clearInterval(i)
						this.countdown = this.second
					}
				}, 1000)
			},
			/** 登录*/
			async login() {
				// 如果验证码正确
				if (this.code.toString() === this.yzmCode.toString()){
					let res = await wxLogin({
						phone: this.phone
					})
					uni.setStorageSync('user',res.data.list)
					uni.showToast({
						title:res.data.msg,
						icon:'none',
					})
					toPage('/pages/index/index')
				} else{
					uni.showToast({
						title: '验证码错误',
						icon: 'none'
					})
				}
			},
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box {
		position: relative;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}

	.send {
		display: flex;
		justify-content: space-between;
	}

	.send text:nth-of-type(2) {
		color: #00BB00;
	}

	text {
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}

	input {
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
</style>
