<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/carriorAgent/index">运营商</el-breadcrumb-item>
            <el-breadcrumb-item>修改运营商</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">修改运营商</p>
            <el-form label-width="180px">
                <el-form-item label="运营商账号：">
                    <span>{{carriorName}}</span>
                </el-form-item>

                <el-form-item label="运营商类型：">
                    <span>{{carriorType}}</span>
                </el-form-item>

                <el-form-item label="审核状态：">
                    <span>{{status}}</span>
                </el-form-item>

                <el-form-item label="加盟时间：">
                    <span>{{addTime}}</span>
                </el-form-item>

                <el-form-item label="升级需缴总额：">
                    <span>{{shengjiMoney}}</span>
                </el-form-item>

                <el-form-item label="手机号码：" >
                    <el-input v-model="tel" @blur="telCheck"></el-input>
                    <span class="errorClass" v-if="telVal">手机号无效</span>
                </el-form-item>

                <el-form-item label="法人名称：" >
                    <el-input v-model="peopleName"></el-input>
                </el-form-item>

                <el-form-item label="法人身份证号码：">
                    <el-input v-model="peopleIdentity" @blur="identityCheck"></el-input>
                    <span class="errorClass" v-if="identityVal">身份证号无效</span>

                </el-form-item>

                <el-form-item label="开户银行：" >
                    <el-input v-model="openBankName"></el-input>
                </el-form-item>

                <el-form-item label="开户名称：" >
                    <el-input v-model="openName"></el-input>
                </el-form-item>

                <el-form-item label="开户银行账号：" >
                    <el-input v-model="openBankAccount" @blur="bankCheck"></el-input>
                    <span class="errorClass" v-if="bankVal">银行账号无效</span>

                </el-form-item>


                <el-form-item label="详细地址：" >
                    <el-input v-model="address" style="width: 400px;"></el-input>
                </el-form-item>


                <el-form-item label="法人身份证扫描件：" >
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


                <el-form-item>
                    <div class="btnDiv">
                        <el-button @click="returnBack">返回</el-button>
                        <el-button type="danger" @click="submitRevise">提交修改</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import md5 from 'js-md5';

    export default {
        data() {
            return {
                urlWatchId:'',              // url上得memberId
                memberId: this.$memberId,             // 当前代理商的memberId
                memberType: this.$memberType,               // 当前代理商的memberType
                carriorName: '',             // 代理名称

                status:'',                  // 审核状态
                addTime:'',                 // 加盟时间
                shengjiMoney:'',            // 升级需缴总额

                carriorType: '',            // 运营商类型

                tel: '',                     // 电话
                peopleName: '',              // 法人名称
                peopleIdentity: '',          // 法人身份证号码

                openBankName: '',            // 开户银行
                openName: '',                // 开户名称
                openBankAccount: '',         // 开户银行账号

                identityImgUrl: '',          // 身份证正面
                identityImgUrlId: '',
                identityImgUrl2: '',         // 身份证反面
                identityImgUrl2Id: '',


                address:'',             // 地区


                telVal: false,                  // tel
                identityVal: false,             // identity
                bankVal: false,                 // bank

            }
        },
        created() {
            this.urlWatchId = this.$route.query.memberId

            // 运营商已有信息
            this.$axios.post('Agent/operators_detail',{
                member_id:this.urlWatchId
            })
                .then(res=>{
                   if (res.data.code == 200) {
                       // 要显示的数据
                       this.carriorName = res.data.data.member_name
                       this.carriorType = res.data.data.identity_info
                       this.status = res.data.data.status_info
                       this.addTime = res.data.data.member_time
                       this.shengjiMoney = res.data.data.totalpayment
                       this.tel = res.data.data.member_mobile
                       this.peopleName = res.data.data.member_truename
                       this.peopleIdentity = res.data.data.farennum
                       this.openBankName = res.data.data.bank_name
                       this.openName = res.data.data.true_name
                       this.openBankAccount = res.data.data.card_account
                       this.address = res.data.data.address
                       this.identityImgUrl = res.data.data.farenurl
                       this.identityImgUrl2 = res.data.data.faren_f_url
                   } else {
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
            // 一些正则验证

            // 手机号
            telCheck() {
                let regx = /^1[34578]\d{9}$/;
                if (regx.test(this.tel.trim())) {
                    this.telVal = false
                } else {
                    this.telVal = true
                }
            },
            identityCheck() {
                let regx = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                if (regx.test(this.peopleIdentity.trim())) {
                    this.identityVal = false
                } else {
                    this.identityVal = true
                }
            },
            bankCheck() {
                let regx = /^\d+$/
                if (regx.test(this.openBankAccount.trim())) {
                    this.bankVal = false
                } else {
                    this.bankVal = true
                }
            },



            // 确认新增
            submitRevise() {
                if (this.telVal == true || this.identityVal == true || this.bankVal == true) {
                    this.$message({
                        type: 'error',
                        message: '请输入正确的信息!',
                        duration: 1600
                    })
                } else {
                    this.$axios({
                        method: 'post',
                        url: 'Agent/add_operators',
                        data: {
                            // 显示的信息
                            id:this.urlWatchId,                         // 运营商id，修改专用
                            member_id: this.memberId,                   // 当前登录者的id
                            member_type: this.memberType,               // 当前登录者的type
                            member_mobile: this.tel,                    // 手机号码
                            name: this.peopleName,                      // 法人姓名
                            farenNum: this.peopleIdentity,              // 法人身份证号码
                            address: this.address,                      // 详细地址
                            totalPayment: this.totalMoney,              // 总额
                            true_name: this.openName,                   // 开户名
                            bank_name: this.openBankName,               // 开户银行
                            card_account: this.openBankAccount,         // 开户银行账号
                            farenUrl: this.identityImgUrlId || '',            // 身份证正面照
                            faren_f_url: this.identityImgUrl2Id || '',
                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$notify({
                                    title:'成功',
                                    type:'success',
                                    message:res.data.message,
                                    duration:1600
                                })
                                setTimeout(this.$router.push({path:'/carriorAgent/index'}),1600)
                            } else {
                                this.$notify.error({
                                    title:'失败',
                                    message:res.data.message,
                                    duration:1600
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
            // 地区选择
            listenProvince(val) {
                this.provinceVal = val
            },
            listenCity(val) {
                this.cityVal = val
            },
            listenArea(val) {
                this.areaVal = val
            },
            listenStreet(val) {
                this.streetVal = val
            },
            listenDetail(val) {
                this.detail = val
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
                                message:res.data.message,
                                type:'warning',
                                duration:1600
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
        .el-select {
            float: left;
            width: 200px;
        }
        .errorClass {
            color: #e4393c;
            margin:0 20px;
            font-size: 12px;
        }
    }


</style>
