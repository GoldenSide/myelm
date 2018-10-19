// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import flex from './common/js/flexible'
import VueResource from 'vue-resource';
Vue.config.productionTip = false


Vue.use(flex)
Vue.use(VueResource)
    /* eslint-disable no-new */
new Vue({
        el: '#app',

        router,
        components: {
            App
        },
        template: '<App/>',

    })
    //全局过滤器
Vue.filter(
    'dataformat',
    function(value) {
        let date = new Date(value) // nuw 一个时间
        let getHours // 小时
        let getMinutes // 分
        if (date.getHours() < 10) { getHours = "0" + date.getHours() } else { getHours = date.getHours() }
        // 判断小时是否小于10的补全：加0
        if (date.getMinutes() < 10) { getMinutes = "0" + date.getMinutes() } else { getMinutes = date.getMinutes() }
        // 判断分是否小于10的补全：加0
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + getHours + ":" + getMinutes // 返回转换后的值
    }
)