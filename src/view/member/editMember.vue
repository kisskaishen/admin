<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator=">">
		  <el-breadcrumb-item :to="{ path: '/member' }">会员管理</el-breadcrumb-item>
		  <el-breadcrumb-item>编辑会员</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv" style="padding-top:20px;">
            <el-form label-width="180px">

                <el-form-item label="会员：">
                    <span>{{userInfo.member_name}}</span>
                </el-form-item>

                <el-form-item label="性别：">
                    <el-radio-group v-model="userInfo.member_sex" @change="sexChange">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                        <el-radio label="3">保密</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="是否允许登录：">
                    <el-radio-group v-model="userInfo.status" @change="statusChange">
                        <el-radio label="1">允许</el-radio>
                        <el-radio label="3">不允许</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="头像：">
                    <div class="file headerImg">
                        <img v-if="userInfo.member_avatar" :src="userInfo.member_avatar" class="avatar" alt="头像">
                        <i v-else class="el-icon-head"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadHead">
                        <div>上传头像</div>
                    </div>
                </el-form-item>

                <el-form-item label="密码：">
                    <el-input v-model="userInfo.member_passwd"></el-input>
                </el-form-item>

                <el-form-item label="支付密码：">
                    <span>{{userInfo.member_paypwd}}</span>
                </el-form-item>

                <el-form-item label="手机号：">
                    <el-input v-model="userInfo.member_mobile"></el-input>
                </el-form-item>

                <el-form-item label="邮箱：">
                    <el-input v-model="userInfo.member_email" type="email"></el-input>
                </el-form-item>

                <el-form-item label="是否实名制：">
                    <el-radio-group v-model="userInfo.real_verify" @change="realChange">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="3">否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="真实姓名：" v-if="userInfo.real_verify != '3'">
                    <el-input v-model="userInfo.name"></el-input>
                </el-form-item>

                <el-form-item label="身份证：">
                    <el-input v-model="userInfo.number"></el-input>
                </el-form-item>

                <el-form-item>
                    <div class="file">
                        <img v-if="userInfo.thumb" :src="userInfo.thumb" class="avatar" alt="身份证正面">
                        <i v-else class="el-icon-identity"></i>
                        <input ref="files" type="file" name="avatar" @change="indentityChange1">
                        <div @change="indentityChange1">身份证正面</div>
                    </div>
                    <div class="file">
                        <img v-if="userInfo.thumb2" :src="userInfo.thumb2" class="avatar" alt="身份证反面">
                        <i v-else class="el-icon-identity-reverse"></i>
                        <input ref="files" type="file" name="avatar" @change="indentityChange2">
                        <div @change="indentityChange2">身份证反面</div>
                    </div>
                </el-form-item>


                <el-form-item label="收货地址：">
                	<p>{{userInfo.area_info}}{{userInfo.address}}</p>
                    <Address-Select
                        @listenProvince="listenProvince"
                        @listenCity="listenCity"
                        @listenArea="listenArea"
                        @listenStreet="listenStreet"
                        @listenDetail="listenDetail"></Address-Select>
                </el-form-item>

                <el-form-item label="旺旺：">
                    <el-input v-model="userInfo.member_ww"></el-input>
                </el-form-item>

                <el-form-item label="QQ号码：">
                    <el-input v-model="userInfo.member_qq"></el-input>
                </el-form-item>

                <el-form-item label="银行卡号：">
                    <el-input v-model="userInfo.bank_name" placeholder="银行名称"></el-input>
                    <el-input v-model="userInfo.card_account" placeholder="银行卡账号"  style="margin:0 0 0 20px;"></el-input>
                    <br/>
                    <div class="file">
                        <img v-if="userInfo.bank_img" :src="userInfo.bank_img" class="avatar" alt="上传银行卡" style="margin-top:10px;">
                        <i v-else class="el-icon-bank"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadBank">
                        <div @change="uploadBank">上传银行卡</div>
                    </div>
                </el-form-item>

                <el-form-item class="btnDiv">
                    <el-button @click="goBack">取消</el-button>
                    <el-button type="danger" @click="onSubmit">确认更改</el-button>
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
            // // 自定义验证会员手机号
            // var validateName = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入会员名称'));
            //     } else if (!/^1[34578]\d{9}$/.test(value)){
            //         callback(new Error('会员名称必须是手机号'));
            //     }  else {
            //         callback();
            //     }
            // };
            return {
            	userInfo:'',
                // ruleForm: {
                //     name: '',                               // 会员名称
                //     password: ''                            // 密码
                // },

                // sex: '',                              // 性别
                // loginStatus: '',                    // 是否允许登录
                // payPassword: '',                       // 支付密码
                // tel: '',
                // email: '',
                // isRealName: '',
                // realName: '',
                // identify:'',
                // aliww: '',
                // qqCode: '',

                // bankName: '',
                // bankCode: '',

                // headImgUrl: '',
                headImgUrlId: '',
                // identityImgUrl1: '',
                identityImgUrl1Id: '',
                // identityImgUrl2: '',
                identityImgUrl2Id: '',
                // bankImgUrl: '',
                bankImgUrlId: '',


                provinceId: '',					// 地址id
                cityId: '',
                areaId: '',
                streetId: '',
                detail: '',

                // areaObj:{},

                // rules: {
                //     // name: {required: true, validator:validateName, trigger: 'blur'},
                //     password: [
                //         {required: true, message: '请输入密码'},
                //         {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                //     ]
                // }
            }
        },

        created() {
        	this.$axios.post('Member/member_info',{
        		member_id:this.$route.query.member_id
        	})
        		.then(res=>{
        			this.userInfo = res.data.data
        		})
        		.catch(err=>{
        			console.log(err)
        		})
        },


        components: {AddressSelect},

        methods: {
            // 性别选择
            sexChange(val) {
                this.userInfo.member_sex = val
            },
            // 是否允许登录
            statusChange(val) {
                this.userInfo.status = val
            },
            // 是否实名制
            realChange(val) {
                this.userInfo.real_verify = val
            },
            // 地址
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
            listenDetail(val) {
                this.detail = val
            },
            // 返回
            goBack() {
            	history.go(-1)
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
                        this.userInfo.member_avatar = res.data.data.url
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
                        this.userInfo.thumb = res.data.data.url
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
                        this.userInfo.thumb2 = res.data.data.url
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
                        this.userInfo.bank_img = res.data.data.url
                        this.bankImgUrlId = res.data.data.id
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 点击提交按钮
            onSubmit(formName) {
             
                    this.$axios.post('Member/member_add_update', {
                    	member_id:this.$route.query.member_id,
                        member_name: this.userInfo.member_name,
                        member_passwd: this.userInfo.member_passwd,
                        member_sex:this.userInfo.member_sex,
                        status:this.userInfo.status,
                        member_avatar:this.userInfo.member_avatar,			// 头像
                        member_paypwd:this.userInfo.member_paypwd,
                        member_mobile:this.userInfo.member_mobile,
                        member_email:this.userInfo.member_email,
                        name:this.userInfo.name,
                        farennum:this.userInfo.number,
                        thumb:this.userInfo.member_name,				// 身份证正面
                        thumb2:this.userInfo.member_name,				// 身份证反面
                        area:this.userInfo.member_name,
                        member_ww:this.userInfo.member_ww,
                        member_qq:this.userInfo.member_qq,
                        bank_name:this.userInfo.bank_name,
                        card_account:this.userInfo.card_account,
                        bank_img:this.userInfo.bank_img,					// 银行卡照片
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
              
            },
            

        }
    }
</script>
<style scoped lang="scss">
	.el-breadcrumb {
		line-height:30px;
	}
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
	@import "../../assets/css/member_part.css";

</style>



