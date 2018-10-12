//import的时候最好不要添加版本号 以防版本迭代的时候报错
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '../components/HelloWorld'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/goods'
    }, {
        path: '/goods',
        component: goods
    }, {
        path: '/ratings',
        component: ratings

    }, {
        path: '/seller',
        component: seller
    }]
})