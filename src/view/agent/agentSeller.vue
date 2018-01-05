<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/agent' }">代理商</el-breadcrumb-item>
            <el-breadcrumb-item>商家</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <div class="agentInfo">
                <span>代理：{{agentName}}</span>
                <span>代理地区：{{agentArea}}</span>
                <span>注册会员：{{memberNum}}</span>
                <span>VIP会员：{{vipMemberNum}}</span>
            </div>
            <el-form ref="form" class="condition" label-width="88px">
                <el-row>
                    <el-col style="width:240px;">
                        <el-form-item label="店铺名称">
                            <el-input v-model="storeName" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:220px;">
                        <el-form-item label="商家账号">
                            <el-input v-model="storeAccount" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:380px;">
                        <el-form-item label="商家地区">
                            <el-cascader
                                :options="areas"
                                v-model="area"
                                @change="areaChange"
                                change-on-select
                                class="areaClass"></el-cascader>
                        </el-form-item>
                    </el-col>


                    <el-col style="width:200px;">
                        <el-form-item label="商家状态">
                            <el-select v-model="status" size="small" @change="statusChange">
                                <el-option
                                    v-for="item in statuses"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <!-- button按钮 -->
                    <el-col style="width:32px;margin-left:16px;">
                        <i class="btn-search" @click="searchBtn"></i>
                    </el-col>
                </el-row>
            </el-form>

            <form action="#">
                <table>
                    <tr class="thead">
                        <th width="220px;">店铺</th>
                        <th width="160px">商家账号</th>
                        <th>商家地区</th>
                        <th>商家推荐人</th>
                        <th width="100px">注册会员</th>
                        <th width="100px">VIP会员</th>
                        <th width="100px">VIP收入</th>
                        <th width="100px">上架数量</th>
                        <th width="120px">状态</th>
                    </tr>
                    <tr v-for="td in tdes">
                        <td>
                            <p>{{td.store_name}}</p>
                            <p class="regTime">联系电话：{{td.member_mobile}}</p>
                        </td>
                        <td>{{td.member_name}}</td>
                        <td>{{td.store_address}}</td>
                        <td>
                            <p>{{td.invite_name}}</p>
                            <p>{{td.invite_narea}}</p>
                            <p>{{td.invite_type}}</p>
                            <p>{{td.member_truename}}</p>
                        </td>
                        <td>{{td.invite_member_count}}</td>
                        <td>{{td.invite_vip_count}}</td>
                        <td>{{td.current_vip}}元</td>
                        <td>{{td.sale_goods_num}}</td>
                        <td>
                            <span
                                :class="[td.store_state == '开启'?'curr2':'curr']">{{td.store_state}}</span>
                        </td>


                    </tr>
                </table>
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="pageChange"
                    :total="parseInt(lastPage)">
                </el-pagination>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                agentName: '',
                agentArea: '',
                memberNum: '',
                vipMemberNum: '',
                storeName: '',
                storeAccount: '',
                areas: [],
                area: '',
                statuses: [
                    {
                        label: '关闭',
                        value: '0'
                    },
                    {
                        label: '开启',
                        value: '1'
                    },
                    {
                        label: '审核中',
                        value: '2'
                    }
                ],
                status: '',
                areaId: '',
                streetId: '',

                // table表单
                tdes: [],
                lastPage: '',
                currentPage: 1,

            }
        },
        created() {
            // 查询地址
            this.$axios.post('Adminagent/agent_store_narea', {
                member_id: this.$route.query.member_id,
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.areas = res.data.data
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            // 列表
            this.$axios.post('Adminagent/agent_store', {
                member_id: this.$route.query.member_id,
                member_type: 4
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.agentName = res.data.data.member_name
                        this.agentArea = res.data.data.address
                        this.memberNum = res.data.data.member_num
                        this.vipMemberNum = res.data.data.vip_member_num
                        this.tdes = res.data.data.list
                        this.lastPage = res.data.data.last_page * 10
                        if (this.tdes == '') {
                            this.$message({
                                message:'无数据',
                                type:'warning',
                                duration:1600
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
        methods: {
            // 地区选择
            areaChange(val) {
                this.areaId = val[0]
                this.streetId = val[1] || ''
            },
            // 翻页
            pageChange(val) {
                this.currentPage = val
                this.$axios.post('Adminagent/agent_store', {
                    member_id: this.$route.query.member_id,
                    member_type: 4,
                    store_name: this.storeName,
                    member_name: this.storeAccount,
                    store_state: this.status,
                    town: this.areaId,
                    street: this.streetId,                      // 商家地区选择没做
                    page: this.currentPage
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.tdes = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
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
            // 商家状态
            statusChange(val) {
                this.status = val
                console.log(val)
            },
            // 搜索
            searchBtn() {
                this.$axios.post('Adminagent/agent_store', {
                    member_id: this.$route.query.member_id,
                    member_type: 4,
                    store_name: this.storeName,
                    member_name: this.storeAccount,
                    store_state: this.status,
                    town: this.areaId,
                    street: this.streetId,
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.tdes = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
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
<style lang="scss">
    .areaClass {
        width: 220px;
        /*line-height: 30px;*/
        .el-input {
            width: 220px !important;
        }
        span {
            float: none;
        }
    }
</style>
<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .areaClass {
        width: 220px;
        .el-input {
            width: 220px !important;
        }
    }

    .agentInfo {
        height: 40px;
        line-height: 40px;
        text-align: left;
        font-size: 12px;
        background-color: #eee;
        span {
            padding-left: 10px;
            margin-right: 30px;
        }
        .el-button {
            color: #bfc4fc;
            margin-right: 12px;
            background-color: transparent;
            border: none;
            font-size: 14px;
        }
        i {
            display: inline-block;
            width: 30px;
            height: 18px;
            vertical-align: middle;
            background: url('../../assets/image/image-count.png') -10px -14px;
        }
    }

    .agent .el-button {
        color: #bfc4fc;
        margin-right: 12px;
        background-color: transparent;
        border: none;
        font-size: 14px;
        i {
            display: inline-block;
            width: 30px;
            height: 18px;
            vertical-align: middle;
            background: url('../../assets/image/image-count.png') -10px -14px;
        }
    }

</style>
