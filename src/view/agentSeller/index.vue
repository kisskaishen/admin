<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>代理商商家</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <el-form class="condition" label-width="100px">
                <el-row>
                    <el-col style="width:220px;">
                        <el-form-item label="会员账号：">
                            <el-input v-model="memberAccount" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:260px;">
                        <el-form-item label="添加日期：">
                            <el-date-picker
                                v-model="addTime"
                                type="date"
                                placeholder="添加时间"
                                size="small"
                                style="width: 160px"
                                @change="addTimeChange"></el-date-picker>
                        </el-form-item>
                    </el-col>

                    <!-- button按钮 -->
                    <el-col style="width:32px;margin-left:16px;margin-top: 2px">
                        <i class="btn-search" @click="btnSearch"></i>
                    </el-col>

                    <el-col style="width: 120px;float: right;padding-top: 10px">
                        <router-link to="/agentSeller/addAgentSeller"><i class="addSeller"></i>添加商家</router-link>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col style="width: 400px;" class="tip">目前商家共计 <em style="color:#e4393c;">{{total}}</em>
                        家，可根据条件进行详细筛选
                    </el-col>
                    <el-col style="width: 120px;float: right;">
                        <el-button @click="outExcel">导出excel</el-button>
                    </el-col>
                </el-row>
            </el-form>

            <table>
                <tr class="thead">
                    <th width="12%">商家名称</th>
                    <th width="10%">会员账号</th>
                    <th width="9%">电话</th>
                    <th align="center">推荐的会员</th>
                    <th align="center">活跃vip数</th>
                    <th align="center">上架量</th>
                    <th align="center">总销售</th>
                    <th width="14%">商家归属区域</th>
                    <th>加盟时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in list">
                    <td>{{item.store_name}}</td>
                    <td>{{item.member_name}}</td>
                    <td>{{item.member_mobile}}</td>
                    <td align="center">{{item.invite_member_count}}</td>
                    <td align="center">{{item.invite_vip_count}}</td>
                    <td align="center">{{item.sale_goods_num}}</td>
                    <td align="center">{{item.sale_check_goods_num}}</td>
                    <td>{{item.store_narea}}</td>
                    <td>{{item.store_time}}</td>
                    <td>{{item.status_info}}</td>
                    <td><span style="cursor: pointer;color: #e4393c;" @click="isClose(item)">{{item.is_close}}</span>
                    </td>
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
                memberName:this.$memberName,
                list: [],
                memberAccount: '',
                addTime: '',
                lastPage: '',
                currentPage: 1,
                total: '',


            }
        },

        created() {
            this.$axios({
                method: 'post',
                url: 'Agentmember/agent_store_list',
                data: {
                    member_id: this.memberId,
                    member_type: this.memberType
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data.list
                        this.lastPage = res.data.data.last_page * 10
                        this.total = res.data.data.total
                    } else {
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
            // 导出excel
            outExcel() {
                location.href = ''+this.$baseUrl+'Agent/out_excel?member_id='+this.memberId+'&member_type='+this.memberType+'&type=1&status=1'
            },
            // 条件查询
            btnSearch() {
                this.$axios({
                    method: 'post',
                    url: 'Agentmember/agent_store_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        member_time: this.addTime,
                        member_name: this.memberAccount,
                        page: this.currentPage,
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                            this.total = res.data.data.total
                            this.memberAccount = ''
                            this.addTime = ''
                        } else {
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
            // 翻页
            currentChange(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Agentmember/agent_store_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
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
            // 添加时间
            addTimeChange(val) {
                this.addTime = val
            },
            // 操作
            isClose(val) {
                console.log(val)
                if (val.is_close == '冻结') {
                    // 冻结接口
                    this.$axios({
                        method: 'post',
                        url: 'Agent/change_status',
                        data: {
                            member_id: val.member_id,
                            member_name:this.memberName,
                            member_type: 1,
                            status: 3
                        }
                    })
                        .then(res => {
                            console.log(res)
                            if (res.data.code == 200) {
                                this.$message({
                                    message:res.data.message,
                                    type:'success',
                                    duration:1600
                                })
                                setTimeout("location.reload()",1600)
                            } else {
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
                } else {
                    // 删除接口
                    this.$axios({
                        method: 'post',
                        url: 'Agent/change_status',
                        data: {
                            member_id: val.member_id,
                            member_name:this.memberName,
                            member_type: 1,
                            status: 2
                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message:res.data.message,
                                    type:'success',
                                    duration:1600
                                })
                                setTimeout("location.reload()",1600)
                            } else {
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
                background: url('../../assets/image/thead.png') -10px -93px;
            }
        }
    }

</style>
