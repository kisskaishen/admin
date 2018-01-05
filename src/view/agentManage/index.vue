<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>概览</h2>
            </el-col>
        </el-row>
        <div class="contentDiv" style="height: 330px;">
            <div class="fl agentInfo">
                <div>
                    <i class="iAgent"></i>
                    <span>代理商</span>
                </div>
                <div>
                    <label>账号：</label>
                    <span>{{agentInfo.member_name}}</span>
                </div>
                <div>
                    <label>电话：</label>
                    <span>{{agentInfo.member_mobile}}</span>
                </div>
                <div>
                    <label>职位：</label>
                    <span>{{agentInfo.position}}</span>
                    <label style="margin-left:120px">加盟日期：</label>
                    <span>{{agentInfo.member_time}}</span>
                </div>
                <div class="moneyType">
                    <table>
                        <tr>
                            <th>共获得VIP会员费</th>
                            <th>可用VIP会员费</th>
                            <th>共获得餐餐抢券费</th>
                            <th>可用餐餐抢券费</th>
                        </tr>
                        <tr>
                            <td>{{agentInfo.total_vip}}元</td>
                            <td>{{agentInfo.current_vip}}元</td>
                            <td>{{agentInfo.total_chan}}元</td>
                            <td>{{agentInfo.current_chan}}元</td>
                        </tr>
                    </table>
                </div>
                <div class="btn">
                    <router-link to="/agentManage/moneyDetail">
                        <el-button type="danger" size="large">资金详情</el-button>
                    </router-link>
                    <router-link to="/agentManage/moneyCash">
                        <el-button type="warning" size="large">资金提现</el-button>
                    </router-link>

                </div>
            </div>
            <div class="fr scanCode">
                <img :src="agentInfo.url" alt="">
                <div style="text-align:center;margin-top:20px;line-height:24px">
                    <p>欢迎来带28云餐餐抢代理管理界面，您的分享链接</p>
                    <p style="color:#3caaf7">{{agentInfo.url}}</p>
                </div>
            </div>
        </div>
        <div class="listDiv">
            <el-row :gutter="36">
                <el-col :span="7" v-for="item in list" :key="item.title">
                    <div class="type">
                        <div @click="itemClick(item)">
                            <i></i>
                            <h5>{{item.title}}</h5>
                            <div class="showCount">
                                <span class="fl">{{item.one}}</span>
                                <span class="fr">{{item.two}}</span>
                            </div>
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
                memberId: this.$memberId,
                memberType: this.$memberType,
                agentInfo:'',
                list: [],
            }
        },
        created() {

            this.$axios({
                method: 'post',
                url: 'Agent/agent_info',
                data: {
                    member_id: this.memberId,
                    member_type: this.memberType
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.agentInfo = res.data.data
                        this.list = res.data.data.list
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
            itemClick(val) {
                switch (val.title) {
                    case '运营商':
                        this.$router.push('/carriorAgent')
                        break;

                    case '餐餐抢商家':
                        this.$router.push('/agentSeller')
                        break;

                    case '会员':
                        this.$router.push('/agentMember')
                        break;

                    case '财务结账':
                        this.$router.push('/subordinateAgent')
                        break;

                    case '下级代理':
                        this.$router.push('/agentFinance')
                        break;
                }

            }
        }
    }
</script>


<style lang="scss" scoped>
    i {
        display: inline-block;
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }

    .contentDiv {
        padding: 10px;
        text-align: left;
        .agentInfo {
            width: 70%;
            line-height: 36px;
            .iAgent {
                background: url('../../assets/image/image-count.png') -266px -6px;
            }
            .moneyType {
                height: 88px;
                border-top: 1px dashed #dcdcdc;
                border-bottom: 1px dashed #dcdcdc;
                table {
                    text-align: center;
                    border: none;
                    tr {
                        border: none;
                        th {
                            font-weight: normal;
                            color: #444;
                            padding-top: 8px;
                            line-height: 44px;
                            border: none;
                            background-color: #fff;
                        }
                        td {
                            color: #e4393c;
                            border: none;
                        }
                    }
                }
            }
            .btn {
                margin: 30px 0 0 30px;
                a {
                    margin-right: 20px;
                }
            }
        }
        .scanCode {
            width: 30%;
            img {
                display: block;
                width: 174px;
                height: 174px;
                margin: 36px auto 0;
            }
        }

    }

    .listDiv {
        .el-col {
            margin-bottom: 28px;
            &:nth-child(1) i {
                background: url('../../assets/image/image-count.png') no-repeat -248px -502px;
            }
            &:nth-child(1) .showCount {
                background: linear-gradient(to right, #FC8591, #FFB5C7);
                box-shadow: 0px 1px 10px #FFB5C7, 0px 1px 10px #FFB5C7;
            }

            &:nth-child(2) i {
                background: url('../../assets/image/image-count.png') no-repeat -106px -386px;
            }
            &:nth-child(2) .showCount {
                background: linear-gradient(to right, #cbc4fc, #e0c3fc);
                box-shadow: 0px 1px 10px #dddef9, 0px 1px 10px #dddef9;
            }
            &:nth-child(3) i {
                background: url('../../assets/image/image-count.png') no-repeat 2px -386px;
            }
            &:nth-child(3) .showCount {
                background: linear-gradient(to right, #20d6fe, #04eefe);
                box-shadow: 0px 1px 10px #cce6f1, 0px 1px 10px #cce6f1;
            }
            &:nth-child(4) i {
                background: url('../../assets/image/image-count.png') no-repeat -120px -502px;
            }
            &:nth-child(4) .showCount {
                background: linear-gradient(to right, #ff5269, #ff8683);
                box-shadow: 0px 1px 10px #f4cbd3, 0px 1px 10px #f4cbd3;
            }
            &:nth-child(5) i {
                background: url('../../assets/image/image-count.png') no-repeat -342px -386px;
            }
            &:nth-child(5) .showCount {
                background: linear-gradient(to right, #ff5269, #ff8683);
                box-shadow: 0px 1px 10px #f4cbd3, 0px 1px 10px #f4cbd3;
            }
            .type {
                height: 294px;
                padding-top: 44px;
                box-sizing: border-box;
                background-color: #fff;
                border-radius: 10px;
                div {
                    color: #242424;
                    i {
                        display: block;
                        width: 100px;
                        height: 80px;
                        margin: 0 auto;
                    }
                    h5 {
                        color: #242424;
                        font-size: 20px;
                        margin-top: 12px;
                        font-weight: normal;
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

        }
    }


</style>
