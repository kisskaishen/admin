<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/member' }">会员管理</el-breadcrumb-item>
            <el-breadcrumb-item>资金列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <el-tabs v-model="activeName" @tab-click="handClick">
                <el-tab-pane label="VIP奖金" name="list1">
                    <VipMoney></VipMoney>
                </el-tab-pane>
                <el-tab-pane label="餐餐抢奖金" name="list2">
                    <CcqMoney></CcqMoney>
                </el-tab-pane>
                <el-tab-pane label="推广奖金" name="list3">
                    <Spread></Spread>
                </el-tab-pane>
                <el-tab-pane label="招商奖金" name="list4">
                    <BnMoney></BnMoney>
                </el-tab-pane>
            </el-tabs>
            
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import VipMoney from '../../components/public/member/vipMoney'
    import CcqMoney from '../../components/public/member/ccqMoney'
    import Spread from '../../components/public/member/spread'
    import BnMoney from '../../components/public/member/bnMoney'

    export default {
        data() {
            return {
                activeName:'',
                
            }
        },
        created() {
            this.activeName = this.$session.fetch('active').activeName || 'list1'
            // this.typeIndex = this.$session.fetch('active').typeIndex || 1
        },
        components:{
            VipMoney,
            CcqMoney,
            Spread,
            BnMoney
        },
        methods: {
            handClick(tab,index) {
                this.$session.save('active', {
                    'activeName': tab.name,
                    // 'typeIndex':parseInt(tab.index) + 1
                })
                // this.typeIndex = parseInt(tab.index) + 1
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }
    



</style>
