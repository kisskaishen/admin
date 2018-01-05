<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/agent'}">代理商</el-breadcrumb-item>
            <el-breadcrumb-item>查看代理商</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">
                <router-link :to="{path:'/agent/reviseAgent',query:{member_id:member_id}}">点击修改代理信息</router-link>
            </p>

            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="180px">
                <el-form-item label="代理名称：">
                    <span>{{agentInfo.member_name}}</span>
                </el-form-item>

                <el-form-item label="代理地区：">
                    <span>{{agentInfo.narea}}</span>
                </el-form-item>

                <el-form-item label="密码：">
                    <span>{{agentInfo.password}}</span>
                </el-form-item>

                <el-form-item label="法人名称：">
                    <span>{{agentInfo.member_truename}}</span>
                </el-form-item>

                <el-form-item label="法人身份证号码：">
                    <span>{{agentInfo.farennum}}</span>
                </el-form-item>

                <el-form-item label="法人身份证扫描件：">
                    <img :src="agentInfo.farenurl" alt="身份证正面" @click="bigImgShow">
                    <img :src="agentInfo.faren_f_url" alt="身份证反面" @click="bigImgShow">
                    <transition name="fade">
                        <div class="img-view" v-if="showImg" @click="bigImgClose">
                            <div class="img-layer"></div>
                            <div class="img-show">
                                <img :src="identityImg">
                            </div>
                        </div>
                    </transition>
                </el-form-item>

                <el-form-item label="法人电话：">
                    <span>{{agentInfo.member_mobile}}</span>
                </el-form-item>

                <el-form-item label="公司联系电话：">
                    <span>{{agentInfo.company_phone}}</span>
                </el-form-item>

                <el-form-item label="代理公司名称：">
                    <span>{{agentInfo.company_name}}</span>
                </el-form-item>

                <el-form-item label="开户银行：">
                    <span>{{agentInfo.bank_name}}</span>
                </el-form-item>

                <el-form-item label="开户名称：">
                    <span>{{agentInfo.true_name}}</span>
                </el-form-item>


                <el-form-item label="银行账号：">
                    <span>{{agentInfo.card_account}}</span><br/>
                </el-form-item>

                <el-form-item label="组织结构代码：">
                    <span>{{agentInfo.origination}}</span>
                </el-form-item>

                <el-form-item label="营业执照编号：">
                    <span>{{agentInfo.yinyenum}}</span>
                </el-form-item>

                <el-form-item label="营业执照扫描件：">
                    <img :src="agentInfo.yinyeurl" alt="营业执照" @click="bigImgShow">
                </el-form-item>


                <el-form-item label="许可证：">
                    <img :src="agentInfo.licence_url" alt="许可证" @click="bigImgShow">
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
                agentInfo: '',
                showImg: false,


            }
        },
        created() {
            this.member_id = this.$route.query.member_id
            this.$axios({
                method: 'post',
                url: 'Agent/agent_detail',
                data: {
                    member_id: this.member_id,
                    member_type: 4
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
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
            // 图片放大
            bigImgShow(e) {
                this.showImg = true;
                this.identityImg = e.currentTarget.src;
            },
            // 隐藏放大
            bigImgClose() {
                this.showImg = false
            },
            // 返回上一页
            goBack() {
                history.go(-1)
            }
        }

    }
</script>
<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .el-form-item {
        margin-bottom: 22px !important;
        span {
            float: left;
        }
        img {
            width: 246px;
            height: 156px;
            border: 1px solid #dcdcdc;
            margin-right: 20px;
        }
    }

    .tip {
        border-bottom: 1px solid #dcdcdc;
        padding-bottom: 4px;
        cursor: pointer;
    }

    .el-input {
        width: 200px;
        float: left;
    }

    .el-select {
        float: left;
        width: 120px;
        margin-right: 20px;
    }

    .discountTip {
        position: absolute;
        left: 180px;
        color: #fff;
        padding: 0 10px;
        border-radius: 4px;
        background-color: #e4393c;
        border: none;
    }

    .bannerTip {
        position: absolute;
        left: -140px;
        top: 40px;
        line-height: 20px;
        color: #e4393c;
    }

    /* 图片放大的css代码*/
    .img-view .img-layer {
        position: fixed;
        bottom: 0;
        right: 0;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        overflow: hidden;
        z-index: 999;
    }

    .img-show {
        position: fixed;
        width: 600px;
        height: 400px;
        left: 50%;
        margin-left: -300px;
        top: 50%;
        margin-top: -200px;
        z-index: 9999;
    }

    .img-show img {
        width: inherit;
        height: inherit;
    }

    img {
        float: left;
    }

    @import "../../assets/css/agent_part.css";
</style>
