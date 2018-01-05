<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>下级代理商</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <div class="titleInfo">
                <p><label>代理：</label><span>{{agentInfo.member_name}}</span></p>
                <div>
                    <label>代理区域：</label><span>{{agentInfo.narea}}</span>
                    <el-select v-model="level" placeholder="选择代理级别" size="small" @change="levelChange">
                        <el-option
                            v-for="item in leveles"
                            :key="item.level"
                            :label="item.label"
                            :value="item.level"></el-option>
                    </el-select>
                    <router-link to="/subordinateAgent/addSubordinateAgent"><i></i>新增代理</router-link>
                    <el-button @click="outExcel">导出Excel</el-button>
                </div>

            </div>
            <table>
                <tr class="thead">
                    <th width="12%">代理名称</th>
                    <th>级别</th>
                    <th width="16%">代理地区</th>
                    <th>下级代理</th>
                    <th>运营商</th>
                    <th>商家</th>
                    <th>会员</th>
                    <th>VIP会员</th>
                    <th>VIP奖金</th>
                    <th width="8%">餐餐抢奖金</th>
                    <th width="9%">状态</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in list">
                    <td>
                        <p>{{item.member_mobile}}</p>
                        <p>{{item.member_name}}</p>
                        <p>加入时间:{{item.member_time}}</p>
                    </td>
                    <td>{{item.level}}</td>
                    <td>{{item.narea}}</td>
                    <td>{{item.invite_daili_count}}</td>
                    <td>{{item.invite_yunying_count}}</td>
                    <td>{{item.invite_store_count}}</td>
                    <td>{{item.invite_member_count}}</td>
                    <td>{{item.invite_vip_count}}</td>
                    <td>{{item.current_vip}}</td>
                    <td>{{item.current_chan}}</td>
                    <td><span style="color: #e4393c">{{item.status_info}}</span></td>
                    <td>
                        <router-link
                            :to="{path:'/subordinateAgent/watchSubordinateAgent',query:{memberId:item.member_id}}"><span
                            style="color:#007aff">查看</span></router-link>
                        <em v-if="item.is_close">|</em>
                        <span style="color: #03d8dd" @click="freezeClick(item)">{{item.is_close}}</span>

                    </td>
                </tr>
            </table>
            <div class="fr">
                <el-pagination
                    layout="prev,pager,next"
                    @current-change="pageChange"
                    :total="parseInt(agentInfo.last_page)"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                leveles: [
                    {
                        level: '2',
                        label: '市'
                    },
                    {
                        level: '3',
                        label: '区'
                    },
                    {
                        level: '4',
                        label: '镇'
                    }
                ],             // 代理级别数组
                level: '',               // 当前代理级别
                list: [],
                agentInfo:'',

                memberName: this.$memberName,       // 当前操作者账号
                memberId: this.$memberId,
                memberType: this.$memberType,
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
                    type: 4,
                    page: this.currentPage
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data.list
                        this.agentInfo = res.data.data
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
            // 冻结功能
            freezeClick(val) {
                if (val.is_close == '冻结') {
                    this.$axios({
                        method: 'post',
                        url: 'Agent/change_status',
                        data: {
                            member_id: val.member_id,
                            member_type: this.memberType,
                            member_name:this.memberName,
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
                            member_type: this.memberType,
                            member_name:this.memberName,
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
            // 代理级别选择
            levelChange(val) {
                this.$axios({
                    method: 'post',
                    url: 'Agent/agency_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        type: 4,
                        narea: val,
                        page: 1
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = res.data.data.list
                            this.agentInfo = res.data.data
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                            setTimeout("location.reload()", 1600)
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 翻页
            pageChange() {
                this.$axios({
                    method: 'post',
                    url: 'Agent/agency_list',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType,
                        type: 4,
                        page: this.currentPage
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.list = res.data.data.list
                            this.agentInfo = res.data.data
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                            setTimeout("location.reload()", 1600)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            //  导出excel
            outExcel() {
                location.href = '' + this.$baseUrl + 'Agent/out_excel?member_id=' + this.memberId + '&member_type=' + this.memberType + '&type=4&status=1 '
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
            .el-select {
                width: 140px;
                margin: 0 80px 0 160px;
            }
            a {
                color: #4DE7EB;
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
