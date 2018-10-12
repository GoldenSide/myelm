<template>
    <div class="cartcontrol">
        <!-- <transition name="move"> -->
             <div class="cart-decrease"  >
                 <!-- v-show="food.count!=0" -->
                 <!-- @click.stop.prevent=descreaseCart -->
                 <span class="inner icon-remove_circle_outline"></span>
             </div>
        <!-- </transition>    -->
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
         <div class="cart-add icon-add_circle" ></div>
         <!-- @click.stop.prevent="addCart" -->
    </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  }
};
</script>

<style scoped lang='less'>
.cartcontrol {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .cart-decrease {
  }
  .inner,
  .cart-add {
    font-size: 0.66rem;
    color: #00a0dc;
  }
}
</style>