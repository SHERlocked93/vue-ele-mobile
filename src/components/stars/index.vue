/**
* 创建于 2018/3/6
* 作者: SHERlocked93
* 功能: 评分组件
*/


<template>
  <div class='star' :class='"star-"+size'>
    <span v-for='(itemClass,$index) in itemClasses'
          class='star-item'
          :key='$index'
          :class='itemClass'></span>
  </div>
</template>

<script type='text/javascript'>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  
  export default {
    name: 'stars',
    props: {
      // 星星的size大小，可以为24、36、48
      size: {
        type: Number,
        default: 36
      },
      score: {
        type: Number
      }
    },
    computed: {
      /**
       * 根据score返回对应的数组
       * ex: this.score:2.6
       * rs: ["on", "on", "half", "off", "off"]
       * @returns {Array}
       */
      itemClasses() {
        const result = []
        const score = Math.floor(this.score * 2) / 2
        let on_num = Math.floor(score)
        const half_has = score % 1 !== 0
        
        while (on_num--) result.push(CLS_ON)
        half_has && result.push(CLS_HALF)
        while (result.length < LENGTH) result.push(CLS_OFF)
        
        return result
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~styles/mixin";
  
  .star {
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        -webkit-background-size: 20px 20px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img('~assets/img/star48_on')
        }
        &.half {
          @include bg-img('~assets/img/star48_half')
        }
        &.off {
          @include bg-img('~assets/img/star48_off')
        }
      }
    }
    
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img('~assets/img/star36_on')
        }
        &.half {
          @include bg-img('~assets/img/star36_half')
        }
        &.off {
          @include bg-img('~assets/img/star36_off')
        }
      }
    }
    
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        -webkit-background-size: 10px 10px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-img('~assets/img/star24_on')
        }
        &.half {
          @include bg-img('~assets/img/star24_half')
        }
        &.off {
          @include bg-img('~assets/img/star24_off')
        }
      }
    }
    
  }
</style>
