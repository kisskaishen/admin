<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>运营商财务统计</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <el-form class="condition" label-width="100px">
                <el-row>
                    <el-col style="width:220px;">
                        <el-form-item label="消费者名称：">
                            <el-input v-model="customer" placeholder="" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:260px;">
                        <el-form-item label="消费日期：">
                            <el-date-picker
                                v-model="consumeTime"
                                type="date"
                                placeholder="添加时间"
                                size="small"
                                style="width: 160px"
                                @change="addTimeChange"></el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:260px;">
                        <el-form-item label="财务类型：">
                            <el-select v-model="finance" size="small">
                                <el-option
                                    v-for="item in finances"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <!-- button按钮 -->
                    <el-col style="width:32px;margin-left:16px;margin-top: 2px">
                        <i class="btn-search" @click="btnSearch"></i>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col style="width: 400px;" class="tip">目前会员共计 <em style="color:#e4393c;">{{total}}</em>
                        位，可根据条件进行详细筛选
                    </el-col>
                    <el-col style="width: 120px;float: right;">
                        <el-button @click="outExcel">导出excel</el-button>
                    </el-col>
                </el-row>
            </el-form>

            <table>
                <tr class="thead">
                    <th>消费者名称</th>
                    <th>推荐人</th>
                    <th width="16%">消费订单号</th>
                    <th align="center">获得提成</th>
                    <th>消费时间</th>
                    <th width="36%">消费说明</th>
                </tr>
                <tr v-for="item in list">
                    <td>{{item.user_name}}</td>
                    <td>{{item.inviter_name}}</td>
                    <td>{{item.order_sn}}</td>
                    <td align="center">{{item.value}}</td>
                    <td>{{item.datetime}}</td>
                    <td>{{item.intro}}</td>
                </tr>
            </table>

            <div class="footer" style="width:100%;height:30px;margin:20px 0;">
                <div class="fr">
                    <el-pagination
                        layout="prev, pager, next"
                        @current-change="currentChange"
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
                memberId: this.$memberId,
                memberType: this.$memberType,
                finances: [
                    {
                        label: '9.8vip会员费',
                        value: '1'
                    },
                    {
                        label: '餐餐抢产品',
                        value: '2'
                    },
                    {
                        label: '推广奖金',
                        value: '3'
                    },
                ],
                finance: '1',
                list: [],
                customer: '',
                consumeTime: '',
                lastPage: '',
                currentPage: 1,
                total: '',

            }
        },

        created() {
            this.$axios({
                method: 'post',
                url: 'Agentmember/agent_finance_list',
                data: {
                    member_id: this.memberId,
                    member_type: this.memberType,
                    page: this.currentPage
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        console.log(res.data.data)
                        this.list = res.data.data.list
                        this.lastPage = res.data.data.last_page * 10
                        this.total = res.data.data.total
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'warning',
                            duration: 1600
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {
            // 财务类型
            typeChange(val) {
                this.finance = val
            },
            // 导出excel
            outExcel() {
                location.href = '' + this.$baseUrl + 'Agentmember/agent_finance_list?member_id=' + this.memberId + '&member_type=' + this.memberType + '&outexcel=1&member_name=' + this.customer + '&member_time=' + this.consumeTime + '&type=' + this.finance + ''
            },
            // 条件查询
            btnSearch() {
                this.$axios({
                    method: 'post',
                    url: 'Agentmember/agent_finance_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        member_name: this.customer,
                        member_time: this.consumeTime,
                        type: this.finance,
                        page: this.currentPage
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                            this.total = res.data.data.total
                            this.customer = ''
                            this.consumeTime = ''
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 翻页
            currentChange(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Agentmember/agent_finance_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        member_name: this.customer,
                        member_time: this.consumeTime,
                        type: this.finance,
                        page: this.currentPage
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                            this.total = res.data.data.total
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 添加时间
            addTimeChange(val) {
                this.consumeTime = val
            }
        }
    }
</script>

<style scoped lang="scss">
    .contentDiv {
        .condition {
            .el-col {
                a {
                    i {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        vertical-align: middle;
                        background: url("../../assets/image/image-count.png") -20px -12px;
                    }
                }
            }
        }
        table {
            .thead {
                background: url('../../assets/image/thead.png') -10px -352px;
            }
        }
    }

</style>
