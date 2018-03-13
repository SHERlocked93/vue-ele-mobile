/**
* 创建于 2018/3/11
* 作者: SHERlocked93
* 功能: 商品底部 > 购物车组件
*/


<template>
  <div class='sc'>
    <!-- 左侧购物车、总价、配送费 -->
    <div class='sc-left' @click='toggleList'>
      <div class='logo-wrapper' :class='{"highlight":totalCount}'>
        <i class='el-icon-my-cart'></i>
        <div class='logo-num' v-show='totalPrice'>{{totalCount}}</div>
      </div>
      <div class='sc-price'>￥{{totalPrice}}</div>
      <div class='sc-desc'>另需配送费￥{{deliveryPrice}}元</div>
    </div>
    
    <!-- 右侧购物按钮 -->
    <div class='sc-right'
         :class='{"enough":totalPrice >= minPrice}'
         @click='cartPay'>
      {{payDesc}}
    </div>
    
    <!-- 商品增加的时候飞入效果 -->
    <div class='ball-container'>
      <div v-for='ball in balls'>
        <transition name='drop'
                    @before-enter='beforeDrop'
                    @enter='dropping'
                    @after-enter='afterDrop'>
          <div class='ball' v-show='ball.show'>
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    
    <!-- 购物车列表 -->
    <transition name='fold'>
      <div class='shopcart-list' v-show='listShow'>
        <div class='list-header'>
          <span class='list-title'>购物车</span>
          <span class='list-clear' @click='clearList'>清空</span>
        </div>
        
        <div ref='cartListContent' class='list-content'>
          <div>
            <div v-for='food in selectFoods' class='food-item'>
              <div class='foodName'>{{food.name}}</div>
              <div class='price'>￥{{food.price * food.count}}</div>
              <div class='cartcontrol-wrapper'>
                <cart-control :food='food'></cart-control>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- 模糊背景 -->
    <transition name='fade'>
      <div class='list-mask' v-show='listShow' @click='toggleList'></div>
    </transition>
  
  </div>
</template>

