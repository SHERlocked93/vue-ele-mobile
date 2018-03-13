/**
* 创建于 2018/3/3
* 作者: SHERlocked93
* 功能: 商品 - 店铺头部信息
*/


<!--suppress JSPotentiallyInvalidTargetOfIndexedPropertyAccess, HtmlUnknownTarget -->
<template>
  <div class='header'>
    <!-- 店铺信息 -->
    <div class='content-wrapper'>
      
      <!-- 商店图片 -->
      <div class='avatar'>
        <img :src='sellerInfo.avatar' alt='店铺图片'>
      </div>
      
      <!-- 商店名 -->
      <div class='content'>
        <div class='title'>
          <div class='title-brand'></div>
          <div class='title-name'>{{sellerInfo.name}}</div>
        </div>
        
        <!-- 蜂鸟专送 -->
        <div class='desc'>
          {{sellerInfo.description}}/{{sellerInfo.deliveryTime}}分钟送达
        </div>
        
        <!-- 活动 -->
        <div class='support' v-if='sellerInfo.supports&&sellerInfo.supports.length'>
          <div class='support-brand' :class='classMap'></div>
          {{sellerInfo.supports[0].description}}
        </div>
      
      
      </div>
    </div>
    
    <!-- 活动个数 -->
    <div class='activity'
         @click='showSellerDetail'
         v-if='sellerInfo.supports'>
      {{sellerInfo.supports.length}}个<i class='iconfont el-icon-my-right'></i>
    </div>
    
    <!-- 公告栏 -->
    <div class='bulletin-wrapper'>
      <div class='bulletin-img'></div>
      {{sellerInfo.bulletin}}
      <i class='iconfont el-icon-my-right'></i>
    </div>
    
    <!-- 背景图 -->
    <div class='header-bg'>
      <img :src='sellerInfo.avatar' alt='店铺背景'>
    </div>
    
    <!-- 商家详情 -->
    <transition name='fade'>
      <seller-detail v-show='sellerDetailShow'
                     :sellerInfo='sellerInfo'
                     @hideSellerDetail='hideSellerDetail'></seller-detail>
    </transition>
  </div>
</template>

<script>
  import { activityTypeFilter } from 'utils/filters'
  import SellerDetail from './EmSellerDetail'
  
  export default {
    name: 'em-header',
    components: { SellerDetail },
    props: {
      sellerInfo: { type: Object }
    },
    data() {
      return {
        sellerDetailShow: false
      }
    },
    computed: {
      classMap() {
        return this.sellerInfo.supports &&
          this.sellerInfo.supports.length &&
          activityTypeFilter(this.sellerInfo.supports[0].type)
      }
    },
    methods: {
      /**
       * 显示商家详情
       */
      showSellerDetail() {
        this.sellerDetailShow = true
      },
      
      /**
       * 隐藏商家详情
       */
      hideSellerDetail() {
        this.$nextTick(() => {
          this.sellerDetailShow = false
        })
      }
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  @import "~@/styles/mixin";
  
  .header {
    height: 140px;
    display: flex;
    color: white;
    background-color: rgba(7, 17, 27, .5);
    flex-shrink: 0;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    
    /* 店铺信息 */
    .content-wrapper {
      height: 112px;
      padding: 24px 12px 18px 24px;
      display: flex;
      flex-direction: row;
      
      /* 店铺图片 */
      .avatar {
        img {
          width: 64px;
          height: 64px;
          border-radius: 2px;
        }
      }
      
      .content {
        font-size: 14px;
        margin-left: 16px;
        font-weight: 200;
        
        .title {
          margin: 2px 0 8px 0;
          line-height: 18px;
          
          .title-brand {
            @include bg-img('~assets/img/brand');
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
          }
          .title-name {
            display: inline-block;
            margin-left: 6px;
            font-size: 16px;
            font-weight: bold;
          }
        }
        
        .desc {
          margin-bottom: 10px;
          font-size: 12px;
        }
        
        .support {
          font-size: 10px;
          margin-bottom: 12px;
          .support-brand {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            &.decrease {
              @include bg-img('~assets/img/decrease_1');
            }
            &.discount {
              @include bg-img('~assets/img/discount_1');
            }
            &.guarantee {
              @include bg-img('~assets/img/guarantee_1');
            }
            &.invoice {
              @include bg-img('~assets/img/invoice_1');
            }
            &.special {
              @include bg-img('~assets/img/special_1');
            }
          }
          
          .support-name {
            display: inline-block;
          }
        }
        
      }
    }
    
    /* 活动 */
    .activity {
      position: absolute;
      right: 24px;
      bottom: 48px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      padding: 0 8px;
      font-size: 10px;
      background-color: rgba(0, 0, 0, .2);
      text-align: center;
      .iconfont {
        margin-left: 4px;
      }
    }
    
    /* 公告栏 */
    .bulletin-wrapper {
      flex-shrink: 0;
      height: 28px;
      padding: 0 22px 0 12px;
      font-size: 10px;
      line-height: 28px;
      background-color: rgba(7, 17, 27, .2);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;
      
      .bulletin-img {
        display: inline-block;
        @include bg-img('~assets/img/bulletin');
        width: 22px;
        height: 13px;
        margin-right: 4px;
        margin-bottom: 2px;
        vertical-align: middle;
      }
      
      .iconfont {
        position: absolute;
        right: 10px;
        bottom: 8px;
      }
    }
    
    /* 背景图 */
    .header-bg {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      img {
        width: 100%;
        height: 100%;
        filter: blur(10px);
      }
    }
  }
</style>
