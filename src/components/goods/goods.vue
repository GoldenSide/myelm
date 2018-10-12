<template>
   <div class='goods'>
       <div class="menu-wrapper">
         <ul>
            <li v-for="(item,index) in goods" :key="index" class="menu-item"  @click="selectMenu(index,$event)">
              <!-- :class="{current:currentIndex===index}" -->
              <div class="text">
                  <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                   {{item.name}}
              </div>
            
            </li>
         </ul>
       </div>
       <div class="foods-wrapper">
           <div class="box">
                <div class="food-lists"  v-for="(item,index) in goods" :key="index">
                  <h1 class="title">{{item.name}}</h1>
                  <ul>
                     <li class="foot-item" v-for="(food,Index) in item.foods" :key="Index">
                       <div class="section1 icon">
                          <img :src="food.icon">
                       </div>
                       <div class="section2 content">
                          <h2 class="name">{{food.name}}</h2>
                          <p class="desc">{{food.description}}</p>
                          <p class="extra">
                            <span class="count">月售{{food.sellCount}}份</span>
                            <span class="rating">好评率{{food.rating}}%</span>
                          </p>
                          <p class="price">
                            <span class="now">￥{{food.price}}</span>&nbsp;
                            <s class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</s>
                          </p>
                          <div class="cartcontrol-wrapper">
                               <cartcontrol @add="addFood" :food="food"></cartcontrol>

                          </div>
                       </div>
                     </li>
                  </ul>
                </div> 
           </div>
       </div>
   </div>
</template>
<style scoped lang="less">
.goods {
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  .menu-wrapper {
    flex: 0.21;
    background: #f3f5f7;
    ul {
      width: 100%;
      box-sizing: border-box;
      .menu-item {
        box-sizing: border-box;
        width: 100%;
        height: 1.2rem;
        position: relative;
        padding: 0 0.2rem;
        display: table;
        .text {
          height: 1.4rem;
          width: 100%;
          display: table-cell;
          vertical-align: middle;
          line-height: 0.52rem;
          .icon {
            width: 0.3rem;
            height: 0.3rem;
            background-size: cover;
            background-repeat: no-repeat;
            display: inline-block;
            &.decrease {
              background-image: url("../../assets/img/decrease_goods.png");
            }
            &.discount {
              background-image: url("../../assets/img/discount_goods.png");
            }
            &.guarantee {
              background-image: url("../../assets/img/guarantee_goods.png");
            }
            &.invoice {
              background-image: url("../../assets/img/invoice_goods.png");
            }
            &.special {
              background-image: url("../../assets/img/special_goods.png");
            }
          }
        }
        &::after {
          content: "";
          width: 80%;
          height: 0;
          display: block;
          position: absolute;
          left: 10%;
          bottom: 0;
          border-top: 0.5px solid rgba(7, 17, 27, 0.1);
        }
      }
      .menu-item:last-child {
        &::after {
          visibility: hidden;
          display: none;
        }
      }
    }
  }
  .foods-wrapper {
    flex: 0.79;
    .box {
      width: 100%;
      .food-lists {
        width: 100%;
        .title {
          height: 0.6rem;
          text-align: left;
          background-color: #f3f5f7;
          padding: 0.1rem 0.3rem;
          border-left: 0.12rem solid #d9dde1;
          line-height: 0.6rem;
          font-size: 0.32rem;
          color: rgb(147, 153, 159);
        }
        ul {
          width: 100%;
          box-sizing: border-box;
          padding: 0 0.5rem;
          li {
            flex: 0 0 100%;
            padding-bottom: 0.5rem;
            margin-top: 0.5rem;
            display: flex;
            position: relative;
            &:not(:last-child) {
              &::after {
                content: "";
                position: absolute;
                width: 97.8%;
                // left: 1.6%;
                bottom: 0;
                height: 0;
                border-top: 0.001rem solid rgba(7, 17, 27, 0.1);
              }
            }
            .icon {
              flex: 0.2;
              img {
                width: 1.76rem;
                height: 1.76rem;
              }
            }
            .content {
              flex: 0.8;
              text-align: left;
              padding-left: 0.2rem;
              position: relative;
              .name {
                color: #333;
                font-size: 0.4rem;
                line-height: 0.5rem;
              }
              .desc {
                height: 0.32rem;
                margin-top: 0.05rem;
                line-height: 0.32rem;
                font-size: 0.32rem;
                color: rgb(147, 153, 159);
                width: 4.5rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              .extra {
                font-size: 0.32rem;
                color: rgb(147, 153, 159);
                margin-top: 0.05rem;
              }
              .price {
                margin-top: 0.2rem;
                .now {
                  font-size: 0.4rem;
                  color: rgb(240, 20, 20);
                }
                .old {
                  font-size: 0.38rem;
                  color: rgb(190, 200, 207);
                }
              }
              .cartcontrol-wrapper{
                position: absolute;
                right: 0.1rem;
                bottom: -0.1rem;
                width: 1.8rem;
              
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
import cartcontrol from "../cartcontrol/cartcontrol";
import shopcart from "../shopcart/shopcart";
const ERR_OK = 0;

export default {
  data() {
    return {
      goods: []
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$http.get("/api/goods").then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        console.log(this.goods);
        //  this.$nextTick(()=>{

        //  })
      }
    });
  },
  methods: {
    selectMenu(index, event) {
      if (!event._constructed) {
        //阻止非Vue事件  如果是非vue事件 直接跳出
        return;
      }
    }
  },
  computed: {
   
  },
  components:{
    cartcontrol,
    shopcart
  }
};
</script>