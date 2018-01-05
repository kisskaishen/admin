<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item><span @click="goBack">返回上一级</span></el-breadcrumb-item>
            <el-breadcrumb-item :to="this.$route.query.member_type==5?'/carrierOperator':'/agent'">{{this.$route.query.member_type==5?'运营商':'代理商'}}</el-breadcrumb-item>
            <el-breadcrumb-item>下级运营商</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <el-form ref="form" class="condition">
                <el-row>
                    <el-col>{{this.$route.query.member_type==4?'代理':'运营商'}}：{{carriorInfo.member_name}}</el-col>
                </el-row>
                <el-row>
                    <el-col  style="width:500px">区域：{{carriorInfo.narea}}</el-col>
                </el-row>
            </el-form>

            <form action="#">
                <table>
                    <tr class="thead">
                        <th>运营商名称</th>
                        <th>下级运营商</th>
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
                        <td>
                            <span @click="carriorClick(td)">{{td.invite_yunying_count}}</span>
                        </td>
                        <td>
                            <span  @click="memberClick(td)">{{td.invite_member_count}}</span>
                        </td>
                        <td>
                            <span  @click="vipMemberClick(td)">{{td.invite_vip_count}}</span>
                        </td>
                        <td>
                            <span @click="sellerClick(td)">{{td.invite_store_count}}</span>
                        </td>
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
                carriorInfo:'',
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
            this.getList(1)
        },
        methods: {
            // 下级运营商
            carriorClick(val) {
                if (val.invite_yunying_count == 0) {
                    this.$message.warning('无下级运营商！')
                } else {
                    this.$router.push({
                        path:'/showList/carrior',
                        query:{member_id:val.member_id,member_type:5}
                    })
                }
            },
            // 商家
            sellerClick(val) {
                if (val.invite_store_count == 0) {
                    this.$message.warning('无商家！')
                } else {
                    this.$router.push({path:'/showList/seller',query:{member_id:val.member_id,member_type:5}})
                }
            },
            // 会员
            memberClick(val) {
                if (val.invite_member_count == 0) {
                    this.$message.warning('无会员！')
                } else {
                    this.$router.push({path:'/showList/member',query:{member_id:val.member_id,member_type:5}})
                }
            },
            // VIP会员
            vipMemberClick(val) {
                if (val.invite_vip_count == 0) {
                    this.$message.warning('无VIP会员！')
                } else {
                    this.$router.push({path:'/showList/member',query:{member_id:val.member_id,member_type:5,is_vip:1}})
                }
            },
            // 返回上一级
            goBack(){
                history.go(-1)
            },
            pageChange(val) {
                this.getList(val)

            },
            // 关闭/冻结
            clickClose(val) {
                if (val.is_close == '冻结') {
                    this.doBtn(2)
                } else {
                    this.doBtn(40)
                }
            },
            // 按钮处理
            doBtn(val) {
                this.$axios.post('Agent/change_status', {
                        member_id: val.member_id,
                        member_name: this.agentName,
                        member_type: 5,
                        status: val
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
            },
            // 列表
            getList(val) {
                this.$axios({
                    method: 'post',
                    url: 'Agent/agency_list',
                    data: {
                        member_id: this.$route.query.member_id,
                        member_type: this.$route.query.member_type,
                        type: 5,
                        narea: this.level,
                        page: val
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.carriorInfo = res.data.data
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
            }
        },
        beforeRouteUpdate(to,from,next) {
            console.log(to)
            console.log(from)
            location.reload()
            next()
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
