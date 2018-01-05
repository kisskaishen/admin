<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/agent' }">代理商</el-breadcrumb-item>
            <el-breadcrumb-item>资金</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p style="color:#007aff;line-height:36px;padding-left:6px;text-align:left;">代理商：{{memberName}}</p>
            <!-- 奖金类型 -->
            <div class="titleInfo">
                <div v-for="item in titleInfo" :key="item.id" class="titleDiv" @click="activeChange(item)">
                    <i class="fl"></i>
                    <div class="fr">
                        <p>{{item.title}}</p>
                        <span>{{item.value}}元</span>
                    </div>
                </div>
            </div>
            <!-- 查看其它代理商 -->
            <el-form label-width="140px">
                <el-row>
                    <el-col style="width:420px;">
                        <el-form-item label="查看其它代理商：">
                            <el-input v-model="otherName" size="small" style="width: 200px;"></el-input>
                            <i class="btn-search" @click="searchBtn"></i>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 200px;margin-top:6px;float: right">
                        <el-button size="small" @click="outExcel">导出Excel</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <!-- 表格显示 -->
            <table>
                <tr class="thead">
                    <th width="16%">日期时间</th>
                    <th width="120px">变动VIP提成</th>
                    <th width="120px">结存VIP提成</th>
                    <th width="160px">类型</th>
                    <th width="180px">消费者</th>
                    <th width="200px">消费者订单号</th>
                    <th>说明</th>
                </tr>
                <tr v-for="td in tdes">
                    <td>{{td.datetime}}</td>
                    <td><span :class="[td.value>0?'curr2':'curr']"><span v-if="td.value>0">+</span>{{td.value}}</span>
                    </td>
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
    export default {
        data() {
            return {
                memberName: '',
                titleInfo: [],
                tdes: [],
                lastPage: '',
                currentPage: 1,
                otherName: '',
                type: '1'
            }
        },
        created() {
            this.$axios.post('Member/member_funds', {
                member_id: this.$route.query.member_id,
            })
                .then(res => {
                    if (res.data.code = 200) {
                        this.memberName = res.data.data.member_name
                        this.titleInfo = res.data.data.list
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

            this.$axios.post('Member/member_funds_list', {
                member_id: this.$route.query.member_id,
                member_type: 4,
                type: 1
            })
                .then(res => {
                    if (res.data.code = 200) {
                        this.tdes = res.data.data.list
                        this.lastPage = res.data.data.last_page * 10
                        if (this.tdes == '') {
                            this.$message({
                                message: '无数据',
                                type: 'warning',
                                duration: 1600
                            })
                        }
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'warning',
                            duration: 1600
                        })
                    }
                })
        },
        methods: {
            activeChange(val) {
                switch (val.title) {
                    case 'VIP奖金':
                        this.type = 1
                        break;
                    case '餐餐抢奖金':
                        this.type = 2
                        break;
                    case '提现vip奖金':
                        this.type = 3
                        break;
                    case '提现餐餐抢奖金':
                        this.type = 4
                        break;
                }
                this.$axios.post('Member/member_funds_list', {
                    member_id: this.$route.query.member_id,
                    member_name: this.otherName,
                    member_type: 4,
                    type: this.type
                })
                    .then(res => {
                        if (res.data.code = 200) {
                            this.tdes = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                            if (this.tdes == '') {
                                this.$message({
                                    message: '无数据',
                                    type: 'warning',
                                    duration: 1600
                                })
                            }
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

            // 翻页
            pageChange(val) {

            },
            // 导出excel
            outExcel() {

            },
            // 查看其它代理商
            searchBtn() {
                this.$axios.post('Member/member_funds', {
                    member_name: this.otherName,
                    member_type: 4
                })
                    .then(res => {
                        if (res.data.code = 200) {
                            this.memberName = res.data.data.member_name
                            this.titleInfo = res.data.data.list
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
                this.$axios.post('Member/member_funds_list', {
                    member_name: this.otherName,
                    member_type: 4,
                    type: 1
                })
                    .then(res => {
                        if (res.data.code = 200) {
                            this.tdes = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                            if (this.tdes == '') {
                                this.$message({
                                    message: '无数据',
                                    type: 'warning',
                                    duration: 1600
                                })
                            }
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

        }
    }
</script>

<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .titleInfo {
        padding: 16px 0 10px;
        border-bottom: 1px solid #dcdcdc;
        .titleDiv {
            border: 1px solid #dcdcdc;
            box-sizing: border-box;
            height: 102px;
            width: 220px;
            display: inline-block;
            padding: 10px;
            margin-right: 16px;
            border-radius: 4px;
            cursor: pointer;

            i {
                display: block;
                width: 80px;
                height: 80px;
            }
            &:nth-child(1) {
                margin-left: -44%;
            }
            @media screen and (max-width: 1660px) {
                &:nth-child(1) {
                    margin-left: -200px;
                }
            }
            &:nth-child(1) i {
                background: url('../../assets/image/image-count.png') no-repeat -204px -98px;
            }
            &:nth-child(2) i {
                background: url('../../assets/image/image-count.png') no-repeat -294px -98px;
            }
            &:nth-child(3) i {
                background: url('../../assets/image/image-count.png') no-repeat -374px -98px;
            }
            &:nth-child(4) i {
                background: url('../../assets/image/image-count.png') no-repeat -450px -98px;
            }
            .fr {
                width: 114px;
                line-height: 40px;
                text-align: center;
                h4 {
                    font-size: 15px;
                    font-weight: normal;
                }
                p {
                    color: #e4393c;
                }
                b {
                    color: #242424;
                }
            }
        }

        .active {
            border: 3px solid #ffca2e !important;
        }

    }

    .el-form {
        width: 100%;
        margin: 10px 0;
    }


</style>
