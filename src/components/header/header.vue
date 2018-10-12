<template>
    <div class='header'>
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
            <div class="bulletin-wrapper" @click="showDetail">
                <span class="bulletin-title"></span>
                <span class="bulletin-text">{{seller.bulletin}}</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
            <div class="background">
                <img :src="seller.avatar" alt="" style="width:100%;height:100%;">
            </div>
           
            <transition name="fade">
                <div v-show="detailShow" class="detail">
                    <div class="detail-wrapper cleafix">
                        <div class="detail-main">
                            <h1 class="name">
                                {{seller.name}}
                            </h1>
                            <div class="star-wrapper">
                                <star :size='24' :score="seller.score"> 
                                </star>
                            </div>
                            <div class="title">
                             
                                <div class="text">优惠信息</div>
                             
                            </div>
                            <ul v-if="seller.supports" class="supports">
                                <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                                    <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                    <span class="text">
                                        {{seller.supports[index].description}}
                                    </span>
                                </li>
                            </ul>
                            <div class="title">
                              
                                <div class="text">商家公告</div>
                               
                            </div>
                            <div class="bulletin">
                                <p class="content">
                                    {{seller.bulletin}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="detail-close" @click="hideDetail">
                        <i class="icon-close"></i>
                    </div>
                </div>
            </transition>
    </div>
</template>
   

<script type="text/ecmascript-6">
import star from "../star/star";

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  //created页面渲染的时候就调用
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  //methods页面的渲染完之后调用，父子页面时，子页面没有渲染时，不能调用methods中的方法
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  components: {
    star
  }
};
</script>
<style scoped lang="less">
.header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background: rgba(7, 17, 27, 0.5);
  .content-wrapper {
    position: relative;
    padding: 0.55rem 0.5rem 0.37rem 0.55rem;
    overflow: hidden;
    .avatar {
      float: left;
      vertical-align: top;
      img {
        border-radius: 2px;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    .content {
      float: left;
      margin-left: 0.4rem;
      .title {
        margin: 0.08rem 0 0.13rem 0;
        overflow: hidden;
        .brand {
          display: inline-block;
          width: 0.8rem;
          height: 0.44rem;
          background: url("../../assets/img/brand.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .name {
          display: inline-block;
          vertical-align: top;
          margin-left: 0.2rem;
          font-size: 0.39rem;
          height: 0.44rem;
          line-height: 0.44rem;
          font-weight: 600;
        }
      }
      .description {
        margin-bottom: 0.24rem;
        text-align: left;
        font-size: 0.32rem;
      }
      .support {
        text-align: left;
        .icon {
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          background-size: cover;
          background-repeat: no-repeat;
          &.decrease {
            background-image: url("../../assets/img/decrease.png");
          }
          &.discount {
            background-image: url("../../assets/img/discount.png");
          }
          &.guarantee {
            background-image: url("../../assets/img/guarantee.png");
          }
          &.invoice {
            background-image: url("../../assets/img/invoice.png");
          }
          &.special {
            background-image: url("../../assets/img/special.png");
          }
        }
        .text {
          line-height: 0.3rem;
          font-size: 0.28rem;
          vertical-align: top;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 0.2rem;
      bottom: 0.37rem;
      padding: 0.1rem 0.2rem;
      height: 0.36rem;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      line-height: 0.36rem;
      border-radius: 0.36rem;
      .count {
        vertical-align: top;
        font-size: 0.3rem;
      }
      .icon-keyboard_arrow_right {
        line-height: 0.4rem;
        font-size: 0.35rem;
      }
    }
  }
  .bulletin-wrapper {
    box-sizing: border-box;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 0.46rem 0 0.26rem;
    height: 0.7rem;
    line-height: 0.7rem;
    position: relative;
    font-size: 0.3rem;
    background-color: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      display: inline-block;
      width: 0.455rem;
      height: 0.3rem;
      vertical-align: middle;
      background: url("../../assets/img/bulletin.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-top: -0.05rem;
    }
    .bulletin-text {
      vertical-align: top;
      margin-left: 0.1rem;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 0.4rem;
      right: 0.1rem;
      top: 0.147rem;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.8);
    opacity: 1;
    backdrop-filter: blur(10px);
    &.fade-enter-active,
    &.fade-leave-active {
      transition: all 0.5s;
    }
    &.fade-enter,
    &.fade-leave-to/* .fade-leave-active in <2.1.8 */ {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
    .detail-wrapper {
      width: 100%;
     
      margin-top: 0.58rem;
      .detail-main {
        padding-bottom: 0.4rem;
        .name {
          line-height: 1rem;
          font-size: 0.48rem;
          font-weight: 700;
        }
        .title {
          height: 1rem;
          width: 100%;
          line-height: 1rem;
          font-size: 0.38rem;

          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          &::before {
            content: "";
            width: 30%;
            height: 0;
            border-top: 0.5px solid rgba(255, 255, 255, 0.2);
          }
          &::after {
            content: "";
            width: 30%;
            height: 0;
            border-top: 0.5px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            margin: 0 0.3rem;
            font-weight: 700;
          }
        }
        .supports {
          width: 85%;
          margin: 0 auto;
          box-sizing: border-box;
          padding: 0.1rem 0.4rem;
          .support-item {
            text-align: left;
            height: 0.83rem;
            .icon {
              display: inline-block;
              width: 0.5rem;
              height: 0.5rem;
              vertical-align: top;
              background-repeat: no-repeat;
              background-size: cover;
              margin-right: 0.25rem;
              &.decrease {
                background-image: url("../../assets/img/decrease.png");
              }
              &.discount {
                background-image: url("../../assets/img/discount.png");
              }
              &.guarantee {
                background-image: url("../../assets/img/guarantee.png");
              }
              &.invoice {
                background-image: url("../../assets/img/invoice.png");
              }
              &.special {
                background-image: url("../../assets/img/special.png");
              }
            }
            .text {
              height: 0.5rem;
              line-height: 0.5rem;
              font-size: 0.338rem;
            }
          }
        }
        .bulletin {
          p {
            width: 75%;
            margin: 0 auto;
            font-size: 0.336rem;
            text-indent: 2em;
            line-height: 0.77rem;
            letter-spacing: 1px;
            text-align: justify;
          }
        }
      }
    }
    .detail-close {
      .icon-close {
        font-size: 0.9rem;
        font-weight:700;
      }
    }
  }
}
</style>
   