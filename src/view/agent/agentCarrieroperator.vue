<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/agent'}">代理商</el-breadcrumb-item>
            <el-breadcrumb-item>下级运营商</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <el-form ref="form" class="condition">
                <el-row>
                    <el-col>运营商：{{agentName}}</el-col>
                </el-row>
                <el-row>
                    <el-col  style="width:500px">运营商区域：{{agentArea}}</el-col>
                </el-row>
            </el-form>

            <form action="#">
                <table>
                    <tr class="thead">
                        <th>运营商名称</th>
                        <th>注册会员</th>
                        <th>VIP会员</th>
                        <th>推荐商家</th>
                        <th>VIP奖金</th>
                        <th>餐餐抢奖金</th>
                        <th>状态</th>
                    </tr>
                    <tr v-for="td in tdes">
                        <td>
                            <p>{{td.member_mobile}}</p>
                            <p>{{td.member_name}}</p>
                            <p class="regTime">加入时间：{{td.member_time}}</p>
                        </td>
                        <td>{{td.invite_member_count}}</td>
                        <td>{{td.invite_vip_count}}</td>
                        <td>{{td.invite_store_count}}</td>
                        <td><span class="curr2">{{td.current_vip}}元</span></td>
                        <td><span class="curr3">{{td.current_chan}}元</span></td>
                        <td><span
                            :class="[td.status_info == '关闭'?'curr':td.status_info == '冻结'?'curr3':td.status_info == '审核中'?'curr4':'']">{{td.status_info}}</span>
                        </td>
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
                leveles: [
                    {
                        value: '3',
                        label: '区'
                    }, {
                        value: '4',
                        label: '街道'
                    }
                ],
                level: '',

                tdes: [],
                currentPage: 1,
                lastPage: '',

            }
        },
        created() {
            this.agentName = this.$route.query.member_name
            this.agentArea = this.$route.query.area
            this.$axios({
                method: 'post',
                url: 'Agent/agency_list',
                data: {
                    member_id: this.$route.query.member_id,
                    member_type: 4,
                    type: 5
                }
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
        methods: {
            pageChange(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Agent/agency_list',
                    data: {
                        member_id: this.$route.query.member_id,
                        member_type: 4,
                        type: 5,
                        narea: this.level,
                        page: this.currentPage
                    }
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
            // 关闭/冻结
            clickClose(val) {
                if (val.is_close == '冻结') {
                    this.$axios.post('Agent/change_status', {
                        member_id: val.member_id,
                        member_name: this.agentName,
                        member_type: 5,
                        status: 2
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success',
                                    duration: 1600
                                })
                                setTimeout('location.reload()', 1600)
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
                } else {
                    this.$axios.post('Agent/change_status', {
                        member_id: val.member_id,
                        member_name: this.agentName,
                        member_type: 5,
                        status: 40
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success',
                                    duration: 1600
                                })
                                setTimeout('location.reload()', 1600)
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
    }
</script>

<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .el-row {
        text-align: left;
        padding-left: 10px;
        .el-col {
            line-height: 30px;
        }
    }

    .agent {
        .el-button {
            color: #bfc4fc;
            margin-right: 12px;
            background-color: transparent;
            border: none;
            font-size: 14px;
        }
        i {
            display: inline-block;
            width: 30px;
            height: 18px;
            vertical-align: middle;
            background: url('../../assets/image/image-count.png') -10px -14px;
        }
    }


</style>
