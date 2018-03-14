/**
* 创建于 2018/3/12
* 作者: SHERlocked93
* 功能: 购物车增加减少按钮组件  - 2 +
*/


<template>
  <div class='cart-control'>
    <!-- 减少 -->
    <transition name='move24px'>
      <div class='cc-decrease'
           v-show='food.count>0'
           @click.stop.prevent='decreaseCart'>
        <i class='el-icon-my-minuscircleoutline'></i>
      </div>
    </transition>
    
    <!--计数-->
    <transition name='move24px'>
      <div class='cc-count'
           v-show='food.count>0'>
        {{food.count}}
      </div>
    </transition>
    
    <!-- 增加 -->
    <div class='cc-add'
         @click.stop.prevent='addCart'>
      <i class='el-icon-my-plus'></i>
    </div>
  </div>
</template>

<script type='text/javascript'>
  import EventBus from 'utils/eventBus'
  
  export default {
    name: 'cartControl',
    props: {
      food: { // 当前cart-control对应的food
        type: Object
      }
    },
    data() {
      return {}
    },
    methods: {
      /**
       * 点击减少，当前food的count-1
       * @param ev 事件对象
       */
      decreaseCart(ev) {
        if (!ev._constructed) return
        this.food.count--
      },
      
      /**
       * 点击增加，当前food的count+1
       * @param ev 事件对象
       */
      addCart(ev) {
        if (!ev._constructed) return
        if (!this.food.count) this.$set(this.food, 'count', 1)
        else this.food.count++
        EventBus.$emit('cartAdd', ev.target)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .cart-control {
    display: flex;
    
    .cc-decrease, .cc-add {
      padding: 6px;
      cursor: pointer;
      
      i {
        font-size: 24px;
        color: rgb(0, 160, 220);
      }
    }
    
    .cc-decrease {
      display: inline-block;
    }
    .cc-count {
      display: inline-block;
      line-height: 36px;
      color: rgb(147, 153, 159);
    }
    .cc-add {
      display: inline-block;
    }
    
    /* 动画效果 */
    .cc-count, .cc-decrease {
      transition: all .2s linear;
      &.move24px-enter, &.move24px-leave-to {
        opacity: 0;
        transform: translate3d(24px, 0, 0) rotate(90deg);
      }
      &.move24px-enter-to, &.move24px-leave {
        opacity: 1;
        transform: translate3d(0, 0, 0) rotate(0);
      }
    }
  }
</style>
