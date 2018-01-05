<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>下级运营商</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <div class="titleInfo">
                <p><label>代理：</label><span>{{carriorInfo.member_name}}</span></p>
                <div>
                    <label>代理区域：</label><span>{{carriorInfo.narea}}</span>
                    <!--<router-link to="/CarriorAgent/addCarriorAgent"><i></i>新增运营商</router-link>-->
                    <el-button @click="outExcel">导出Excel</el-button>
                </div>
            </div>
            <table>
                <tr class="thead">
                    <th>运营商名称</th>
                    <th align="center">注册会员</th>
                    <th align="center">VIP会员</th>
                    <th align="center">推荐商家</th>
                    <th align="center">VIP奖金</th>
                    <th align="center">餐餐抢奖金</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in list">
                    <td>
                        <p>{{item.member_name}}</p>
                        <p>{{item.member_mobile}}</p>
                        <p style="background-color: #dcdcdc">加入时间：{{item.member_time}}</p>
                    </td>
                    <td align="center">{{item.invite_member_count}}</td>
                    <td align="center">{{item.invite_vip_count}}</td>
                    <td align="center">10</td>
                    <td align="center">{{item.current_vip}}元</td>
                    <td align="center">{{item.current_chan}}元</td>
                    <td>{{item.status_info}}</td>
                    <td>
                        <router-link
                            :to="{path:'/carriorAgent/watchCarriorAgent',query:{memberId:item.member_id}}"><span
                            style="color:#3caaf7">{{item.is_see}}</span></router-link>
                        <em v-if="item.is_see&&item.is_modify">|</em>
                        <router-link :to="{path:'/carriorAgent/reviseCarriorAgent',query:{memberId:item.member_id}}">
                            <span>{{item.is_modify}}</span></router-link>
                        <em v-if="item.is_modify&&item.is_close">|</em>
                        <span @click="closeTd(item)">{{item.is_close}}</span>
                    </td>
                </tr>
            </table>
            <div class="fr">
                <el-pagination
                    layout="prev,pager,next"
                    @current-change="changePage"
                    :total="parseInt(carriorInfo.last_page)"></el-pagination>
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
                memberName: this.$memberName,
                carriorInfo: '',
                list: [],
                currentPage: 1,
            }
        },
        created() {
            this.$axios({
                method: 'post',
                url: 'Agent/agency_list',
                data: {
                    member_id: this.memberId,
                    member_type: this.memberType,
                    type: 5
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.carriorInfo = res.data.data
                        this.list = res.data.data.list
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
            // 分页
            changePage(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Agent/agency_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        type: 5,
                        page: this.currentPage
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.carriorInfo = res.data.data
                            this.list = res.data.data.list
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
            // 关闭(冻结)
            closeTd(val) {
                if (val.is_close == '冻结') {
                    this.$axios({
                        method: 'post',
                        url: 'Agent/change_status',
                        data: {
                            member_id: val.member_id,
                            member_type: 5,
                            member_name: this.memberName,
                            status: 3
                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success',
                                    duration: 1600
                                })
                                setTimeout("location.reload()", 1600)
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
                    this.$axios({
                        method: 'post',
                        url: 'Agent/change_status',
                        data: {
                            member_id: val.member_id,
                            member_type: 5,
                            member_name: this.memberName,
                            status: 2
                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success',
                                    duration: 1600
                                })
                                setTimeout("location.reload()", 1600)
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
            // 导出exce
            outExcel() {
                location.href = '' + this.$baseUrl + 'Agent/out_excel?member_id=' + this.memberId + '&member_type=' + this.memberType + '&type=5&status=1'
            },
        }
    }
</script>
<style lang="scss" scoped>
    .contentDiv {
        padding-bottom: 50px;
        .titleInfo {
            padding: 10px;
            text-align: left;
            line-height: 36px;
            a {
                color: #FF2B55;
                margin-left: 80px;
                i {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                    background: url("../../assets/image/image-count.png") no-repeat -16px -8px;
                }
            }
            .el-button {
                float: right;
            }
        }
        table {
            .thead {
                background: url("../../assets/image/thead.png") no-repeat -10px -223px;
            }
        }
        .fr {
            height: 30px;
        }
    }
</style>
