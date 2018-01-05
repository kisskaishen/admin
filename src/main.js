// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store';

import Utile from './lib/utils'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import qs from 'qs'
import config from '../config'


const baseUrl = process.env.NODE_ENV === 'production' ? config.build.httpUrl1 : config.dev.httpUrl1;
const baseUrl2 = process.env.NODE_ENV === 'production' ? config.build.httpUrl2 : config.dev.httpUrl2;
const baseUrl3 = process.env.NODE_ENV === 'production' ? config.build.httpUrl3 : config.dev.httpUrl3;
// http://app.28yun.com/
// http://over.28yun.cn
// admin接口
const ajax = axios.create({
    // baseURL 自动加在 url 前面，除非 url 是一个绝对url
    baseURL: baseUrl,
    method: 'post',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },

    transformRequest: [function (data) {
        return qs.stringify(data)
    }],
    paramsSerializer: function (data) {
        return qs.stringify(data)
    }
})

ajax.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')
        if (token) {
            config.headers.common['token'] = token
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)


ajax.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        console.log(err)
        if (err.res) {
            switch (err.res.data.code) {
                case 700:
                    router.replace({
                        path: '/login'
                    })
            }
        }
        return Promise.reject(err)
    }
)
// webapi_v2接口
const httpV2 = axios.create({
    baseURL: baseUrl2,
    method: 'post',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: function (data) {
        return qs.stringify(data)
    },
    paramsSerializer: {
        function (data) {
            return qs.stringify(data)
        }
    }
})
httpV2.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')
        if (token) {
            config.headers.common['token'] = token
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)


httpV2.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        console.log(err)
        if (err.res) {
            switch (err.res.data.code) {
                case 700:
                    router.replace({
                        path: '/login'
                    })
            }
        }
        return Promise.reject(err)
    }
)
// webapi_v3接口
const httpV3 = axios.create({
    // baseURL 自动加在 url 前面，除非 url 是一个绝对url
    baseURL: baseUrl3,
    method: 'post',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        return qs.stringify(data)
    }],
    paramsSerializer: function (data) {
        return qs.stringify(data)
    }
})
httpV3.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')
        if (token) {
            config.headers.common['token'] = token
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)


httpV3.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        console.log(err)
        if (err.res) {
            switch (err.res.data.code) {
                case 700:
                    router.replace({
                        path: '/login'
                    })
            }
        }
        return Promise.reject(err)
    }
)

// uploadImage接口
const upload = axios.create({
    // baseURL 自动加在 url 前面，除非 url 是一个绝对url
    baseURL: 'http://112.74.172.160/public/index.php?s=/webapi/Img2/upload',
    method: 'post',
    timeout: 30000,

})
// 导出excel表格专用全局变量
const baseURL = 'http://app.28yun.com/index.php/admin/'
Vue.prototype.$baseUrl = baseURL


Vue.prototype.$axios = ajax
Vue.prototype.$httpV2 = httpV2
Vue.prototype.$httpV3 = httpV3

Vue.prototype.$upload = upload

Vue.use(ElementUI)
Vue.use(Utile)

Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
    el: '#app',
    render: h => h(App),                // vue2.0的写法，两者取一个就可以，都存在也行，h是一个函数（creatElement的表明）
    router,
    store,
    template: '<App/>',
    // components: {App},              // vue1.0的写法

    beforeCreate() {
        // console.log('beforeCreated.....');
    },
    created() {
        // console.log('Created.....');
        const localInfo = router.app.$local.fetch('info')

        Vue.prototype.$titleName = localInfo.titleName
        Vue.prototype.$password = localInfo.password
        Vue.prototype.$userName = localInfo.member_name
        Vue.prototype.$memberId = localInfo.member_id
        Vue.prototype.$memberName = localInfo.member_name
        Vue.prototype.$memberType = localInfo.member_type
        Vue.prototype.$gtype = localInfo.gtype
        Vue.prototype.$captcha = localInfo.captcha
        Vue.prototype.$captchaId = localInfo.id
        Vue.prototype.$aside = localInfo.aside
        Vue.prototype.$token = localInfo.token

    },
    methods: {},

    beforeCompile() {
        console.log('beforeCompiled.....');
    },
    compiled() {
        console.log('Compiled.....');
    }
})
