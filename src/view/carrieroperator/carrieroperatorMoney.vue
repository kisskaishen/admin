<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/carrieroperator' }">运营商</el-breadcrumb-item>
            <el-breadcrumb-item>资金</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p style="color:#007aff;line-height:36px;padding-left:6px;text-align:left;">
                运营商：{{titleList.member_name}}</p>
            <!-- 奖金类型 -->
            <div class="titleList">
                <div v-for="item in titleList.list" @click="chooseClick(item)">
                    <i class="fl"></i>
                    <div class="fr">
                        <h4>{{item.title}}</h4>
                        <b>{{item.value}}元</b>
                    </div>

                </div>
            </div>
            <!-- 查看其它运营商 -->
            <div class="otherOperate">
                <el-form label-width="130px" class="fl">
                    <el-form-item label="查看其它运营商：">
                        <el-input v-model="otherName" size="small"></el-input>
                        <i class="btn-search" @click="searchBtn"></i>
                    </el-form-item>
                </el-form>
                <p class="fr">
                    <el-button size="small" @click="outExcel">导出Excel</el-button>
                </p>
            </div>
            <!-- 表格显示 -->
            <table>
                <tr class="thead">
                    <th>日期时间</th>
                    <th width="10%">变动VIP提成</th>
                    <th width="10%">结存VIP提成</th>
                    <th width="10%">类型</th>
                    <th>消费者</th>
                    <th>消费者订单号</th>
                    <th width="34%">说明</th>
                </tr>
                <tr v-for="td in tdes">
                    <td>{{td.datetime}}</td>
                    <td>{{td.value}}</td>
                    <td>{{td.new_amount}}</td>
                    <td>{{td.type}}</td>
                    <td>{{td.user_name}}</td>
                    <td>{{td.order_sn}}</td>
                    <td>{{td.intro}}</td>
                </tr>
            </table>
            <el-pagination
                layout="prev, pager, next"
                @current-change="pageChange"
                :total="parseInt(lastPage)">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                otherName: '',
                type: 1,
            }
        },
        created() {
            this.type = this.$route.query.is_ccq
            // 抬头列表
            let titleData = new FormData()
            titleData.append('member_id', this.$route.query.member_id)
            this.$store.dispatch('getAgentTitleList', titleData)

            // 数据列表
            let data = new FormData()
            data.append('member_id', this.$route.query.member_id)
            data.append('member_type', 5)
            data.append('type', this.type)

            this.$store.dispatch('getAgentMoneyList', data)
        },
        computed: {
            ...mapState({
                titleList: state => state.carriorModule.titleInfo,
                tdes: state => state.carriorModule.list,
                lastPage: state => state.carriorModule.lastPage
            })
        },
        methods: {
            // 点击选择type
            chooseClick(val) {
                switch (val.title) {
                    case 'VIP奖金':
                        this.type = 1
                        break;
                    case '餐餐抢奖金':
                        this.type = 2
                        break;
                    case '提现VIP奖金':
                        this.type = 3
                        break;
                    case '提现餐餐抢奖金':
                        this.type = 4
                        break;
                }
                let data = new FormData()
                data.append('member_id', this.$route.query.member_id)
                data.append('member_type', 5)
                data.append('type', this.type)
                this.$store.dispatch('getAgentMoneyList', data)
            },

            // 导出excel
            outExcel() {

            },
            // 翻页
            pageChange(val) {
                let data = new FormData()
                data.append('member_id', this.$route.query.member_id)
                data.append('member_type', 5)
                data.append('type', this.type)
                data.append('page', val)
                this.$store.dispatch('getAgentMoneyList', data)
            },
            // 搜索
            searchBtn() {
                this.$axios.post('Member/member_funds_list', {
                    member_name: this.otherName,
                    type: 1,
                    member_type: 5
                })
                    .then(res => {
                        this.$router.replace({
                            path: '/Carrieroperator/carrieroperatorMoney',
                            query: {member_id: res.data.data.member_id}
                        })
                        // 抬头列表
                        let titleData = new FormData()
                        titleData.append('member_id', this.$route.query.member_id)
                        this.$store.dispatch('getAgentTitleList', titleData)

                        // 数据列表
                        let data = new FormData()
                        data.append('member_id', this.$route.query.member_id)
                        data.append('member_type', 5)
                        data.append('type', this.type)
                        this.$store.dispatch('getAgentMoneyList', data)
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
        line-height: 30px;
    }

    .titleList {
        padding-bottom: 16px;
        padding-left: 6px;
        height: 110px;
        border-bottom: 1px solid #dcdcdc;
        & > div {
            display: inline-block;
            border: 1px solid #dcdcdc;
            box-sizing: border-box;
            height: 102px;
            width: 220px;
            padding: 10px;
            margin-right: 16px;
            border-radius: 4px;
            cursor: pointer;
            float: left;
            .fl {
                width: 80px;
                height: 80px;
            }
            &:nth-child(1) .fl {
                background: url('../../assets/image/image-count.png') -204px -100px;
            }
            &:nth-child(2) .fl {
                background: url('../../assets/image/image-count.png') -294px -100px;
            }
            &:nth-child(3) .fl {
                background: url('../../assets/image/image-count.png') -374px -100px;
            }
            &:nth-child(4) .fl {
                background: url('../../assets/image/image-count.png') -450px -100px;
            }
            .fr {
                width: 118px;
                line-height: 40px;
                text-align: center;
                h4 {
                    font-size: 15px;
                    font-weight: normal;
                }
                p {
                    color: #e4393c;
                }
            }
        }
    }

    .otherOperate {
        width: 100%;
        height: 40px;
        .el-input {
            width: 200px;
        }

        .fr {
            margin: 6px 20px;
        }
    }


</style>
