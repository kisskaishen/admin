<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/ccqOrder">餐餐抢订单</el-breadcrumb-item>
            <el-breadcrumb-item>会员消费记录次数</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <div>
                <el-row>
                    <el-col :lg="4">会员账号：{{member}}</el-col>
                    <el-col :lg="6">截止日期：{{overTime}}</el-col>
                </el-row>
                <el-row>
                    <el-col :lg="4">购买餐餐抢券：{{buyedCcq}}张</el-col>
                    <el-col :lg="4">已验证：<span>{{overCcq}}张</span></el-col>
                </el-row>
                <div class="tip">
                    <span>待验证</span>
                    <span>已验证</span>
                </div>
            </div>
            <div>
                <table>
                    <tr class="thead">
                        <th width="6%">序列号</th>
                        <th width="16%" align="left">订单号</th>
                        <th align="left">店铺</th>
                        <th width="7%">商家类型</th>
                        <th width="13%">下单时间</th>
                        <th width="7%">订单总额</th>
                        <th width="12%">支付方式</th>
                        <th width="10%">订单状态</th>
                        <th width="6%">验证码</th>
                        <th width="6%">操作</th>
                    </tr>
                    <tr v-for="td in tdes">
                        <td>{{td.order_id}}</td>
                        <td align="left">{{td.order_sn}}</td>
                        <td align="left">{{td.store_name}}</td>
                        <td>{{td.store_type}}</td>
                        <td>{{td.add_time}}</td>
                        <td>{{td.order_amount}}</td>
                        <td>{{td.payment_code}}</td>
                        <td><span>{{td.order_state}}</span></td>
                        <td>{{td.check_number}}</td>
                        <td>
                            <router-link :to="{path:'/CcqOrder/ccqOrderDetails',query:{id:td.order_id}}"><span
                                style="color:#007aff;">查看</span></router-link>
                        </td>
                    </tr>
                </table>
                <div class="fr">
                    <el-pagination
                        layout="prev, pager, next"
                        @current-change="orderPage"
                        :current-page="currentPage"
                        :total="parseInt(lastPage)">
                    </el-pagination>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tdes: [],
                buyerId: '',         // 买家id
                lastPage: '',
                member: '',          // 会员
                overTime: '',        // 截止时间
                buyedCcq: '',        // 已购买
                overCcq: '',         // 已验证
                currentPage: 1,

            }
        },
        created() {
            // 获取url的id
            this.buyerId = this.$route.query.buyerId
            this.member = this.$route.query.buyerName
            // // 遍历数据
            // let oldData = sessionStorage.getItem('orderRecord')
            // if (oldData) {
            //     let data = this.$session.fetch('orderRecord')
            //     this.tdes = data.tdes
            //     this.buyedCcq = data.buyedCcq
            //     this.overCcq = data.overCcq
            //     this.overTime = data.overTime
            //     this.lastPage = data.lastPage
            //     this.currentPage = data.currentPage
            // } else {
                this.$axios({
                    method: 'post',
                    url: 'Order/order_list',
                    data: {
                        buyer_id: this.buyerId
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.tdes = res.data.data.list
                            this.buyedCcq = res.data.data.buy_total
                            this.overCcq = res.data.data.is_ver
                            this.overTime = res.data.data.over_time
                            this.lastPage = res.data.data.last_page * 10
                        } else {
                            this.$message({
                                message: res.data.message,
                                duration: 1600,
                                type: 'warning'
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            // }
        },
        methods: {
            orderPage(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Order/order_list',
                    data: {
                        buyer_id: this.buyerId,
                        page: val
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.tdes = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                        } else {
                            this.$message({
                                message: res.data.message,
                                duration: 1600,
                                type: 'warning'
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        beforeRouteLeave(to, from, next) {
            this.$session.save('orderRecord', {
                'currentPage': this.currentPage,
                'tdes': this.tdes,
                'buyedCcq': this.buyedCcq,
                'overCcq': this.overCcq,
                'overTime': this.overTime,
                'lastPage': this.lastPage
        })
            next()
        }
    }
</script>

<style scoped lang="scss">

    .el-breadcrumb {
        line-height: 30px;
    }

    .contentDiv {
        padding-bottom: 40px;
    }

    .el-row {
        padding: 10px;
        .el-col {
            text-align: left;
            span {
                color: #e4393c;
            }
        }
    }

    table {
        text-align: center;
        .thead {
            background: linear-gradient(to right, #4ee6cB, #84fdB6);
        }
        td {
            color: #242424 !important;
        }
    }


</style>
