<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/carriorAgent/index">运营商</el-breadcrumb-item>
            <el-breadcrumb-item>查看运营商</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">查看运营商</p>
            <el-form label-width="180px">
                <el-form-item label="运营商账号：" required>
                    <span>{{carriorName}}</span>
                </el-form-item>

                <el-form-item label="运营商类型：" required>
                   <span> {{carriorType}}</span>
                </el-form-item>

                <el-form-item label="运营商推荐人：" required>
                    <span>{{carriorReferee}}</span>
                </el-form-item>

                <el-form-item label="手机号码：" required>
                    <span>{{tel}}</span>
                </el-form-item>

                <el-form-item label="法人名称：" required>

                    <span>{{peopleName}}</span>
                </el-form-item>

                <el-form-item label="法人身份证号码：" required>
                    <span>{{peopleIdentity}}</span>
                </el-form-item>

                <el-form-item label="开户银行：" required>
                     <span>{{openBankName}}</span>
                </el-form-item>

                <el-form-item label="开户名称：" required>
                    <span>{{openName}}</span>
                </el-form-item>

                <el-form-item label="开户银行账号：" required>
                    <span>{{openBankAccount}}</span>
                </el-form-item>



                <el-form-item label="运营商地区：" required>
                    <span>{{address}}</span>
                </el-form-item>


                <el-form-item label="法人身份证扫描件：" required>
                    <div class="file">
                        <img :src="identityImgUrl" alt="身份证正面">
                    </div>
                    <div class="file">
                        <img :src="identityImgUrl2" alt="身份证反面">
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
                carriorName:'',             // 代理名称

                carriorType:'',            // 运营商类型
                carriorReferee:'',          // 运营商推荐人
                tel:'',                     // 电话
                peopleName:'',              // 法人名称
                peopleIdentity:'',          // 法人身份证号码
                address:'',                 // 运营商地址

                openBankName:'',            // 开户银行
                openName:'',                // 卡户名称
                openBankAccount:'',         // 开户银行账号

                identityImgUrl:'',          // 身份证正面
                identityImgUrlId:'',
                identityImgUrl2:'',         // 身份证反面
                identityImgUrl2Id:'',

            }
        },

        created() {
            // 获取url参数
            this.memberId = this.$route.query.memberId
            this.$axios({
                method:'post',
                url:'Agent/operators_detail',
                data:{
                    member_id:this.memberId,
//                    member_type:this.memberType
                }
            })
                .then(res=>{
                    this.carriorName = res.data.data.member_name
                    this.carriorType = res.data.data.identity_info
                    this.carriorReferee = res.data.data.yinviter_name
                    this.tel = res.data.data.member_mobile
                    this.peopleName = res.data.data.member_truename
                    this.peopleIdentity = res.data.data.farennum
                    this.openBankName = res.data.data.bank_name
                    this.address = res.data.data.address
                    this.openName = res.data.data.true_name
                    this.openBankAccount = res.data.data.card_account
                    this.identityImgUrl = res.data.data.farenurl
                    this.identityImgUrl2 = res.data.data.faren_f_url


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
    }
    .el-input {
        float: left;
        width: 200px;
    }
</style>
