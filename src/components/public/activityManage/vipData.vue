<template>
    <div>
        <div class="tip">短信列表</div>
        <div class="contentDiv">
            <div class="condition">
                <el-form label-width="100px">
                    <el-row>

                        <el-col style="width: 300px;">
                            <el-form-item label-width="0">
                                <el-select v-model="type" size="small" @change="typeChange">
                                    <el-option
                                        v-for="item in types"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                                <el-input v-model="searchTxt" size="small"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col style="width: 366px">
                            <el-form-item label="领取时间：">
                                <el-date-picker
                                    v-model="startDate"
                                    type="date"
                                    placeholder="开始时间"
                                    @change="startChange"
                                    size="small">
                                </el-date-picker>
                                ~~
                                <el-date-picker
                                    v-model="endDate"
                                    type="date"
                                    placeholder="结束时间"
                                    @change="endChange"
                                    size="small"></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col>
                            <el-form-item label="领取来源：">
                                <el-select v-model="status" size="small" @change="statusChange">
                                    <el-option
                                        v-for="item in statuses"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>


                        <el-col style="width:32px;margin-left:16px;">
                            <i class="btn-search" @click="btnSearch"></i>
                        </el-col>


                        <el-col style="float: right;">
                            <el-button type="primary" @Click="outExcel">导出Excel</el-button>
                        </el-col>


                    </el-row>

                </el-form>
            </div>
            <div class="list">
                <table>
                    <tr class="thead">
                        <th>会员</th>
                        <th>手机号码</th>
                        <th>领取来源</th>
                        <th>领取时间</th>
                        <th>VIP赠送时长</th>
                        <th>VIP到期时间</th>
                    </tr>
                    <tr v-for="item in list">
                        <td>{{item.member_name}}</td>
                        <td>{{item.member_mobile}}</td>
                        <td>{{item.platform}}</td>
                        <td>{{item.addtime}}</td>
                        <td>{{item.time_long}}</td>
                        <td>{{item.endtime}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="footer">
            <el-pagination
                layout="prev, pager, next"
                @current-change="changePage"
                :total="parseInt(lastPage)">
            </el-pagination>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                types: [
                    {
                        label: '手机号码',
                        value: 'member_mobile'
                    },
                    {
                        label: '会员账号',
                        value: 'member_name'
                    }
                ],
                type: 'member_mobile',

                statuses: [
                    {
                        label: '全部',
                        value: ''
                    },
                    {
                        label: '微信注册',
                        value: 1
                    },
                    {
                        label: 'APP注册',
                        value: 2
                    },
                    {
                        label: '自定义注册',
                        value: 3
                    },
                    {
                        label: '老会员领取',
                        value: 4
                    }
                ],
                status: '',
                searchTxt: '',
                startDate: '',
                endDate: '',


                list: [],                    // 短信列表
                total: '',
                lastPage: '',
                currentPage: 1,


            }
        },
        created() {
            this.$axios.post('Activity/give_three_month')
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
        methods: {
            // 导出excel
            outExcel() {
                location.href = this.$baseUrl + 'Activity/give_three_month?search_field_name=' + this.type +
                    '&search_field_value=' + this.searchTxt + '&query_start_time=' + this.startDate + '&query_end_time=' + this.endDate +
                    '&platform=' + this.status + '&page=' + this.currentPage + '&is_outexcel=1 '
            },
            // 类型选择
            typeChange(val) {
                this.type = val
            },

            // 开始时间
            startChange(val) {
                this.startDate = val
            },
            endChange(val) {
                this.endDate = val
            },
            // 状态选择
            statusChange(val) {
                this.status = val
            },

            // 点击查询
            btnSearch() {
                this.$axios.post('Activity/give_three_month', {
                    search_field_name: this.type,
                    search_field_value: this.searchTxt,
                    query_start_time: this.startDate,
                    query_end_time: this.endDate,
                    platform: this.status,
                    page: 1
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

            // 翻页
            changePage(val) {
                this.currentPage = val
                this.$axios.post('Activity/give_three_month', {
                    search_field_name: this.type,
                    search_field_value: this.searchTxt,
                    query_start_time: this.startDate,
                    query_end_time: this.endDate,
                    platform: this.status,
                    page: this.currentPage
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = res.data.data.list
                            // this.lastPage = res.data.data.last_page * 10
                            // this.total = res.data.data.total
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
<style lang="scss" scoped>
    .tip {
        text-align: left;
        color: #333;
        padding-left: 30px;
    }

    .condition {
        .el-col {
            margin-bottom: 10px;
        }
    }

    .footer {
        text-align: right;
    }

    .dialog {
        h5 {
            line-height: 30px;
        }
    }
</style>
