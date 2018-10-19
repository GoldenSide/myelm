<template>
   <div class='star' :class="starType" :style="{width:Width+'%'}">
       <!-- 我是star -->
       <span  v-for="(itemclass,index) in itemClasses" :key="index" :class="itemclass" class="star-item" :style="{width:size+'rem',height:size+'rem'}">
       </span>
   </div>
</template>
   
<style scoped lang="less">
.star {
  display: flex;
  justify-content: space-around;
   vertical-align: top;
  .star-item {
    background-size: cover;
    background-repeat: no-repeat;
    // width: 0.6rem;
    // height: 0.6rem;
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
    },
    Width:{
      type:Number,
      default(){
        return 100
      }
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
      // console.log(result);
      return result;
    }
  },
  created() {
    // refs不能实现动态绑定，因为在没有渲染完的时候还是没有的
    // this.$refs.starStyle.style.width=size+'rem';
    // this.$refs.starStyle.style.height=size+'rem';
  },
  methods: {
    
  }
};
</script>