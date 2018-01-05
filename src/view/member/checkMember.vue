<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/member'}">会员管理</el-breadcrumb-item>
            <el-breadcrumb-item>会员实名--审核</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="contentDiv">
            <div class="tip">会员实名认证
                <span
                    :class="[userInfo.button == '认证失败'?'curr':[userInfo.button == '认证成功'?'curr2':'']]">({{userInfo.button}})</span>
            </div>
            <el-form label-width="180px">
                <el-form-item label="会员名称：">
                    <span>{{userInfo.member_name}}</span>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <span>{{userInfo.member_mobile}}</span>
                </el-form-item>
                <el-form-item label="证件类型：">
                    <span>{{userInfo.type}}</span>
                </el-form-item>
                <el-form-item label="证件号码：">
                    <span>{{userInfo.number}}</span>
                </el-form-item>
                <el-form-item label="证件扫描件：">
                    <img :src="userInfo.thumb" :alt="userInfo.member_name">
                </el-form-item>
                <el-form-item label="审核：">
                    <el-radio-group v-model="status" @change="statusChange">
                        <el-radio label="1">认证通过</el-radio>
                        <el-radio label="2">认证失败</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="审核反馈：">
                    <el-input type="textarea" v-model="remark"></el-input>
                </el-form-item>


                <el-form-item class="btnDiv">
                    <el-button @click="goBack">取消</el-button>
                    <el-button type="danger" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                status: '1',
                remark: '',
                userInfo: '',
            }
        },
        created() {
            this.$axios.post('Member/member_auth_info', {
                id: this.$route.query.id
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.userInfo = res.data.data
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
            statusChange(val) {
                this.status = val
            },
            // 返回上一页
            goBack() {
                history.go(-1)
            },
            // 提交审核
            onSubmit() {
                this.$axios.post('Member/member_auth_pass_cancel', {
                    id: this.$route.query.id,
                    member_id: this.userInfo.member_id,
                    status: this.status,
                    remark: this.remark
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                            })
                            this.$session.save('memberRealName',null)
                            this.$router.push('/member/memberRealName')
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'error',
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

<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .tip {
        font-size: 14px;
        color: #444;
        border-bottom: 1px solid #dcdcdc;
        span {
            margin-left: 10px;
            font-size: 12px;
        }

    }


    .el-form-item {
        span {
            float: left;
        }
        img {
            float: left;
            width: 246px;
            height: 156px;
            border: 1px solid #dcdcdc;
        }
        .el-button {
            margin-top: 20px;
            float: left;
        }
    }

    .el-textarea {
        float: left;
        width: 300px;
    }

</style>
