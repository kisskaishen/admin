<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/carriorManage/index">运营商</el-breadcrumb-item>
            <el-breadcrumb-item>资金提现</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <el-tabs v-model="activeName" type="border-card" @tab-click="switchChange">
                <el-tab-pane label="提现记录" name="first">
                    <div class="moneyType">
                        <el-row>
                            <el-col v-for="item in group" :key="item.title" @click="chooseType">
                                <i class="fl"></i>
                                <div class="fr">
                                    <p>{{item.title}}</p>
                                    <span>{{item.value}}元</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="searchDiv">
                        <el-row>
                            <el-col>
                                <label>查询时间：</label>
                                <el-date-picker
                                    v-model="startDate"
                                    type="date"
                                    placeholder="选择开始日期"
                                    size="small"
                                    style="width:140px;"
                                    @change="startChange">
                                </el-date-picker>
                                <span>~~</span>
                                <el-date-picker
                                    v-model="endDate"
                                    type="date"
                                    placeholder="选择结束日期"
                                    size="small"
                                    style="width:140px;"
                                    @change="endChange">
                                </el-date-picker>
                            </el-col>
                            <el-col>
                                <i class="btn-search" @click="SearchBtn"></i>
                            </el-col>
                        </el-row>
                    </div>
                    <table>
                        <tr class="thead">
                            <th>用户名称</th>
                            <th width="10%">收款人姓名</th>
                            <th>类型</th>
                            <th>金额</th>
                            <th>手续费</th>
                            <th>实付金额</th>
                            <th>银行名称</th>
                            <th>银行卡号</th>
                            <th>身份证</th>
                            <th>开户行</th>
                            <th>申请时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="item in list">
                            <td>{{item.member_name}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.type}}</td>
                            <td>{{item.amount}} <b v-if="item.amount">元</b></td>
                            <td>{{item.poundage}} <b v-if="item.poundage">元</b></td>
                            <td>{{item.real_amount}} <b v-if="item.real_amount">元</b></td>
                            <td>{{item.bank_name}}</td>
                            <td>{{item.card_account}}</td>
                            <td>{{item.farennum}}</td>
                            <td>{{item.bank_name}}</td>
                            <td>{{item.time}}</td>
                            <td>{{item.status}}</td>
                            <td>
                                <!--<router-link :to="{path:'/agentManage/watchCash'}">-->
                                {{item.issee}}
                                <!--</router-link>-->
                                <!--<router-link :to="{path:'/agentManage/checkCash'}">审核</router-link><em>|</em>-->
                            </td>
                        </tr>
                    </table>
                    <div class="fr" style="height:30px;">
                        <el-pagination
                            layout="prev, pager, next"
                            @current-change="changePage"
                            :total="parseInt(lastPage)"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="提现申请" name="second">
                    <el-form class="applicationDiv" label-width="180px">
                        <p>当前vip会员费：<em>{{current_vip}}元</em>餐餐抢券费：<em>{{current_chan}}元</em>推广奖金费：<em>{{current_promote}}元</em>
                        </p>
                        <el-form-item label="提现类型：">
                            <el-radio-group v-model="typeCash" @change="typeCashChange">
                                <el-radio label="7">vip</el-radio>
                                <el-radio label="8">餐餐抢</el-radio>
                                <el-radio label="1">推广奖金费</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="可提现金额：">
                            {{typeCash == 7 ? cashMoney = current_vip : (typeCash == 8 ? cashMoney = current_chan : cashMoney = current_promote)}}
                        </el-form-item>
                        <el-form-item label="开户名：">
                            {{openUserName}}
                        </el-form-item>
                        <el-form-item label="开户银行：">
                            {{openBankName}}
                        </el-form-item>
                        <el-form-item label="银行卡号：">
                            {{bankCode}}
                        </el-form-item>
                        <el-form-item label="提现金额：">
                            <el-input v-model="cashMoneyNum" size="small"></el-input>
                            <span>元</span>
                            <span>*提现金额必须是一百的整数倍，例如：100，200，500（注意：提现需要交纳20%的个人所得税，28云商城代缴，账户资金不扣除手续费）</span>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="cashApply">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>


        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: 'first',
                group: [],
                list: [],
                startDate: '',
                endDate: '',
                type: 7,
                lastPage: '',
                currentPage: 1,
                memberId: this.$memberId,
                memberType: this.$memberType,

                current_vip: '',
                current_chan: '',
                current_promote: '',


                typeCash: '7',                 // 提现类型
                cashMoney: '',               // 可提现金额
                openUserName: '',            // 开户名
                openBankName: '',            // 开户银行
                bankCode: '',                // 银行卡号
                cashMoneyNum: '',            // 提现金额

            }
        },
        created() {
            // 资金
            this.$axios({
                method: 'post',
                url: 'Agent/cash_info',
                data: {
                    member_id: this.memberId,
                    member_type: this.memberType
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.group = res.data.data
                    } else {
                        this.$message({
                            message:res.data.message,
                            type:'warning',
                            duration:1600
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            // 列表
            this.$axios({
                method: 'post',
                url: 'Agent/cash_list',
                data: {
                    member_id: this.memberId,
                    member_type: this.memberType
                }
            })
                .then(res => {
                    console.log(res.data.data)
                    if (res.data.code == 200) {
                        this.list = res.data.data.list
                        this.lastPage = res.data.data.last_page * 10
                    } else {
                        this.$message({
                            message:res.data.message,
                            type:'warning',
                            duration:1600
                        })
                    }
                })

        },
        methods: {
            chooseType(item) {
//                alert(1)
            },
            startChange(val) {
                this.startDate = val
            },
            endChange(val) {
                this.endDate = val
            },
            SearchBtn() {
                this.$axios({
                    method: 'post',
                    url: 'Agent/cash_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        type: this.type,
                        query_start_time: this.startTime,
                        query_end_time: this.endTime,
                        page: this.currentPage
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                        } else {
                            this.$message({
                                message:res.data.message,
                                type:'warning',
                                duration:1600
                            })
                        }

                    })
            },

            changePage(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Agent/cash_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        type: this.type,
                        query_start_time: this.startTime,
                        query_end_time: this.endTime,
                        page: this.currentPage
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                        } else {
                            this.$message({
                                message:res.data.message,
                                type:'warning',
                                duration:1600
                            })
                        }
                    })
            },


            // 提现记录与提现申请切换
            switchChange(val) {
                if (val.index == 1) {
                    this.$axios({
                        method: 'post',
                        url: 'Agent/cash_apply_info',
                        data: {
                            member_id: this.memberId,
                            member_type: this.memberType
                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.current_vip = res.data.data.current_vip
                                this.current_chan = res.data.data.current_chan
                                this.current_promote = res.data.data.current_promote
                                this.openBankName = res.data.data.bank_name
                                this.openUserName = res.data.data.true_name
                                this.bankCode = res.data.data.card_account
                                this.cashMoney = res.data.data.cashMoney
                                this.openBankName = res.data.data.bank_name
                            } else {
                                this.$message({
                                    message:res.data.message,
                                    type:'warning',
                                    duration:1600
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })

                }
            },
            // 获取typeCash的值
            typeCashChange(val) {
                this.typeCash = val
            },

            // 提现申请
            cashApply() {
                this.$axios({
                    method: 'post',
                    url: 'Agent/cash_apply',
                    data: {
                        member_id: this.memberId,
                        true_name: this.openUserName,
                        bank_name: this.openBankName,
                        member_type: this.memberType,
                        card_account: this.bankCode,
                        type: this.typeCash,
                        amount: this.cashMoneyNum
                    }
                })
                    .then(res => {
                        if (this.cashMoneyNum % 100 == 0) {
                            if (res.data.code == 200) {
                                this.$message({
                                    message:res.data.message,
                                    type:'success',
                                    duration:1600
                                })
                                setTimeout("location.reload()",1600)

                            } else {
                                this.$message({
                                    message:res.data.message,
                                    type:'warning',
                                    duration:1600
                                })
                            }
                        } else {
                            this.$message({
                                message:'提现金额必须是一百的整数倍!',
                                type:'warning',
                                duration:1600
                            })
                            this.cashMoneyNum = ''
                        }


                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-breadcrumb {
        line-height: 30px;
    }

    .moneyType {
        .el-col {
            width: 254px;
            height: 102px;
            padding: 22px;
            margin-right: 30px;
            border: 1px solid #e4393c;
            border-radius: 8px;
            cursor: pointer;
            &:nth-child(1) i {
                background: url('../../assets/image/moneyIcon.png') no-repeat 20px -66px;
            }
            &:nth-child(2) i {
                background: url('../../assets/image/moneyIcon.png') no-repeat -44px -66px;
            }
            &:nth-child(3) i {
                background: url('../../assets/image/moneyIcon.png') no-repeat -112px -66px;
            }
            &:nth-child(4) i {
                background: url('../../assets/image/moneyIcon.png') no-repeat -180px -66px;
            }
            .fr {
                line-height: 26px;
                span {
                    color: #888;
                }
            }
            i {
                display: inline-block;
                width: 84px;
                height: 54px;
            }
        }
    }

    .searchDiv {
        margin-top: 18px;
        .el-col {
            &:first-child {
                width: 400px;
            }
            &:last-child {
                width: 50px;
            }
        }
    }

    table {
        .thead {
            background: url('../../assets/image/thead.png') no-repeat -10px -158px;
        }
    }

    .applicationDiv {
        p {
            line-height: 36px;
            text-align: left;
            text-indent: 20px;
            background: #eee;
            em {
                color: #e4393c;
                margin-right: 30px;
            }
        }
        .el-form-item {
            text-align: left;
            .el-input {
                width: 120px;
                float: left;
                margin-right: -6px;
            }
            span {
                color: #e4393c;
                margin-left: 20px;
            }
            .el-button {
                margin-top: 20px;
            }
        }
    }
</style>
