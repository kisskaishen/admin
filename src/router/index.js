import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/public/home'
import Login from '@/components/public/Login'
import Error from '@/view/error/index'

// 管理后台
import Pandect from '@/view/pandect/pandect'

import MemberMoney from '@/view/member/memberMoney'
import Member from '@/view/member/member'
import AddMember from '@/view/member/addMember'
import EditMember from '@/view/member/editMember'
import MemberCash from '@/view/member/memberCash'
import CashCheck from '@/view/member/cashCheck'
import WatchCash from '@/view/member/watchCash'
import MemberRealName from '@/view/member/memberRealName'
import WatchMember from '@/view/member/watchMember'
import CheckMember from '@/view/member/checkMember'
import MemberMoneyList from '@/view/member/memberMoneyList'

import Seller from '@/view/seller/seller'
import SellerIn from '@/view/seller/sellerIn'
import SellerMember from '@/view/seller/sellerMember'
import SellerMoney from '@/view/seller/sellerMoney'
import SellerCash from '@/view/seller/sellerCash'
import AddSeller from '@/view/seller/addSeller'
import EditSeller from '@/view/seller/editSeller'
import CheckSeller from '@/view/seller/checkSeller'
import WatchSeller from '@/view/seller/watchSeller'
import WatchSellerIn from '@/view/seller/watchSellerIn'
import SellerCashCheck from '@/view/seller/sellerCashCheck'


import Agent from '@/view/agent/agent'
import AgentSubordinate from '@/view/agent/agentSubordinate'
import AgentMember from '@/view/agent/agentMember'
import AgentSeller from '@/view/agent/agentSeller'
import AgentMoney from '@/view/agent/agentMoney'

import AgentCarrieroperator from '@/view/agent/agentCarrieroperator'
import AgentCash from '@/view/agent/agentCash'
import AddAgent from '@/view/agent/addAgent'
import WatchAgent from '@/view/agent/watchAgent'
import ReviseAgent from '@/view/agent/reviseAgent'
import AgentWatchCash from '@/view/agent/watchCash'
import AgentCashCheck from '@/view/agent/cashCheck'


import Carrieroperator from '@/view/carrieroperator/index'
import CarrieroperatorMember from '@/view/carrieroperator/carrieroperatorMember'
import CarrieroperatorMoney from '@/view/carrieroperator/carrieroperatorMoney'
import CarrieroperatorSeller from '@/view/carrieroperator/carrieroperatorSeller'
import CarrieroperatorCash from '@/view/carrieroperator/carrieroperatorCash'
import AddCarrieroperator from '@/view/carrieroperator/addCarrieroperator'
import CarrierWatchCash from '@/view/carrieroperator/watchCash'
import CarrierCashCheck from '@/view/carrieroperator/cashCheck'
import WatchCarrieroperator from '@/view/carrieroperator/watchCarrieroperator'
import ReviseCarrieroperator from '@/view/carrieroperator/reviseCarrieroperator'


import CcqOrder from '@/view/ccqOrder/ccqOrder'
import CcqOrderDetails from '@/view/ccqOrder/ccqOrderDetails'
import CcqOrderRecord from '@/view/ccqOrder/ccqOrderRecord'


import VipRecharge from '@/view/vipRecharge/vipRecharge'
import VipRechargeDetails from '@/view/vipRecharge/vipRechargeDetails'
import VipRechargeRecord from '@/view/vipRecharge/vipRechargeRecord'

import Message from '@/view/message/message'

import Goods from '@/view/goods/goods'
import AddGoods from '@/view/goods/addGoods'
import ClassGoods from '@/view/goods/classGoods'
import SingleGoods from '@/view/goods/singleGoods'
import GroupGoods from '@/view/goods/groupGoods'
import TestGroupGoods from '@/view/seller/testGroupGoods'
import checkGroupGoods from '@/view/goods/checkGroupGoods'
import WatchGroupDetail from '@/view/goods/watchGroupDetail'
import GroupOnlineGoods from '@/view/goods/groupOnlineGoods'
import EditClassGoods from '@/view/goods/editClassGoods'
import EditGoods from '@/view/goods/editGoods'
import SetClassGoods from '@/view/goods/setClassGoods'
import Applicate from '@/view/goods/applicate'

