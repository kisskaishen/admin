<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>会员管理</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <el-row class="title">
                <el-col :span="24">
                    <div class="fl switch">
                        <router-link to="/member" class="clearCurr">管理会员</router-link>
                        <router-link to="/member/addMember" class="curr">新增会员</router-link>
                    </div>

                </el-col>
            </el-row>

            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="180px">

                <el-form-item label="会员：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="性别：">
                    <el-radio-group v-model="sex" @change="sexChange">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                        <el-radio label="3">保密</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="是否允许登录：">
                    <el-radio-group v-model="loginStatus" @change="statusChange">
                        <el-radio label="1">允许</el-radio>
                        <el-radio label="3">不允许</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="头像：">
                    <div class="el-upload-tip">支持jpg、png的图片格式，且文件小于2M</div>
                    <div class="file headerImg">
                        <img v-if="headImgUrl" :src="headImgUrl" class="avatar" alt="头像">
                        <i v-else class="el-icon-head"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadHead">
                        <div>上传头像</div>
                    </div>
                </el-form-item>

                <el-form-item label="密码：" prop="password">
                    <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>

                <el-form-item label="支付密码：">
                    <el-input v-model="payPassword" type="password"></el-input>
                </el-form-item>

                <el-form-item label="手机号：">
                    <el-input v-model="tel" type="tel"></el-input>
                </el-form-item>

                <el-form-item label="邮箱：">
                    <el-input v-model="email" type="email"></el-input>
                </el-form-item>

                <el-form-item label="是否实名制：">
                    <el-radio-group v-model="isRealName" @change="realChange">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="3">否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="真实姓名：" v-if="isRealName  != '3'">
                    <el-input v-model="realName"></el-input>
                </el-form-item>

                <el-form-item label="身份证：">
                    <el-input v-model="identify"></el-input>
                </el-form-item>

                <el-form-item>
                    <div class="file">
                        <img v-if="identityImgUrl1" :src="identityImgUrl1" class="avatar" alt="身份证正面">
                        <i v-else class="el-icon-identity"></i>
                        <input ref="files" type="file" name="avatar" @change="indentityChange1">
                        <div @change="indentityChange1">身份证正面</div>
                    </div>
                    <div class="file">
                        <img v-if="identityImgUrl2" :src="identityImgUrl2" class="avatar" alt="身份证反面">
                        <i v-else class="el-icon-identity-reverse"></i>
                        <input ref="files" type="file" name="avatar" @change="indentityChange2">
                        <div @change="indentityChange2">身份证反面</div>
                    </div>
                </el-form-item>


                <el-form-item label="收货地址：">
                    <Address-Select
                        @listenProvince="listenProvince"
                        @listenCity="listenCity"
                        @listenArea="listenArea"
                        @listenStreet="listenStreet"
                        @listenDetail="listenDetail"></Address-Select>
                </el-form-item>

                <el-form-item label="旺旺：">
                    <el-input v-model="aliww"></el-input>
                </el-form-item>

                <el-form-item label="QQ号码：">
                    <el-input v-model="qqCode"></el-input>
                </el-form-item>

                <el-form-item label="银行卡号：">
                    <el-input v-model="bankName" placeholder="银行名称" style="margin-right:20px;"></el-input>
                    <el-input v-model="bankCode" placeholder="银行卡账号"></el-input>
                    <br/>
                    <div class="file">
                        <img v-if="bankImgUrl" :src="bankImgUrl" class="avatar" alt="上传银行卡">
                        <i v-else class="el-icon-bank"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadBank">
                        <div @change="uploadBank">上传银行卡</div>
                    </div>
                </el-form-item>

                <el-form-item class="btnDiv">
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                    <el-button type="danger" @click="onSubmit('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import AddressSelect from '@/components/public/addressSelect'
    import md5 from 'js-md5'

    export default {
        data() {
            // 自定义验证会员手机号
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入会员名称'));
                } else if (!/^1[34578]\d{9}$/.test(value)){
                    callback(new Error('会员名称必须是手机号'));
                }  else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    name: '',                               // 会员名称
                    password: ''                            // 密码
                },

                sex: '1',                              // 性别
                loginStatus: '1',                    // 是否允许登录
                payPassword: '',                       // 支付密码
                tel: '',
                email: '',
                isRealName: '1',
                realName: '',
                identify:'',
                aliww: '',
                qqCode: '',

                bankName: '',
                bankCode: '',

                headImgUrl: '',
                headImgUrlId: '',
                identityImgUrl1: '',
                identityImgUrl1Id: '',
                identityImgUrl2: '',
                identityImgUrl2Id: '',
                bankImgUrl: '',
                bankImgUrlId: '',


                provinceId: '',					// 地址id
                cityId: '',
                areaId: '',
                streetId: '',
                detail: '',

                areaObj:{},

                rules: {
                    name: {required: true, validator:validateName, trigger: 'blur'},
                    password: [
                        {required: true, message: '请输入密码'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        components: {AddressSelect},

        methods: {
            // 性别选择
            sexChange(val) {
                this.sex = val
            },
            // 是否允许登录
            statusChange(val) {
                this.loginStatus = val
            },
            // 是否实名制
            realChange(val) {
                this.isRealName = val
            },
            // 地址
            listenProvince(val) {
                this.provinceId = val
                this.areaObj.area_id = this.provinceId
            },
            listenCity(val) {
                this.cityId = val
            },
            listenArea(val) {
                this.areaId = val
            },
            listenStreet(val) {
                this.streetId = val
            },
            listenDetail(val) {
                this.detail = val
            },
            // 上传头像
            uploadHead(e) {
                e.preventDefault();
                let files = e.target.files
                let data = new FormData()
                data.append('type', 7)
                data.append('image', files[0])
                this.$upload({
                    method: 'post',
                    data: data
                })
                    .then(res => {
                        this.headImgUrl = res.data.data.url
                        this.headImgUrlId = res.data.data.id
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 上传身份证正反面
            indentityChange1(e) {
                e.preventDefault();
                let files = e.target.files
                let data = new FormData()
                data.append('type', 8)
                data.append('image', files[0])
                this.$upload({
                    method: 'post',
                    data: data
                })
                    .then(res => {
                        this.identityImgUrl1 = res.data.data.url
                        this.identityImgUrl1Id = res.data.data.id
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            indentityChange2(e) {
                e.preventDefault();
                let files = e.target.files
                let data = new FormData()
                data.append('type', 8)
                data.append('image', files[0])
                this.$upload({
                    method: 'post',
                    data: data
                })
                    .then(res => {
                        this.identityImgUrl1 = res.data.data.url
                        this.identityImgUrl1Id = res.data.data.id
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            
            // 上传银行卡
            uploadBank(e) {
                e.preventDefault();
                let files = e.target.files
                let data = new FormData()
                data.append('type', 8)
                data.append('image', files[0])
                this.$upload({
                    method: 'post',
                    data: data
                })
                    .then(res => {
                        this.bankImgUrl = res.data.data.url
                        this.bankImgUrlId = res.data.data.id
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 点击提交按钮
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('Member/member_add_update', {
                            member_name: this.ruleForm.name,
                            member_passwd: md5(this.ruleForm.password),
                            member_sex:this.sex,
                            status:this.loginStatus,
                            member_avatar:this.headImgUrl,
                            member_paypwd:md5(this.payPassword),
                            member_mobile:this.tel,
                            member_email:this.email,
                            name:this.realName,
                            farennum:this.identify,
                            thumb:this.identityImgUrl1,
                            thumb2:this.identityImgUrl2,
                            area:this.areaObj,
                            member_ww:this.aliww,
                            member_qq:this.qqCode,
                            bank_name:this.bankName,
                            card_account:this.bankCode,
                            bank_img:this.bankImgUrl
                        })
                            .then(res => {
                                console.log(res)
                                if (res.data.code == 200) {
                                    this.$message({
                                        message:res.data.message,
                                        type:'success',
                                        duration:1600
                                    })
                                    this.$router.push('/member')
                                } else {
                                    this.$message({
                                        message:res.data.message,
                                        type:'error',
                                        duration:1600
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    } else {
                        this.$message.error('请填写必填项！')
                        return false;
                    }
                })
            },
            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }

        }
    }
</script>
<style scoped lang="scss">
    .el-form-item {
        margin-bottom: 22px !important;
        .el-input {
            width: 200px;
            float: left;
        }

        .el-select {
            float: left;
            width: 120px;
            margin-right: 20px;
        }
        .headerImg {
            width:122px;
            height: 170px;
            input[type="file"] {
                width:122px;
                height: 170px;
            }
            img {
                width:122px;
                height: 122px;
            }
            div {
                bottom:0;
            }
        }
    }

    .clearCurr {
        margin: 0 -3px 0 0;
        text-indent: 0;
        color: #848484 !important;
        background-color: #fff;
        border-bottom: 1px solid #dcdcdc;
    }

</style>
