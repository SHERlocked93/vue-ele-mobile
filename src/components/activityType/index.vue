/**
* 创建于 2018/3/10
* 作者: SHERlocked93
* 功能: 活动类型图片组件
*/

<template>
  <div class='support-brand' :class='classMap'></div>
</template>

<script type='text/javascript'>
  import { activityTypeFilter } from 'utils/filters'
  
  export default {
    name: 'activityType',
    props: ['sellerType'],
    computed: {
      /**
       * 返回活动类型
       * @returns {string} 活动类型
       */
      classMap() {
        return activityTypeFilter(this.sellerType)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin";
  
  .support-brand {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
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
</style>
