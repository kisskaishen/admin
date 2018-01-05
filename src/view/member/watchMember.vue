<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/member'}">会员管理</el-breadcrumb-item>
            <el-breadcrumb-item>会员实名--查看</el-breadcrumb-item>
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
                    <span
                        :class="[userInfo.status == '认证失败'?'curr':[userInfo.status == '认证成功'?'curr2':'']]">{{userInfo.status}}</span>
                </el-form-item>
                <el-form-item label="审核反馈：">
                    <span>{{userInfo.remark}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button @click="goBack">返回</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
            // 返回上一页
            goBack() {
                history.go(-1)
            }
        },




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

</style>
