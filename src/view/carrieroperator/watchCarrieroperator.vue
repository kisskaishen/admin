<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/carrieroperator'}">运营商</el-breadcrumb-item>
            <el-breadcrumb-item>查看运营商</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">
                <router-link :to="{path:'/Carrieroperator/reviseCarrieroperator',query:{member_id:member_id}}">点击前往修改</router-link>
            </p>

            <el-form label-width="180px">
                <el-form-item label="运营商账号：">
                    <span>{{info.member_name}}</span>
                </el-form-item>

                <el-form-item label="密码：">
                    <span>{{info.password}}</span>
                </el-form-item>

                <el-form-item label="运营商类型：">
                    <span>{{info.identity==0?'正式运营商':info.identity==1?'分期运营商':'合伙人运营商'}}</span>
                </el-form-item>

                <el-form-item label="总额：" v-if="info.identity!=2">
                    <span>{{info.totalpayment}}</span>
                </el-form-item>

                <el-form-item label="分期数：" v-if="info.identity==1">
                    <span>{{info.changetype_info}}</span>
                </el-form-item>

                <el-form-item label="每期应付金额：" v-if="info.identity==1">
                    <span>{{info.eachpayment}}</span>
                </el-form-item>

                <el-form-item label="预先支付分期数：" v-if="info.identity==1">
                    <span>{{info.paidtime}}</span>
                </el-form-item>

                <el-form-item label="需支付金额：" v-if="info.identity==1">
                    <span>{{info.paidpaymemt}}</span>
                </el-form-item>

                <el-form-item label="到期时间：" v-if="info.identity!=0">
                    <span>{{info.expirationtime}}</span>
                </el-form-item>

                <el-form-item label="运营商推荐人：">
                    <span>{{info.yinviter_name}}</span>
                </el-form-item>

                <el-form-item label="手机号码：">
                    <span>{{info.member_mobile}}</span>
                </el-form-item>

                <el-form-item label="法人名称：">
                    <span>{{info.member_truename}}</span>
                </el-form-item>

                <el-form-item label="法人身份证号码：">
                    <span>{{info.farennum}}</span>
                </el-form-item>

                <el-form-item label="开户银行：">
                    <span>{{info.bank_name}}</span>
                </el-form-item>

                <el-form-item label="开户名称：">
                    <span>{{info.true_name}}</span>
                </el-form-item>


                <el-form-item label="银行账号：">
                    <span>{{info.card_account}}</span>
                </el-form-item>


                <el-form-item label="运营商所在地：">
                    <span>{{info.address}}</span>
                </el-form-item>

                <el-form-item label="法人身份证扫描件：">
                    <img :src="info.farenurl" alt="身份证正面" @click="bigImgShow">
                    <img :src="info.faren_f_url" alt="身份证反面" @click="bigImgShow">
                    <transition name="el-zoom-in-center">
                        <div class="img-view" v-if="showImg" @click="bigImgClose">
                            <div class="img-layer"></div>
                            <div class="img-show">
                                <img :src="identityImg">
                            </div>
                        </div>
                    </transition>
                </el-form-item>

                <el-form-item class="btnDiv">
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
                info: '',
                showImg: false,

            }
        },
        created() {
            this.member_id = this.$route.query.member_id
            this.$axios.post('Agent/operators_detail', {
                member_id: this.member_id,
                member_type: 5
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.info = res.data.data
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
            width: 254px;
            height: 144px;
            margin-right: 20px;
            border:1px solid #dcdcdc;
        }
    }



    .tip {
        border-bottom: 1px solid #dcdcdc;
        padding-bottom: 4px;
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

</style>
