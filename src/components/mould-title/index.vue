/**
* 创建于 2018/3/6
* 作者: SHERlocked93
* 功能: 模块的标题，类似于：   ------ title -----
*/


<template>
  <div class='mt'>
    <div class='line'></div>
    <div class='title'>{{thisTitle}}</div>
    <div class='line'></div>
  </div>
</template>

<script type='text/javascript'>
  export default {
    name: 'mould-title',
    props: ['thisTitle'],
    data() {
      return {}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .mt {
    margin: 30px auto 24px;
    display: flex;
    width: 100%;
    
    .line {
      flex-grow: 1;
      position: relative;
      top: -6px;
      border-bottom: 1px solid rgba(255, 255, 255, .2);
    }
    
    .title {
      flex-shrink: 0;
      font-size: 14px;
      font-weight: 700;
      padding: 0 12px;
    }
  }
</style>
