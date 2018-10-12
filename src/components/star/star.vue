<template>
   <div class='star' :class="starType">
       <!-- 我是star -->
       <span  v-for="(itemclass,index) in itemClasses" :key="index" :class="itemclass" class="star-item">
       </span>
   </div>
</template>
   
<style scoped lang="less">
.star {
  width: 65%;
  margin: 0.2rem auto;
  display: flex;
  justify-content: space-around;
  .star-item {
    background-size: cover;
    background-repeat: no-repeat;
    width: 0.6rem;
    height: 0.6rem;
    &.on{
      background-image: url(../../assets/img/star_on.png) 
    }
    &.half{
      background-image: url(../../assets/img/star_half.png) 
    }
    &.off{
      background-image: url(../../assets/img/star_off.png) 
    }
  }
}
</style>
   
<script>
export default {
  data() {
    return {};
  },
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      let result = [];
      let intScore = Math.floor(this.score);
      if (intScore < this.score) {
        for (let i = 0; i < intScore; i++) {
          result.push("on");
        }
        result.push("half");
      } else {
        for (let i = 0; i < intScore; i++) {
          result.push("on");
        }
      }
      while (result.length < 5) {
        result.push("off");
      }
      console.log(result);
      return result;
    }
  },
  created() {},
  methods: {}
};
</script>