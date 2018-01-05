<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/member'}">会员管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/member/memberCash'}">会员提现</el-breadcrumb-item>
            <el-breadcrumb-item>提现审核</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <div class="tip">
                <h4>会员提现审核</h4>
                <p>*除用户余额不收取手续费,其他提现都需要扣除20%的手续费</p>
            </div>
            <el-form class="listDiv" label-width="140px">
                <el-form-item label="会员名称：">
                    <span>{{cashInfo.member_name}}</span>
                </el-form-item>
                <el-form-item label="会员类型：">
                    <span>{{cashInfo.member_type}}</span>
                </el-form-item>
                <el-form-item label="提现金额：">
                    <span class="curr">{{cashInfo.amount}}元</span>
                </el-form-item>
                <el-form-item label="提现类型：">
                    <span>{{cashInfo.type}}</span>
                </el-form-item>
                <el-form-item label="手续费：">
                    <span>{{cashInfo.poundage}}元</span>
                </el-form-item>
                <el-form-item label="实打金额：">
                    <span class="curr2">{{cashInfo.real_amount}}元</span>
                </el-form-item>
                <el-form-item label="申请时间：">
                    <span>{{cashInfo.time}}</span>
                </el-form-item>
                <el-form-item label="审核时间：">
                    <span :class="[cashInfo.status == '未处理'?'curr3':'']">{{cashInfo.status}}</span>
                </el-form-item>
                <el-form-item label="银行开户名：">
                    <span>{{cashInfo.name}}</span>
                </el-form-item>
                <el-form-item label="银行名称：">
                    <span>{{cashInfo.bank_name}}</span>
                </el-form-item>
                <el-form-item label="银行卡号：">
                    <span>{{cashInfo.card_account}}</span>
                </el-form-item>
                <el-form-item label="营业执照扫描件：">
                    <img :src="cashInfo.yinyeurl" class="avatar" alt="营业执照扫描件">
                </el-form-item>
                <el-form-item label="审核：">
                    <el-radio-group v-model="reason" @change="checkChange">
                        <el-radio label="2">审核通过</el-radio>
                        <el-radio label="-1">审核失败</el-radio>
                    </el-radio-group>
                    <el-input v-if="isRefuse" v-model="refuseReason" size="small" placeholder="失败原因"
                              style="margin:0 0 0 40px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入手机号"></el-input>
                    <el-button>短信通知用户</el-button>
                </el-form-item>
                <el-form-item class="btnDiv">
                    <el-button>返回</el-button>
                    <el-button type="danger" @click="onSubmit">提交审核</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                cashInfo: '',
                refuseReason: '',
                isRefuse: false,
                reason: '2'
            }
        },
        created() {
            this.$axios.post('Member/member_cash_info', {
                id: this.$route.query.id,
                type: this.$route.query.member_type == '商家' ? '2' : '1',
                member_id: this.$route.query.member_id
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.cashInfo = res.data.data
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
            // 审核
            checkChange(val) {
                this.reason = val
                if (val == 2) {
                    this.isRefuse = false
                } else {
                    this.isRefuse = true
                }
            },

            // 提交
            onSubmit() {
                if (this.isRefuse) {
                    if (this.refuseReason == '') {
                        this.$message({
                            message: '请填写失败原因',
                            type: 'error',
                            duration: 1600
                        })
                    } else {
                        this.$axios.post('Member/member_cash_pass_cancel', {
                            id: this.$route.query.id,
                            status: this.reason,
                            re_note: this.refuseReason
                        })
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message({
                                        message: res.data.message,
                                        type: 'success',
                                        duration: 1600
                                    })
                                    this.$router.push('/agent/agentCash')
                                } else {
                                    this.$message({
                                        message: res.data.message,
                                        type: 'waring',
                                        duration: 1600
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                } else {
                    this.$axios.post('Member/member_cash_pass_cancel', {
                        id: this.$route.query.id,
                        status: this.reason,
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success',
                                    duration: 1600
                                })
                                this.$router.push('/agent/agentCash')
                            } else {
                                this.$message({
                                    message: res.data.message,
                                    type: 'waring',
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

    .tip {
        margin-top: 10px;
        padding-left: 10px;
        text-align: left;
        line-height: 24px;
        h4 {
            font-weight: normal;
        }
        p {
            color: #e4393c;
        }
    }

    .listDiv {
        padding-left: 20px;
        .el-form-item {
            margin-bottom: 0;
            img {
                width: 246px;
                height: 156px;
                border: 1px solid #dcdcdc;
            }
            .el-input {
                float: left;
                width: 200px;
                margin-top: 10px;
            }
            .el-button {
                float: left;
                margin: 10px 30px;
            }
            span {
                float: left;
                text-align: left;
            }
            .el-radio-group {
                float: left;
                padding-top: 10px;
            }
            label {
                text-align: right;
            }
        }
    }


</style>
