/**
* 创建于 2018/3/18
* 作者: SHERlocked93
* 功能: 商家
*/


<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{sellerInfo.name}}</h1>
        <div class="desc border-1px">
          <stars :size="36" :score="sellerInfo.score"></stars>
          <span class="text">({{sellerInfo.ratingCount}})</span>
          <span class="text">月售{{sellerInfo.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{sellerInfo.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{sellerInfo.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{sellerInfo.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <i class="el-icon-my-favorite" :class="{'active':favorite}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{sellerInfo.bulletin}}</p>
        </div>
        <ul v-if="sellerInfo.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in sellerInfo.supports">
            <span class="icon" :class="classMap[sellerInfo.supports[index].type]"></span>
            <span class="text">{{sellerInfo.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in sellerInfo.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in sellerInfo.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import { saveToLocal, loadFromLocal } from 'utils/store'
  import Stars from './stars'
  import Split from './split'
  
  export default {
    name: 'em-seller',
    props: {
      sellerInfo: {
        type: Object
      }
    },
    components: { Stars, Split },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.sellerInfo.id, 'favorite', false)
        })()
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        saveToLocal(this.sellerInfo.id, 'favorite', this.favorite)
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, { click: true })
        } else {
          this.scroll.refresh()
        }
      },
      _initPics() {
        if (this.sellerInfo.pics) {
          const picWidth = 120
          const margin = 6
          const width = (picWidth + margin) * this.sellerInfo.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~styles/mixin";
  
  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      position: relative;
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .desc {
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;
        .star {
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
        .text {
          display: inline-block;
          margin-right: 12px;
          line-height: 18px;
          vertical-align: top;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border: none;
          }
          h2 {
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 24px;
            }
          }
        }
      }
      .favorite {
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
        [class^=el-icon-my] {
          display: block;
          margin-bottom: 4px;
          line-height: 24px;
          font-size: 24px;
          color: #d4d6d9;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .text {
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px; }
      .content-wrapper {
        padding: 0 12px 16px 12px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20); }
      }
      .supports {
        .support-item {
          padding: 16px 12px;
          @include border-1px(rgba(7, 17, 27, 0.1));
          font-size: 0;
          &:last-child {
            @include border-none();
          }
        }
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease {@include bg-img('~assets/img/decrease_4');}
          &.discount {@include bg-img('~assets/img/discount_4');}
          &.guarantee {@include bg-img('~assets/img/guarantee_4');}
          &.invoice {@include bg-img('~assets/img/invoice_4');}
          &.special {@include bg-img('~assets/img/special_4');}
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
    .pics {
      padding: 18px;
      .title {
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child {
              margin: 0;
            }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0 18px;
      color: rgb(7, 17, 27);
      .title {
        padding-bottom: 12px;
        line-height: 14px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 14px;
      }
      .info-item {
        padding: 16px 12px;
        line-height: 16px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
        &:last-child {
          @include border-none();
        }
      }
    }
  }
</style>
