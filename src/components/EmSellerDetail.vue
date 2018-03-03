/**
* 创建于 2018/3/3
* 作者: Qianyu
* 功能: 商家-头部-活动数量-商家详情
*/


<template>
  <div class='sd' @click='hideSellerDetail'>
    商家详情~
  </div>
</template>

<script type='text/javascript'>
  export default {
    name: 'EmSellerDetail',
    data() {
      return {}
    },
    methods: {
      /**
       * 隐藏商家详情
       */
      hideSellerDetail() {
        this.$emit('hideSellerDetail')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sd {
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    color: #fff;
    background-color: rgba(7, 17, 27, .8);
    
  }
</style>
