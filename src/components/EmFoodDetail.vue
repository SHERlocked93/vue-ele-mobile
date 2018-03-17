/**
* 创建于 2018/3/13
* 作者: SHERlocked93
* 功能: 商品-商品详情页
*/

<template>
  <transition name='move'>
    <div ref='foodDetail' v-show='showFlag' class='food-detail'>
      <div>
        <!-- 商品详情 -->
        <div class='food-content'>
          <!-- 图片 -->
          <div class='img-header'>
            <img :src='food.image' alt='图片'>
            <div class='el-back' @click='thisHide'>
              <i class='el-icon-my-left'></i>
            </div>
          </div>
          
          <!-- 内容 -->
          <div class='content'>
            <div class='title'>{{food.name}}</div>
            <div class='detail'>
              <span class='sell-count'>月售{{food.sellCount}}</span>
              <span class='rating'>好评率{{food.rating}}%</span>
            </div>
            <div class='food-price'>
              <span class='food-currprice'>￥{{food.price}}</span>
              <span v-show='food.oldPrice' class='food-oldprice'>￥{{food.oldPrice}}</span>
            </div>
            <!-- 购物车 -->
            <div class='cartcontrol-wrapper'>
              <cart-control :food='food'></cart-control>
            </div>
            
            <div class='buy-this'
                 v-show='!food.count'
                 @click.stop.prevent='addFirst(food, $event)'>加入购物车
            </div>
          </div>
          
          <!-- 商品介绍 -->
          <split v-show='food.info'></split>
          <div class='food-info' v-show='food.info'>
            <div class='title'>商品信息</div>
            <div class='text'>{{food.info}}</div>
          </div>
          
          <!-- 商品评价 -->
          <split></split>
          <div class='food-rating'>
            <div class='title'>商品评价</div>
            
            <!-- 只看有内容的评价 -->
            <rating-select :selectType='selectType'
                           :onlyContent='onlyContent'
                           :desc='desc'
                           :ratings='food.ratings'
                           @changeSelectType='changeSelectType'
                           @toggleOnlyContent='toggleOnlyContent'></rating-select>
            
            <!-- 评价s -->
            <div class='rating-wrapper'>
              <div v-show='food.ratings && food.ratings.length'>
                <div v-for='rating in food.ratings'
                     v-show='needShow(rating.rateType, rating.text)'
                     class='rating-item'>
                  <div class='user'>
                    <span class='name'>{{rating.username}}</span>
                    <img :src='rating.avatar' alt='头像' class='avatar'>
                  </div>
                  <div class='time'>{{rating.rateTime | formatTime('yyyy-MM-dd hh:mm:ss')}}</div>
                  <p class='text'>
                    <i :class='{"el-icon-my-thumb-up":rating.rateType===0,"el-icon-my-thumb-down":rating.rateType===1}'></i>{{rating.text}}
                  </p>
                </div>
              </div>
              <div v-show='!food.ratings || !food.ratings.length' class='no-rating'>暂无评价</div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  </transition>

</template>

