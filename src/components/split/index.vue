/**
* 创建于 2018/3/14
* 作者: SHERlocked93
* 功能: 分割
*/


<template>
  <div class='split'></div>
</template>

<script type='text/javascript'>
  export default {
    name: 'split'
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $grey: rgba(7, 17, 27, .1);
  
  .split {
    height: 16px;
    width: 100%;
    border-top: 1px solid $grey;
    border-bottom: 1px solid $grey;
    background-color: #f3f5f7;
  }
</style>
