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
            <div class='el-back'>
              <i class='el-icon-my-left' @click='thisHide'></i>
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
          </div>
        </div>
        
        <!-- 商品介绍 -->
      </div>
    
    </div>
  </transition>

</template>

<script type='text/javascript'>
  import BScroll from 'better-scroll'
  
  export default {
    name: 'em-food-detail',
    props: {
      food: { type: Object }
    },
    data() {
      return {
        showFlag: true // 商品详情页是否显示flag boolean
      }
    },
    methods: {
      /**
       * 显示商品详情页
       */
      thisShow() {
        this.showFlag = true
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
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $grey: rgb(147, 153, 159);
  
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
        .title {
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
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
      }
    }
    
  }
</style>
