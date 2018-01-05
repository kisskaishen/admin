<template>
    <div>
        <div class="tip">短信列表</div>
        <div class="contentDiv">
            <div class="condition">
                <el-form label-width="100px">
                    <el-row>
                        <el-col style="width: 366px">
                            <el-form-item label="申请时间：">
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
                            <el-form-item label="状态：">
                                <el-select v-model="status" size="small" @change="statusChange">
                                    <el-option
                                        v-for="item in statuses"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col>
                            <el-form-item label="会员类型：">
                                <el-select v-model="type" size="small" @change="typeChange">
                                    <el-option
                                        v-for="item in types"
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
                            <el-button type="success" @click="newMessage">新建营销短信</el-button>
                        </el-col>


                    </el-row>
                    <el-row>
                        <el-col style="width: 200px;text-align: left;padding-left: 40px">共有<span
                            style="color: #e4393c;">{{total}}</span>条信息
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="list">
                <table>
                    <tr class="thead">
                        <th>类型</th>
                        <th>短信内容</th>
                        <th>申请时间</th>
                        <th>审核状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="item in list">
                        <td>{{item.type}}</td>
                        <td>{{item.sms_content}}</td>
                        <td>{{item.add_time}}</td>
                        <td>{{item.status}}</td>
                        <td>
                            <el-button type="success" size="small" @click="seeMessage(item)">{{item.is_see}}</el-button>
                            <em v-if="item.is_examine">|</em>
                            <span type="danger" size="small">{{item.is_examine}}</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="dialog">
                <!--新建营销短信-->
                <el-dialog
                    title="新建营销短信"
                    :visible.sync="messageDialog"
                    size="tiny"
                    style="text-align: left;">
                    <h5>第一步</h5>
                    <el-form label-width="100px">
                        <el-form-item label="会员类型：">
                            <el-select v-model="memberType" size="small" style="width: 120px"
                                       @change="memberTypeChange">
                                <el-option
                                    v-for="item in memberTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="会员数量：">
                            <span class="error">{{memberNum}}</span><span class="error" v-if="memberNum">名</span>
                        </el-form-item>
                        <el-form-item label="电话号码：" v-if="showTestTel">
                            <el-input v-model="testTel" size="small" style="width: 120px;"></el-input>
                        </el-form-item>
                    </el-form>
                    <h5>第二步</h5>
                    <el-row>
                        <el-col style="margin-left: 20px">编辑短信内容</el-col>
                        <el-col style="margin-left: 20px">
                            <el-input type="textarea" v-model="editTxt" style="width: 320px"></el-input>
                        </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="messageDialog = false">取 消</el-button>
                        <el-button type="danger" @click="sendNow">立即发送</el-button>
                    </div>
                </el-dialog>
                <!--查看营销短信-->
                <el-dialog
                    title="查看营销短信"
                    :visible.sync="seeMessageDialog"
                    size="tiny"
                    style="text-align: left;">
                    <el-form label-width="120px">
                        <el-form-item label="id：">
                            <span>{{seeInfo.id}}</span>
                        </el-form-item>
                        <el-form-item label="商家名称：">
                            <span>{{seeInfo.store_name}}</span>
                        </el-form-item>
                        <el-form-item label="类型：">
                            <span>{{seeInfo.type}}</span>
                        </el-form-item>
                        <el-form-item label="申请时间：">
                            <span>{{seeInfo.add_time}}</span>
                        </el-form-item>
                        <el-form-item label="审核状态：">
                            <span>{{seeInfo.status}}</span>
                        </el-form-item>
                        <el-form-item label="完成时间：">
                            <span>{{seeInfo.c_time}}</span>
                        </el-form-item>
                        <el-form-item label="内容：">
                            <span>{{seeInfo.sms_content}}</span>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="seeMessageDialog = false">取 消</el-button>
                    </div>
                </el-dialog>
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
                statuses: [
                    {
                        label: '审核中',
                        value: 0
                    },
                    {
                        label: '审核通过待处理',
                        value: 1
                    },
                    {
                        label: '未通过审核',
                        value: 2
                    },
                    {
                        label: '发送成功',
                        value: 3
                    },
                    {
                        label: '发送失败',
                        value: 4
                    },
                    {
                        label: '短信平台审核拒绝',
                        value: 5
                    },
                ],
                status: '',
                startDate: '',
                endDate: '',

                types: [
                    {
                        label: '所有会员',
                        value: 1
                    },
                    {
                        label: 'VIP会员',
                        value: 2
                    },
                    {
                        label: '普通会员',
                        value: 3
                    },
                    {
                        label: 'VIP已过期会员',
                        value: 4
                    },
                    {
                        label: '指定会员(待开发)',
                        value: 5
                    },
                ],
                type: '',
                list: [],                    // 短信列表
                total: '',
                lastPage: '',
                messageDialog: false,
                seeMessageDialog: false,


                editTxt: '',                 // 短信内容

                seeInfo: '',                   // 查看的内容
                memberNum: '',                   // 会员数量
                memberTypes: [
                    {
                        label: '所有会员',
                        value: 0
                    },
                    {
                        label: '仅VIP会员',
                        value: 1
                    },
                    {
                        label: '测试',
                        value: 2
                    },
                    {
                        label: '普通会员',
                        value: 3
                    },
                    {
                        label: 'VIP已过期会员',
                        value: 4
                    }
                ],
                memberType: '',
                testTel: '',         // 电话号码，type=2时输入
                showTestTel: false,
            }
        },
        created() {
            this.$axios.post('Activity/message_list')
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
            // 查看营销短信
            seeMessage(val) {
                this.$axios.post('Activity/message_info', {
                    id: val.id
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.seeInfo = res.data.data
                            this.seeMessageDialog = true

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
            // 新建营销短信
            newMessage() {
                this.messageDialog = true
            },
            // 立即发送
            sendNow() {
                this.$axios.post('Activity/add_message', {
                    type: this.memberType,
                    content: this.editTxt,
                    designated_phone: this.testTel
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message:res.data.message,
                                type:'success',
                                duration:1600
                            })
                            this.messageDialog = false
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
            typeChange(val) {
                this.type = val
            },
            // 新建营销短信选择会员类型
            memberTypeChange(val) {
                this.memberType = val
                this.$axios.post('Activity/count_member')
                    .then(res => {
                        if (res.data.code == 200) {
                            switch (val) {
                                case 1 :
                                    this.memberNum = res.data.data.all
                                    this.showTestTel = false
                                    this.testTel = ''
                                    break;
                                case 2 :
                                    this.memberNum = res.data.data.vip
                                    this.showTestTel = true
                                    break;
                                case 3 :
                                    this.memberNum = res.data.data.ordinary
                                    this.showTestTel = false
                                    this.testTel = ''
                                    break;
                                case 4 :
                                    this.memberNum = res.data.data.vip_over
                                    this.showTestTel = false
                                    this.testTel = ''
                                    break;
                            }
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

            // 点击查询
            btnSearch() {
                this.$axios.post('Activity/message_list', {
                    status: this.status,
                    type: this.type,
                    query_start_time: this.startDate,
                    query_end_time: this.endDate,
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
                this.$axios.post('Activity/message_list', {
                    status: this.status,
                    type: this.type,
                    query_start_time: this.startDate,
                    query_end_time: this.endDate,
                    page: val
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
