<template>
    <header>
        <div @click="clickHeader">
            <div class="fl logo">{{titleName}}</div>
        </div>
        <div class="fr login-info">
            <span><i></i>您好：{{userName}}</span>|
            <span @click="loginOut"><router-link to="/Login" v-if="!isLogin">切换账号</router-link></span>
        </div>
    </header>
</template>

<script>

    export default {
        name: 'vHeader',
        data() {
            return {
                isLogin: false,
                titleName: '',

                userName: '',
                originUrl:'',
                memberType:''
            }
        },
        created() {
            this.titleName = this.$titleName
            this.memberType = this.$memberType
            this.userName = this.$userName
        },
        methods: {
            clickHeader(){
              if (this.memberType == 9) {
                  this.$router.push('/')
              } else if(this.memberType == 4) {
                  this.$router.push('/agentManage/index')
              } else if (this.memberType == 5) {
                  this.$router.push('/carriorManage/index')
              }
            },
            loginOut() {
                this.$local.save('info', null)
                this.$local.save('token', null)
                this.$local.save('aside', null)
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
    header {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 60px;
        background-color: #fff;
        box-shadow: -2px 0 2px #ffd6d7;
    }

    .logo {
        line-height: 60px;
        padding-left: 80px;
        color: #e4393c;
        font-size: 20px;
        background: url('../../assets/image/image-count.png') no-repeat -60px -40px;
        cursor: pointer;
    }

    .login-info {
        line-height: 60px;
    }

    .login-info span {
        display: inline-block;
        color: #e4393c;
        padding: 0 10px;
    }

    .login-info i {
        display: inline-block;
        width: 28px;
        height: 28px;
        vertical-align: middle;
        background: url('../../assets/image/image-count.png') no-repeat -140px -6px;
    }
</style>
