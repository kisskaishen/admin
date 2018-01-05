<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/agent">代理商</el-breadcrumb-item>
            <el-breadcrumb-item>修改代理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">修改代理</p>
            <el-form label-width="180px">
                <el-form-item label="代理商账号：" required>
                    <span>{{agentName}}</span>
                </el-form-item>

                <el-form-item label="代理地区：" required>
                    <p>{{agentInfo.narea}}</p>
                </el-form-item>
                <el-form-item label="密码：" required>
                    <el-input v-model="revisePwd"></el-input>
                </el-form-item>
                <el-form-item label="法人名称：" required>
                    <el-input v-model="peopleName"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证号码：" required>
                    <el-input v-model="peopleIdentity" @blur="identityCheck"></el-input>
                    <span class="errorClass" v-if="identityVal">身份证号无效</span>
                </el-form-item>
                <el-form-item label="法人身份证扫描件：" required>
                    <div class="file">
                        <img v-if="identityImgUrl" :src="identityImgUrl" alt="身份证正面">
                        <i class="el-icon-banner" v-else></i>
                        <input type="file" ref="file" name="avatar" @change="identityUpload">
                        <div>身份证正面</div>
                    </div>
                    <div class="file">
                        <img v-if="identityImgUrl2" :src="identityImgUrl2" alt="身份证反面">
                        <i class="el-icon-banner" v-else></i>
                        <input type="file" ref="file" name="avatar" @change="identityUpload2">
                        <div>身份证反面</div>
                    </div>
                </el-form-item>
                <el-form-item label="法人电话：" required>
                    <el-input v-model="tel" @blur="telCheck"></el-input>
                    <span class="errorClass" v-if="telVal">手机号无效</span>
                </el-form-item>
                <el-form-item label="公司联系电话：">
                    <el-input v-model="companyTel"></el-input>
                </el-form-item>
                <el-form-item label="代理公司名称：">
                    <el-input v-model="agentCompanyName"></el-input>
                </el-form-item>
                <el-form-item label="开户银行：" required>
                    <el-input v-model="openBankName"></el-input>
                </el-form-item>
                <el-form-item label="开户名称：" required>
                    <el-input v-model="openName"></el-input>
                </el-form-item>
                <el-form-item label="开户银行账号：" required>
                    <el-input v-model="openBankAccount" @blur="bankCheck"></el-input>
                    <span class="errorClass" v-if="bankVal">银行账号无效</span>
                </el-form-item>
                <el-form-item label="组织机构代码：" required>
                    <el-input v-model="origination" @change="zuzhiCheck"></el-input>
                    <span class="errorClass" v-if="zuzhiVal">组织机构代码无效</span>
                </el-form-item>
                <el-form-item label="营业执照编号：" required>
                    <el-input v-model="licenseNum" @change="yingyeCheck"></el-input>
                    <span class="errorClass" v-if="yingyeVal">营业执照编号无效</span>
                </el-form-item>
                <el-form-item label="营业执照扫描件：" required>
                    <div class="file">
                        <img :src="licenseImgUrl" alt="营业执照">
                    </div>
                </el-form-item>
                <el-form-item label="许可证扫描件：" required>
                    <div class="file">
                        <img :src="xukeImgUrl" alt="许可证">
                    </div>
                </el-form-item>

                <el-form-item>
                    <div class="btnDiv">
                        <el-button @click="returnBack">返回</el-button>
                        <el-button type="danger" @click="submitAdd">确认修改</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    import AddressSelect from '@/components/public/addressSelect3'

    export default {
        data() {
            return {
                agentInfo: '',

                agentName: '',           // 代理商账号

                revisePwd: '',           // 修改密码
                peopleName: '',          // 法人名称
                peopleIdentity: '',      // 法人身份证号码

                identityImgUrl: '',      // 身份证正面
                identityImgUrlId: '',
                identityImgUrl2: '',     // 身份证反面
                identityImgUrl2Id: '',

                tel: '',           // 法人电话
                companyTel: '',          // 公司联系电话
                agentCompanyName: '',    // 代理公司名称
                openBankName: '',        // 开户银行
                openName: '',            // 开户名称
                openBankAccount: '',     // 开户银行账号
                origination: '',         // 组织结构代码
                licenseNum: '',             // 营业执照编号
                licenseImgUrl: '',       // 营业执照
                licenseImgUrlId: '',
                xukeImgUrl: '',          // 许可证
                xukeImgUrlId: '',

                provinceId: '',
                cityId: '',
                areaId: '',
                streetId: '',


                memberVal: false,
                telVal: false,
                identityVal: false,
                bankVal: false,
                zuzhiVal: false,
                yingyeVal: false,


            }
        },
        created() {
            this.$axios({
                method: 'post',
                url: 'Agent/agent_detail',
                data: {
                    member_id: this.$route.query.member_id,
                    member_type: 4
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.agentInfo = res.data.data
                        this.agentName = res.data.data.member_name
                        this.revisePwd = res.data.data.password
                        this.peopleName = res.data.data.member_truename
                        this.peopleIdentity = res.data.data.farennum
                        this.identityImgUrl = res.data.data.farenurl
                        this.identityImgUrl2 = res.data.data.faren_f_url
                        this.tel = res.data.data.member_mobile
                        this.companyTel = res.data.data.company_phone
                        this.agentCompanyName = res.data.data.company_name
                        this.openBankName = res.data.data.bank_name
                        this.openName = res.data.data.true_name
                        this.openBankAccount = res.data.data.card_account
                        this.origination = res.data.data.origination
                        this.licenseNum = res.data.data.yinyenum
                        this.licenseImgUrl = res.data.data.yinyeurl
                        this.xukeImgUrl = res.data.data.licence_url
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
        components: {AddressSelect},
        methods: {
            // 地理位置选择
            listenProvince(val) {
                this.provinceId = val
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

            // 运营商
            memberChange() {
                let regx = /^\w+$/;
                if (regx.test(this.agentName.trim())) {
                    this.memberVal = false
                } else {
                    this.memberVal = true
                }
            },
            // 手机号
            telCheck() {
                let regx = /^1[34578]\d{9}$/;
                if (regx.test(this.tel.trim())) {
                    this.telVal = false
                } else {
                    this.telVal = true
                }
            },
            // 身份证
            identityCheck() {
                let regx = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                if (regx.test(this.peopleIdentity.trim())) {
                    this.identityVal = false
                } else {
                    this.identityVal = true
                }
            },
            // 银行卡号
            bankCheck() {
                let regx = /^\d+$/
                if (regx.test(this.openBankAccount.trim())) {
                    this.bankVal = false
                } else {
                    this.bankVal = true
                }
            },
            // 组织机构代码
            zuzhiCheck() {
                let regx = /^\w+$/;
                if (regx.test(this.origination.trim())) {
                    this.zuzhiVal = false
                } else {
                    this.zuzhiVal = true
                }
            },
            // 营业执照
            yingyeCheck() {
                let regx = /^\w+$/;
                if (regx.test(this.licenseNum.trim())) {
                    this.yingyeVal = false
                } else {
                    this.yingyeVal = true
                }
            },

            // 确认新增
            submitAdd() {
                if (this.agentName == '' || this.tel == '' || this.revisePwd == '' || this.peopleName == '' || this.licenseNum == '' || this.peopleIdentity == '' || this.openName == '' || this.openBankName == '' || this.openBankAccount == '') {
                    this.$message.error('请填写完整信息！')
                } else {
                    this.$axios({
                        method: 'post',
                        url: 'Adminagent/modify_agent',
                        data: {
                            member_id: this.$route.query.member_id,
                            member_mobile: this.tel,
                            member_passwd: this.revisePwd,
                            name: this.peopleName,
                            yinyenum: this.licenseNum,
                            farennum: this.peopleIdentity,
                            farenurl: this.identityImgUrlId || '',
                            faren_f_url: this.identityImgUrl2Id || '',
                            company_name: this.agentCompanyName,
                            company_phone: this.companyTel,
                            true_name: this.openName,
                            bank_name: this.openBankName,
                            card_account: this.openBankAccount
                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$notify({
                                    title: '成功',
                                    message: res.data.message,
                                    type: 'success',
                                    duration: 1600
                                })
                                this.$router.push('/agent')

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
            // 返回
            returnBack() {
                history.go(-1)
            },

            // 上传身份证正面
            identityUpload(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 8)
                this.$upload({
                    method: 'post',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.identityImgUrl = res.data.data.url
                            this.identityImgUrlId = res.data.data.id
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
            // 身份证反面
            identityUpload2(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 8)
                this.$upload({
                    method: 'post',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.identityImgUrl2 = res.data.data.url
                            this.identityImgUrl2Id = res.data.data.id
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
    .el-breadcrumb {
        line-height: 30px;
    }

    .el-form-item {
        margin-bottom: 22px !important;
        .el-input {
            float: left;
            width: 200px;
        }
        .el-cascader {
            width: 200px;
        }
        .errorClass {
            color: #e4393c;
            font-size: 12px;
        }
        p {
            text-align: left;
        }
    }


</style>
