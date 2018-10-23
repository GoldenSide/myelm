<template>
      <transition name="move">
             <!--  -->
          <div class="food" v-show="showFlag" ref="food">
                <div class="content-wrapper">

               
                <div class="food-header">
                      <img :src="food.image">
                      <div class="back" @click="hide">
                            <i class="icon-arrow_lift"></i>
                      </div>
                </div>
                <div class="info">
                      <h2 class="title">{{food.name}}</h2>
                      <div class="caculate">
                            <span class="saleNum">月销售{{food.counting}}份</span>
                            <span class="goodRateNum">好评率{{food.rating}}%</span>
                      </div>
                      <div class="price">
                           <div class="left">
                              <span class="now">￥{{food.price}}</span>
                              <s class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</s>
                           </div>
                           <div class="right ">
                                 <div class="cartcontrol-wrapper">
                                 <cartcontrol :food="food" @add="addFood"></cartcontrol>
                                 </div>
                                 <transition name='fade'>
                                      <div class="buy"  @click="addFirst" v-show="!food.count||food.count==0">
                                            加入购物车
                                      </div>
                                 </transition>
                           </div>
                           
                      </div>
                </div>
                  <div class="split" v-show="food.info"></div>
                <div class="desc" v-show="food.info">
                        <h1 class="title">商品信息</h1>
                        <div class="content-wrapper">
                              <p class="content">
                              {{food.info}}
                              </p>
                        </div>
                </div>
                <div class="split"></div>
                <ratingselect :ratings="food.ratings" :selectType="selectType" :onlyCotent="onlyCotent" @select="selectRating" @toggle="toggleRating">
                    </ratingselect>
                <div class="rating-wrapper">
                     <ul v-show="food.ratings&&food.ratings.length">
                           <li v-for="(item,index) in food.ratings" :key="index" class="rating-item" v-show="isShow(item.rateType,item.text)">
                               <p class="header">
                                     <span class="left">{{item.rateTime|dataformat}}</span>
                                    <img :src="item.avatar" alt="" srcset="" class="right img">
                                    <span class="right">
                                          {{item.username}}
                                    </span>
                               </p>
                               <p class="text">
                                     <span :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></span>
                                     {{item.text}}
                               </p>
                           </li>
                     </ul>
                </div>
          </div> 
          </div>
      </transition>
</template>

<script type='text/ecmascript-6'>
import Vue from "vue";
import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol";
import ratingselect from "../ratingselect/ratingselect";
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: 2,
      onlyCotent: false
    };
  },
  created() {},
  methods: {
    hide() {
      this.showFlag = !this.showFlag;
    },
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      this.$emit("add", event.target);
      Vue.set(this.food, "count", 1);
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    addFood(target) {
      this.$emit("add", target);
    },
    selectRating(type) {
      this.selectType = type;
      //由于操作dom导致页面重绘 刷新来初始化滚动
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleRating() {
      this.onlyCotent = !this.onlyCotent;
      //由于操作dom导致页面重绘 刷新来初始化滚动
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
     isShow(type, text) {
      //在这里使用的是return 所以 一旦满足就直接跳出，并不在执行下面 的代码(没有内容为先决过滤条件，不会和type重复校验)
      if (this.onlyCotent && !text) {
        return false;
      }
      if (this.selectType === 2) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  computed: {},
  components: {
    cartcontrol,
    ratingselect
  }
};
</script>

<style scoped lang='less'>
.food {
  //   width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 1.31rem;
  z-index: 30;
  background-color: #fff;
  transform: translate3d(0, 0, 0);
  &.move-enter-active,
  &.move-leave-active {
    transition: all 0.4s linear;
  }
  &.move-enter,
  &.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .food-header {
    width: 100%;
    height: 7.2rem;
    img {
      width: 100%;
      height: 100%;
    }
    .back {
      // width: ;
      height: auto;
      position: absolute;
      left: 0.4rem;
      top: 0.42rem;
      z-index: 21;
      i {
        font-weight: 700;
        font-size: 0.5rem;
        color: #fff;
      }
    }
  }
  .info {
    padding: 0.3rem 0.4rem;
    .title {
      text-align: left;
      color: #333;
      font-weight: 700;
      font-size: 0.41rem;
    }
    .caculate {
      color: #93999f;
      text-align: left;
      font-size: 0.32rem;
      line-height: 0.55rem;
    }
    .price {
      padding: 0.2rem 0;
      margin-top: 0.3rem;
      position: relative;
      .left {
        //   float: left;
        text-align: left;
        .now {
          font-size: 0.42rem;
          color: red;
        }
        .old {
          font-size: 0.32rem;
          color: #93999f;
        }
      }
      .right {
        float: right;
        //   width: 2.3rem;
        height: 0.66rem;
        right: 0rem;
        bottom: 0rem;
        position: absolute;
      }
      .buy {
        z-index: 30;
        color: #fff;
        height: 0.7rem;
        border-radius: 0.35rem;
        line-height: 0.7rem;
        background: rgb(0, 160, 220);
        width: 2.3rem;
        right: 0rem;
        bottom: 0rem;
        position: absolute;
      }
    }
  }
  .split {
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #f3f5f7;
    height: 0.49rem;
    width: 100%;
  }
  .desc {
    padding: 0.25rem 0.35rem;
    .title {
      line-height: 0.6rem;
      font-size: 0.37rem;
      text-align: left;
    }
    .content-wrapper {
      padding: 0.142rem 0;
      .content {
        line-height: 0.6rem;
        text-align: justify;
        text-indent: 2em;
        color: #93999f;
      }
    }
  }
  .rating-wrapper {
    width: 100%;
    .rating-item {
      padding: 0.35rem;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 5%;
        width: 90%;
        height: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      }
      &:last-child {
        &::after {
          content: "";
          display: none;
          visibility: hidden;
        }
      }
      .header {
        overflow: hidden;
        margin-bottom: 0.4rem;
        .left {
          float: left;
          color: #93999f;
          font-size: 0.32rem;
        }
        .right {
          float: right;
          vertical-align: middle;
        }
        span.right {
          color: #93999f;
          font-size: 0.3rem;
        }
        img.right {
          width: 0.31rem;
          height: 0.31rem;
          border-radius: 0.12rem;
          margin-left: 0.2rem;
        }
      }
      .text {
        text-align: left;
        line-height: 0.6rem;

        .icon-thumb_up {
          color: #00a0dc;
          font-size: 0.4rem;
        }
        .icon-thumb_down {
          color: #93999f;
          //   color: #00a0dc;
          font-size: 0.4rem;
        }
      }
    }
  }
}
</style>