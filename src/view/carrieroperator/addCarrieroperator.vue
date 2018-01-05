<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/carrieroperator/index">运营商</el-breadcrumb-item>
            <el-breadcrumb-item>新增运营商</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">新增运营商</p>
            <el-form label-width="180px">
                <el-form-item label="运营商账号：" required>
                    <el-input v-model="carriorName" placeholder="会员账号不存在会自动创建" @change="memberChange"></el-input>
                    <span class="errorClass" v-if="memberVal">运营商账号不能是汉字</span>
                </el-form-item>

                <el-form-item label="密码：" required>
                    <el-input v-model="carriorPwd" placeholder="密码不小于6位"></el-input>
                </el-form-item>

                <el-form-item label="运营商类型：" required>
                    <el-radio-group v-model="carriorType" @change="carriorTypeChange">
                        <el-radio label="0">正式运营商</el-radio>
                        <el-radio label="1">分期运营商</el-radio>
                        <el-radio label="2">合伙人运营商</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="总额：" v-if="carriorType == 0">
                    <el-input v-model="totalMoney" disabled></el-input>
                </el-form-item>

                <el-form-item label="总额：" v-if="carriorType == 1">
                    <el-input v-model="totalMoney" disabled></el-input>
                </el-form-item>
                <el-form-item label="选择分期数：" v-if="carriorType == 1">
                    <el-select v-model="fenqiNum" @change="fenqiNumChange">
                        <el-option
                            v-for="item in fenqiNums"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="每期应付金额：" v-if="carriorType == 1">
                    <el-input v-model="meiqiMoney" disabled></el-input>
                </el-form-item>
                <el-form-item label="预先支付分期数：" v-if="carriorType == 1">
                    <el-select v-model="yufuNum" @change="yufuNumChange">
                        <el-option
                            v-for="item in yufuNums"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="需支付金额：" v-if="carriorType == 1">
                    <el-input v-model="needMoney" disabled></el-input>
                </el-form-item>


                <el-form-item label="运营商推荐人：">
                    <el-input v-model="carriorReferee"></el-input>
                    <span style="font-size: 12px;">(可不填)</span>
                </el-form-item>

                <el-form-item label="运营商推荐人类型：" required v-if="carriorReferee">
                    <el-select v-model="carriorRefereeType" @change="typeChange">
                        <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="手机号码：" required>
                    <el-input v-model="tel" @blur="telCheck"></el-input>
                    <span class="errorClass" v-if="telVal">手机号无效</span>
                </el-form-item>

                <el-form-item label="法人名称：" required>
                    <el-input v-model="peopleName"></el-input>
                </el-form-item>

                <el-form-item label="法人身份证号码：" required>
                    <el-input v-model="peopleIdentity" @blur="identityCheck"></el-input>
                    <span class="errorClass" v-if="identityVal">身份证号无效</span>

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


                <el-form-item label="运营商地区：" required>
                    <el-cascader
                        :options="addSelect"
                        v-model="address"
                        @change="addressChange">
                    </el-cascader>
                    <el-input v-model="moreAddress" placeholder="详细地址..."></el-input>
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


                <el-form-item>
                    <div class="btnDiv">
                        <el-button @click="returnBack">返回</el-button>
                        <el-button type="danger" @click="submitAdd">确认新增</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import md5 from 'js-md5';

    let yufuNums1 = [
        {
            label: 1,
            value: 1
        },
        {
            label: 2,
            value: 2
        },
        {
            label: 3,
            value: 3
        },
        {
            label: 4,
            value: 4
        },
        {
            label: 5,
            value: 5
        }
    ]
    let yufuNums2 = [
        {
            label: 1,
            value: 1
        },
        {
            label: 2,
            value: 2
        },
        {
            label: 3,
            value: 3
        },
        {
            label: 4,
            value: 4
        },
        {
            label: 5,
            value: 5
        },
        {
            label: 6,
            value: 6
        },
        {
            label: 7,
            value: 7
        },
        {
            label: 8,
            value: 8
        },
        {
            label: 9,
            value: 9
        },
        {
            label: 10,
            value: 10
        }
    ]

    export default {
        data() {
            return {
                memberId: this.$memberId,             // 当前代理商的memberId
                memberType: this.$memberType,               // 当前代理商的memberType
                carriorName: '',             // 代理名称
                carriorPwd: '',              // 修改密码

                totalMoney: '',              // 运营商总额
                fenqiNums: [                // 分期数数组
                    {
                        label: '5期（每年缴一期）',
                        value: 5
                    },
                    {
                        label: '10期（每半年缴一期）',
                        value: 10
                    }
                ],
                fenqi: '',                  //
                fenqiNum: '0',              // 默认分期数
                meiqiMoney: '0',            // 每期应支付
                yufuNums: [],
                yufuNum: '0',               // 分期支付的次数
                needMoney: '0',              // 需要支付
                needMoneyBase: '',           // 用于计算

                carriorType: '0',            // 运营商类型
                referees: [],
                carriorReferee: '',          // 运营商推荐人

                types: [
                    {
                        label: '运营商',
                        value: 5
                    },
                    {
                        label: '代理商',
                        value: 4
                    }
                ],
                carriorRefereeType: '',

                tel: '',                     // 电话
                peopleName: '',              // 法人名称
                peopleIdentity: '',          // 法人身份证号码

                openBankName: '',            // 开户银行
                openName: '',                // 卡户名称
                openBankAccount: '',         // 开户银行账号

                identityImgUrl: '',          // 身份证正面
                identityImgUrlId: '',
                identityImgUrl2: '',         // 身份证反面
                identityImgUrl2Id: '',

                address: '',                 // 三级联动的地址
                moreAddress: '',             // 详细地址
                allAddress: [],
                addSelect: [],


                provinceVal: '',
                cityVal: '',
                areaVal: '',
                streetVal: '',
                detail: '',

                memberVal: false,                // memberVal
                telVal: false,                  // tel
                identityVal: false,             // identity
                bankVal: false,                 // bank

            }
        },
        created() {
            // address
            this.$axios.post('Agentmember/get_areas')
                .then(res => {
                    this.addSelect = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })

            // 总额
            this.$axios({
                method: 'post',
                url: 'Agent/operators_free',
                data: {
                    member_id: this.memberId,
                    member_type: this.memberType
                }
            })
                .then(res => {
                    this.totalMoney = res.data.data[0].money
                })
                .catch(err => {
                    console.log(err)
                })
        },


        methods: {
            // 推荐人类型选择
            typeChange(val) {
                this.carriorRefereeType = val
            },
            // 地址选择
            addressChange(val) {
                console.log(val)
            },
            // 一些正则验证
            // 运营商
            memberChange() {
                let regx = /^\w+$/;
                if (regx.test(this.carriorName.trim())) {
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
            // 运营商类型
            carriorTypeChange(val) {
                this.carriorType = val
                if (val == 1) {
                    // 分期运营商
                    this.$axios({
                        method: 'post',
                        url: 'Agent/operators_free',
                        data: {
                            member_id: this.memberId,
                            member_type: this.memberType
                        }
                    })
                        .then(res => {
                            this.totalMoney = res.data.data[1].money
                            this.fenqiNum = 5
                            this.meiqiMoney = res.data.data[1].single
                            this.yufuNum = 1
                            this.needMoney = res.data.data[1].single
                            this.needMoneyBase = res.data.data[1].single
                            this.yufuNums = yufuNums1
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else if (val == 0) {
                    // 正式运营商
                    this.$axios({
                        method: 'post',
                        url: 'Agent/operators_free',
                        data: {
                            member_id: this.memberId,
                            member_type: this.memberType
                        }
                    })
                        .then(res => {
                            this.totalMoney = res.data.data[0].money
                            this.fenqiNum = 0
                            this.meiqiMoney = 0
                            this.yufuNum = 0
                            this.needMoney = 0
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    // 合伙人运营商
                    this.totalMoney = 0
                    this.fenqiNum = 0
                    this.meiqiMoney = 0
                    this.yufuNum = 0
                    this.needMoney = 0
                }
            },

            // 选择分期数
            fenqiNumChange(val) {
                this.fenqi = val
                this.$axios({
                    method: 'post',
                    url: 'Agent/operators_free',
                    data: {
                        member_id: this.memberId,
                        member_type: this.memberType
                    }
                })
                    .then(res => {
                        if (this.fenqi == 5) {
                            this.totalMoney = res.data.data[1].money
                            this.fenqiNum = 5
                            this.meiqiMoney = res.data.data[1].single
                            this.yufuNum = 1
                            this.needMoney = res.data.data[1].single
                            this.needMoneyBase = res.data.data[1].single
                            this.yufuNums = yufuNums1
                        } else {
                            this.totalMoney = res.data.data[2].money
                            this.fenqiNum = 10
                            this.meiqiMoney = res.data.data[2].single
                            this.yufuNum = 1
                            this.needMoney = res.data.data[2].single
                            this.needMoneyBase = res.data.data[2].single
                            this.yufuNums = yufuNums2
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 预付期数选择
            yufuNumChange(val) {
                this.needMoney = val * this.needMoneyBase
            },

            // 运营商推荐人选择
            refereeChange(val) {
                this.carriorReferee = val
                this.carriorRefereeId = /\((\d+)\)/.exec(val)[1]
            },
            // 确认新增
            submitAdd() {
                if (this.memberVal == true || this.telVal == true || this.identityVal == true || this.bankVal == true ||
                    this.carriorName == '' || this.carriorPwd == '' || this.peopleName == '' || this.address == '' ||
                    this.morea == '') {
                    this.$message({
                        type: 'error',
                        message: '请输入正确的信息!',
                        duration: 1600
                    })
                } else {
                    if (this.carriorReferee == '') {
                        this.carriorRefereeId = this.memberId
                    }
                    this.allAddress = (this.address + '' + this.moreAddress).replace(/,/ig, '')
                    this.$axios({
                        method: 'post',
                        url: 'Agent/add_operators',
                        data: {
                            member_id: this.memberId,
                            member_type: this.memberType,
                            member_name: this.carriorName,
                            member_passwd: md5(this.carriorPwd),
                            yinviter_name: this.carriorReferee,
                            yinviter_type: this.carriorRefereeType,
                            member_mobile: this.tel,
                            name: this.peopleName,
                            farenNum: this.peopleIdentity,
                            address: this.allAddress,
                            totalPayment: this.totalMoney,           // 总额
                            identity: this.carriorType,             // 运营商类型
                            changeType: this.fenqiNum,              // 选择的期数
                            eachPayment: this.meiqiMoney,             // 每期应付
                            paidTime: this.yufuNum,                  // 预先支付的期数
                            paidPaymemt: this.needMoney,             // 需要支付
                            true_name: this.openName,
                            bank_name: this.openBankName,
                            card_account: this.openBankAccount,
                            farenUrl: this.identityImgUrlId,
                            faren_f_url: this.identityImgUrl2Id
                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$notify({
                                    title: '成功',
                                    type: 'success',
                                    message: res.data.message,
                                    duration: 1600
                                })
                                setTimeout(this.$router.push({path: '/Carrieroperator'}), 1600)
                            } else {
                                this.$notify.error({
                                    title: '失败',
                                    message: res.data.message,
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
                        this.identityImgUrl = res.data.data.url
                        this.identityImgUrlId = res.data.data.id
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
                        this.identityImgUrl2 = res.data.data.url
                        this.identityImgUrl2Id = res.data.data.id
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
            margin: 0 20px;
            font-size: 12px;
        }
    }

</style>
<style lang="scss">
    .el-cascader__label span {
        float: none;
    }
</style>
