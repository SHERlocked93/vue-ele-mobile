/**
* 创建于 2018/3/14
* 作者: SHERlocked93
* 功能: 商品评价
*/


<template>
  <div class='rating-select'>
    <div class='rating-type'>
      <div class='block positive'
           :class='{"active":selectType===2}'
           @click='changeSelectType(2,$event)'>{{desc.all}}
        <span class='count'>{{ratings.length}}</span>
      </div>
      <div class='block positive'
           :class='{"active":selectType===0}'
           @click='changeSelectType(0,$event)'>{{desc.positive}}
        <span class='count'>{{positiveRatingNum}}</span>
      </div>
      <div class='block negative'
           :class='{"active":selectType===1}'
           @click='changeSelectType(1,$event)'>{{desc.negative}}
        <span class='count'>{{negativeRatingNum}}</span>
      </div>
    </div>
    
    <div class='switch'>
      <i class='el-icon-my-right-f'
         :class='{"on":onlyContent}'
         @click='toggleOnlyContent($event)'></i>
      <span class='text'>只看有内容的评价</span>
    </div>
  </div>
</template>

<script type='text/javascript'>
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
    },
    computed: {
      /**
       * 正面评价个数
       * @returns {*}
       */
      positiveRatingNum() {
        return this.ratings.filter(T => T.rateType === POSITIVE).length
      },
      
      /**
       * 负面评价个数
       * @returns {*}
       */
      negativeRatingNum() {
        return this.ratings.filter(T => T.rateType === NEGATIVE).length
      }
    },
    methods: {
      /**
       * 选择的评论类型
       * @param type
       * @param ev
       */
      changeSelectType(type, ev) {
        if (!ev._constructed) return
        this.$emit('changeSelectType', type)
      },
      
      /**
       * 切换是否只看有内容的评论
       * @param ev
       */
      toggleOnlyContent(ev) {
        if (!ev._constructed) return
        this.$emit('toggleOnlyContent', this.contentType = !this.contentType)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~styles/mixin";
  
  $grey: rgba(7, 17, 27, .1);
  
  $dark-grey: rgb(7, 17, 27);
  
  .rating-select {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      @include border-1px($grey);
      
      .block {
        display: inline-block;
        padding: 8px 12px;
        border-radius: 1px;
        font-size: 12px;
        margin-right: 8px;
        color: rgb(77, 85, 93);
        
        &.active {
          color: #fff;
        }
        
        .count {
          font-size: 8px;
          margin-left: 2px;
        }
        
        &.positive {
          background-color: rgba(0, 160, 220, .2);
          &.active {
            background-color: rgb(0, 160, 220);
          }
        }
        
        &.negative {
          background-color: rgba(77, 85, 93, .2);
          &.active {
            background-color: rgb(77, 85, 93);
          }
        }
      }
    }
    
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid $grey;
      color: rgb(147, 153, 159);
      font-size: 0;
      
      [class^=el-icon-my] {
        font-size: 18px;
        margin-right: 4px;
        margin-top: 2px;
        position: relative;
        top: -1px;
        &.on {
          color: #00c850;
        }
      }
      
      .text {
        vertical-align: top;
        font-size: 12px;
      }
    }
  }
</style>
