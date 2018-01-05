<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/Carrieroperator'}">运营商</el-breadcrumb-item>
            <el-breadcrumb-item>运营商提现</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <!-- 搜索栏 -->
            <el-form class="condition">
                <el-row>
                    <el-col style="width:346px;">
                        <el-form-item label="查询时间">
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
                        <el-form-item label="用户名称">
                            <el-input v-model="memberName" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- button按钮 -->
                    <el-col style="width:32px;">
                        <i class="btn-search" @click="searchBtn"></i>
                    </el-col>
                    <p class="fr" style="margin:4px 20px 0 0;">
                        <el-button size="small" @click="outExcel">导出Excel</el-button>
                    </p>
                </el-row>
            </el-form>
            <!-- table列表栏 -->
            <el-form>
                <table>
                    <tr class="thead">
                        <th>用户名称</th>
                        <th>收款人姓名</th>
                        <th width="6%">类型</th>
                        <th width="6%">金额</th>
                        <th width="6%">手续费</th>
                        <th width="6%">实付金额</th>
                        <th>银行名称</th>
                        <th>银行卡号</th>
                        <th>身份证</th>
                        <th>申请时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <tr class="tbody" v-for="td in tdes">
                        <td>{{td.member_name}}</td>
                        <td>{{td.name}}</td>
                        <td>{{td.type}}</td>
                        <td>{{td.amount}}</td>
                        <td><span>{{td.poundage}}</span></td>
                        <td>{{td.real_amount}}</td>
                        <td>{{td.bank_name}}</td>
                        <td>{{td.card_account | backCode}}</td>
                        <td>{{td.farennum}}</td>
                        <td>{{td.time}}</td>
                        <td><span
                            :class="[td.status_info=='成功'?'curr2':td.status_info=='未处理'?'curr4':'curr']">{{td.status_info}}</span>
                        </td>
                        <td>
                            <router-link :to="{path:'/Carrieroperator/watchCash',query:{member_id:td.member_id,id:td.id}}"><span
                                class="curr5">查看</span></router-link>
                            <router-link :to="{path:'/Carrieroperator/cashCheck',query:{member_id:td.member_id,id:td.id}}"><span
                                class="curr">{{td.is_examine}}</span></router-link>
                        </td>
                    </tr>
                </table>
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="pageChange"
                    :total="parseInt(lastPage)">
                </el-pagination>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                startDate: '',
                endDate: '',
                memberName: '',
                tdes: [],
                lastPage: '',
                currentPage: 1,
            }
        },
        created() {
            this.$axios.post('Member/member_cash', {
                member_type: 5
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.tdes = res.data.data.list
                        this.lastPage = res.data.data.last_page * 10
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
        filters: {
            backCode(value) {
                return value.replace(/(\d{4})(?=\d)/g, "$1" + " ")
            }
        },
        methods: {
            // 日期查询
            startDateChange(val) {
                this.startDate = val
            },
            endDateChange(val) {
                this.endDate = val
            },
            // 搜索查询
            searchBtn() {
                this.$axios.post('Member/member_cash', {
                    member_name: this.memberName,
                    member_type: 5,
                    query_start_time: this.startDate,
                    query_end_time: this.endDate,
                    page: 1
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.tdes = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
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
            pageChange(val) {
                this.currentPage = val
                this.$axios.post('Member/member_cash', {
                    member_name: this.memberName,
                    member_type: 5,
                    query_start_time: this.startDate,
                    query_end_time: this.endDate,
                    page: this.currentPage
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.tdes = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
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
            // 导出excel
            outExcel() {

            },
        }
    }
</script>
<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .thead {
        background: url('../../assets/image/thead.png') no-repeat -10px -158px;
    }

    .el-row {
        padding-left: 6px;
    }

    .el-col {
        height: 40px;
        margin-right: 10px;
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

    @import "../../assets/css/base.css";
    @import "../../assets/css/seller_part.css";

</style>
