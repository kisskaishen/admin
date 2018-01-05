<template>
    <div id="asider">
        <el-menu :default-active="onRoutes"  theme="light" unique-opened router>

            <el-submenu index="0" v-if="this.$memberType == 9">
                <template slot="title">
                    <router-link to="/Pandect"><i class="iPandect"></i>概览</router-link>
                </template>
                <el-menu-item index="/Pandect">概览</el-menu-item>
            </el-submenu>

            <el-submenu index="1" v-if="this.$memberType == 9">
                <template slot="title">
                    <router-link to="/member"><i class="iMember"></i>会员</router-link>
                </template>
                <el-menu-item index="/member/memberCash">会员提现</el-menu-item>
                <el-menu-item index="/member/memberRealName">会员实名</el-menu-item>
            </el-submenu>

            <el-submenu index="2" v-if="this.$memberType == 9">
                <template slot="title">
                    <router-link to="/seller"><i class="iSeller"></i>餐餐抢商家</router-link>
                </template>
                <el-menu-item index="/seller">餐餐抢商家</el-menu-item>
                <!--<el-menu-item index="/seller/sellerMoney">商家资金</el-menu-item>-->
                <!--<el-menu-item index="/seller/sellerCash">商家提现</el-menu-item>-->
                <!--<el-menu-item index="/seller/sellerMember">商家会员</el-menu-item>-->

            </el-submenu>

            <el-submenu index="3" v-if="this.$memberType == 9">
                <template slot="title">
                    <router-link to="/agent"><i class="iAgent"></i>代理商</router-link>
                </template>
                <el-menu-item index="/agent/agentCash">代理提现</el-menu-item>
            </el-submenu>

            <el-submenu index="4" v-if="this.$memberType == 9">
                <template slot="title">
                    <router-link to="/Carrieroperator"><i class="iCarrieroperator"></i>运营商</router-link>
                </template>
                <el-menu-item index="/Carrieroperator/carrieroperatorCash">运营商提现</el-menu-item>
            </el-submenu>

            <el-submenu index="5" v-if="this.$memberType == 9">
                <template slot="title">
                    <router-link to="/CcqOrder"><i class="iCcqOrder"></i>餐餐抢订单</router-link>
                </template>
                <el-menu-item index="/CcqOrder">餐餐抢订单</el-menu-item>
            </el-submenu>

            <el-submenu index="6" v-if="this.$memberType == 9">
                <template slot="title">
                    <router-link to="/vipRecharge"><i class="iVipRecharge"></i>VIP充值</router-link>
                </template>
                <el-menu-item index="/vipRecharge">VIP充值</el-menu-item>
            </el-submenu>

            <!--<el-submenu index="7"  v-if="this.$memberType == 9">-->
            <!--<template slot="title">-->
            <!--<router-link to="/message"><i class="iMessage"></i>短信管理</router-link>-->
            <!--</template>-->
            <!--<el-menu-item index="/message">短信管理</el-menu-item>-->
            <!--</el-submenu>-->

            <el-submenu index="8" v-if="this.$memberType == 9">
                <template slot="title">
                    <router-link to="/goods"><i class="iGoods"></i>商品管理</router-link>
                </template>
                <!--<el-menu-item index="/goods/addGoods">添加商品</el-menu-item>-->
                <!--<el-menu-item index="/goods/singleGoods">单品券添加</el-menu-item>-->
                <!--<el-menu-item index="/goods/groupGoods">套餐添加</el-menu-item>-->
                <!--<el-menu-item index="/goods/classGoods">分类管理</el-menu-item>-->
                <el-menu-item index="/goods/applicate">申请新规格</el-menu-item>
            </el-submenu>

            <el-submenu index="20" v-if="this.$memberType == 9">
                <template slot="title">
                    <router-link to="/activityManage/index"><i class="iActivity"></i>活动管理</router-link>
                </template>
                <el-menu-item index="/activityManage/index">活动管理</el-menu-item>
            </el-submenu>

            <el-submenu index="21" v-if="this.$memberType == 9">
                <template slot="title">
                    <router-link to="/otherPay/index"><i class="iActivity"></i>高汇通</router-link>
                </template>
                <el-menu-item index="/otherPay/index">列表</el-menu-item>
                <el-menu-item index="/otherPay/orderList">订单列表</el-menu-item>
            </el-submenu>


            <el-submenu index="9" v-if="this.$memberType == 4">
                <template slot="title">
                    <router-link to="/agentManage/index"><i class="iPandect"></i>代理商</router-link>
                </template>
                <el-menu-item index="/agentManage/moneyDetail">资金详情</el-menu-item>
                <el-menu-item index="/agentManage/moneyCash">资金提现</el-menu-item>
            </el-submenu>

            <el-submenu index="10" v-if="this.$memberType == 4">
                <template slot="title">
                    <router-link to="/subordinateAgent/index"><i class="iAgent"></i>下级代理商</router-link>
                </template>
                <el-menu-item index="/subordinateAgent/addSubordinateAgent">新增下级代理</el-menu-item>
                <!--<el-menu-item index="/subordinateAgent/watchSubordinateAgent">查看代理</el-menu-item>-->
            </el-submenu>

            <el-submenu index="11" v-if="this.$memberType == 4">
                <template slot="title">
                    <router-link to="/carriorAgent/index"><i class="iCarrieroperator"></i>下级运营商</router-link>
                </template>
                <el-menu-item index="/carriorAgent/addCarriorAgent">新增下级运营商</el-menu-item>
                <!--<el-menu-item index="/carriorAgent/watchCarriorAgent">查看下级运营商</el-menu-item>-->
                <!--<el-menu-item index="/carriorAgent/reviseCarriorAgent">修改下级运营商</el-menu-item>-->

            </el-submenu>

            <el-submenu index="12" v-if="this.$memberType == 4">
                <template slot="title">
                    <router-link to="/agentSeller/index"><i class="iSeller"></i>商家</router-link>
                </template>
                <el-menu-item index="/agentSeller/addAgentSeller">新增商家</el-menu-item>
                <el-menu-item index="/agentSeller/specifiedSeller">待指定商家</el-menu-item>
            </el-submenu>

            <el-submenu index="13" v-if="this.$memberType == 4">
                <template slot="title">
                    <router-link to="/agentMember/index"><i class="iMember"></i>会员</router-link>
                </template>
                <el-menu-item index="/agentMember/index">会员</el-menu-item>
            </el-submenu>
            <el-submenu index="14" v-if="this.$memberType == 4">
                <template slot="title">
                    <router-link to="/agentFinance/index"><i class="iFinance"></i>财务统计</router-link>
                </template>
                <el-menu-item index="/agentFinance/index">财务数据统计</el-menu-item>
            </el-submenu>

            <el-submenu index="15" v-if="this.$memberType == 5">
                <template slot="title">
                    <router-link to="/carriorManage/index"><i class="iPandect"></i>运营商</router-link>
                </template>
                <el-menu-item index="/carriorManage/moneyDetail">资金详情</el-menu-item>
                <el-menu-item index="/carriorManage/moneyCash">资金提现</el-menu-item>
            </el-submenu>

            <el-submenu index="16" v-if="this.$memberType == 5">
                <template slot="title">
                    <router-link to="/carriorCarrior/index"><i class="iCarrieroperator"></i>下级运营商</router-link>
                </template>
                <el-menu-item index="/carriorCarrior/index">下级运营商</el-menu-item>
            </el-submenu>

            <el-submenu index="17" v-if="this.$memberType == 5">
                <template slot="title">
                    <router-link to="/carriorSeller/index"><i class="iSeller"></i>商家</router-link>
                </template>
                <el-menu-item index="/carriorSeller/index">商家</el-menu-item>
                <el-menu-item index="/carriorSeller/specifiedSeller">待指定商家</el-menu-item>
            </el-submenu>

            <el-submenu index="18" v-if="this.$memberType == 5">
                <template slot="title">
                    <router-link to="/carriorMember/index"><i class="iMember"></i>会员</router-link>
                </template>
                <el-menu-item index="/carriorMember/index">会员</el-menu-item>
            </el-submenu>

            <el-submenu index="19" v-if="this.$memberType == 5">
                <template slot="title">
                    <router-link to="/carriorFinance/index"><i class="iFinance"></i>财务统计</router-link>
                </template>
                <el-menu-item index="/carriorFinance/index">财务统计</el-menu-item>
            </el-submenu>
        </el-menu>

        <!--<el-menu :default-active="onRoutes" theme="dark" unique-opened router @open="handleOpen">-->
            <!--<el-submenu :index="item.html_name" v-for="item in list" :key="item.id">-->
                <!--<template slot="title">{{item.title}}</template>-->
                <!--<el-menu-item :index="td.html_name" v-for="td in item.child" :key="item.id">{{td.title}}</el-menu-item>-->
            <!--</el-submenu>-->
        <!--</el-menu>-->

    </div>
