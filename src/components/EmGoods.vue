<template>
  <div class='goods'>
    <!-- 左边菜单 -->
    <div class='menu-cont' ref="wrapperMenu">
      <div>
        <div v-for='(item, $index) in goodsData'
             :key='item.name+1'
             class='menu-item'
             :class='{"menu-current":currentIndex===$index}'>
          <div>
            <activity-type v-show='item.type>0'
                           :sellerType='item.type'
                           class='menu-item-icon'></activity-type>
            {{item.name}}
          </div>
        </div>
      </div>
    
    </div>
    
    <!-- 右边菜单详情 -->
    <div class='foods-cont' ref='wrapperFood'>
      <div>
        <div v-for='item in goodsData' :key='item.name+2' class='food-list food-list-hook'>
          <!-- 各种套餐 -->
          <h3 class='food-title'>{{item.name}}</h3>
          <!-- 套餐详情 -->
          <div class='food-content'>
            <div class='food-item' v-for='food in item.foods'>
              <!-- 商品图片 -->
              <div class='food-img'>
                <img :src='food.image' alt='image'>
              </div>
              
              <!-- 商品详情 -->
              <div class='food-info'>
                <h4 class='food-name'>{{food.name}}</h4>
                <p class='food-desc'>{{food.description}}</p>
                <div class='food-extra'>
                  <span>月售{{food.sellCount}}</span>&nbsp;
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class='food-price'>
                  <span class='food-currprice'>￥{{food.price}}</span>
                  <span v-show='food.oldPrice' class='food-oldprice'>￥{{food.oldPrice}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
    
    <!-- 底部 -->
    <!--<div class='app-footer'>-->
    <!--底部-->
    <!--</div>-->
  </div>
</template>

<script type='text/javascript'>
  import { goods as getGoods } from 'api/conn'
  import ActivityType from './activityType'
  import BScroll from 'better-scroll'
  
  export default {
    name: 'em-goods',
    components: { ActivityType },
    data() {
      return {
        goodsData: [], // 商品
        listHeight: [], // 高度
        scrollY: 0 // 跟踪当前右侧滚动距离
      }
    },
    computed: {
      /**
       * 计算右侧菜单栏滚动对应到左侧菜单的index
       * @returns {number} 右侧菜单栏滚动对应到左侧菜单的index
       */
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          const height1 = this.listHeight[i]
          const height2 = this.listHeight[i + 1]
          if (!height2 || (height1 <= this.scrollY && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    methods: {
      /**
       * 初始化滚动
       */
      initScroll() {
        this.menuScroll = new BScroll(this.$refs.wrapperMenu, {})
        this.foodScroll = new BScroll(this.$refs.wrapperFood, { probeType: 3 })
        this.foodScroll.on('scroll', pos => {
          this.scrollY = Math.abs(~~(pos.y))
        })
      },
      
      /**
       * 计算高度
       */
      calculateHeight() {
        let height = 0
        const foodList = this.$refs.wrapperFood.getElementsByClassName('food-list-hook')
        this.listHeight.push(height)
        for (const food of foodList) {
          height += food.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    mounted() {
      getGoods().then(({ data: { goods } }) => {
        this.goodsData = goods
        this.$nextTick(() => {
          this.initScroll()
          this.calculateHeight()
        })
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~styles/mixin";
  
  $grey: rgb(147, 153, 159);
  
  .goods {
    position: absolute;
    top: 174px;
    bottom: 46px;
    display: flex;
    flex-flow: row;
    width: 100vw;
    overflow: hidden;
    
    /* 左边菜单 */
    .menu-cont {
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      display: flex;
      flex-flow: column;
      
      .menu-item {
        height: 54px;
        line-height: 14px;
        font-weight: 200;
        font-size: 12px;
        padding: 0 12px;
        display: flex;
        align-items: center;
        flex-shrink: 0;
        @include border-1px(rgba(7, 17, 27, .1));
        
        /* 当前激活的左侧菜单 */
        &.menu-current {
          background-color: #fff;
          font-weight: 700;
          margin-top: -1px;
          z-index: 10;
          @include border-none;
        }
        
        .menu-item-icon {
          display: inline-block;
        }
      }
      
    }
    
    /* 右侧详情 */
    .foods-cont {
      flex-grow: 1;
      
      .food-list {
        .food-title {
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9dde1;
          color: $grey;
          background: #f3f5f7;
        }
        .food-content {
          .food-item {
            display: flex;
            flex-flow: row;
            align-items: flex-start;
            padding: 18px;
            @include border-1px(rgba(7, 17, 27, .1));
            &:last-child {
              @include border-none;
            }
            
            .food-img {
              margin-right: 10px;
              flex: 0 0 57px;
              img {
                width: 57px;
                height: 57px;
              }
            }
            
            .food-info {
              flex-grow: 1;
              .food-name {
                margin: 2px 0 8px 0;
                height: 14px;
                line-height: 14px;
                font-size: 14px;
                color: rgb(7, 17, 27);
              }
              .food-desc, .food-extra {
                font-size: 10px;
                line-height: 10px;
                color: $grey;
                margin-bottom: 7px;
              }
              .food-desc {
              }
              .food-extra {
                line-height: 10px;
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
      }
    }
    
    /* 底部 */
    /*.app-footer {*/
    /*position: fixed;*/
    /*bottom: 0;*/
    /*width: 100vw;*/
    /*background-color: wheat;*/
    /*}*/
  }
</style>
