<template>
    <div>
        <h2>概览</h2>
        <div>
            <el-row :gutter="36">
                <el-col :span="7" v-for="item in list" :key="item.title" :class="item.html_name.replace(/\//,'')">
                    <div class="type" @click="toPage(item)">
                        <i></i>
                        <h5>{{item.title}}</h5>
                        <p>{{item.three}}</p>
                        <div class="showCount">
                            <span class="fl">{{item.one}}</span>
                            <span class="fr">{{item.two}}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
            }
        },
        created() {
            this.$axios.post('Index/home_index', {
                member_id: this.$memberId,
                member_type: this.$memberType
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data
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
            toPage(val) {
                switch (val.title) {
                    case '会员':
                        this.$router.push({path: '/member'})
                        break;
                    case '餐餐抢商家':
                        this.$router.push({path: '/seller'})
                        break;

                    case '代理商':
                        this.$router.push({path: '/agent'})
                        break;
                    case '运营商':
                        this.$router.push({path: '/carrieroperator'})
                        break;
                    case '餐餐抢订单':
                        this.$router.push({path: '/ccqOrder'})
                        break;
                    case '餐餐抢商品':
                        this.$router.push({path: '/goods'})
                        break;
                    case 'VIP充值':
                        this.$router.push({path: '/vipRecharge'})
                        break;
                    case '活动管理':
                        this.$router.push({path: '/activityManage'})
                        break;
                    case '高汇通':
                        this.$router.push({path: '/otherPay'})
                        break;
                    case '权限管理':
                        this.$router.push({path: '/power'})
                        break;

                }
            }
        }
    }
</script>
<style scoped lang="scss">
    /* 公共部分css */
    h2 {
        line-height: 30px;
        text-align: left;
        font-weight: normal;
        font-size: 20px;
        margin-bottom: 6px;
    }

    .el-col {
        margin-bottom: 28px;
        .type {
            height: 294px;
            padding-top: 44px;
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 10px;

            i {
                display: block;
                width: 100px;
                height: 80px;
                margin: 0 auto;
            }

            h5 {
                font-size: 20px;
                margin-top: 12px;
                font-weight: normal;
            }
            p {
                font-size: 14px;
                margin-top: 12px;
            }
            .showCount {
                width: 92%;
                height: 60px;
                line-height: 60px;
                margin: 20px auto;
                color: #fff;
                border-radius: 4px;
                .fl {
                    padding-left: 6%;
                }
                .fr {
                    padding-right: 6%;
                }
            }
        }
    }
    .member {
        i {
            background: url('../../assets/image/image-count.png') no-repeat 2px -386px;
        }
        .showCount {
            background: linear-gradient(to right, #20d6fe, #04eefe);
            box-shadow: 0px 1px 10px #cce6f1, 0px 1px 10px #cce6f1;
        }
    }
    .seller {
        i {
            background: url('../../assets/image/image-count.png') no-repeat -106px -386px;
        }
        .showCount {
            background: linear-gradient(to right, #cbc4fc, #e0c3fc);
            box-shadow: 0px 1px 10px #dddef9, 0px 1px 10px #dddef9;
        }
    }
    .agent {
        i {
            background: url('../../assets/image/image-count.png') no-repeat -216px -386px;
        }
        .showCount {
            background: linear-gradient(to right, #b5e6f1, #fdb0bf);
            box-shadow: 0px 1px 10px #eeecf5, 0px 1px 10px #eeecf5;
        }
    }
    .carrierOperator {
        i {
            background: url('../../assets/image/image-count.png') no-repeat -342px -386px;
        }
        .showCount {
            background: linear-gradient(to right, #ff5269, #ff8683);
            box-shadow: 0px 1px 10px #f4cbd3, 0px 1px 10px #f4cbd3;
        }
    }
    .ccqOrder {
        i {
            background: url('../../assets/image/image-count.png') no-repeat -466px -386px;
        }
        .showCount {
            background: linear-gradient(to right, #60ecbe, #8dfca0);
            box-shadow: 0px 1px 10px #b9efe4, 0px 1px 10px #b9efe4;
        }
    }
    .goods {
        i {
            background: url('../../assets/image/image-count.png') no-repeat -558px -386px;
        }
        .showCount {
            background: linear-gradient(to right, #feadab, #fcbfb8);
            box-shadow: 0px 1px 10px #f7b6b1, 0px 1px 10px #f7b6b1;
        }
    }

    .vipRecharge {
        i {
            background: url('../../assets/image/image-count.png') no-repeat -658px -386px;
        }
        .showCount {
            background: linear-gradient(to right, #ffacb9, #ffbcd1);
            box-shadow: 0px 1px 10px #eacad2, 0px 1px 10px #eacad2;
        }
    }
    .activityManage {
        i {
            background: url('../../assets/image/image-count.png') no-repeat -372px -502px;
        }
        .showCount {
            background: linear-gradient(to right, #d89efa, #f8b6fb);
            box-shadow: 0px 1px 10px #f8b6fb, 0px 1px 10px #f8b6fb;
            margin-top: 52px;
        }
    }

    .otherPay {
        i {
            background: url('../../assets/image/image-count.png') no-repeat -788px -386px;
        }
        .showCount {
            background: linear-gradient(to right, #f77397, #f9c95d);
            box-shadow: 0px 1px 10px #f77397, 0px 1px 10px #f77397;
            margin-top: 52px;
        }
    }

    .power {
        i {
            background: url('../../assets/image/image-count.png') no-repeat -894px -386px;
        }
        .showCount {
            background: linear-gradient(to right, #79cdfc, #79cdfc);
            box-shadow: 0px 1px 10px #79cdfc, 0px 1px 10px #79cdfc;
            margin-top: 52px;
        }
    }

</style>
