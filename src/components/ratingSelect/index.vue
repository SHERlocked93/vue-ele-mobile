/**
* 创建于 2018/3/14
* 作者: SHERlocked93
* 功能: 商品评价
*/


<template>
  <div class='rating-select'>
    <div class='rating-type'>
      <div class='block'>{{desc.all}}<span class='count'>47</span></div>
      <div class='block'>{{desc.positive}}<span class='count'>50</span></div>
      <div class='block'>{{desc.negative}}<span class='count'>6</span></div>
    </div>
    
    <div class='switch'>
      <i class='el-icon-my-right-f'></i>
      <span>只看有内容的评价</span>
    </div>
  </div>
</template>

<script type='text/javascript'>
  /* eslint-disable no-unused-vars */
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
  
  export default {
    name: 'rating-select',
    props: {
      // 评价
      ratings: {
        type: Array,
        default() { return [] }
      },
      // 当前选择的类型
      selectType: {
        type: Number,
        default: ALL
      },
      // 是否只显示有内容的评价
      onlyContent: {
        type: Boolean,
        default: false
      },
      // 描述
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data() {
      return {}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~styles/mixin";
  
  $dark-grey: rgb(7, 17, 27);
  
  .rating-select {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      @include border-1px(rgba(7, 17, 27, .1));
      
      .block {
        display: inline-block;
        padding: 8px 12px;
        border-radius: 1px;
        margin-right: 8px;
        color: #fff;
      }
      
    }
  }
</style>
