<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/member'}">会员管理</el-breadcrumb-item>
            <el-breadcrumb-item>提现记录</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <!-- 搜索栏 -->
            <el-form label-width="70px" class="condition">
                <el-row>
                    <el-col>
                        <el-form-item label="会员身份">
                            <el-select v-model="member" size="small" placeholder="选择身份" @change="memberChange">
                                <el-option
                                    v-for="item in memberes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="会员名称">
                            <el-input v-model="memberName" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col style="width:346px;">
                        <el-form-item label="查询时间">
                            <el-date-picker
                                v-model="startDate"
                                type="date"
                                @change="startDateChange"
                                placeholder="开始日期"
                                size="small"
                                style="width: 120px;">
                            </el-date-picker>
                            ~
                            <el-date-picker
                                v-model="endDate"
                                type="date"
                                @change="endDateChange"
                                placeholder="结束日期"
                                size="small"
                                style="width: 120px;">
                            </el-date-picker>
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
                        <th>会员身份</th>
                        <th>收款人姓名</th>
                        <th width="6%">类型</th>
                        <th width="6%">金额</th>
                        <th width="6%">手续费</th>
                        <th width="6%">实付金额</th>
                        <th width="8%">银行名称</th>
                        <th width="14%">银行卡号</th>
                        <th width="13%">身份证</th>
                        <th width="10%">申请时间</th>
                        <th width="6%">状态</th>
                        <th width="7%">操作</th>
                    </tr>
                    <tr class="tbody" v-for="td in tdes">
                        <td><router-link :to="{path:'/member/memberMoney',query:{member_id:td.member_id,member_type:td.m_type}}">{{td.member_name}}</router-link></td>
                        <td>{{td.member_type}}</td>
                        <td>{{td.name}}</td>
                        <td>{{td.type}}</td>
                        <td>{{td.amount}}元</td>
                        <td>{{td.poundage}}元</td>
                        <td>{{td.real_amount}}元</td>
                        <td>{{td.bank_name}}</td>
                        <td>{{td.card_account | backCode}}</td>
                        <td>{{td.farennum}}</td>
                        <td>{{td.time}}</td>
                        <td><span :class="[td.status_info == '未处理'?'curr3':td.status_info == '成功'?'curr2':'curr']">{{td.status_info}}</span></td>
                        <td>
                            <router-link :to="{path:'/member/watchCash',query:{id:td.id,member_type:td.member_type,member_id:td.member_id}}"><span style="color:#007aff;">查看</span></router-link>
                            <em v-if="td.is_examine">|</em>
                            <router-link :to="{path:'/member/cashCheck',query:{id:td.id,member_type:td.member_type,member_id:td.member_id}}"><span>{{td.is_examine}}</span></router-link>
                        </td>
                    </tr>
                </table>
            </el-form>
        </div>
        <el-pagination
            layout="prev, pager, next"
            @current-change="pageChange"
            :current-page.sync="currentPage"
            :total="parseInt(pageTotal)"
            style="margin-top:20px;">
        </el-pagination>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                startDate: '',
                endDate: '',

                memberes: [
                    {
                        value: '',
                        label: '不限'
                    },
                    {
                        value: '0',
                        label: '会员'
                    },
                    {
                        value: '1',
                        label: '商家'
                    },
                    {
                        value: '5',
                        label: '运营商'
                    },
                    {
                        value: '4',
                        label: '代理商'
                    }
                ],
                member: '',

                memberName: '',

                currentPage: 1,
            }
        },
        filters: {
            backCode(value) {
                return value.replace(/(\d{4})(?=\d)/g, "$1" + " ")
            }
        },

        created() {
            this.$store.dispatch('getMemberCashList')
        },
        computed: {
            tdes() {
                return this.$store.state.memberModule.memberCashList
            },
            pageTotal() {
                return this.$store.state.memberModule.last_page * 10
            }

        },
        methods: {
            // 导出excel
            outExcel() {
                location.href = '' + this.$baseUrl + 'Member/member_cash?member_name=' + this.memberName + '&member_type=' + this.member + '' +
                    '&query_start_time=' + this.startDate + '&query_end_time=' + this.endDate + '' +
                    '&is_outexcel=1 '
            },
            cashPass() {
                confirm('通过？');
            },
            // 身份选择
            memberChange(val) {
                this.member = val
            },
            // 日期选择
            startDateChange(val) {
                this.startDate = val
            },
            endDateChange(val) {
                this.endDate = val
            },

            // 搜索查询
            searchBtn() {
                let data = new FormData()
                data.append('member_name', this.memberName)
                data.append('member_type', this.member)
                data.append('query_start_time', this.startDate)
                data.append('query_end_time', this.endDate)
                data.append('page', 1)
                this.$store.dispatch('getMemberCashList', data)
            },
            // 翻页
            pageChange(val) {
                this.currentPage = val
                let data = new FormData()
                data.append('member_name', this.memberName)
                data.append('member_type', this.member)
                data.append('query_start_time', this.startDate)
                data.append('query_end_time', this.endDate)
                data.append('page', this.currentPage)
                this.$store.dispatch('getMemberCashList', data)
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .el-row {
        padding-left: 10px;
        .condition {
            .el-col {
                width: 180px;
                height: 40px;
                margin-right: 10px;

            }
        }
    }


    .tbody td:nth-child(8) {
        width: 8%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }


</style>
