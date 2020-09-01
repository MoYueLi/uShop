<template>
  <view class="">
    <!-- 顶部信息 -->
    <view class="HomeTop">
      <view class="logoView">
        <!-- logo -->
        <img class="logo" src="/static/index/logo.jpg" alt=""/>
      </view>
      <view class="inputView">
        <input class="textinput" @confirm="searchGood" style="center" type="text" placeholder="寻找商品"/>
      </view>
    </view>

    <!-- 顶部导航  scroll-view -->
    <view class="tabs">
      <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
        <view class="uni-tab-item" data-current="0">
          <text class="uni-tab-item-title uni-tab-item-title-active">
            推荐
          </text>
        </view>
        <view v-for="(item,index) in cateList" :key="item.id" class="uni-tab-item" @click="tabClick(item.id)">
          <text class="uni-tab-item-title">
            {{item.catename}}
          </text>
        </view>
      </scroll-view>
    </view>
    <!-- 推荐轮播图 -->
    <view class="">
      <swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
        <swiper-item v-for="(item,index) in bannerList" :key="item.id">
          <view class="swiper-item">
            <image :src="$imgpre+item.img" mode=""></image>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 功能导航开始 -->
    <!-- 功能导航 -->
    <view class="FunctNavCon">
      <view class="FunctNavLi">
        <image src="../../static/index/xiaohuoban.png" alt class="FunImg"/>
        <p>限时抢购</p>
      </view>
      <view class="FunctNavLi">
        <image src="../../static/index/jifentixicopy.png" alt class="FunImg"/>
        <p>积分商城</p>
      </view>
      <view class="FunctNavLi">
        <image src="../../static/index/lianxiwomen.png" alt class="FunImg"/>
        <p>联系我们</p>
      </view>
      <view @click="toCate" class="FunctNavLi">
        <image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg"/>
        <p>商品分类</p>
      </view>
    </view>

    <!-- 推荐部分 未写 -->
    <view class="HotGoods">
      <!-- 热推左侧 -->
      <view class="HotLeft">
        <view class="LimitedContent">
          <image class="LimitedImg" src="../../static/index/xianshi.jpg" alt/>
          <label class="Limited">限时秒杀</label>
        </view>
        <p class="LimitedTitle">每天零点场，好货秒不停</p>
        <!-- 倒计时 -->
        <view class="LimitTimeAll">
          <label class="LimitTime">{{time[0]}}</label>
          <view class="maohao">:</view>
          <label class="LimitTime">{{time[1]}}</label>
          <view class="maohao">:</view>
          <label class="LimitTime">{{time[2]}}</label>
          <label class="Seckill">秒杀</label>
        </view>
        <image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt=""></image>
      </view>

      <!-- 热推右侧 -->
      <view class="HotRight">
        <!-- 右侧顶部部分 -->
        <view class="HotTop">
          <view class="HomeTopInfo">
            <view class="HomeTopInfoOne">
              <label class="BrandNew">品牌上新</label>
              <label class="Discount">折</label>
            </view>
            <view class="HomeTopRobbig">
              <label>每日九点，抢大牌</label>
            </view>
          </view>
          <!-- <div> -->
          <view class="Cloth">
            <image src="../../static/index/goods1.jpg" alt=""></image>
          </view>

          <!-- </div> -->
        </view>
        <!-- 右侧底部 -->
        <view class="HotBottom">
          <view class="HotBottomLeft">
            <view class="HotBottomLeftInfo">
              <label class="HotBottomLeftInfoTitle">每日十件</label>
              <label class="HotBottomLeftInfoDetail">只为你选好货</label>
            </view>
            <view class="HotBottomLeftImage">
              <image src="../../static/index/goods1.jpg" mode=""></image>
            </view>
          </view>
          <view class="HotBottomRight">
            <view class="HotBottomRightInfo">
              <label class="HotBottomRightInfoTitle">每日十件</label>
              <label class="HotBottomRightInfoDetail">只为你选好货</label>
            </view>
            <view class="HotBottomRightImage">
              <image src="../../static/index/goods1.jpg" mode=""></image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 轮播图2 -->
    <div class="Swiper2">
      <image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt/>
    </div>

    <!-- 底部商品列表 -->
    <view class="products">
      <!-- 商品标签 -->
      <view class="tags">
        <view v-for="(item,index) in shopTags" :key="item" @click="tagClick(index)"
              :class="tagIndex===index?'tag_list active_tag_list':'tag_list'">
          <label>{{item}}</label>
        </view>
      </view>
      <!-- 标签对应的商品 -->
      <view class="tags_product">
        <view class="product" v-for="(item,index) in shopList[tagIndex].content" :key="item.id">
          <view class="GoodsLeft">
            <image class="GoodsImg" :src="$imgpre+item.img" alt/>
          </view>
          <view class="GoodsCont">
            <view class="GoodConTit">{{item.goodsname}}</view>
            <view class="GoodsPrice">￥{{item.price}}</view>
            <view class="yimai">已售8000件</view>
            <view @click="toDetail(item.id)" class="Immed">立即抢购</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {baseUrl} from "../../utils/request";
  import {getBanner, getCate, getIndexGoods, getSeckill} from "../../utils/api";
  import {toSearchPage} from "../../utils/toPages";

  export default {
    data() {
      return {
        cateList: [],
        bannerList: [],
        seckillList: [],
        $imgpre: 'http://localhost:3000',
        countdown: 0,
        shopTags: ['热门推荐', '发现好货', '只看专场'],
        tagIndex: 0,
        shopList: []
      }
    },
    computed: {
      /** 秒杀活动倒计时*/
      time() {
        if (!this.countdown)
          return ['00', '00', '00']
        let dis = Math.floor(this.countdown / 1000);
        let hour = Math.floor(dis / 3600);
        let minute = Math.floor(dis % 3600 / 60)
        let seconds = dis % 3600 % 60
        return [(hour + '').padStart(2, '0'), (minute + '').padStart(2, '0'), (seconds + '').padStart(2, '0')]
      }
    },
    methods: {
      /** 搜索*/
      searchGood(e) {
        let keywords = e.detail.value
        toSearchPage(keywords)
      },
      /** 获取分类导航列表*/
      async getCateList() {
        let res = await getCate();
        this.cateList = res.data.list;
      },
      /** 获取轮播图列表*/
      async getBannerList() {
        let res = await getBanner();
        this.bannerList = res.data.list;
      },
      /** 获取秒杀活动*/
      async getSeckilList() {
        let res = await getSeckill();
        this.seckillList = res.data.list
        if (!res.data.list)
          setInterval(() => {
            let nowtime = new Date().getTime();
            if (res.data.list)
              this.countdown = res.data.list[0].endtime - nowtime;
            else
              this.countdown = 0
          }, 1000)
      },
      /** 获取商品列表*/
      async getGoodList() {
        let res = await getIndexGoods();
        this.shopList = res.data.list
      },
      /**
       * 商品列表切换按钮
       * @param index 索引
       */
      tagClick(index) {
        this.tagIndex = index
      },
      /** 跳转详情*/
      toDetail(id) {
        uni.navigateTo({
          url: `/pages/details/details?id=${id}`
        })
      },
      /** 分类导航点击事件*/
      tabClick(id) {
        uni.navigateTo({
          url: `/pages/product/product?id=${id}`
        })
      },
      /** 跳转分类列表*/
      toCate(){
        uni.navigateTo({
          url: `/pages/classify/classify`
        })
      }
    },
    onLoad() {
      this.$imgpre = baseUrl
      this.getCateList()
      this.getBannerList()
      this.getSeckilList();
      this.getGoodList()
    }
  }
</script>

<style>
  /* 导入外部的样式文件 */
  @import url("../../common/css/index.css");
</style>
