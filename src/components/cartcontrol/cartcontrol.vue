<template>
    <div class="cartcontrol">
        <transition name="move">
             <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="descreaseCart">
                 <!-- v-show="food.count!=0" -->
                 <!--  -->
                 <span class="inner icon-remove_circle_outline"></span>
             </div>
        </transition>   
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
         <div class="cart-add icon-add_circle"  @click.stop.prevent="addCart" ></div>
         <!-- -->
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
      // console.log(this.food.count);

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(e) {
      //修改
      // if (!e._constructed) {
      //     return;
      // }
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      this.$emit('add',event.target)
      console.log(this.food.count);
    },
    descreaseCart(e) {
      if (this.food.count > 0) {
        this.food.count--;
      }
    }
  }
};
</script>

<style scoped lang='less'>
.cartcontrol {
  justify-content: space-between;
  display: flex;
  display: -webkit-flex;
  align-items: stretch;
  .cart-count {
    font-size: 0.4rem;
    width: 0.6rem;
    text-align: center;
    line-height: 0.66rem;
    vertical-align: middle;
  }
  .cart-decrease {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    .inner {
      display: inline-block;
      transform: rotate(0);
      transition: all 0.4s linear;
    }
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.4s linear;
    }
    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translate3d(0.6rem, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
  }
  .cart-decrease,
  .cart-add {
    width: 0.7rem;
    vertical-align: middle;
    line-height: 0.66rem;
    text-align: center;
    font-size: 0.66rem;
    color: #00a0dc;
  }
}
</style>