// 活动管理
import ActivityManage from '@/view/activityManage/index'
import Banner from '@/components/public/activityManage/banner'
import ActivityGoodsList from '@/components/public/activityManage/goodsList'
import ActivityMessage from '@/components/public/activityManage/message'
import ActivityVipData from '@/components/public/activityManage/vipData'
// 地推活动
import SpreadManage from '@/view/activityManage/spreadManage'
import SpreadList from '@/components/public/activityManage/spreadList'
import SpreadJoinList from '@/components/public/activityManage/spreadJoinList'
// 一元活动
import ActivityOneMoney from '@/view/activityManage/oneMoney'           // 一元活动列表（一级）
import ActivityAddOneMoney from '@/view/activityManage/addOneMoney'           // 添加一元活动
import ActivityOneMoneyList from '@/view/activityManage/activityGoodsList'    // 活动管理列表（二级）
import ActivityOneMoneySingle from '@/view/activityManage/oneMoneySingle'    // 单品券列表
import ActivitySeeGoods from '@/view/activityManage/seeGoods'    // 活动项目详情
import ActivityChart from '@/view/activityManage/activityChart'    // 活动项目数据统计



 

import OtherPay from '@/view/otherPay/index'
import OtherPayAdd from '@/view/otherPay/addList'
import OtherPayCheck from '@/view/otherPay/checkList'
import OtherPayWatch from '@/view/otherPay/watchList'
import OtherPayOrder from '@/view/otherPay/orderList'

import PowerManage from '@/view/power/'
import PowerManageList from '@/components/public/powerManage/manageList'
import AddPowerManage from '@/components/public/powerManage/AddManage'
import PowerGroup from '@/components/public/powerManage/powerGroup'
import AddPowerGroup from '@/components/public/powerManage/addGroup'

import showListMember from '@/view/showList/member'
import showListAgent from '@/view/showList/agent'
import showListCarrior from '@/view/showList/carrior'
import showListSeller from '@/view/showList/seller'

import SellerChart from '@/view/chart/sellerChart'


// 代理商
import AgentManage from '@/view/agentManage/index'
import AgentManageMoney from '@/view/agentManage/moneyDetail'
import AgentManageCash from '@/view/agentManage/moneyCash'
import AgentManageWatchCash from '@/view/agentManage/watchCash'

import Subordinate from '@/view/subordinateAgent/index'
import AddSubordinateAgent from '@/view/subordinateAgent/addSubordinateAgent'
import WatchSubordinateAgent from '@/view/subordinateAgent/watchSubordinateAgent'

import Carrior from '@/view/carriorAgent/index'
import AddCarriorAgent from '@/view/carriorAgent/addCarriorAgent'
import WatchCarriorAgent from '@/view/carriorAgent/watchCarriorAgent'
import ReviseCarriorAgent from '@/view/carriorAgent/reviseCarriorAgent'

import AgentSellerIndex from '@/view/agentSeller/index'
import AddAgentSeller from '@/view/agentSeller/addAgentSeller'
import SpecifiedSeller from '@/view/agentSeller/specifiedSeller'

import AgentMemberIndex from '@/view/agentMember/index'

import AgentFinanceIndex from '@/view/agentFinance/index'


// 运营商
import CarriorManageIndex from '@/view/carriorManage/index'
import CarriorManageMoney from '@/view/carriorManage/moneyDetail'
import CarriorManageCash from '@/view/carriorManage/moneyCash'

import CarriorCarriorIndex from '@/view/carriorCarrior/index'

import CarriorSellerIndex from '@/view/carriorSeller/index'
import CarriorSpecifiedSeller from '@/view/carriorSeller/specifiedSeller'

