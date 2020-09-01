<template>
  <view class="container">
    <!-- 详情图片 -->
    <view class="detailImage">
      <image :src="$imgpre+info.img"/>
    </view>
    <!-- 详情基本信息 -->
    <view class="detailInfo">
      <view class="detailInfoName">
        <label>{{info.goodsname}}</label>
      </view>
      <view class="detailInfoPrice">
        <label style="color: red;">￥ {{info.price}}</label>
        <label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
      </view>
    </view>

    <!-- 基本信息改变 -->
    <view class="changeInfo">
      <view class="youhui">
        <view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
      </view>
      <!-- 数量加减 -->
      <view class="changeNum">
        <view class="num">购买数量</view>
        <view class="action">
          <label @click="changeGoodNum(false)" class="jian">-</label>
          <label class="zhi">{{goodNum}}</label>
          <label @click="changeGoodNum(true)" class="jia">+</label>
        </view>
      </view>
      <!-- 商品属性 -->
      <view class="changeState">
        <view class="productStat">
          <label>商品属性</label>
        </view>
        <view class="productGuige">
          <label>{{info.specsname}}</label>
          <view v-for="(item) in specs" :key="item" class="threed3i1" @click="specsClick(item)">{{item}}</view>
        </view>
      </view>
    </view>
    <!-- 商品详情 -->
    <view class="productDetail">
      <view class="productDetailTitle">商品详情</view>
      <rich-text :nodes="info.description"></rich-text>
    </view>

    <view class="productEval">
      <view class="eval">商品评价</view>
      <view>
        <label class="evalUsername">小李白</label>
        <label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
        <view class="evalImage">
          <image src="../../static/detail/pingjia1.jpg"/>
          <image src="../../static/detail/pingjia2.jpg"/>
          <image src="../../static/detail/pingjia3.jpg"/>
        </view>
        <label class="evalTime">2020-01-13</label>
      </view>
    </view>
    <!-- 底部按钮 -->
    <view class="foot">
      <button @click="addCart()" class="footbtn1">加入购物车</button>
      <button class="footbtn2">立即购买</button>
    </view>
  </view>
</template>
<script>
  import {cartAdd, getGoodsInfo} from "../../utils/api";
  import {baseUrl} from "../../utils/request";

  export default {
    data() {
      return {
        info: {},
        $imgpre: baseUrl,
        goodNum: 1
      }
    },
    computed: {
      /** 商品规格*/
      specs() {
        if (!this.info.specsattr)
          return []
        if (this.info.specsattr.includes(','))
          return this.info.specsattr.split(',');
        else
          return [this.info.specsattr]
      }
    },
    methods: {
      /** 获取商品详情*/
      async getInfo(id) {
        let res = await getGoodsInfo({id});
        this.info = res.data.list[0]
      },
      /** 规格点击事件*/
      specsClick(e) {

      },
      /** 修改商品数量*/
      changeGoodNum(add) {
        if (add) {
          this.goodNum += 1
        } else {
          if (this.goodNum === 1) {
            uni.showToast({
              title: '商品不能再少了',
              icon: 'none'
            })
          } else {
            this.goodNum -= 1
          }
        }
      },
      /** 添加购物车*/
      async addCart() {
        let {uid,token} = uni.getStorageSync('user')
        let res = await cartAdd({uid, goodsid: this.info.id, num: this.goodNum},{authorization:token})
        if (res)
        uni.showToast({
          title: res.data.msg
        })
      },
    },
    onLoad(e) {
      this.getInfo(e.id)
    }
  }
</script>
<style>
  @import url("../../common/css/details.css");

</style>