<script type='text/javascript'>
  import BScroll from 'better-scroll'
  import EventBus from 'utils/eventBus'
  import CartControl from '../cartControl'
  
  export default {
    name: 'shopCart',
    props: {
      minPrice: { type: Number, default: 0 }, // 起送费
      deliveryPrice: { type: Number, default: 0 }, // 配送费
      selectFoods: { type: Array, default: () => [] } // 购物车中商品
    },
    components: { CartControl },
    data() {
      return {
        balls: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
        dropBalls: [], // 下落的球
        foldFoodList: false // 购物车中菜单的展开状态 boolean
      }
    },
    computed: {
      /**
       * 计算商品总价
       * @returns {number} 商品总价
       */
      totalPrice() {
        let total = 0
        this.selectFoods.forEach(food => {
          total += food.price * food.count
        })
        return total
      },
      
      /**
       * 计算商品总数
       * @returns {number} 商品总数
       */
      totalCount() {
        let count = 0
        this.selectFoods.forEach(food => {
          count += food.count
        })
        return count > 99 ? 99 : count
      },
      
      /**
       * 购物车描述
       * @return {string} 右侧结算区文字
       */
      payDesc() {
        if (this.totalPrice === 0) return `${this.minPrice}元起送`
        if (this.totalPrice < this.minPrice) return `还差￥${this.minPrice - this.totalPrice}元起送`
        return '去结算'
      },
      
      /**
       * 购物车中菜单的展开状态
       * @returns {boolean} 展开状态 false:不展开 true:展开
       */
      listShow() {
        if (!this.totalCount) {
          this.foldFoodList = true
          return false
        }
        const show = !this.foldFoodList
        if (show) {
          if (!this.shopcartListScroll) {
            this.$nextTick(() => this.shopcartListScroll = new BScroll(this.$refs.cartListContent, { click: true }))
          } else this.shopcartListScroll.refresh()
        }
        return show
      }
    },
    methods: {
      /**
       * drop: 动画before-enter
       * @param el 原生DOM对象
       */
      beforeDrop(el) {
        let count = this.balls.length
        while (count--) {
          const ball = this.balls[count]
          if (ball.show) {
            const rect = ball.el.getBoundingClientRect()
            const x = rect.left - 32
            const y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            const inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      
      /**
       * drop: 动画enter
       */
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        const rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          const inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      
      /**
       * drop: 动画after-enter
       */
      afterDrop(el) {
        const ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      
      /**
       * toggle显示购物车中菜单
       */
      toggleList() {
        if (!this.totalCount) return
        this.foldFoodList = !this.foldFoodList
      },
      
      /**
       * 清空购物车
       */
      clearList() {
        this.selectFoods.forEach(food => food.count = 0)
      },
      
      /**
       * 去结算
       */
      cartPay() {
        if (this.totalPrice < this.minPrice) return
        alert(`支付 ${this.totalPrice} 元`)
      }
    },
    mounted() {
      EventBus.$on('cartAdd', el => {
        for (const ball of this.balls) {
          if (!ball.show) {
            ball.el = el
            ball.show = true
            this.dropBalls.push(ball)
            return
          }
        }
      })
    },
    destroyed() {
      EventBus.$off('cartAdd')
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin";
  
  $dark-grey: #141d27;
  $grey: rgba(255, 255, 255, .4);
  $light-grey: rgba(255, 255, 255, .1);
  
  .sc {
    background-color: $dark-grey;
    display: flex;
    height: 100%;
    color: $grey;
    z-index: 50;
    
    /* 左侧购物车、总价、配送费 */
    .sc-left {
      z-index: 50;
      flex-grow: 1;
      display: flex;
      flex-flow: row;
      align-items: center;
      
      /* 购物车 */
      .logo-wrapper {
        flex-shrink: 0;
        flex-basis: 56px;
        display: inline-block;
        position: relative;
        top: -8px;
        margin: 0 12px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        text-align: center;
        border: 6px solid $dark-grey;
        background-color: #2b343c;
        
        &.highlight {
          background-color: rgb(0, 160, 220);
          i {
            color: #fff;
          }
        }
        
        i {
          color: #80858a;
          font-size: 24px;
          line-height: 44px;
        }
        
        .logo-num {
          position: absolute;
          top: -5px;
          right: -6px;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          border-radius: 16px;
          font-weight: 700;
          font-size: 9px;
          color: #fff;
        }
      }
      
      /* 总价 */
      .sc-price {
        flex-shrink: 0;
        font-size: 16px;
        padding-right: 12px;
        font-weight: 700;
        border-right: 1px solid $light-grey;
        color: $grey;
      }
      
      /* 配送费 */
      .sc-desc {
        flex-grow: 1;
        font-size: 10px;
        margin-left: 12px;
      }
    }
    
    /* 右侧购物按钮 */
    .sc-right {
      z-index: 50;
      flex-shrink: 0;
      flex-basis: 105px;
      width: 105px;
      color: $grey;
      font-weight: 700;
      line-height: 48px;
      height: 48px;
      text-align: center;
      background-color: #2b333b;
      
      &.not-enough {
        background-color: #2b333b;
      }
      &.enough {
        background-color: #00b43c;
        color: #fff;
      }
    }
    
    /* 商品增加的时候飞入效果 */
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 400;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
    
    /* 购物车列表 */
    .shopcart-list {
      position: fixed;
      width: 100vw;
      left: 0;
      bottom: 48px;
      z-index: -1;
      background-color: #fff;
      color: #000;
      transition: all .4s;
      
      &.fold-enter, &.fold-leave-to {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
      }
      &.fold-enter-to, &.fold-leave {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      
      /* 购物车头部 */
      .list-header {
        height: 40px;
        background-color: #f3f5f7;
        display: flex;
        justify-content: space-between;
        @include border-1px(rgba(7, 17, 27, .1));
        
        /* 购物车 */
        .list-title {
          margin-left: 18px;
          font-size: 14px;
          line-height: 40px;
          color: rgb(7, 17, 27);
          font-weight: 200;
        }
        
        /* 清空 */
        .list-clear {
          font-size: 12px;
          margin-right: 18px;
          color: rgb(0, 160, 220);
          line-height: 40px;
        }
      }
      
      /* 购物车内容 */
      .list-content {
        max-height: 217px;
        padding: 0 18px;
        overflow: hidden;
        
        .food-item {
          height: 48px;
          display: flex;
          align-items: center;
          @include border-1px(rgba(7, 17, 27, .1));
          
          .foodName {
            flex-grow: 1;
            font-size: 14px;
            color: rgb(7, 17, 27);
            font-weight: 400;
          }
          .price {
            flex-shrink: 0;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
            line-height: 48px;
            margin-right: 6px;
            &::first-letter {
              font-size: 10px;
              font-weight: 400;
            }
          }
          .cartcontrol-wrapper {
            flex-shrink: 0;
          }
        }
      }
    }
    
    /* 模糊蒙版 */
    .list-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -2;
      background-color: rgba(7, 17, 27, .8);
      filter: blur(10px);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
  }
</style>
