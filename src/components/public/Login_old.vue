<template>
    <div id="login">
        <div class="header">
            <header>
                <h1></h1>
                <span>餐餐抢管理后台登录</span>
            </header>
        </div>
        <div class="login">
            <div class="fl loginIcon"></div>
            <div class="fr loginDiv">
                <form action="#" @submit.prevent="sendLogin" autocomplete="off">
                    <div class="loginInfo">
                        <h3>账号登录</h3>
                        <p><i></i><input type="text" name="account" ref="account" placeholder="账号"></p>
                        <p><i></i><input type="password" name="password" ref="password" placeholder="密码"></p>
                        <p><input type="text" v-model="captcha" class="captcha" placeholder="验证码"
                                  @blur="captchaBlur"><img :src="captchaImg" alt="验证码" @click="changeCaptcha"></p>
                        <p><span class="tip fr" @click="changeCaptcha">看不清,换一张</span></p>
                        <p>
                            <button class="loginBtn">登录</button>
                        </p>
                        <p style="color:#e4393c" v-if="warning">{{warnMessage}}</p>
                    </div>
                    <div class="nav" @click="changeLogin">
                        <p v-show="nav"></p>
                        <p v-show="nav2"></p>
                        <p v-show="nav3"></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import md5 from 'js-md5';
    import axios from 'axios'
    import {mapState} from 'vuex'


    export default {
        data() {
            return {
                captcha: '',

                warning: false,
                warnMessage: '',
                member_type: 9,
                gtype: 7,
                titleName: '餐餐抢管理后台',
                login: false,

                nav: true,
                nav2: false,
                nav3: false

            }
        },
        created() {
            // 获取图形验证码
            this.$store.dispatch('getCaptcha')
        },
        computed: {
            ...mapState({
                captchaId: state => state.loginModule.captchaId,        // 获取图形验证码id
                captchaImg: state => state.loginModule.captchaImg,      // 获取图形验证码
//                memberId: state => state.loginModule.memberId,          // memberId
//                token: state => state.loginModule.token,                // token
//                aside: state => state.loginModule.aside,                // aside
            })
        },
//        // 自定义过滤函数
//        filter: {
//            trim: function (val) {
//                return val.trim();
//            }
//        },
        methods: {
            // 更换验证码
            changeCaptcha() {
                this.$store.dispatch('getCaptcha')
            },
            // 改变登录分类
            changeLogin(e) {
                var _x = e.offsetX;
                var _y = e.offsetY;
                if ((_x > 90 && _x < 178) && (_y > 0 && _y < 38)) {
                    this.nav = true
                    this.nav2 = false
                    this.nav3 = false
                    this.member_type = 9
                    this.gtype = 7
                    this.titleName = '餐餐抢管理后台'
                    //  这里封装一个内部管理axios函数
                } else if ((_x > 90 && _x < 178) && (_y > 44 && _y < 72)) {
                    this.nav = false
                    this.nav2 = true
                    this.nav3 = false
                    this.member_type = 5
                    this.gtype = 3
                    this.titleName = '餐餐抢运营商后台'
                    //  这里封装一个运营商axios函数

                } else if ((_x > 90 && _x < 178) && (_y > 86 && _y < 114)) {
                    this.nav = false
                    this.nav2 = false
                    this.nav3 = true
                    this.member_type = 4
                    this.gtype = 4
                    this.titleName = '餐餐抢代理商后台'
                    //  这里封装一个代理商axios函数
                }
            },
            // 验证图形验证码
            captchaBlur() {
                let data = new FormData()
                data.append('api_v', 'v3')
                data.append('captcha', this.captcha)
                data.append('id', this.captchaId)
                this.$store.dispatch('checkCaptcha', data)
            },
            // 登录发送
            sendLogin() {

                this.$axios({
                    method: 'post',
                    url: '/login/login',
                    data: {
                        'member_name': this.$refs.account.value,
                        'member_password': md5(this.$refs.password.value),
                        'member_type': this.member_type,
                        'ctype': 4,
                        'gtype': this.gtype,
                        'captcha': this.captcha,
                        'id': this.captchaId,
                    }
                })
                    .then(res => {
                        if (this.account != '' || this.password != '' || this.captcha != '') {
                            if (res.data.code == 200) {
                                // 登陆成功localStorage显示信息
                                this.$local.save('info', {
                                    login: true,
                                    member_name: this.$refs.account.value,
                                    password: md5(this.$refs.password.value),
                                    member_id: res.data.data.member_id,
                                    member_type: this.member_type,
                                    titleName: this.titleName,
                                    gtype: this.gtype,
                                    captcha: this.captcha,
                                    id: this.captchaId,
                                })
                                this.$local.save('token', res.data.data.token)
                                // this.$local.save('aside', res.data.data.menu)
                                if (this.member_type == 9) {
                                    this.$router.push({path: '/'})
                                    location.reload()

                                } else if (this.member_type == 4) {
                                    this.$router.push({path: '/agentManage'})
                                    location.reload()
                                } else if (this.member_type == 5) {
                                    this.$router.push({path: '/carriorManage'})
                                    location.reload()
                                }

                            } else {
                                this.warning = true
                                this.warnMessage = res.data.message
                                setTimeout(() => {
                                    this.warning = false
                                }, 1600)
                            }

                        } else {
                            alert('请填写正确的信息')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })


            }
        }
    }
</script>
<style scoped>
    #login {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;
    }

    .header {
        width: 100%;
        height: 91px;
        line-height: 91px;
        background-color: #e4393c;
        color: #fff;
    }

    header {
        width: 1218px;
        margin: 0 auto;
    }

    header h1 {
        float: left;
        width: 94px;
        height: 91px;
        background: url('../../assets/image/image-count.png') no-repeat -20px -100px;
    }

    header span {
        float: left;
        margin-left: 20px;
        font-size: 20px;
    }

    .login {
        width: 1218px;
        margin: 0 auto;
        padding-top: 140px;
    }

    .loginIcon {
        width: 546px;
        height: 380px;
        margin-top: 80px;
        background: url('../../assets/image/login-show-img.png') no-repeat center;
    }

    .loginDiv {
        position: relative;
        width: 388px;
        height: 418px;
        padding-top: 72px;
        margin-right: 60px;
        text-align: left;
        background-color: #f1f1f1;
        border-radius: 20px;
    }

    .loginInfo {
        width: 300px;
        margin: 0 auto;
    }

    .loginInfo h3 {
        margin-bottom: 50px;
    }

    .loginInfo p {
        position: relative;
        width: 100%;
        height: 44px;
        margin-top: 20px;
    }

    .loginInfo i {
        position: absolute;
        display: inline-block;
        left: 24px;
        top: 8px;
        width: 24px;
        height: 24px;
    }

    .loginInfo p:nth-child(2) i {
        background: url('../../assets/image/login-name-icon.png') no-repeat center;
    }

    .loginInfo p:nth-child(3) i {
        background: url('../../assets/image/login-pwd-icon.png') no-repeat center;
    }

    .loginInfo p input {
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-indent: 58px;
        border-radius: 44px;
        outline: none;
        border: none;
    }

    .captcha {
        width: 170px !important;
        text-indent: 30px !important;
    }

    .loginInfo p:nth-child(4) img {
        float: right;
        display: inline-block;
        width: 90px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        background-color: #fff;
    }

    .loginInfo p:nth-child(5) {
        margin: 0;
    }

    .loginInfo .tip {
        width: 82px;
        border: none;
        cursor: pointer;
    }

    .loginInfo .tip:hover {
        color: #3caaf7;
        text-decoration: underline;
    }

    .loginBtn {
        width: 100%;
        height: 44px;
        line-height: 44px;
        border-radius: 44px;
        background-color: #e4393c;
        border: none;
        color: #fff;
    }

    .loginInfo p:last-child {
        color: #848484;
    }

    .nav p {
        position: absolute;
        width: 174px;
        height: 130px;
        top: 10px;
        right: -84px;
        cursor: pointer;
    }

    .nav p:nth-child(1) {
        background: url('../../assets/image/nav-icon1.png') no-repeat center;
    }

    .nav p:nth-child(2) {
        background: url('../../assets/image/nav-icon2.png') no-repeat center;
    }

    .nav p:nth-child(3) {
        background: url('../../assets/image/nav-icon3.png') no-repeat center;
    }
</style>
