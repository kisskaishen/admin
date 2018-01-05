<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/member' }">会员管理</el-breadcrumb-item>
            <el-breadcrumb-item>会员资金管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p style="color:#007aff;line-height:36px;padding-left:6px;text-align:left;">会员：{{member_name}}</p>
            <!-- 奖金类型 -->
            <ul class="moneyType">
                <li v-for="(item,index) in list" :key="index" :class="{active:active}" @click="typeHandler(index)">
                    <i class="fl"></i>
                    <div class="fr">
                        <h4>{{item.title}}</h4>
                        <b>{{item.value}}</b>
                    </div>
                </li>
            </ul>
            <!-- 查看其它会员 -->
            <div class="otherOperate">
                <el-form label-width="110px" class="fl">
                    <el-form-item label="查看其它会员：">
                        <el-input v-model="memberName" size="small"></el-input>
                        <el-tooltip class="item" effect="dark" content="此处需双击查看" placement="right">
                            <i class="btn-search" @click="searchBtn"></i>
                        </el-tooltip>
                        
                    </el-form-item>
                </el-form>
                <p class="fr">
                    <el-button size="small" @click="outExcel">导出Excel</el-button>
                </p>
            </div>
            <!-- 表格显示 -->
            <table v-show="index == 1">
                <tr class="thead">
                    <th width="12%">日期时间</th>
                    <th width="8%">变动VIP提成</th>
                    <th width="8%">结存VIP提成</th>
                    <th width="6%">类型</th>
                    <th width="10%">消费者</th>
                    <th width="14%">消费者订单号</th>
                    <th>说明</th>
                </tr>
                <tr v-for="td in tdes">
                    <td style="color:#8e8e8e;">{{td.datetime}}</td>
                    <td style="color:#e64e50;">+{{td.value}}元</td>
                    <td style="color:#51baf9;">{{td.new_amount}}元</td>
                    <td style="color:#ff9259;">{{td.type}}</td>
                    <td>{{td.user_name}}</td>
                    <td>{{td.order_sn}}</td>
                    <td>{{td.intro}}</td>
                </tr>
            </table>
            <el-pagination
                v-if="pageTotal"
                layout="prev, pager, next"
                @current-change="pageChange"
                :total="parseInt(pageTotal)">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                memberName: '',
                index: '1',
                active: true,

                type: 1,             // 资金类型
            }
        },
        computed:
            mapState({
                list: state => state.memberModule.memberTypeList,
                tdes: state => state.memberModule.memberMoneyList,
                pageTotal: state => state.memberModule.last_page * 10,
                // currentPage: state => state.memberModule.currentPage,
                member_name: state => state.memberModule.member_name
            }),
        created() {
            let data = new FormData()
            data.append('member_id', this.$route.query.member_id)
            this.$store.dispatch('getMoneyTypeList', data)

            let listData = new FormData()
            listData.append('member_id', this.$route.query.member_id)
            listData.append('member_type', this.$route.query.member_type || '')
            // listData.append('type', this.type)
            listData.append('page', 1)
            this.$store.dispatch('getMemberMoneyList', listData)
        },
        methods: {
            // 导出excel
            outExcel() {
                alert(1111)
            },
            // 查询其他会员
            searchBtn() {
                let listData = new FormData()
                listData.append('member_name', this.memberName)
                listData.append('member_type', 4)
                this.$store.dispatch('getMemberMoneyList', listData)
                this.$router.replace({path:'/member/memberMoney',query:{member_id:this.$store.state.memberModule.userInfo.member_id}})
                let data = new FormData()
                data.append('member_id', this.$route.query.member_id)
                this.$store.dispatch('getMoneyTypeList', data)

            },
            // 分页
            pageChange(val) {
                let listData = new FormData()
                listData.append('member_id', this.$route.query.member_id)
                listData.append('member_name', this.memberName)
                listData.append('member_type', this.$route.query.member_type)
                // listData.append('type', this.type)
                listData.append('page', val)
                this.$store.dispatch('getMemberMoneyList', listData)
            },
            // 点击资金分类
            typeHandler(index) {
                this.type = index + 1
                let listData = new FormData()
                listData.append('member_id', this.$route.query.member_id)
                listData.append('member_name', this.memberName)
                listData.append('member_type', this.$route.query.member_type)
                listData.append('type', this.type)
                listData.append('page', 1)
                this.$store.dispatch('getMemberMoneyList', listData)
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }


    .moneyType {
        text-align: left;
        padding-bottom: 16px;
        padding-left: 6px;
        border-bottom: 1px solid #dcdcdc;
    }

    .moneyType li {
        display: inline-block;
        border: 1px solid #dcdcdc;
        box-sizing: border-box;
        height: 102px;
        width: 220px;
        padding: 10px;
        margin-right: 16px;
        border-radius: 4px;
        cursor: pointer;
    }

    .moneyType li h4 {
        color: #242424;
    }

    .active {
        border: 3px solid #ffca2e;
    }

    .otherOperate {
        width: 100%;
        height: 40px;
    }

    .otherOperate .el-form {
        padding-left: 10px;
        margin-top: 0;
    }

    .otherOperate .fr {
        padding-right: 10px;
    }

    .fr {
        width: 114px;
        line-height: 40px;
        text-align: center;
    }

    .fr h4 {
        font-size: 15px;
        font-weight: normal;
    }

    .isActive h4 {
        text-indent: 0;
    }

    .fr p {
        color: #e4393c;
    }

    .moneyType li i {
        display: block;
        width: 80px;
        height: 80px;
    }

    .moneyType li:nth-child(1) i {
        background: url('../../assets/image/image-count.png') -204px -100px;
    }

    .moneyType li:nth-child(2) i {
        background: url('../../assets/image/image-count.png') -294px -100px;
    }

    .moneyType li:nth-child(3) i {
        background: url('../../assets/image/image-count.png') -374px -100px;
    }

    .moneyType li:nth-child(4) i {
        background: url('../../assets/image/image-count.png') -450px -100px;
    }

    .el-input {
        width: 200px;
    }

    .fr b {
        color: #242424;
    }


</style>