<script type='text/javascript'>
  import Split from './split'
  import BScroll from 'better-scroll'
  import CartControl from './cartControl'
  import RatingSelect from './ratingSelect'
  
  import EventBus from 'utils/eventBus'
  
  /* eslint-disable no-unused-vars */
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  
  export default {
    name: 'em-food-detail',
    props: {
      food: { type: Object }
    },
    components: { CartControl, Split, RatingSelect },
    data() {
      return {
        showFlag: false, // 商品详情页是否显示flag boolean
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推介',
          negative: '吐槽'
        }
      }
    },
    methods: {
      /**
       * 显示商品详情页
       */
      thisShow() {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true
        
        this.$nextTick(() => {
          if (!this.foodDetailScroll) {
            this.foodDetailScroll = new BScroll(this.$refs.foodDetail, { click: true })
          } else this.foodDetailScroll.refresh()
        })
      },
      
      /**
       * 隐藏商品详情页
       */
      thisHide() {
        this.showFlag = false
      },
      
      /**
       * 添加当前商品到购物车
       * @param food 当前商品
       * @param ev 事件对象
       */
      addFirst(food, ev) {
        if (!ev._constructed) return
        EventBus.$emit('cartAdd', ev.target)
        this.$set(food, 'count', 1)
      },
      
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
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '~styles/mixin';
  
  $grey: rgb(147, 153, 159);
  $dark-grey: rgb(7, 17, 27);
  $light-grey: rgba(7, 17, 27, .1);
  
  .food-detail {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 10;
    width: 100vw;
    overflow: hidden;
    background-color: #f3f5f7;
    transition: all .2s;
    
    /* 商品详情 */
    .food-content {
      background-color: #fff;
      
      /* 图片 */
      .img-header {
        height: 0;
        width: 100%;
        padding-top: 100%;
        position: relative;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .el-back {
          width: 38px;
          height: 38px;
          box-sizing: border-box;
          position: absolute;
          left: 15px;
          top: 15px;
          padding: 8px;
          border-radius: 50%;
          color: #fff;
          background-color: rgba(176, 176, 176, 0.5);
          [class^=el-icon] {
            font-size: 16px;
            position: relative;
            top: 3px;
            left: 1px;
          }
        }
        
      }
      
      /* 内容 */
      .content {
        padding: 18px;
        position: relative;
        
        .title {
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: $dark-grey;
        }
        .detail {
          margin-bottom: 18px;
          line-height: 10px;
          
          .sell-count, .rating {
            font-size: 10px;
            color: $grey;
          }
          .rating {
            margin-left: 12px;
          }
        }
        .food-price {
          font-weight: 800;
          line-height: 24px;
          .food-currprice {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .food-oldprice {
            text-decoration-line: line-through;
            font-size: 10px;
            color: $grey;
          }
        }
        
        /* + */
        .cartcontrol-wrapper {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
        
        /* 加入购物车 */
        .buy-this {
          position: absolute;
          right: 18px;
          bottom: 18px;
          z-index: 12;
          height: 24px;
          line-height: 24px;
          padding: 0 12px;
          border-radius: 12px;
          font-size: 10px;
          color: #fff;
          background-color: rgb(0, 160, 220);
        }
      }
      
      /* 商品介绍 */
      .food-info {
        padding: 18px;
        .title {
          font-size: 14px;
          line-height: 14px;
          margin-bottom: 6px;
          color: $dark-grey;
        }
        .text {
          line-height: 24px;
          padding: 0 8px;
          font-weight: 200;
          font-size: 12px;
          color: rgb(77, 85, 93);
        }
      }
      
      /* 商品评价 */
      .food-rating {
        padding-top: 18px;
        .title {
          line-height: 14px;
          margin-left: 18px;
          font-size: 14px;
          color: $dark-grey;
        }
        
        .rating-wrapper {
          padding: 0 18px;
          
          .rating-item {
            position: relative;
            padding: 16px 0;
            @include border-1px($light-grey);
            
            .user {
              position: absolute;
              right: 0;
              top: 16px;
              font-size: 0;
              line-height: 12px;
              
              .name {
                display: inline-block;
                vertical-align: center;
                color: $grey;
                margin-right: 6px;
                font-size: 10px;
              }
              .avatar {
                width: 12px;
                height: 12px;
                border-radius: 50%;
              }
            }
            .time {
              font-size: 10px;
              line-height: 12px;
              margin-bottom: 6px;
              color: $grey;
            }
            .text {
              line-height: 16px;
              font-size: 12px;
              color: $dark-grey;
              [class^=el-icon-my] {
                font-size: 12px;
                margin-right: 4px;
              }
              .el-icon-my-thumb-up {
                color: rgb(0, 160, 220);
              }
              .el-icon-my-thumb-down {
                color: $grey;
              }
            }
          }
          
          .no-rating {
            padding: 16px 0;
            font-size: 12px;
            color: $grey;
          }
        }
      }
    }
  }
</style>
