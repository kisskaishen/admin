<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>待指定商家</h2>
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
                    <th>会员账号</th>
                    <th>电话</th>
                    <th width="8%" align="center">推荐的会员</th>
                    <th align="center">活跃vip数</th>
                    <th align="center">上架量</th>
                    <th align="center">总销售</th>
                    <th width="14%">商家归属区域</th>
                    <th>加盟时间</th>
                    <th>状态</th>
                    <th>操作</th>
                    <th>指定</th>
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
                    <td><span @click="isClose(item)">{{item.is_close}}</span></td>
                    <td><span @click="toDialog(item)">指定</span></td>
                </tr>
            </table>

            <el-dialog
                title="指定的商家列表"
                :visible.sync="dialogVisible"
                style="text-align: left">
                <p style="text-align: right;">已选择商家：<span style="color: #e4393c;">{{clickMemberName}}</span></p>
                <div class="dialogDiv">
                    <el-row>
                        <el-col :span="20">
                            <el-input v-model="yunyingTel" placeholder="请输入运营商手机号" size="small"></el-input>
                        </el-col>
                        <el-col :span="4" style="padding-left: 20px;"><el-button type="danger" size="small" @click="searchName">查询</el-button></el-col>
                    </el-row>
                    <ul>
                        <li v-for="item in directs" @click="directName(item)">{{item.member_name}}</li>
                    </ul>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="danger" @click="sureToDialog">确 定</el-button>
                </span>
            </el-dialog>

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
                currentPage: '',
                dialogVisible: false,
                yunyingTel: '',
                active: true,
                total: '',
                directs: [],

                storeId:'',
                clickMemberId:'',
                clickMemberName:'',

            }
        },

        created() {
            this.$axios({
                method: 'post',
                url: 'Agentmember/agent_store_list',
                data: {
                    member_id: this.memberId,
                    member_type: this.memberType,
                    is_appoint: 1,
                    page: 1
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
            // 关闭
            isClose(val) {
                if (val.is_close == '冻结') {
                    this.$axios({
                        method: 'post',
                        url: 'Agent/change_status',
                        data: {
                            member_id: val.member_id,
                            member_type: 4,
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
                            member_type: 4,
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
            // 指定商家
            toDialog(val) {
                this.storeId = val.store_id
                this.yunyingTel = ''
                this.$axios({
                    method: 'post',
                    url: 'Agent/direct_operators_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.dialogVisible = true
                            this.directs = res.data.data
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
            // 搜索指定商家
            searchName() {
                this.$axios({
                    method: 'post',
                    url: 'Agent/direct_operators_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        member_name: this.yunyingTel
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.directs = res.data.data
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
            // 选择的memberName
            directName(val) {
                this.clickMemberName = val.member_name
                this.clickMemberId = val.member_id
            },
            // 确定指定商家
            sureToDialog() {
                this.$axios({
                    method:'post',
                    url:'Agentmember/appoint_store',
                    data:{
                        member_id:this.clickMemberId,
                        member_type:5,
                        store_id:this.storeId
                    }
                })
                    .then(res=>{

                        if (res.data.code == 200) {
                            this.$message({
                                message:res.data.message,
                                type:'success',
                                duration:1600
                            })
                            setTimeout("location.reload()",1600)
                            this.dialogVisible = false
                        } else {
                            this.$message({
                                message:res.data.message,
                                type:'warning',
                                duration:1600
                            })
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            // 导出excel
            outExcel() {
                alert(2)
            },
            // 条件查询
            btnSearch() {
                this.$axios({
                    method: 'post',
                    url: 'Agentmember/agent_store_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        member_name:this.memberAccount,
                        member_time:this.addTime,
                        is_appoint: 1,
                        page: 1
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
            // 翻页
            currentChange(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Agentmember/agent_store_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        member_name:this.memberAccount,
                        member_time:this.addTime,
                        is_appoint: 1,
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
        .el-dialog {
            .dialogDiv {

                ul {
                    width: 100%;
                    li {
                        float: left;
                        width: 120px;
                        line-height: 30px;
                        text-align: center;
                        margin-top: 10px;
                        cursor: pointer;
                    }
                    .curr {
                        color: #fff;
                        background-color: #e4393c;
                        -webkit-border-radius: 10px;
                        -moz-border-radius: 10px;
                        border-radius: 10px;
                    }
                }
            }

        }
        .dialog-footer {
            display: block;
        }

    }

</style>
