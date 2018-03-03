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
    
    <!-- 底部 -->
    <div class='app-footer'>
      底部
    </div>
  </div>
</template>

<script>
  import EmHeader from 'components/EmHeader'
  import { seller as getSeller } from 'api/conn'
  
  export default {
    name: 'App',
    data() {
      return {
        sellerInfo: {}
      }
    },
    components: { EmHeader },
    mounted() {
      getSeller().then(resp => this.sellerInfo = resp)
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  @import "styles/mixin";
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    /* 选项卡 */
    .app-tab {
      display: flex;
      width: 100vw;
      height: 40px;
      @include border-1px(rgba(7, 17, 27, .1));
      font-size: 14px;
      .app-tab-item {
        color: rgb(77, 85, 93);
        width: 33%;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        line-height: 40px;
      }
    }
    
    /* 内容区 */
    .app-content {
    }
    
    /* 底部 */
    .app-footer {
      position: fixed;
      bottom: 0;
      width: 100vw;
      background-color: wheat;
    }
  }
</style>
