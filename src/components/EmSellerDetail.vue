/**
* 创建于 2018/3/3
* 作者: SHERlocked93
* 功能: 商家-头部-活动数量-商家详情
*/


<!--suppress JSPotentiallyInvalidTargetOfIndexedPropertyAccess -->
<template>
  <div class='sd'>
    <!-- 内容 -->
    <div class='sd-detail'>
      <!--商店名与评分-->
      <div class='sd-title'>{{sellerInfo.name}}</div>
      
      <div class='star-container'>
        <stars :size='48' :score='sellerInfo.score'></stars>
      </div>
      
      <!--优惠信息-->
      <div class='mt-container'>
        <mould-title thisTitle='优惠信息'></mould-title>
      </div>
      
      <div class='support-container'>
        <div class='support'
             v-if='sellerInfo.supports&&sellerInfo.supports.length'
             v-for='sellerSupport in sellerInfo.supports'>
          <activity-type :sellerType='sellerSupport.type'></activity-type>
          {{sellerSupport.description}}
        </div>
      </div>
      
      <!--商家公告-->
      <div class='mt-container'>
        <mould-title thisTitle='商家公告'></mould-title>
      </div>
      
      <div class='sd-activity'>{{sellerInfo.bulletin}}</div>
    </div>
    
    <!-- 关闭按钮 -->
    <div class='sd-close'>
      <i class='el-icon-my-close' @click='hideSellerDetail'></i>
    </div>
  </div>
</template>

<script type='text/javascript'>
  import Stars from './stars'
  import MouldTitle from './mouldTitle'
  import ActivityType from './activityType'
  
  export default {
    name: 'EmSellerDetail',
    props: ['sellerInfo'],
    components: { Stars, MouldTitle, ActivityType },
    data() {
      return {}
    },
    methods: {
      /**
       * 隐藏商家详情
       */
      hideSellerDetail() {
        this.$emit('hideSellerDetail')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sd {
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    color: #fff;
    background-color: rgba(7, 17, 27, .9);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    flex-flow: column;
    
    /* 内容 */
    .sd-detail {
      flex-grow: 1;
      padding: 64px 36px 0;
      
      .sd-title {
        font-size: 16px;
        font-weight: 700;
        line-height: 16px;
        text-align: center;
      }
      
      .star-container {
        text-align: center;
        .star {
          margin: 16px auto 0 auto;
        }
      }
      
      /* 活动 */
      .support-container {
        .support {
          font-size: 12px;
          line-height: 12px;
          font-weight: 200;
          margin-bottom: 12px;
          
          .support-name {
            display: inline-block;
          }
        }
      }
      
      /* 商家公告 */
      .sd-activity {
        line-height: 24px;
        font-weight: 200;
        font-size: 12px;
      }
    }
    
    /* 关闭按钮 */
    .sd-close {
      flex-shrink: 0;
      height: 64px;
      width: 100vw;
      .el-icon-my-close {
        display: block;
        margin: 0 auto 0;
        font-size: 28px;
        width: 32px;
        color: rgba(255, 255, 255, .5);
      }
    }
  }
</style>
