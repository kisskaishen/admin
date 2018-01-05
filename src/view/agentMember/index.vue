<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>代理商会员</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <el-form class="condition" label-width="100px">
                <el-row>
                    <el-col style="width:220px;">
                        <el-form-item label="会员账号：">
                            <el-input v-model="memberAccount" placeholder="" size="small"></el-input>
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

                </el-row>
                <el-row>
                    <el-col style="width: 400px;" class="tip">目前会员共计 <em style="color:#e4393c;">{{total}}</em>
                        位，可根据条件进行详细筛选
                    </el-col>
                    <el-col style="width: 120px;float: right;">
                        <el-button @click="outExcel">导出excel</el-button>
                    </el-col>
                </el-row>
            </el-form>

            <table>
                <tr class="thead">
                    <th>会员名称</th>
                    <th align="center">是否vip</th>
                    <th>电话</th>
                    <th align="center">推荐的会员</th>
                    <th align="center">活跃vip数</th>
                    <th>加盟时间</th>
                    <th>状态</th>
                </tr>
                <tr v-for="item in list">
                    <td>{{item.member_name}}</td>
                    <td align="center">{{item.is_vip}}</td>
                    <td>{{item.member_mobile}}</td>
                    <td align="center">{{item.invite_member_count}}</td>
                    <td align="center">{{item.invite_vip_count}}</td>
                    <td>{{item.member_time}}</td>
                    <td>{{item.status_info}}</td>
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
                url: 'Agentmember/agent_member_list',
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
        },
        methods: {
            // 导出excel
            outExcel() {
                location.href = ''+this.$baseUrl+'Agent/out_excel?member_id='+this.memberId+'&member_type='+this.memberType+'&type=0&status=1'
            },
            // 条件查询
            btnSearch() {
                this.$axios({
                    method: 'post',
                    url: 'Agentmember/agent_member_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        member_name: this.memberAccount,
                        member_time: this.addTime,
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
            },
            // 翻页
            currentChange(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Agentmember/agent_member_list',
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
            },
            // 添加时间
            addTimeChange(val) {
                this.addTime = val
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
                background: url('../../assets/image/thead.png') -10px -30px;
            }
        }
    }

</style>
