<template>
   <div class='tmpl'  ref="seller">
        <div class="seller-content">
            <div class="overview">
              <div class="seller">
                  <h1 class="title">{{seller.name}}</h1>
                   <star :size="0.36" :Width="70" :score="seller.score"></star>
                  <div class="starbox"></div>
              </div>
              <div class="desc">
               <p> <span>{{seller.ratingCount}}条评论</span>
                <span>月销售{{seller.sellCount}}单</span></p>
              </div>
              <div class="favirote" @click="togglefavorite">
                 <span class="icon-favorite" :class="{'active':favorite}"></span>
                 <p class="text" :class="{'active':favorite}">{{favoriteText}}</p>
              </div>          
            </div>
               <ul class="remark">
                <li class="item">
                  <h1>起送价</h1>
                  <p><span>{{seller.minPrice}}</span>元</p>
                </li>
                <li class="item">
                  <h1>商家配送</h1>
                    <p><span>{{seller.deliveryPrice}}</span>元</p>
                </li>
                <li class="item">
                  <h1>平均配送时间</h1>
                    <p><span>{{seller.deliveryTime}}</span>分钟</p>
                </li>
              </ul>
               <div class="split"></div>
              <div class="bulletin">
                 <h1 class="title">
                   公告与活动
                 </h1>
                 <div class="content-wrapper">
                   <p class="content">
                     {{seller.bulletin}}
                   </p>
                 </div>
                 <ul class="supports" v-if="seller.supports">
                   <li class="support-item" v-for="(item,index) in  seller.supports" :key="index">
                     <span class="icon" :class="classMap[item.type]"></span>
                     <span class="text">{{item.description}}</span>
                   </li>
                 </ul>
              </div>
              <div class="split"></div>
               <div class="pics">
                   <h1 class="title">商家实景</h1>
                   <div class="pics-wrapper" ref="pics">
                     <ul class="pic-list" ref="picLists">
                        <li class="pic-item"  v-for="(pic,index) in  seller.pics" :key="index">
                          <img :src="pic" alt="">
                        </li>
                     </ul>     
                   </div>
               </div>
                 <div class="split"></div>
               <div class="info">
                 <h1 class="title">商家信息</h1>
                  <div class="info-wrapper">
                    <ul class="info-list">
                      <li class="info-item" v-for="(item,index) in seller.infos" :key="index">{{item}}</li>
                    </ul>
                  </div>
               </div>
        </div>
   </div>
</template>
   
<style scoped lang='less'>
.tmpl {
  width: 100%;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 4.18rem;
  bottom: 0;
  .seller-content {
    width: 100%;

    .overview {
      padding: 0.4rem 0.35rem;
      display: flex;
      position: relative;
      &::after {
        content: "";
        width: 90%;
        left: 5%;
        bottom: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        position: absolute;
      }
      .seller {
        flex: 0.5;
        text-align: left;
        .title {
          padding-left: 0.14rem;
          line-height: 0.8rem;
          font-size: 0.35rem;
          color: #07111b;
        }
        .star {
          width: 100%;
          // margin: 0 auto;
        }
      }
      .desc {
        flex: 0.3;
        font-size: 0.28rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        text-align: center;
      }
      .favirote {
        flex: 0.2;
        text-align: right;
        .icon-favorite {
          color: #d4d6d9;
          font-size: 0.65rem;
          line-height: 0.8rem;
          &.active {
            color: #f01414;
          }
        }
        .text {
          font-size: 0.28rem;
          margin-right: 0.06rem;
          // line-height: 0.4rem;

          &.active {
            color: #f01414;
          }
        }
      }
    }
    .remark {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 0.4rem 0;

      .item {
        flex: 33.33%;
        &:nth-child(2n-1) {
          border-left: 1px solid rgba(7, 17, 27, 0.1);
          border-right: 1px solid rgba(7, 17, 27, 0.1);
        }
        h1 {
          color: #93999f;
          font-size: 0.27rem;
        }
        p {
          color: #07111b;
          font-size: 0.32rem;
          margin-top: 0.2rem;
          span {
            font-size: 0.52rem;
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
    .bulletin {
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
          color: #f01414;
        }
      }
    }
    .supports {
      margin-top: 0.34rem;
      .support-item {
        text-align: left;
        padding: 0.35rem 0.12rem;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        .icon {
          display: inline-block;
          width: 0.6rem;
          height: 0.6rem;
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
          font-size: 0.34rem;
          line-height: 0.6rem;
        }
      }
    }
    .pics {
      padding: 0.25rem 0.35rem;

      .title {
        line-height: 0.6rem;
        font-size: 0.37rem;
        text-align: left;
      }
      .pics-wrapper {
        width: 100%;
        padding: 0.2rem 0;
        overflow: hidden;
        .pic-list {
          .pic-item {
            float: left;
            width: 3.5rem;
            height: 3rem;
            margin-right: 6px;
            img {
              width: 100%;
              height: 100%;
            }
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
    .info {
      padding: 0.25rem 0.35rem;
      .title {
        line-height: 0.6rem;
        font-size: 0.37rem;
        text-align: left;
      }
      .info-wrapper {
        padding: 0.142rem 0;
        .info-item {
          line-height: 0.6rem;
          font-size: 0.31rem;
          text-align: left;
          padding: 0.35rem 0.15rem;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
        }
      }
    }
  }
}
</style>
   
<script>
import star from "../star/star";
import BScroll from "better-scroll";
import {save,load} from "../../common/js/store";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      favorite:function(){
        return load(this.seller.id,"favorite",false);
      },
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.favorite();
  },
  watch: {
    //监控seller的值的变化,初始化BScroll
    seller() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    }
  },
  methods: {
    togglefavorite() {
      //去掉非vue事件
      if (!event._constructed) {
        return;
      }
      this.favorite = !this.favorite;
      save(this.seller.id,'favorite',this.favorite);
      //存起来
    },
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    _initPics() {
      if (this.seller.pics) {
        let Length = this.seller.pics.length;
        // let Width = window.innerWidth || document.body.clientWidth;
        let Width =
          (document.getElementsByClassName("pic-item")[0].offsetWidth + 6)*Length;
        this.$refs.picLists.style.width = Width + "px";
      }
      if (!this.picScroll) {
        this.picScroll = new BScroll(this.$refs.pics, {
          click: true,
          scrollX: true,
          //保留垂直的方向上的滚动不会失效
          eventPassthrough: "vertical"
        });
      } else {
        this.picScroll.refresh();
      }
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? "已收藏" : "收藏";
    }
  },
  components: {
    star
  }
};
</script>