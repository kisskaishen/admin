<template>
    <div>
        <div class="moneyType">
            <el-row>
                <el-col v-for="item in groups" :key="item.id">
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
                <th width="160px">购买者</th>
                <th width="200px">产生时间</th>
                <th width="240px">订单号</th>
                <th width="100px">获得奖金</th>
                <th>备注</th>
            </tr>
            <tr v-for="item in list">
                <td>{{item.user_name}}</td>
                <td>{{item.datetime}}</td>
                <td>{{item.order_sn}}</td>
                <td>{{item.value}} <b v-if="item.value">元</b></td>
                <td>{{item.intro}}</td>
            </tr>
        </table>
        <div class="fr" style="height:30px;">
            <el-pagination
                layout="prev, pager, next"
                @current-change="changePage"
                :total="parseInt(lastPage)"></el-pagination>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                memberId:this.$memberId,
                memberType:this.$memberType,
                groups: [],                          // 组别
                startDate: '',
                endDate: '',
                list: [],
                lastPage: '',
                currentPage: 1,
            }
        },
        created() {
            // 组别
            this.$axios({
                method: 'post',
                url: 'Agent/capital_info',
                data: {
                    member_id: this.memberId,
                    member_type:this.memberType
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.groups = res.data.data
                    }else {
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
            // 资金列表
            this.$axios({
                method: 'post',
                url: 'Agent/capital_list',
                data: {
                    member_id: this.memberId,
                    member_type:this.memberType,
                    type:1
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data.list
                        this.lastPage = res.data.data.last_page * 10
                    }else {
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
        },
        methods: {
            // 时间区间
            startChange(val) {
                this.startDate = val
            },
            endChange(val) {
                this.endDate = val
            },
            // 时间段查询
            SearchBtn() {
                this.$axios({
                    method: 'post',
                    url: 'Agent/capital_list',
                    data: {
                        member_id: this.memberId,
                        member_type:this.memberType,
                        type: 1,
                        query_start_time: this.startDate,
                        query_end_time: this.endDate,
                        page: this.currentPage
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                        }else {
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
            },
            // 翻页操作
            changePage(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Agent/capital_list',
                    data: {
                        member_id: this.memberId,
                        member_type:this.memberType,
                        type: 1,
                        query_start_time: this.startDate,
                        query_end_time: this.endDate,
                        page: this.currentPage
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                        }else {
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
        }
    }
</script>
<style lang="scss" scoped>
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
                background: url('../../../assets/image/moneyIcon.png') no-repeat 20px -66px;
            }
            &:nth-child(2) i {
                background: url('../../../assets/image/moneyIcon.png') no-repeat -44px -66px;
            }
            &:nth-child(3) i {
                background: url('../../../assets/image/moneyIcon.png') no-repeat -112px -66px;
            }
            &:nth-child(4) i {
                background: url('../../../assets/image/moneyIcon.png') no-repeat -180px -66px;
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
            background: url('../../../assets/image/thead.png') no-repeat -10px -158px;
        }
    }


</style>