import CarriorMemberIndex from '@/view/carriorMember/index'
import CarriorMemberMember from '@/view/carriorMember/member'

import CarriorFinanceIndex from '@/view/carriorFinance/index'


Vue.use(Router)

let router = new Router({
    mode: 'history',
    linkActiveClass: 'isActive',    //导航栏效果
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition;
        } else {
            return {x: 0, y: 0}
        }
    },
    routes: [
        // 首页及概览
        {
            path: '/',
            component: Pandect,
            meta: {
                title: '餐餐抢后台首页',
                login: true
            }
        },
        // 概览
        {
            path: '/pandect',
            component: Pandect,
            meta: {
                title: '餐餐抢后台概览',
                login: true
            }
        },
        // 会员
        {
            path: '/member',
            name: 'Member',
            component: Member,
            meta: {
                title: '会员管理',
                login: true
            }
        },
        {
            path: '/member/addMember',
            component: AddMember,
            meta: {
                title: '添加会员',
                login: true
            }
        },
        {
            path: '/member/editMember',
            component: EditMember,
            meta: {
                title: "会员编辑",
                login: true
            }
        },
        {
            path: '/member/memberMoney',
            component: MemberMoney,
            meta: {
                title: '会员资金',
                login: true
            }
        },
        {
            path: '/member/memberCash',
            component: MemberCash,
            meta: {
                title: '会员提现',
                login: true
            }
        },
        {
            path: '/member/cashCheck',
            component: CashCheck,
            meta: {
                title: '会员提现--审核',
                login: true
            }
        },
        {
            path: '/member/watchCash',
            component: WatchCash,
            meta: {
                title: '会员提现--查看',
                login: true
            }
        },
        {
            path: '/member/memberRealName',
            component: MemberRealName,
            meta: {
                title: '会员实名',
                login: true
            }
        },
        {
            path: '/member/watchMember',
            component: WatchMember,
            meta: {
                title: '会员实名--查看',
                login: true
            }
        },
        {
            path: '/member/checkMember',
            component: CheckMember,
            meta: {
                title: '会员实名--审核',
                login: true
            }
        },
        {
            path: '/member/memberMoneyList',
            component: MemberMoneyList,
            meta: {
                title: '会员资金列表',
                login: true
            }
        },


        // 餐餐抢商家
        {
            path: '/seller',
            component: Seller,
            meta: {
                title: '餐餐抢商家列表',
                login: true
            }
        },
        {
            path: '/seller/sellerIn',
            component: SellerIn,
            meta: {
                title: '餐餐抢商家申请列表',
                login: true
            }
        },
        {
            path: '/seller/sellerMoney',
            component: SellerMoney,
            meta: {
                title: '餐餐抢商家资金',
                login: true
            }
        },
        {
            path: '/seller/sellerCash',
            component: SellerCash,
            meta: {
                title: '餐餐抢商家提现',
                login: true
            }
        },
        {
            path: '/seller/sellerMember',
            component: SellerMember,
            meta: {
                title: '餐餐抢商家会员',
                login: true
            }
        },
        {
            path: '/seller/addSeller',
            component: AddSeller,
            meta: {
                title: '添加商家',
                login: true
            }
        },
        {
            path: '/seller/editSeller',
            component: EditSeller,
            meta: {
                title: '编辑商家',
                login: true
            }
        },
        {
            path: '/seller/checkSeller',
            component: CheckSeller,
            meta: {
                title: '商家审核',
                login: true
            }
        },
        {
            path: '/seller/watchSeller',
            component: WatchSeller,
            meta: {
                title: '商家查看',
                login: true
            }
        },
        {
            path: '/seller/watchSellerIn',
            component: WatchSellerIn,
            meta: {
                title: '商家入驻查看',
                login: true
            }
        },
        {
            path: '/seller/sellerCashCheck',
            component: SellerCashCheck,
            meta: {
                title: '商家提现审核',
                login: true
            }
        },


        // 代理商
        {
            path: '/agent',
            component: Agent,
            meta: {
                title: '代理商',
                login: true
            }
        },
        {
            path: '/agent/agentSubordinate',
            component: AgentSubordinate,
            meta: {
                title: '代理商--下级代理',
                login: true
            }
        },
        {
            path: '/agent/agentMember',
            component: AgentMember,
            meta: {
                title: '代理商--会员',
                login: true
            }
        },
        {
            path: '/agent/agentSeller',
            component: AgentSeller,
            meta: {
                title: '代理商--商家',
                login: true
            }
        },

        {
            path: '/agent/agentMoney',
            component: AgentMoney,
            meta: {
                title: '代理商--资金',
                login: true
            }
        },

        {
            path: '/agent/agentCash',
            component: AgentCash,
            meta: {
                title: '代理商--提现',
                login: true
            }
        },
        {
            path: '/agent/agentCarrieroperator',
            component: AgentCarrieroperator,
            meta: {
                title: '代理商--下级运营商',
                login: true
            }
        },
        {
            path: '/agent/addAgent',
            component: AddAgent,
            meta: {
                title: '新增代理商',
                login: true
            }
        },
        {
            path: '/agent/watchAgent',
            component: WatchAgent,
            meta: {
                title: '查看代理商',
                login: true
            }
        },
        {
            path: '/agent/reviseAgent',
            component: ReviseAgent,
            meta: {
                title: '修改代理商',
                login: true
            }
        },
        {
            path: '/agent/watchCash',
            component: AgentWatchCash,
            meta: {
                title: '查看代理商提现',
                login: true
            }
        },
        {
            path: '/agent/cashCheck',
            component: AgentCashCheck,
            meta: {
                title: '修改代理商',
                login: true
            }
        },

        //运营商
        {
            path: '/carrieroperator',
            component: Carrieroperator,
            meta: {
                title: '运营商列表',
                login: true
            },
            children:[
                {
                    path: '/carrieroperator/index',
                    component: Carrieroperator,
                }
            ]   
        },
        {
            path: '/carrieroperator/carrieroperatorMember',
            component: CarrieroperatorMember,
            meta: {
                title: '运营商会员列表',
                login: true
            }
        },
        {
            path: '/carrieroperator/carrieroperatorMoney',
            component: CarrieroperatorMoney,
            meta: {
                title: '运营商资金列表',
                login: true
            }
        },
        {
            path: '/carrieroperator/carrieroperatorSeller',
            component: CarrieroperatorSeller,
            meta: {
                title: '运营商商家列表',
                login: true
            }
        },
        {
            path: '/carrieroperator/carrieroperatorCash',
            component: CarrieroperatorCash,
            meta: {
                title: '运营商提现列表',
                login: true
            }
        },
        {
            path: '/carrieroperator/watchCash',
            component: CarrierWatchCash,
            meta: {
                title: '运营商提现--查看',
                login: true
            }
        },
        {
            path: '/carrieroperator/cashCheck',
            component: CarrierCashCheck,
            meta: {
                title: '运营商提现--审核',
                login: true
            }
        },
        {
            path: '/carrieroperator/addCarrieroperator',
            component: AddCarrieroperator,
            meta: {
                title: '添加运营商',
                login: true
            }
        },
        {
            path: '/carrieroperator/watchCarrieroperator',
            component: WatchCarrieroperator,
            meta: {
                title: '查看运营商',
                login: true
            }
        },
        {
            path: '/carrieroperator/reviseCarrieroperator',
            component: ReviseCarrieroperator,
            meta: {
                title: '修改运营商',
                login: true
            }

        },


        // 餐餐抢订单
        {
            path: '/ccqOrder',
            component: CcqOrder
        },
        {
            path: '/ccqOrder/ccqOrderDetails',
            component: CcqOrderDetails
        },
        {
            path: '/ccqOrder/ccqOrderRecord',
            component: CcqOrderRecord
        },


        // VIP充值
        {
            path: '/vipRecharge',
            component: VipRecharge,
            meta: {
                title: 'VIP充值',
                login: true
            }
        },
        {
            path: '/vipRecharge/vipRechargeDetails',
            component: VipRechargeDetails,
            meta: {
                title: 'VIP充值详情',
                login: true
            }
        },
        {
            path: '/vipRecharge/vipRechargeRecord',
            component: VipRechargeRecord,
            meta: {
                title: 'VIP充值记录',
                login: true
            }
        },


        // 短信管理
        {
            path: '/message',
            component: Message
        },


        // 商品管理
        {
            path: '/goods',
            component: Goods,
            meta: {
                title: '商品管理',
                login: true
            }
        },
        {
            path: '/goods/addGoods',
            component: AddGoods,
            meta: {
                title: '添加商品',
                login: true
            }
        },
        {
            path: '/goods/classGoods',
            component: ClassGoods
        },
        {
            path: '/goods/singleGoods',
            component: SingleGoods,
            meta: {
                title: '添加单品券',
                login: true
            }
        },
        {
            path: '/goods/groupGoods',
            component: GroupGoods,
            meta: {
                title: '添加套餐券',
                login: true
            }
        },
        {
            path: '/seller/testGroupGoods',
            component: TestGroupGoods,
            meta: {
                title: '添加套餐券',
                login: true
            }
        },
        {
            path: '/goods/checkGroupGoods',
            component: checkGroupGoods,
            meta: {
                title: '套餐券审核',
                login: true
            }
        },
        {
            path: '/goods/watchGroupDetail',
            component: WatchGroupDetail,
            meta: {
                title: '套餐券详情',
                login: true
            }
        },
        {
            path: '/goods/groupOnlineGoods',
            component: GroupOnlineGoods
        },
        {
            path: '/goods/editClassGoods',
            component: EditClassGoods
        },
        {
            path: '/goods/setClassGoods',
            component: SetClassGoods
        },
        {
            path: '/goods/applicate',
            component: Applicate,
            meta: {
                title: '申请新规格',
                login: true
            }
        },
        {
            path: '/goods/editGoods',
            component: EditGoods,
            meta: {
                title: '编辑商品',
                login: true
            }
        },

        // 活动管理
        {
            path: '/activityManage',
            component: ActivityManage,
            meta: {
                title: '活动管理',
                login: true
            },
            children: [
                {
                    path: '',
                    component: Banner
                },
                {
                    path: '/activityManage/index/banner',
                    component: Banner
                },
                {
                    path: '/activityManage/index/goodsList',
                    component: ActivityGoodsList
                },
                {
                    path: '/activityManage/index/message',
                    component: ActivityMessage
                },
                {
                    path: '/activityManage/index/vipData',
                    component: ActivityVipData
                },
            ]
        },
        // 地推管理
        {
            path: '/activityManage/spreadManage',
            component: SpreadManage,
            meta: {
                title: '地推管理',
                login: true
            },
            children: [
                {
                    path: '',
                    component: SpreadList
                },
                {
                    path: '/activityManage/spreadManage/spreadList',
                    component: SpreadList
                },
                {
                    path: '/activityManage/spreadManage/spreadJoinList',
                    component: SpreadJoinList
                }         
            ]
        },
        // 一元活动
        {
            path: '/activityManage/oneMoney',
            component: ActivityOneMoney,
            meta: {
                title: '1元活动',
                login: true
            }, 
        },
        {
            path: '/activityManage/addOneMoney',        // 添加活动
            component: ActivityAddOneMoney,
            meta: {
                title: '添加1元活动',
                login: true
            }, 
        },
        {
            path: '/activityManage/activityGoodsList',        // 活动管理列表
            component: ActivityOneMoneyList,
            meta: {
                title: '活动列表',
                login: true
            },
        }, 
        {
            path: '/activityManage/oneMoneySingle',        // 单品券页面
            component: ActivityOneMoneySingle,
            meta: {
                title: '单品券列表',
                login: true
            },
        }, 
        {
            path: '/activityManage/seeGoods',        // 活动项目详情
            component: ActivitySeeGoods,
            meta: {
                title: '活动项目详情',
                login: true
            },
        }, 
        {
            path: '/activityManage/activityChart',        // 活动项目数据统计chart
            component: ActivityChart,
            meta: {
                title: '数据统计',
                login: true
            },
        }, 



        // 高汇通
        {
            path: '/otherPay',
            component: OtherPay,
            meta: {
                title: '高汇通列表',
                login: true
            }
        },
        {
            path: '/otherPay/addList',
            component: OtherPayAdd,
            meta: {
                title: '高汇通开通支付平台申请表',
                login: true
            }
        },
        {
            path: '/otherPay/checkList',
            component: OtherPayCheck,
            meta: {
                title: '高汇通--审核',
                login: true
            }
        },
        {
            path: '/otherPay/watchList',
            component: OtherPayWatch,
            meta: {
                title: '高汇通--查看',
                login: true
            }
        },
        {
            path: '/otherPay/orderList',
            component: OtherPayOrder,
            meta: {
                title: '高汇通订单列表',
                login: true
            }
        },
        // 权限管理
        {
            path: '/power',
            component: PowerManage,
            meta: {
                title: '权限管理',
                login: true
            },
            children: [
                {
                    path: '',
                    component: PowerManageList
                },
                {
                    path: '/power/index/manageList',
                    component: PowerManageList
                },
                {
                    path: '/power/index/addManage',
                    component: AddPowerManage
                },
                {
                    path: '/power/index/powerGroup',
                    component: PowerGroup
                },
                {
                    path: '/power/index/addGroup',
                    component: AddPowerGroup
                },
            ]
        },

        {
            path:'/showList/member',
            component:showListMember,
            meta: {
                title: '查看会员',
                login: true
            },
        },
        {
            path:'/showList/agent',
            component:showListAgent,
            meta: {
                title: '查看代理商',
                login: true
            },
        },
        {
            path:'/showList/carrior',
            component:showListCarrior,
            meta: {
                title: '查看运营商',
                login: true
            },
        },
        {
            path:'/showList/seller',
            component:showListSeller,
            meta: {
                title: '查看商家',
                login: true
            },
        },

        {
            path:'/chart/sellerChart',
            component:SellerChart,
            meta: {
                title: '商家图表分析',
                login: true
            },
        },


        // 代理商
        {
            path: '/agentManage',
            component: AgentManage,
            children: [
                {
                    path: '',
                    component: AgentManage,
                }
            ],
            meta: {
                title: '餐餐抢代理商',
                login: true
            },
        },
        {
            path: '/agentManage/moneyDetail',
            component: AgentManageMoney,
            meta: {
                title: '代理商资金详情',
                login: true
            }
        },
        
        {
            path: '/agentManage/moneyCash',
            component: AgentManageCash,
            meta: {
                title: '代理商资金提现',
                login: true
            }
        },

        {
            path: '/agentManage/watchCash',
            component: AgentManageWatchCash,
            meta: {
                title: '代理商资金提现详情',
                login: true
            }
        },

        {
            path: '/subordinateAgent',
            component: Subordinate,
            meta: {
                title: '下级代理商',
                login: true
            }
        },
        {
            path: '/subordinateAgent/addSubordinateAgent',
            component: AddSubordinateAgent,
            meta: {
                title: '新增下级代理',
                login: true
            }
        },
        {
            path: '/subordinateAgent/watchSubordinateAgent',
            component: WatchSubordinateAgent,
            meta: {
                title: '查看下级代理',
                login: true
            }
        },
        {
            path: '/carriorAgent',
            component: Carrior,
            meta: {
                title: '下级运营商',
                login: true
            }
        },
        {
            path: '/carriorAgent/addCarriorAgent',
            component: AddCarriorAgent,
            meta: {
                title: '新增下级运营商',
                login: true
            }
        },
        {
            path: '/carriorAgent/watchCarriorAgent',
            component: WatchCarriorAgent,
            meta: {
                title: '查看下级运营商',
                login: true
            }
        },
        {
            path: '/carriorAgent/reviseCarriorAgent',
            component: ReviseCarriorAgent,
            meta: {
                title: '修改下级运营商',
                login: true
            }
        },

        {
            path: '/agentSeller',
            component: AgentSellerIndex,
            meta: {
                title: '商家',
                login: true
            }
        },
        {
            path: '/agentSeller/addAgentSeller',
            component: AddAgentSeller,
            meta: {
                title: '添加商家',
                login: true
            }
        },
        {
            path: '/agentSeller/specifiedSeller',
            component: SpecifiedSeller,
            meta: {
                title: '待指定商家',
                login: true
            }
        },

        {
            path: '/agentMember',
            component: AgentMemberIndex,
            children: [
                {
                    path: '/agentMember/index',
                    component: AgentMemberIndex,
                }
            ],
            meta: {
                title: '会员',
                login: true
            }
        },

        {
            path: '/agentFinance',
            component: AgentFinanceIndex,
            children: [
                {
                    path: '/agentFinance/index',
                    component: AgentFinanceIndex,
                }
            ],
            meta: {
                title: '财务数据统计',
                login: true
            }
        },

        // 运营商
        {
            path: '/carriorManage',
            component: CarriorManageIndex,
            children: [
                {
                    path: '/carriorManage/index',
                    component: CarriorManageIndex,
                }
            ],
            meta: {
                title: '餐餐抢运营商',
                login: true
            }
        },
        {
            path: '/carriorManage/moneyCash',
            component: CarriorManageCash,
            meta: {
                title: '运营商资金提现',
                login: true
            }
        },
        {
            path: '/carriorManage/moneyDetail',
            component: CarriorManageMoney,
            meta: {
                title: '运营商资金详情',
                login: true
            }
        },

        {
            path: '/carriorCarrior',
            component: CarriorCarriorIndex,
            children: [
                {
                    path: '/carriorCarrior/index',
                    component: CarriorCarriorIndex,
                }
            ],
            meta: {
                title: '下级运营商',
                login: true
            }
        },

        {
            path: '/carriorSeller',
            component: CarriorSellerIndex,
            children: [
                {
                    path: '/carriorSeller/index',
                    component: CarriorSellerIndex,
                }
            ],
            meta: {
                title: '商家',
                login: true
            }
        },
        {
            path: '/carriorSeller/specifiedSeller',
            component: CarriorSpecifiedSeller,
            meta: {
                title: '待指定商家',
                login: true
            }
        },


        {
            path: '/carriorMember',
            component: CarriorMemberIndex,
            children: [
                {
                    path: '/carriorMember/index',
                    component: CarriorMemberIndex,
                }
            ],
            meta: {
                title: '会员',
                login: true
            }
        },

        {
            path: '/carriorMember/member',
            component: CarriorMemberMember,
            children: [
                {
                    path: '/carriorMember/member',
                    component: CarriorMemberMember,
                }
            ],
            meta: {
                title: '会员',
                login: true
            }
        },

        

        {
            path: '/carriorFinance',
            component: CarriorFinanceIndex,
            children: [
                {
                    path: '/carriorFinance/index',
                    component: CarriorFinanceIndex,
                }
            ],
            meta: {
                title: '财务统计',
                login: true
            }
        },


        // 登录
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        // // 路由不存在，跳转到根路径下
        // {
        //     path: '*',
        //     redirect: '/error',
        //     component: Error
        // }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((item) => item.meta.login)) {
        let info = router.app.$local.fetch('info');
        if (info.login) {
            // if (info.token) {
            next()
            // } else {
            //     router.push({path: '/login'})
            // }
        } else {
            router.push({path: '/login'})
        }
    } else {
        next()
    }
    if (to.meta.title) {
        window.document.title = to.meta.title
    } else {
        window.document.title = '餐餐抢系统'
    }
})
export default router;
