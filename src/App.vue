<!--suppress HtmlUnknownTarget -->
<template>
  <div id="app">
    
    <!-- 头部 -->
    <em-header :sellerInfo='sellerInfo'/>
    
    <!-- tab -->
    <div class='app-tab'>
      <div class='app-tab-item'>
        <router-link to='goods' tag='div'>商品</router-link>
      </div>
      <div class='app-tab-item'>
        <router-link to='ratings' tag='div'>评价</router-link>
      </div>
      <div class='app-tab-item'>
        <router-link to='seller' tag='div'>商家</router-link>
      </div>
    </div>
    
    <!-- 内容区 -->
    <div class='app-content'>
      <router-view/>
    </div>
  
  </div>
</template>

<script>
  import EmHeader from 'components/EmHeader'
  import { seller as getSeller } from 'api/conn'
  
  export default {
    name: 'App',
    components: { EmHeader },
    data() {
      return {
        sellerInfo: {}, // 商家信息
        appFilterShow: false // 蒙层
      }
    },
    mounted() {
      getSeller().then(resp => this.sellerInfo = resp)
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  @import "styles/mixin";
  
  #app {
    font-family: "微软雅黑", 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    z-index: 0;
    height: 100vh;
    width: 100vw;
    position: relative;
    display: flex;
    flex-flow: column;
    
    /* 选项卡 */
    .app-tab {
      flex-shrink: 0;
      display: flex;
      width: 100vw;
      height: 34px;
      @include border-1px(rgba(7, 17, 27, .1));
      font-size: 14px;
      .app-tab-item {
        color: rgb(77, 85, 93);
        width: 33%;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        line-height: 34px;
      }
    }
    
    /* 内容区 */
    .app-content {
      flex-grow: 1;
      overflow: hidden;
      padding-bottom: 40px;
    }
    
  }
</style>
