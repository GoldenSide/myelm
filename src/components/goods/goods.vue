<template>
   <div>
  <div class='goods'>
       <div class="menu-wrapper" ref="menuWrapper">
         <ul>
            <li v-for="(item,index) in goods" :key="index" class="menu-item"  @click="selectMenu(index,$event)" :class="{'current':currentIndex===index,'currnetbefore':currentIndex===index+1}" ref="menuList">
              <!-- :class="{current:currentIndex===index}" -->
              <div class="text">
                  <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                   {{item.name}}
              </div>
            
            </li>
         </ul>
       </div>
       <div class="foods-wrapper" ref="foodWrapper">
           <div class="box">
                <div class="food-lists"  v-for="(item,index) in goods" :key="index" ref="foodList">
                  <h1 class="title">{{item.name}}</h1>
                  <ul>
                     <li class="foot-item" v-for="(food,Index) in item.foods" :key="Index" @click="showFood(food,$event)">
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
  
                               <cartcontrol :food="food" @add="addFood"></cartcontrol>
                          </div>
                       </div>
                     </li>
                  </ul>
                </div> 
           </div>
       </div>
       <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
   </div>
   <!-- 商品详情 -->
   <goodDetail @add="addFood" :food="clickedFood" ref="food"></goodDetail>
   </div>
 
</template>
<style scoped lang="less">
.goods {
  width: 100%;
  overflow: hidden;
  // position: relative;
  display: flex;
  position: absolute;
  width: 100%;
  top: 4.18rem;
  bottom: 1.31rem;
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
        &.current {
          background: #fff;
          font-weight: 700;
          &::after {
            visibility: hidden;
            display: none;
          }
        }
        &.currnetbefore,
        &:last-child {
          &::after {
            visibility: hidden;
            display: none;
          }
        }
      }
      // .menu-item
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
              .cartcontrol-wrapper {
                position: absolute;
                right: 0.1rem;
                bottom: -0.2rem;
                height: 0.66rem;
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
import BScroll from "better-scroll";
import cartcontrol from "../cartcontrol/cartcontrol";
import shopcart from "../shopcart/shopcart";
import goodDetail from "../goodDetail/goodDetail";
const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      // length: 0,
      goods: [],
      scrollY: 0,
      listHeight: [],
      clickedFood:{}
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    this.$http.get("/api/goods").then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        // console.log(this.goods);
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  },

  methods: {
    selectMenu(index, event) {
      if (!event._constructed) {
        ///如果不存在这个属性,则为原生点击事件，不执行下面的函数(过滤原生事件)
        return;
      }
      this.foodScroll.scrollToElement(this.$refs.foodList[index], 300);
    },
    addFood(target) {
      this._drop(target);
      // console.log("hj");
    },
    showFood(food,event){
      if(!event._constructed){
        return;
      }
      this.clickedFood=food;
      this.$refs.food.show();
      console.log(food)
    },
    _drop(target){
      this.$nextTick(()=>{
        this.$refs.shopcart.drop(target);
      })
    },
    _calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.listHeight.push(height);
      }
      // console.log(foodList.length);
    },
    _initScroll() {
      //确保每次创建完实例并且页面渲染完之后 都会刷新scroll
      if (!this.menuScroll) {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true,
          tap: true
        });
      } else {
        this.menuScroll.refresh();
      }
      if (!this.foodScroll) {
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          tap: true,
          // 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
          probeType: 3
        });
      } else {
        this.foodScroll.refresh();
      }
      this.foodScroll.on("scroll", pos => {
        //  this.menuScroll.scrollToElement(this.$refs.menuList[2],300,true,true)
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });

      // console.log(this.menuScroll);
      // this.foodScroll
    }
  },
  computed: {
    selectFoods() {
      let Foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            Foods.push(food);
          }
        });
      });
      //Foods 为添加了购买数量之后的json数组
      return Foods;
    },
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let H1 = this.listHeight[i];
        let H2 = this.listHeight[i + 1];
        if (!H2 || (this.scrollY >= H1 && this.scrollY < H2)) {
          this.menuScroll.scrollToElement(
            this.$refs.menuList[i],
            300,
            true,
            true
          );
          return i;
        }
      }
      return 0;
    }
  },
  components: {
    cartcontrol,
    shopcart,
    goodDetail
  }
};
</script>