</template>

<script>
    export default {
        data() {
            return {
                list:[],
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '')
            }
        },
        created() {
            this.list = localStorage.getItem('aside')
            console.log(this.list)
        },
        watch: {},
        methods: {}
    }
</script>

<style scoped lang="scss">
    #asider {
        float: left;
        position: absolute;
        width: 160px;
        top: 60px;
        bottom: 0;
        left: 0;
        background-color: #fff;
        box-shadow: 0 0 2px #ffd6d7;
        text-align: left;
        .el-menu {
            background-color: #fff;
            .el-menu-item {
                text-indent: 24px;
                background-color: #fff;
            }
            .pandect, .ccqOrder, .vipRecharge, .message {
                text-indent: 0 !important;
            }
            a {
                display: block;
                color: #242424;
                i {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    margin-right: 6px;
                    vertical-align: middle;
                }
                .iPandect {
                    background: url('../../assets/image/image-count.png') -6px -6px;
                }

                .iMember {
                    background: url('../../assets/image/image-count.png') -46px -6px;
                }

                .iSeller {
                    background: url('../../assets/image/image-count.png') -210px -6px;
                }

                .iAgent {
                    background: url('../../assets/image/image-count.png') -252px -6px;
                }

                .iCarrieroperator {
                    background: url('../../assets/image/image-count.png') -294px -6px;
                }

                .iCcqOrder {
                    background: url('../../assets/image/image-count.png') -378px -6px;
                }

                .iVipRecharge {
                    background: url('../../assets/image/image-count.png') -420px -6px;
                }

                .iMessage {
                    background: url('../../assets/image/image-count.png') -336px -6px;
                }

                .iGoods {
                    background: url('../../assets/image/image-count.png') -462px -6px;
                }

                .iFinance {
                    background: url('../../assets/image/image-count.png') -496px -6px;
                }

                .iActivity {
                    background: url('../../assets/image/image-count.png') -532px -6px;
                }
            }
        }
    }


</style>
