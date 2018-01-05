<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/carrieroperator' }">运营商</el-breadcrumb-item>
            <el-breadcrumb-item>会员</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <div class="carrieroperatorInfo">
                <span>代理：{{titleInfo.member_name}}</span>
                <span>代理地区：{{titleInfo.address}}</span>
                <span>注册会员：{{titleInfo.member_num}}</span>
                <span>VIP会员：{{titleInfo.vip_member_num}}</span>
                <p>当前会员: <b class="error">{{titleInfo.total}}</b>个,可根据条件时行详细筛选</p>
            </div>
            <el-form ref="form" class="condition" label-width="98px">
                <el-row>
                    <el-col style="width: 356px;">
                        <el-form-item label="注册时间查询">
                            <el-date-picker
                                v-model="startDate"
                                type="date"
                                placeholder="开始时间"
                                size="small"
                                @change="startDateChange"></el-date-picker>
                            ~
                            <el-date-picker
                                v-model="endDate"
                                type="date"
                                placeholder="结束时间"
                                size="small"
                                @change="endDateChange"></el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="VIP状态">
                            <el-select v-model="status" size="small" @change="statusChange">
                                <el-option
                                    v-for="item in statuses"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col style="width: 344px;margin-left: 20px;">
                        <el-form-item label="购买商品次数">
                            <el-select v-model="num" size="small" @change="numChange">
                                <el-option
                                    v-for="item in numes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-model="buyNum" size="small"></el-input>
                        </el-form-item>
                    </el-col>


                    <el-col style="margin-left: 20px;">
                        <el-form-item label="最近一次购买">
                            <el-select v-model="lastBuy" size="small" @change="buyChange">
                                <el-option
                                    v-for="item in lastBuies"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <!-- button按钮 -->
                    <el-col style="width:32px;margin-left:16px;">
                        <i class="btn-search" @click="searchBtn"></i>
                    </el-col>
                </el-row>
            </el-form>

            <form action="#">
                <table>
                    <tr class="thead">
                        <th>会员</th>
                        <th>注册时间</th>
                        <th>VIP状态</th>
                        <th>购买商品次数</th>
                        <th>最近一次购买</th>
                    </tr>
                    <tr v-for="td in tdes">
                        <td>{{td.member_name}}</td>
                        <td>{{td.member_time}}</td>
                        <td>{{td.vip}}</td>
                        <td>{{td.order_num}}</td>
                        <td>{{td.buy_time}}</td>
                    </tr>
                </table>
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="pageChange"
                    :total="parseInt(lastPage)">
                </el-pagination>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                startDate: '',
                endDate: '',
                // 状态
                statuses: [
                    {
                        value: '',
                        label: '不限'
                    },
                    {
                        value: '0',
                        label: '否'
                    },
                    {
                        value: '1',
                        label: '是'
                    }
                ],
                status: '',
                // 购买次数
                numes: [
                    {
                        value: '',
                        label: '不限'
                    },
                    {
                        value: '1',
                        label: '<'
                    },
                    {
                        value: '2',
                        label: '>'
                    },
                    {
                        value: '3',
                        label: '='
                    }
                ],
                num: '',
                buyNum: '',
                lastBuies: [
                    {
                        value: '',
                        label: '不限'
                    },
                    {
                        value: '1',
                        label: '一周内'
                    },
                    {
                        value: '2',
                        label: '一个月内'
                    },
                    {
                        value: '3',
                        label: '一年内'
                    }

                ],
                lastBuy: '',


            }
        },
        created() {
            let data = new FormData()
            data.append('member_id', this.$route.query.member_id)
            data.append('member_type', 5)
            data.append('is_vip', this.$route.query.is_vip || '')
            this.$store.dispatch('getAgentMemberList', data)
        },
        computed: {
            tdes() {
                return this.$store.state.carriorModule.list
            },
            lastPage() {
                return this.$store.state.carriorModule.lastPage
            },
            titleInfo() {
                return this.$store.state.carriorModule.titleInfo
            }
        },
        methods: {
            // 注册时间段
            startDateChange(val) {
                this.startDate = val
            },
            endDateChange(val) {
                this.endDate = val
            },
            // 状态选择
            statusChange(val) {
                this.status = val
            },
            numChange(val) {
                this.num = val
            },
            // 最近一次购买
            buyChange(val) {
                this.lastBuy = val
            },
            // 翻页
            pageChange(val) {
                let data = new FormData()
                data.append('member_id', this.$route.query.member_id)
                data.append('member_type', 5)
                data.append('query_start_time', this.startDate)
                data.append('query_end_time', this.endDate)
                data.append('is_vip', this.status)
                data.append('factor', this.num)
                data.append('num', this.buyNum)
                data.append('time', this.lastBuy)
                data.append('page', val)
                this.$store.dispatch('getAgentMemberList', data)
            },
            // 搜索
            searchBtn() {
                let data = new FormData()
                data.append('member_id', this.$route.query.member_id)
                data.append('member_type', 5)
                data.append('query_start_time', this.startDate)
                data.append('query_end_time', this.endDate)
                data.append('is_vip', this.status)
                data.append('factor', this.num)
                data.append('num', this.buyNum)
                data.append('time', this.lastBuy)
                this.$store.dispatch('getAgentMemberList', data)
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .condition {
        padding-left: 10px;
    }

    .carrieroperatorInfo {
        line-height: 40px;
        text-align: left;
        font-size: 12px;
        background-color: #eee;
        padding-left: 10px;
        span {
            margin-right: 30px;
        }

    }

</style>
