<template>
    <div>
        <el-row>
            <el-col>
                <h2>商家开通支付平台申请表</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <label class="error">*所有项都是必选</label>
            <div class="fullIn"><label style="height: 20px;"></label></div>
            <div>
                <label>商家账号</label>
                <el-input v-model="sellerAccount" size="small"></el-input>
                <el-button size="small" @click="checkSellerAccount">检测商家账号</el-button>
                <span>推荐人</span>
                <el-input class="referee" size="small" v-model="referee" disabled></el-input>
            </div>
            <div>
                <label>商家名称</label>
                <el-input v-model="sellerName" size="small"></el-input>
            </div>
            <div>
                <label>商家简称</label>
                <el-input v-model="sellerShort" size="small"></el-input>
            </div>
            <div>
                <label>商家城市</label>
                <el-select v-model="sellerCity" filterable size="small" @change="sellerCityChange">
                    <el-option
                        v-for="item in sellerCities"
                        :label="item.label"
                        :key="item.id"
                        :value="item.value"></el-option>
                </el-select>
            </div>
            <div>
                <label>商家地址</label>
                <el-input v-model="sellerAddress" size="small"></el-input>
            </div>
            <div>
                <label>商家服务电话</label>
                <el-input v-model="sellerTel" size="small"></el-input>
            </div>
            <div>
                <label>组织机构代码</label>
                <el-input v-model="sellerCode" size="small"></el-input>
            </div>
            <div>
                <label>商家类型</label>
                <el-select v-model="sellerType" size="small" @change="sellerTypeChange">
                    <el-option
                        v-for="item in sellerTypes"
                        :label="item.label"
                        :key="item.id"
                        :value="item.value"></el-option>
                </el-select>
            </div>
            <div>
                <label>经营类目</label>
                <el-select v-model="sellerClass" size="small" @change="sellerClassChange">
                    <el-option
                        v-for="item in sellerClasses"
                        :label="item.label"
                        :key="item.id"
                        :value="item.value"></el-option>
                </el-select>
            </div>
            <div>
                <label>法人姓名</label>
                <el-input v-model="people" size="small"></el-input>
            </div>
            <div>
                <label>法人身份证号码</label>
                <el-input v-model="peopleId" size="small"></el-input>
            </div>
            <div>
                <label>法人联系电话</label>
                <el-input v-model="peopleTel" size="small"></el-input>
            </div>
            <div>
                <label>法人手机</label>
                <el-input v-model="peoplePhone" size="small"></el-input>
            </div>
            <div>
                <label>银行代码</label>
                <el-select v-model="bankCode" filterable size="small" @change="bankCodeChange">
                    <el-option
                        v-for="item in bankCodes"
                        :label="item.label+'('+item.value+')'"
                        :key="item.label"
                        :value="item.label+'('+item.value+')'"></el-option>
                </el-select>
            </div>
            <div>
                <label>开户行</label>
                <el-input v-model="bankName" size="small" disabled></el-input>
            </div>
            <div>
                <label>开户账号</label>
                <el-input v-model="bankAccount" size="small"></el-input>
            </div>
            <div>
                <label>开户户名</label>
                <el-input v-model="bankAccountName" size="small"></el-input>
            </div>
            <div>
                <label>是否自动提取</label>
                <el-select v-model="isExtract" size="small" @change="isExtractChange">
                    <el-option
                        v-for="item in isExtracts"
                        :label="item.label"
                        :key="item.id"
                        :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="fullIn"><label style="height: 20px"></label></div>

            <div class="btn">
                <el-button @click="returnBack">取消</el-button>
                <el-button type="danger" @click="submit">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                sellerInfo: '',
                sellerAccount: '',
                referee: '',
                sellerName: '',
                sellerShort: '',
                sellerCities: [],
                sellerCity: '',
                sellerAddress: '',
                sellerTel: '',
                sellerCode: '',
                sellerTypes: [
                    {
                        label: '公司商户',
                        value: '00'
                    },
                    {
                        label: '个人商户',
                        value: '01'
                    }
                ],
                sellerType: '',
                sellerClasses: [],
                sellerClass: '',
                people: '',
                peopleId: '',
                peopleTel: '',
                peoplePhone: '',
                bankCodes: [],
                bankCode: '',
                bankName: '',
                bankAccount: '',
                bankAccountName: '',
                isExtracts: [
                    {
                        label: '手动',
                        value: 0
                    },
                    {
                        label: '自动',
                        value: 1
                    }
                ],
                isExtract: 0,

            }
        },
        created() {
            // 城市列表
            this.$httpV3.post('Ght/city_list', {})
                .then(res => {
                    if (res.data.code == 200) {
                        this.sellerCities = res.data.data
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
            // 经营类目列表
            this.$httpV3.post('Ght/category_list', {})
                .then(res => {
                    if (res.data.code == 200) {
                        this.sellerClasses = res.data.data
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
            // 银行列表
            this.$httpV3.post('Ght/bank_list', {})
                .then(res => {
                    if (res.data.code == 200) {
                        this.bankCodes = res.data.data
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
            // 城市选择
            sellerCityChange(val) {
                this.sellerCity = val
            },
            // 商家类型选择
            sellerTypeChange(val) {
                this.sellerType = val
            },
            // 经营类目选择
            sellerClassChange(val) {
                this.sellerClass = val
            },
            // 银行代码选择
            bankCodeChange(val) {
                this.bankCode = val
                this.bankName = val.match(/[\u4e00-\u9fa5]+/g).join('')
            },
            // 是否自动提取
            isExtractChange(val) {
                this.isExtract = val
            },
            // 检测商家账号
            checkSellerAccount() {
                if (this.sellerAccount == '') {
                    this.$message({
                        message: '请输入商家账号',
                        type: 'error',
                        duration: 1600
                    })
                } else {
                    this.$httpV3.post('Ght/get_store_info', {
                        member_name: this.sellerAccount
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.sellerInfo = res.data.data

                                this.sellerName = res.data.data.store_name
                                this.referee = res.data.data.inviter_name
                                this.sellerShort = res.data.data.short_name
                                this.sellerAddress = res.data.data.store_address
                                this.sellerTel = res.data.data.store_phone
                                this.people = res.data.data.company_master
                                this.peopleId = res.data.data.id_card_no
                                this.peopleTel = res.data.data.master_tel
                                this.peoplePhone = res.data.data.master_phone
                                this.bankAccount = res.data.data.bank_number
                                this.bankAccountName = res.data.data.bank_name
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
            // 取消返回上一页
            returnBack() {
                history.go(-1)
            },
            // 提交
            submit() {
                if (this.sellerAccount == '' || this.sellerName == '' || this.sellerShort == '' || this.sellerCity == '' || this.sellerAddress == '' || this.sellerTel == '' || this.sellerCode == '' || this.sellerType == '' || this.sellerClass == '' || this.people == '' || this.peopleId == '' || this.peopleTel == '' || this.peoplePhone == '' || this.bankCode == '' || this.bankName == '' || this.bankAccount == '') {
                    this.$message({
                        message: '*所有项都是必选',
                        type: 'error',
                        duration: 1600
                    })
                } else {
                    this.$httpV3({
                        method: 'post',
                        url: 'Ght/add_store_settled',
                        data: {
                            api_v: 'v3',                                // 版本号
                            handleType: 0,                              // 新增
                            merchantName: this.sellerName,              // 商家名称
                            shortName: this.sellerShort,                // 商家简称
                            city: this.sellerCity,                      // 商家城市
                            merchantAddress: this.sellerAddress,        // 地址
                            servicePhone: this.sellerTel,               // 商家电话
                            orgCode: this.sellerCode,                   // 商家电话
                            merchantType: this.sellerType,              // 商家类型
                            category: this.sellerClass,                 // 经营类目
                            corpmanName: this.people,                   // 法人姓名
                            corpmanId: this.peopleId,                   // 法人身份证
                            cormanPhone: this.peopleTel,                // 法人电话
                            corpmanMobile: this.peoplePhone,            // 法人手机
                            bankCode: this.bankCode.replace(/[^0-9]/ig, ''),                    // 银行代码
                            bankName: this.bankName,                    // 银行名称
                            bankaccountNo: this.bankAccount,            // 银行账号
                            bankaccountName: this.bankAccountName,      // 开户户名
                            autoCus: this.isExtract,                    // 自动提现
                            store_id: this.sellerInfo.store_id,          // 商家id
                            store_joinin_id: this.sellerInfo.store_joinin_id,// 商家申请id
                            status: 1,                                   // 商家申请id
                            inviter_name: this.referee || '',                  // 推荐人账号
                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success',
                                    duration: 1600
                                })
                                this.$router.push('/otherPay/index')
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
    }
</script>
<style lang="scss" scoped>
    .contentDiv {
        position: relative;
        .error {
            position: absolute;
            right: 20px;
            top: 20px;
        }
        .fullIn {
            height: 20px;
        }
        .btn {
            padding-top: 40px;
            .el-button {
                width: 120px;
                text-align: center;
            }
        }
        div {
            width: 100%;
            height: 40px;
            line-height: 40px;
            label {
                display: inline-block;
                width: 180px;
                float: left;
                background-color: #e65358;
                text-align: left;
                color: #fff;
                text-indent: 30px;
                margin-right: 20px;
            }
            .el-input {
                float: left;
                width: 200px;
                &:after {
                    position: absolute;
                    content: '*';
                    font-size: 20px;
                    top: 4px;
                    color: #ff4949;
                    margin-left: 10px;
                }
            }

            .el-select {
                float: left;
                width: 200px;
                &:after {
                    position: absolute;
                    content: '*';
                    font-size: 20px;
                    right: -18px;
                    top: 6px;
                    color: #ff4949;
                }
            }
            .el-button {
                float: left;
                margin: 6px 80px 0 60px;
            }
            span {
                float: left;
                margin-right: 20px;
            }
        }
    }


</style>
<style lang="scss">
    .referee {
        .el-input__inner {
            float: left;
            width: 120px;
            border: none !important;
            border-bottom: 1px solid #999 !important;
            outline: 0;
        }
        &:after {
            position: absolute;
            content: '*';
            font-size: 20px;
            top: 4px;
            right: 56px;
            color: #ff4949;
            margin-left: 10px;
        }

    }
</style>

