<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/subordinateAgent/index">下级代理商</el-breadcrumb-item>
            <el-breadcrumb-item>查看代理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">查看代理</p>
            <el-form label-width="180px">
                <el-form-item label="代理名称：" required>
                    <span>{{agentInfo.member_name}}</span>
                </el-form-item>
                <el-form-item label="代理地区：" required>
                    <span>{{agentInfo.narea}}</span>
                </el-form-item>
                <el-form-item label="密码：" required>
                    <span>{{agentInfo.password}}</span>
                </el-form-item>
                <el-form-item label="法人名称：" required>
                    <span>{{agentInfo.member_truename}}</span>
                </el-form-item>
                <el-form-item label="法人身份证号码：" required>
                    <span>{{agentInfo.farennum}}</span>
                </el-form-item>
                <el-form-item label="法人身份证扫描件：" required>
                    <div class="file">
                        <img :src="agentInfo.farenurl" alt="身份证正面">
                    </div>
                    <div class="file">
                        <img :src="agentInfo.faren_f_url" alt="身份证反面">
                    </div>
                </el-form-item>
                <el-form-item label="法人电话：" required>
                    <span>{{agentInfo.member_mobile}}</span>
                </el-form-item>
                <el-form-item label="公司联系电话：" required>
                    <span>{{agentInfo.company_phone}}</span>
                </el-form-item>
                <el-form-item label="代理公司名称：" required>
                    <span>{{agentInfo.company_name}}</span>
                </el-form-item>
                <el-form-item label="开户银行：" required>
                    <span>{{agentInfo.bank_name}}</span>
                </el-form-item>
                <el-form-item label="开户名称：" required>
                    <span>{{agentInfo.true_name}}</span>
                </el-form-item>
                <el-form-item label="开户银行账号：" required>
                    <span>{{agentInfo.card_account}}</span>
                </el-form-item>
                <el-form-item label="营业执照编号：" required>
                    <span>{{agentInfo.yinyenum}}</span>
                </el-form-item>
                <el-form-item label="营业执照扫描件：" required>
                    <div class="file">
                        <img :src="agentInfo.yinyeurl" alt="营业执照">
                    </div>
                </el-form-item>

                <el-form-item>
                    <div class="btnDiv">
                        <el-button @click="returnBack">返回</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                memberId:'',
                memberType:this.$memberType,

                agentInfo:'',           // 所有信息

            }
        },

        created() {
            // 获取memberId
            this.member_id = this.$route.query.memberId
            // 遍历数据
            this.$axios({
                method:'post',
                url:'Agent/agent_detail',
                data:{
                    member_id:this.member_id,
                    member_type:this.memberType
                }
            })
                .then(res=>{
                    if(res.data.code == 200){
                        this.agentInfo = res.data.data
                    } else{
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
        methods: {
            // 返回
                returnBack(){
                    history.go(-1)
                },
        }
    }
</script>
<style lang="scss" scoped>
    .el-breadcrumb {
        line-height: 30px;
    }
    .el-form-item {
        margin-bottom: 22px !important;
        span {
            display: inline-block;
            width: 200px;
            text-align: left;
        }
    }

</style>
