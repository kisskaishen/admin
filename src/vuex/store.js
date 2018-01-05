import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import md5 from 'js-md5'

var qs = require('qs');																// 引入qs，作用，格式化data数据
import config from '../../config'

Vue.use(Vuex)

import {Message} from 'element-ui'


var baseURL = process.env.NODE_ENV === 'production' ? config.build.httpUrl1 : config.dev.httpUrl1;
var baseURL2 = process.env.NODE_ENV === 'production' ? config.build.httpUrl2 : config.dev.httpUrl2;
var baseURL3 = process.env.NODE_ENV === 'production' ? config.build.httpUrl3 : config.dev.httpUrl3;


axios.interceptors.request.use(
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
axios.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        console.log(err.res)
        // if (err.res) {
        //     switch (err.res.data.code) {
        //         case 700:
        //             router.replace({
        //                 path: '/login'
        //             })
        //     }
        // }
        return Promise.reject(err)
    }
)

// 登录
let loginModule = {
    state: {

        captchaId: '',      // 图形验证码id
        captchaImg: '',     // 图形验证码图片

        // token: '',
        // aside: '',
        // userInfo:'',
    },
    mutations: {
        // 获取验证码
        showCaptchaId(state, captchaid) {
            state.captchaId = captchaid
        },
        // 显示验证码图片
        showCaptchaImg(state, captchaImg) {
            state.captchaImg = captchaImg
        },
        // // 侧边栏
        // showAside(state,aside) {
        //     state.aside = aside
        // },
        // // token
        // showToken(state,token) {
        //     state.token = token
        // },
        // // showUserInfo
        // showUserInfo(state,info) {
        //     state.userInfo = info
        // }

    },
    actions: {
        // 获取验证码
        getCaptcha({commit}) {
            axios({
                method: 'post',
                url: baseURL3 + '/Tool/create_captcha',
                data: qs.stringify({
                    api_v: 'v3'
                })
            })
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showCaptchaId', res.data.data.id)
                        commit('showCaptchaImg', res.data.data.url)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 验证图形验证码
        checkCaptcha({commit}, data) {
            axios({
                method: 'post',
                url: baseURL3 + '/tool/check_gvcode_true',
                data: data
            })
                .then(res => {
                    if (res.data.code == 200) {
                        
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // login({commit}, data) {
        //     axios({
        //         method: 'post',
        //         url: baseURL + '/login/login',
        //         data: data
        //     })
        //         .then(res => {
        //             if (res.data.code == 200) {
        //                 console.log(res.data.data)
        //                 commit('showUserInfo', res.data.data)
        //                 commit('showToken', res.data.data.token)
        //                 commit('showAside', res.data.data.menu)
        //             } else {
        //                 console.log(res.data.message)
        //             }
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // }
    }
}
// 会员
let memberModule = {
    state: {
        // member
        // 会员列表
        memberList: [],
        // 会员总数和VIP会员
        memberTotal: '',
        VipMember: '',
        last_page: '',
        currentPage: 1,
        // addMember
        addName: '',
        addPassword: '',
        payPassword: '',
        addTel: '',
        addEmail: '',
        addRealName: '',
        addProvice: '',
        addCity: '',
        addArea: '',
        addDetail: '',
        addAliww: '',
        addQqCode: '',
        addBackCode: '',
        // memberCash
        memberCashList: [],
        // memberRealName
        memberRealNameList: [],
        // memberMoney
        memberMoneyList: [],
        memberTypeList: [],
        memberName: '',
        // 顶部会员名
        member_name: '',

        userInfo:''
    },
    mutations: {
        // member
        showMemberList(state, list) {
            state.memberList = list;
        },
        showMemberNum(state, num) {
            state.memberTotal = num;
        },
        showMemberVipNum(state, num) {
            state.VipMember = num;
        },
        showLastPage(state, page) {
            state.last_page = page
        },
        // addMember

        // memberCash
        showMemberCashList(state, list) {
            state.memberCashList = list
        },
        // memberRealName
        showMemberRealNameList(state, list) {
            state.memberRealNameList = list
        },
        // memberMoney
        showMemberMoneyList(state, list) {
            state.memberMoneyList = list
        },
        showMemberTypeList(state, list) {
            state.memberTypeList = list
        },
        // 顶部会员名
        showMemberTitleName(state, name) {
            state.member_name = name
        },
        // 会员信息
        showUserInfo(state,info) {
            state.userInfo = info
        }
    },
    actions: {
        // member
        getMemberList({commit}, data) {
            axios({
                method: 'POST',
                url: baseURL + '/Member/member_list',
                data: data
            })
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showMemberList', res.data.data.list)
                        commit('showMemberNum', res.data.data.count_member)
                        commit('showMemberVipNum', res.data.data.count_vip_member)
                        commit('showLastPage', res.data.data.last_page)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // addMember

        // memberCash
        getMemberCashList({commit}, data) {
            axios.post(baseURL + '/Member/member_cash', data)
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showMemberCashList', res.data.data.list)
                        commit('showLastPage', res.data.data.last_page)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // memberRealName
        getMemberRealNameList({commit}, data) {
            axios({
                method: 'POST',
                url: baseURL + '/Member/member_auth',
                data: data
            })
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showMemberRealNameList', res.data.data.list)
                        commit('showLastPage', res.data.data.last_page)
                    } else {
                        alert(res.data.message)
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 会员资金分类
        getMoneyTypeList({commit}, data) {
            axios({
                method: 'POST',
                url: baseURL + '/Member/member_funds',
                data: data
            })
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showMemberTypeList', res.data.data.list)
                        commit('showMemberTitleName', res.data.data.member_name)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // memberMoney列表
        getMemberMoneyList({commit}, data) {
            axios({
                method: 'POST',
                url: baseURL + '/Member/member_funds_list',
                data: data
            })
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showMemberMoneyList', res.data.data.list)
                        commit('showLastPage', res.data.data.last_page)
                        commit('showUserInfo', res.data.data)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },

    }
}
// 代理商
let agentModule = {
    state: {
        agentList: [],           // 代理商列表
        subordinateList: [],     // 下级代理商列表
        carrieroperatorList: [], // 下级运营商列表
        sellerList: [],          // 商家列表
        memberList: [],          // 会员列表
        moneyList: [],           // 资金列表
        cashList: [],            // 提现列表
        lastPage: '',
    },
    mutations: {
        showAgentList(state, list) {
            state.agentList = list
        },
        showSubordinateList(state, list) {
            state.subordinateList = list
        },
        showCarrieroperatorList(state, list) {
            state.carrieroperatorList = list
        },
        showSellerList(state, list) {
            state.sellerList = list
        },
        showMemberList(state, list) {
            state.memberList = list
        },
        showMoneyList(state, list) {
            state.moneyList = list
        },
        showCashList(state, list) {
            state.cashList = list
        },
        showLastPage(state, page) {
            state.lastPage = page
        }
    },
    actions: {
        getAgentList({commit}, data) {
            axios.post(baseURL + '/Adminagent/agent_list', data)
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showAgentList', res.data.data.list)
                        commit('showLastPage', res.data.data.last_page)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
// 运营商
let carriorModule = {
    state: {
        list: [],            // 运营商
        lastPage: '',
        total: '',           // 数据条数
        titleInfo: '',            // 信息

    },
    mutations: {
        showList(state, list) {
            state.list = list
        },
        showLastPage(state, page) {
            state.lastPage = page
        },
        showTotal(state, total) {
            state.total = total
        },
        showTitleInfo(state, info) {
            state.titleInfo = info
        }
    },
    actions: {
        // 运营商列表
        getList({commit}, data) {
            axios({
                method: 'post',
                url: baseURL + '/Adminagent/agent_list',
                data: data
            })
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showList', res.data.data.list)
                        commit('showLastPage', res.data.data.last_page * 10)
                        commit('showTotal', res.data.data.total)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 运营商商家列表
        getSellerList({commit}, data) {
            axios.post(baseURL + '/Adminagent/agent_store', data)
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showList', res.data.data.list)
                        commit('showLastPage', res.data.data.last_page * 10)
                        commit('showTotal', res.data.data.total)
                        commit('showTitleInfo', res.data.data)
                        if (res.data.data.list == '') {
                            alert('无数据！')
                            location.reload()
                        }
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 运营商会员列表
        getAgentMemberList({commit}, data) {
            axios.post(baseURL + '/Adminagent/agent_member', data)
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showList', res.data.data.list)
                        commit('showLastPage', res.data.data.last_page * 10)
                        commit('showTitleInfo', res.data.data)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 运营商资金列表
        getAgentMoneyList({commit}, data) {
            axios.post(baseURL + '/Member/member_funds_list', data)
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showList', res.data.data.list)
                        commit('showLastPage', res.data.data.last_page * 10)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 运营商抬头数据
        getAgentTitleList({commit}, data) {
            axios.post(baseURL + '//Member/member_funds', data)
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showTitleInfo', res.data.data)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

}
// 商品
let goodsModule = {
    state: {
        // goods
        // 商品列表
        goodsList: [],
        // 单品券
        singleItemTdes: [],
        // 套餐券
        setMealTdes: [],

        // 最后页数
        goodsLastPage: '',
        singleLastPage: '',
        groupLastPage: '',
        // 总数
        goodsTotal: '',
        goodsSingleTotal: '',
        goodsGroupTotal: '',

        // editGoods

    },
    mutations: {
        // goods
        // 显示商品列表
        showGoodsList(state, list) {
            state.goodsList = list
        },
        showGoodsLastPage(state, page) {
            state.goodsLastPage = page
        },
        showGoodsTotal(state, total) {
            state.goodsTotal = total
        },
        // 显示单品券列表
        showSingleList(state, list) {
            state.singleItemTdes = list
        },
        showSingleLastPage(state, page) {
            state.singleLastPage = page
        },
        showSingleTotal(state, total) {
            state.goodsSingleTotal = total
        },
        // 显示套餐券列表
        showGroupList(state, list) {
            state.setMealTdes = list
        },
        showGroupLastPage(state, page) {
            state.groupLastPage = page
        },
        showGroupTotal(state, total) {
            state.goodsGroupTotal = total
        },
        // editGoods


    },
    actions: {
        // goods
        // 商品列表
        getGoodsList({commit}, data) {
            axios({
                method: 'post',
                url: baseURL + '/Goods/goods_list',
                data: data
            })
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showGoodsList', res.data.data.list)
                        commit('showGoodsLastPage', res.data.data.last_page * 10)
                        commit('showGoodsTotal', res.data.data.total)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 单品券列表
        getSingleList({commit}, data) {
            axios({
                method: 'post',
                url: baseURL + '/Goods/goods_single_list',
                data: data
            })
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showSingleList', res.data.data.list)
                        commit('showSingleLastPage', res.data.data.last_page * 10)
                        commit('showSingleTotal', res.data.data.total)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 套餐券列表
        getGroupList({commit}, data) {
            axios({
                method: 'post',
                url: baseURL + '/Goods/goods_setmeal_list',
                data: data
            })
                .then(res => {
                    if (res.data.code == 200) {
                        commit('showGroupList', res.data.data.list)
                        commit('showGroupLastPage', res.data.data.last_page * 10)
                        commit('showGroupTotal', res.data.data.total)
                    } else {
                        alert(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        //editGoods
        //


    }
}


let store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        loginModule,
        memberModule,
        agentModule,
        carriorModule,
        goodsModule
    }
})
export default store
