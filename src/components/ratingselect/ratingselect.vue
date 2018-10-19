<template>
    <div class="ratingselect">
       <div class="rating-type">
           <ul>
               <li class="type-item" :class="{'active':selectType==2}" @click="select(2)">{{Type.all}}{{ratings.length}}</li>  
               <li class="type-item" :class="{'active':selectType==0}" @click="select(0)">{{Type.positive}}{{positive.length}}</li>  
               <li class="type-item" :class="{'active':selectType==1}" @click="select(1)" >{{Type.negative}}{{negative.length}}</li>  
           </ul>
       </div>
       <div class="switch" :class="{'on':onlyCotent}" @click="toggleContent">
         <span class="icon-check_circle"></span>
         <span class="text">只看有内容的评价</span>
       </div>
    </div>
</template>

<script type="text/ecmascript-6">
const all = {},
  positive = {},
  negative = {};
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default() {
        return 2;
      }
    },
    onlyCotent: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      Type: { all: "全部", positive: "满意", negative: "不满意" }
    };
  },
  created() {},
  methods: {
    select(type) {
      //禁止掉非vue事件
      //发送事件到父组件
      this.$emit("select", type);
    },
    toggleContent() {
      //禁止掉非vue事件
      //发送事件到父组件
      this.$emit("toggle");
    }
  },
  computed: {
    positive() {
      return this.ratings.filter(ele => {
        return ele.rateType === 0;
      });
    },

    negative() {
      return this.ratings.filter(ele => {
        return ele.rateType === 1;
      });
    }
  }
};
</script>

<style scoped lang="less">
.ratingselect {
  width: 100%;
  .rating-type {
    ul {
      padding: 0.4rem 0.35rem;
      overflow: hidden;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 2%;
        width: 96%;
        height: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      }
      .type-item {
        padding: 0.16rem;
        line-height: 0.4rem;
        float: left;
        color: #4d555d;
        &:not(:last-child) {
          background: rgba(0, 160, 220, 0.2);
          &.active {
            background: #00a0dc;
            color: #fff;
          }
        }
        &:not(:first-child) {
          margin-left: 0.3rem;
        }
        &:last-child {
          background: rgba(77, 85, 93, 0.2);
          &.active {
            background: #4d555d;
            color: #fff;
          }
        }
      }
    }
  }
  .switch{
    padding: 0.4rem 0.35rem;
    text-align: left;
     border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    span{
      line-height: 0.6rem;
      color: #93999f;
      vertical-align: middle;
       font-size:0.34rem;
    }
    .icon-check_circle{
       font-size:0.54rem;
       margin-right:0.2rem;    
    }
    &.on{
      .icon-check_circle{
        color: #00c850;
      }
    }
  }
}
</style>