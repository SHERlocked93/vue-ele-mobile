/**
* 创建于 2018/3/13
* 作者: SHERlocked93
* 功能: 评价
*/


<template>
  <div class='ratings' ref="ratings">
    <div class='ratings-content'>
      
      <!-- 评分 -->
      <div class='overview'>
        <!--综合评分-->
        <div class='overview-left'>
          <div class='socre'>{{sellerInfo.score}}</div>
          <div class='title'>综合评分</div>
          <div class='rank'>高于周边商家{{sellerInfo.rankRate}}%</div>
        </div>
        
        <!--其他评分-->
        <div class='overview-right'>
          <div class='score-wrapper'>
            <span class='title'>服务态度</span>
            <stars :score='sellerInfo.serviceScore'></stars>
            <span class='score'>{{sellerInfo.serviceScore}}</span>
          </div>
          <div class='score-wrapper'>
            <span class='title'>商品评分</span>
            <stars class='score' :score='sellerInfo.foodScore'></stars>
            <span class='score'>{{sellerInfo.foodScore}}</span>
          </div>
          <div class='score-wrapper'>
            <span class='title'>送餐时间</span>
            <span class='dilivery-time'>{{sellerInfo.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      
      <split></split>
      
      <!-- 评价分类 -->
      <rating-select :selectType='selectType'
                     :onlyContent='onlyContent'
                     :ratings='ratings'
                     @changeSelectType='changeSelectType'
                     @toggleOnlyContent='toggleOnlyContent'></rating-select>
      
      <!-- 评价s -->
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Stars :size="24" :score="rating.score"></Stars>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <i class="el-icon-my-thumb-up"></i>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatTime('yyyy-MM-dd hh:mm')}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    
    
    </div>
  </div>
</template>

<script type='text/javascript'>
  import Stars from './stars'
  import Split from './split'
  import RatingSelect from './ratingSelect'
  import BScroll from 'better-scroll'
  import { ratings as GetRatings } from 'api/conn'
  
  /* eslint-disable no-unused-vars */
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  
  export default {
    name: 'em-ratings',
    components: { Stars, Split, RatingSelect },
    props: {
      // 卖家信息
      sellerInfo: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false, // 商品详情页是否显示flag boolean
        selectType: ALL,
        onlyContent: true,
        ratings: []
      }
    },
    methods: {
      /**
       * 改变选择的类型
       * @param type
       */
      changeSelectType(type) {
        this.selectType = type
      },
      
      /**
       * 切换是否只看有内容的评论
       * @param content
       */
      toggleOnlyContent(content) {
        this.onlyContent = content
      },
      
      /**
       * 评论是否显示
       * @param type
       * @param text
       */
      needShow(type, text) {
        if (this.onlyContent && !text) return false
        if (this.selectType === ALL) return true
        else return type === this.selectType
      }
    },
    mounted() {
      GetRatings().then(({ data: { ratings } }) => this.ratings = ratings)
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.ratings, { click: true })
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~styles/mixin";
  
  $grey: rgb(7, 17, 27);
  $light-grey: rgba(7, 17, 27, .1);
  $light1-grey: rgb(147, 153, 159);
  $orange: rgb(255, 153, 0);
  
  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    
    .overview {
      display: flex;
      padding: 18px 0;
      
      .overview-left {
        flex: 0 0 137px;
        width: 137px;
        padding: 6px 0;
        border-right: 1px solid $light-grey;
        text-align: center;
        @media only screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }
        
        .socre {
          font-size: 24px;
          line-height: 28px;
          margin: 6px 0;
          color: $orange;
        }
        .title {
          font-size: 12px;
          line-height: 12px;
          color: $grey;
          margin-bottom: 8px;
        }
        .rank {
          font-size: 10px;
          line-height: 10px;
          color: $light1-grey;
        }
      }
      
      .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;
        @media only screen and (max-width: 320px) {
          padding-left: 6px;
        }
        
        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0;
          
          .title {
            font-size: 12px;
            line-height: 18px;
            color: $grey;
            display: inline-block;
            vertical-align: top;
          }
          .star {
            display: inline-block;
            vertical-align: top;
            margin: 0 12px;
          }
          .score {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            color: $orange;
            line-height: 16px;
          }
          .dilivery-time {
            font-size: 12px;
            color: $light1-grey;
            line-height: 18px;
            margin-left: 12px;
          }
        }
      }
    }
    
    .rating-wrapper {
      padding: 0 18px;
      .rating-item {
        display: flex;
        padding: 18px 0;
        @include border-1px(rgba(7, 17, 27, 0.1));
        
        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;
          img {
            border-radius: 50%;
          }
        }
        .content {
          position: relative;
          flex: 1;
          .name {
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }
          .star-wrapper {
            margin-bottom: 6px;
            font-size: 0;
          }
          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }
          .delivery {
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .text {
            margin-bottom: 8px;
            line-height: 18px;
            color: rgb(7, 17, 27);
            font-size: 12px;
          }
          .recommend {
            line-height: 16px;
            font-size: 0;
            [class^=el-icon-my], .item {
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;
            }
            [class^=el-icon-my] {
              color: rgb(0, 160, 220);
            }
            .item {
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
          }
          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
</style>
