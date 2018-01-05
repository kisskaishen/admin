<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item><span @click="goBack">返回上一级</span></el-breadcrumb-item>
            <el-breadcrumb-item :to="this.$route.query.member_type==5?'/carrierOperator':'/agent'">{{this.$route.query.member_type==5?'运营商':'代理商'}}</el-breadcrumb-item>
            <el-breadcrumb-item>会员</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <div class="agentInfo">
                <span>{{this.$route.query.member_type==4?'代理':'运营商'}}：{{memberInfo.member_name}}</span>
                <span>注册会员：{{memberInfo.member_num}}</span>
                <span>VIP会员：{{memberInfo.vip_member_num}}</span>
            </div>
            <el-form class="condition" label-width="70px" style="padding-left: 10px">
                <el-row>
                    <el-col style="width:346px; ">
                        <el-form-item label="注册时间">
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
                            <el-select v-model="vipStatus" size="small" @change="vipStatusChange">
                                <el-option
                                    v-for="item in vipStatuses"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:334px;">
                        <el-form-item label="购买次数">
                            <el-select v-model="range" size="small" @change="rangeChange">
                                <el-option
                                    v-for="item in ranges"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-model="buyNum" size="small" style="width:140px;"></el-input>
                        </el-form-item>
                    </el-col>


                    <el-col>
                        <el-form-item label="最近购买">
                            <el-select v-model="lastBuy" size="small" @change="lastBuyChange">
                                <el-option
                                    v-for="item in lastBuys"
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
                memberInfo:'',

                startDate: '',
                endDate: '',

                //按登录状态
                vipStatuses: [
                    {
                        value: '0',
                        label: '否'
                    }, {
                        value: '1',
                        label: '是'
                    }
                ],
                vipStatus: '',

                ranges: [
                    {
                        label: '<',
                        value: '1'
                    },
                    {
                        label: '>',
                        value: '2'
                    },
                    {
                        label: '=',
                        value: '3'
                    }
                ],
                range: '',

                buyNum: '',          // 购买次数

                lastBuys: [
                    {
                        label: '一周内',
                        value: '1'
                    },
                    {
                        label: '一月内',
                        value: '2'
                    },
                    {
                        label: '一年内',
                        value: '3'
                    }
                ],
                lastBuy: '',

                // table表单
                tdes: [],
                lastPage: '',
                currentPage: 1,
                breadcrumb:'',
            }
        },
        created() {
            this.vipStatus = this.$route.query.is_vip
            // 列表
            this.getList(1)
        },
        methods: {
            // 返回上一级
            goBack(){
                history.go(-1)
            },
            // 注册时间查询
            startDateChange(val) {
                this.startDate = val
            },
            endDateChange(val) {
                this.endDate = val
            },
            // vip状态查询
            vipStatusChange(val) {
                this.vipStatus = val
            },
            // 大于小于等于
            rangeChange(val) {
                this.range = val
            },
            // 最近一次购买
            lastBuyChange(val) {
                this.lastBuy = val
            },
            // 搜索查询
            searchBtn() {
                this.getList(1)
            },
            // 翻页
            pageChange(val) {
               this.getList(val)
            },
            // 列表函数
            getList(val) {
                this.$axios.post('Adminagent/agent_member', {
                    member_id: this.$route.query.member_id,
                    member_type: this.$route.query.member_type,
                    query_start_time: this.startDate,
                    query_end_time: this.endDate,
                    is_vip: this.vipStatus,
                    factor: this.range,
                    num: this.buyNum,
                    time: this.lastBuy,
                    page: val
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.memberInfo = res.data.data
                            this.tdes = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                            if (this.tdes == '') {
                                this.$message({
                                    message:'无内容',
                                    type:'warning',
                                    duration:1600
                                })
                                setTimeout('location.reload()',1600)
                            }
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
            }
        }
    }
</script>

<style scoped>
    .el-breadcrumb {
        line-height: 30px;
    }

    .thead {
        background: url('../../assets/image/thead.png') no-repeat -10px -158px;
    }

    .agentInfo {
        height: 40px;
        line-height: 40px;
        text-align: left;
        font-size: 12px;
        background-color: #eee;
    }

    .agentInfo span {
        padding-left: 10px;
        margin-right: 30px;
    }

    .agentInfo .el-button {
        color: #bfc4fc;
        margin-right: 12px;
        background-color: transparent;
        border: none;
        font-size: 14px;
    }

    .agentInfo i {
        display: inline-block;
        width: 30px;
        height: 18px;
        vertical-align: middle;
        background: url('../../assets/image/image-count.png') -10px -14px;
    }

    .agent .el-button {
        color: #bfc4fc;
        margin-right: 12px;
        background-color: transparent;
        border: none;
        font-size: 14px;
    }

    .agent i {
        display: inline-block;
        width: 30px;
        height: 18px;
        vertical-align: middle;
        background: url('../../assets/image/image-count.png') -10px -14px;
    }

    .tip span {
        display: inline-block;
        height: 10px;
        line-height: 10px;
        padding-left: 10px;
        margin-right: 10px;
        color: #242424;
    }

    .tip span:nth-child(1) {
        border-left: 10px solid #ff8846;
    }

    .tip span:nth-child(2) {
        border-left: 10px solid #02ccd1;
    }

    .tip span:nth-child(3) {
        border-left: 10px solid #e4393c;
    }

    .el-select {
        width: 120px;
    }

    @import "../../assets/css/base.css";
    @import "../../assets/css/agent_part.css";

    @media screen and (max-width: 1660px) {
        .referee {
            float: none;
        }
    }


</style>
