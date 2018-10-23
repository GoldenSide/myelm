<template>
   <div class='tmpl' ref="ratings">
        <div class="ratings" >
          <div class="ratings-content">
            <div class="overview">
              <div class="overview-left">
                  <h1 class="score">{{seller.score}}</h1>
                   <div class="title">综合评分</div>
                   <div class="rank">高于周边商家{{seller.rankRate}}%</div>
              </div>
              <div class="overview-right">
                  <div class="score-wrapper">
                     <span class="title">服务态度</span>
                       <star :size="0.36" :Width='45' :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                  </div>
                 <div class="score-wrapper">
                  <span class="title">商品评分</span>
                  <star :size="0.36" :Width='45' :score="seller.foodScore"></star>
                  <span class="score">{{seller.foodScore}}</span>
                </div>
                <div class="delivery-wrapper">
                  <span class="title">送达时间</span>
                  <span class="delivery">{{seller.deliveryTime}}分钟</span>
                </div>
              </div>
            </div>
          </div>
          <div class="split"></div>
           <ratingselect :ratings="ratings" @toggle="toggleRating" @select="selectRating" :selectType="selectType" :onlyCotent="onlyCotent"></ratingselect>
           <div class="rating-wrapper">
                <ul>
                  <li v-for="(rating,index) in ratings" :key="index" class="rating-item" v-show="isShow(rating.rateType,rating.text)">
                      <div class="avatar">
                          <img :src="rating.avatar" alt="altText"/>
                      </div>
                      <div class="content">
                        <p class="top"><span class="username">{{rating.username}}</span> <span class="date">{{rating.rateTime | dataformat}}</span></p>
                        <p class="starline">
                          <star :size="0.33" :Width="80" :score="rating.score"></star>
                          <span class="deliveryTime"> {{rating.deliveryTime}}</span>
                        </p>
                        <p class="text">{{rating.text}}</p>
                        <div class="recommend" v-show="rating.recommend&&rating.recommend.length">
                          <span class="icon-thumb_up"></span>
                          <span class="rec-item" v-for="(rec,index) in rating.recommend" :key="index">{{rec}}</span>
                        </div>
                      </div>
                      
                  </li>
                </ul>
              </div>
        </div>
   </div>
</template>
   
<style scoped lang="less">
.tmpl {
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 4.18rem;
  bottom: 0;
  width: 100%;
  .ratings {
    .ratings-content {
      // width: 100%;
      .overview {
        // width: 100%;
        box-sizing: border-box;
        background: #fff;
        padding: 0.4rem 0;
        display: flex;
        flex: 0 0 100%;
        .overview-left {
          flex: 0.37;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          padding: 0.2rem 0;
          .score {
            font-size: 0.58rem;
            margin-bottom: 0.2rem;
            color: #f90;
          }
          .title {
            margin-bottom: 0.2rem;
            color: #07111b;
            font-size: 0.33rem;
          }
          .rank {
            color: #9c9c9c;
            font-size: 0.33rem;
          }
        }
        .overview-right {
          flex: 0.62;
          padding: 0.2rem 0;
          .score-wrapper {
            padding: 0 0.4rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.2rem;
            align-content: flex-start;
            .title,
            .score {
              color: #07111b;
              font-size: 0.33rem;
              line-height: 0.4rem;
            }
          }
          .delivery-wrapper {
            text-align: left;
            padding: 0 0.4rem;
            .title {
              color: #07111b;
              font-size: 0.33rem;
              line-height: 0.4rem;
            }
            .delivery {
              color: #93999f;
              margin-left: 0.5rem;
            }
          }
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
    .rating-wrapper {
      ul {
        .rating-item {
          display: flex;
          flex: 0 0 100%;
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
          .avatar {
            flex: 0.13;
            img {
              width: 0.77rem;
              height: 0.77rem;
              float: left;
              border-radius: 0.35rem;
            }
          }
          .content {
            flex: 0.87;
            text-align: left;
            p {
              margin-bottom: 0.2rem;
            }
            .top {
              .username {
                float: left;
                font-size: 0.36rem;
              }
              .date {
                float: right;
                color: #93999f;
                font-size: 0.32rem;
              }
            }
            .starline {
              width: 35%;
              position: relative;
              .deliveryTime {
                position: absolute;
                top: 0.195rem;
                font-size: 0.3rem;
                color: #93999f;
                right: 0;
              }
            }
            .text {
              font-size: 0.31rem;
              line-height: 0.4rem;
            }
            .recommend {
              .icon-thumb_up {
                color: #00a0dc;
                font-size: 0.4rem;
              }
              .rec-item {
                display: inline-block;
                padding: 0.05rem 0.12rem;
                margin: 0.1rem 0 0.1rem 0.1rem;
                border: 1px solid rgba(7, 17, 27, 0.1);
                border-radius: 1px;
                color: #93999f;
                background: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
   
<script type="text/ecmascript-6">
import star from "../star/star";
import ratingselect from "../ratingselect/ratingselect";
import BScroll from "better-scroll";

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },

  data() {
    return {
      ratings: [],
      selectType: 2,
      onlyCotent: false
    };
  },
  created() {
    this.$http.get("/api/ratings").then(res => {
      res = res.body;
      if (res.errno === ERR_OK) {
        this.ratings = res.data;
        // console.log(this.ratings);
        //内容滚动未写
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          }else{
            this.scroll.refresh();
          }
        });
      }
    });
  },
  methods: {
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
  components: {
    star,
    ratingselect
  }
};
</script>