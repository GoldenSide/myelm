<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { urlParse } from './common/js/util';
import header from './components/header/header.vue';
const ERR_OK = 0;
export default {
  // name: 'App',
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then(response => {
      response = response.body;
      // console.log(response);
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data);
         console.log( this.seller);
      }
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="less" >
@import './common/less/reset.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  .tab {
    display: flex;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    box-sizing:border-box; 
    border: 1px solid rgba(7, 17, 27, 0.1);
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 0.40rem;
        color:rgb(77, 85, 93);
        &.router-link-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
