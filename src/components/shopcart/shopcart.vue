<template>
    <div>
    <div class="shopcart">
       <div class="content" @click.stop.prevent="toggglelist">
           <div class="content-left">
               <div class="logo-wrapper">               
                 <div class="logo" :class="{'highlight':totalCount>0}">
                        <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                 </div>
                  <div class="num"  v-show="totalCount>0">{{totalCount}}</div>
               </div>
               <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
               <div class="desc">
                   另需配送费￥{{deliveryPrice}}元
               </div>
           </div>
           <div class="content-right" @click.stop.prevent="pay">
                           <div class="pay" :class="payClass">
                               {{payDesc}}
                           </div>
           </div>
       </div>
       <transition name="fold">
             <div class="shopcart-list" v-show="listShow">
               <div class="list-header">
                 <span class="title">购物车</span>
                 <span class="empty" @click="empty">清空</span>
               </div>
                <div class="list-content" ref="listContent">
                   <ul>
                     <li class="food" v-for="(food,index) in selectFoods" :key="index">
                       <span class="name">{{food.name}}</span>
                       <span class="price">￥{{food.price*food.count}}</span>
                       <cartcontrol @add="addFood" class="cartcontrol" :food="food">
                             
                       </cartcontrol>
                     </li>
                   </ul>
                </div>
             </div>
       </transition>  
       <div class="ball-wrapper">
             <div v-for="(ball,index) in balls" :key="index">
            <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
              <div class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
              </div>
            </transition>   
            </div> 
        </div>    
    </div>
       <transition name='fade'>
            <div class="list-mask" @click.stop.prevent="hideList" v-show="listShow"></div>
       </transition> 
  </div>
</template>

<script type="text/ecmascript-6">
import cartcontrol from "../cartcontrol/cartcontrol";
import BScroll from "better-scroll";
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fold: true,
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ]
    };
  },
  computed: {
    //订单总额
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    //订单数
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    //支付按钮文字
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        return `差￥${this.minPrice - this.totalPrice}元起送`;
      } else {
        return "去结算";
      }
    },
    //支付按钮样式
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },

    //展示列表
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true,
              probeType: 3
            });
          }
        });
      }
      return show;
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        if (!this.balls[i].show) {
          this.balls[i].show = true;
          this.balls[i].el = el;
          return;
        }
      }
    },
    beforeDrop(el) {
      this.balls.forEach(ele => {
        if (ele.show) {
          let rect = ele.el.getBoundingClientRect();
          let x = rect.left - 50;
          let y = -(window.innerHeight - rect.top - 60);
          el.style.display = "";
          el.style.opacity = 1;
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      });
    },
    dropping(el, done) {
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        el.style.opacity = 0.1;
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
        el.addEventListener("transitionend", done);
      });
    },
    afterDrop(el) {
      this.balls.forEach(ele => {
        if (ele.show) {
          ele.show = false;
        }
      });
      el.style.display = "none";
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        // 如果总价小于最小的起送价格，跳出
        return false;
      } else {
        let payPrice = this.totalPrice + this.deliveryPrice;
        window.alert("支付" + payPrice + "元");
      }
    },
    addFood(target) {
      this.drop(target);
    },
    //切换显示
    toggglelist() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    //隐藏
    hideList() {
      this.fold = !this.fold;
    }
  },
  components: {
    cartcontrol
  }
};
</script>

<style scoped lang="less">
.shopcart {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 1.3rem;
  .content {
    background: #141d27;
    display: flex;
    height: 100%;
    .content-left {
      flex: 0.69;
      height: 100%;
      padding-left: 0.3rem;
      .logo-wrapper {
        margin-top: -0.4rem;
        float: left;
        height: 1.3rem;
        width: 1.3rem;
        padding: 0.18rem;
        border-radius: 50%;
        background-color: #141d27;
        position: relative;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #2b343c;
          &.highlight {
            background-color: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            font-size: 0.9rem;
            color: #80858a;
            line-height: 1.4rem;
            &.highlight {
              color: #fff;
            }
          }
        }
        .num {
          background-color: rgb(240, 20, 20);
          position: absolute;
          top: 0;
          right: 0;
          width: 0.57rem;
          height: 0.43rem;
          border-radius: 0.25rem;
          font-size: 0.3rem;
          color: #fff;
          font-weight: 700;
          line-height: 0.43rem;
          box-shadow: 0 0.05rem 0.01rem 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        height: 100%;
        float: left;
        width: 2rem;
        line-height: 1.3rem;
        font-weight: 700;
        font-size: 0.55rem;
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        height: 100%;
        line-height: 1.3rem;
        font-size: 0.36rem;
        color: #72777d;
        float: left;
      }
    }
    .content-right {
      flex: 0.31;
      .pay {
        height: 100%;
        line-height: 1.3rem;
        text-align: center;
        font-size: 0.4rem;
        font-weight: 700;
        background: #141d27;
        color: #72777d;
        &.enough {
          background: #00b43c;
          color: #fff;
        }
        &.not-enough {
          background: #2b333b;
        }
      }
    }
  }
  .shopcart-list {
    width: 100%;
    z-index: -1;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    transform: translate3d(0, -100%, 0);
    &.fold-enter-active,
    &.fold-leave-active {
      transition: all 0.5s;
    }
    &.fold-enter,
    &.fold-leave-to {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      height: 1rem;
      width: 100%;
      line-height: 1rem;
      padding: 0 0.3rem;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 12, 27, 0.1);
      box-sizing: border-box;
      .title {
        float: left;
        font-size: 0.42rem;
        color: rgb(7, 17, 27);
      }
      .empty {
        float: right;
        font-size: 0.4rem;
        color: rgb(0, 160, 120);
      }
    }
    .list-content {
      width: auto;
      box-sizing: border-box;
      padding: 0 0.3rem ;
      background: #fff;
      max-height: 3rem;
      overflow: hidden;
      ul {
        width: 100%;
        padding: 0.2rem 0;
        .food {
          width: 100%;
          display: flex;
          height: 0.86rem;
          line-height: 0.86rem;
          .name {
            flex: 0.5;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: left;
            font-size: 0.4rem;
          }
          .price {
            flex: 0.22;
            color: #f01414;
            font-size: 0.36rem;
          }
          .cartcontrol {
            flex: 0.28;
            box-sizing: border-box;
            padding: 0.05rem 0.3rem;
            font-size: 0.34rem;
          }
        }
      }
    }
  }
  .ball-wrapper {
    .ball {
      position: fixed;
      left: 1.49rem;
      bottom: 1.31rem;
      transition: all 0.3s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        transition: all 0.3s linear;
        background: rgb(0, 160, 220);
      }
    }
  }
}
.list-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  backdrop-filter: blur(10px);
  opacity: 1;
  z-index: 40;
  background: rgba(7, 17, 27, 0.6);
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.5s;
  }
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>