<template>
  <view class="container">
    <!-- s收货地址 -->
    <view class="address">
      <view class="address_info">
        <label>收件人:悟空</label>
        <label>{{user.phone}}</label>
      </view>
      <view class="address_res">
        收货地址：<label>花果山水帘洞27号</label>
      </view>
    </view>
    <!-- 商品信息 -->
    <view class="carts">
      <view class="cartsInfo" v-for="(item,index) in goodList" :key="item.id">
        <!-- 70px -->
        <view class="carts_detail">
          <view class="carts_image">
            <image :src="$imgpre+item.img" mode=""></image>
          </view>
          <view class="carts_name">
            <view style="font-size: 30rpx;">{{item.goodsname}}</view>
            <view style="font-size: 26rpx; color: #C0C0C0;">规格:300</view>
          </view>
          <view class="carts_price">
            <label>￥ {{item.price}}</label>
          </view>
        </view>
        <!-- 50px -->
        <view class="cart_num">
          <view class="">
            购买数量：
          </view>
          <view class="">
            <label @click="changeNum(index,true,item.num)" class="jian">-</label>
            <label class="num">{{item.num}}</label>
            <label @click="changeNum(index,false,item.num)" class="jia">+</label>
          </view>
        </view>
        <!-- 横线 -->
        <view class="xian"></view>
      </view>

      <!-- 50px -->
      <view class="kuaidi">
        <label>配送方式</label>
        <label>XX快递</label>
      </view>
    </view>

    <!-- 优惠券 -->
    <view class="yhquan">
      <label>优惠券</label>
      <label style="margin-right: 40rpx;">无可用</label>
    </view>
    <!-- jifen积分 -->
    <view class="jifen">
      <view class="use">
        <label>使用积分</label>
      </view>
      <view class="input" style="margin-right: 40rpx;">
        <input type="text" value="" placeholder="输入积分"/>
        <label class="input_use">使用</label>
        <label class="input_keyi">可使用50积分</label>
      </view>
    </view>

    <!-- 具体详细 -->
    <view class="resDetail">
      <view class="">
        <label>商品金额</label>
        <label style="margin-right:40rpx;color:red">￥{{allPrice}}</label>
      </view>
      <view class="">
        <label>运费</label>
        <label style="margin-right:40rpx;color:red">+￥0.00</label>
      </view>
      <view class="">
        <label>优惠券</label>
        <label style="margin-right:40rpx;color:red">-￥0.00</label>
      </view>
      <view class="">
        <label>会员优惠</label>
        <label style="margin-right:40rpx;color:red">-￥0.00</label>
      </view>
      <view class="">
        <label>积分抵扣</label>
        <label style="margin-right:40rpx;color:red">-￥0.00</label>
      </view>
    </view>
    <!-- 实付金额 -->
    <view class="sfje">
      实付金额：<label style="color:red">￥{{ allPrice }}</label>
    </view>

    <!-- 确认订单按钮 -->
    <view class="btn">
      <!-- 点击提交订单按钮，发起支付请求 -->
      <button type="primary" @click="pay">提交订单</button>
    </view>
  </view>
</template>

<script>
  import {baseUrl} from "../../utils/request";
  import {orderAdd} from "../../utils/api";
  import {toPage} from "../../utils/toPages";

  export default {
    data() {
      return {
        user: uni.getStorageSync('user'),
        goodList: [],
        $imgpre: baseUrl
      }
    },
    computed: {
      /** 总价*/
      allPrice() {
        if (this.goodList.length) {
          return this.goodList.reduce((per, cur) => {
            if (cur.checked)
              return per + cur.price * cur.num;
            else
              return per
          }, 0)
        }
        return 0
      },
      /** 全部的数量*/
      allNum() {
        if (this.goodList.length) {
          return this.goodList.reduce((per, cur) => {
            if (cur.checked)
              return per + cur.num;
            else
              return per
          }, 0)
        }
        return 0
      },
    },
    methods: {
      /** 支付-提交订单*/
      async pay() {
        let items = this.goodList.reduce((per, cur) => {
          per.push(cur.id)
          return per
        }, [])
        let idstr = items.join(',');
        let data = {
          uid: this.user.uid,
          username: '鱼鱼鱼',
          userphone: this.user.phone,
          address: '北京市',
          countmoney: this.allPrice,
          countnumber: this.allNum,
          addtime: new Date().getTime()
        }
        let res = await orderAdd({params: JSON.stringify(data), idstr})
        uni.removeStorageSync('orderList');
        uni.showToast({
          title: res.data.msg,
        })
        toPage('/pages/cart/cart')
      },
      /**
       * 改变商品数量
       * @param index 第几个商品
       * @param sub 是否是减法
       * @param num 原来的商品数量
       */
      changeNum(index,sub,num){
        if (sub){
          if (num<=1){
            uni.showToast({
              title:'不能再少了',
              icon:'none'
            })
            return
          }else {
            num--;
          }
        }else {
          num++;
        }
        this.goodList[index].num = num
        uni.setStorageSync('orderList',this.goodList)
      }
    },
    onLoad() {
      this.goodList = uni.getStorageSync('orderList')
    }
  }
</script>
<style>
  @import url("../../common/css/confirm.css");
</style>
