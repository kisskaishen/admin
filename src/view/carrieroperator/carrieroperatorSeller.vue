<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/carrieroperator' }">运营商</el-breadcrumb-item>
            <el-breadcrumb-item>商家</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <div class="carrieroperatorInfo">
                <span>运营：{{titleInfo.member_name}}</span>
                <span>运营地区：{{titleInfo.address}}</span>
                <span>注册会员：{{titleInfo.member_num}}</span>
                <span>VIP会员：{{titleInfo.vip_member_num}}</span>
                <p>前当代理餐餐抢商家: <b class="error">{{titleInfo.total}}</b>家,可根据条件时行详细筛选</p>
            </div>
            <el-form ref="form" class="condition" label-width="88px">
                <el-row>
                    <el-col>
                        <el-form-item label="店铺名称">
                            <el-input v-model="store_name" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="商家账号">
                            <el-input v-model="member_name" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="商家状态">
                            <el-select v-model="status" size="small" placeholder="请选择" @change="statusChange">
                                <el-option
                                    v-for="item in statuses"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col style="width: 620px;">
                        <el-form-item label="商家区域">
                            <address-select
                                @listenProvince="listenProvince"
                                @listenCity="listenCity"
                                @listenArea="listenArea"
                                @listenStreet="listenStreet"></address-select>
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
                        <th width="160px">店铺</th>
                        <th>商家账号</th>
                        <th width="20%">商家地区</th>
                        <th>商家推荐人</th>
                        <th width="8%">注册会员</th>
                        <th width="8%">VIP会员</th>
                        <th width="8%">VIP收入</th>
                        <th width="8%">上架数量</th>
                        <th width="10%">状态</th>
                    </tr>
                    <tr v-for="td in tdes">
                        <td>
                            <p>{{td.store_name}}</p>
                            <p class="regTime">联系电话：{{td.phone}}</p>
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
                        <td>{{td.current_vip}}</td>
                        <td>{{td.sale_goods_num}}</td>
                        <td>
                            <span :class="[td.store_state == '开启'?'curr2':'curr']">{{td.store_state}}</span>
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
    import AddressSelect from '../../components/public/addressSelect5'

    export default {
        data() {
            return {

                store_name: '',
                member_name: '',
                statuses: [
                    {
                        label: '不限',
                        value: ''
                    },
                    {
                        label: '开启',
                        value: '1'
                    },
                    {
                        label: '关闭',
                        value: '-1'
                    }
                ],
                status: '',

                // 地址
                provinceId: '',
                cityId: '',
                areaId: '',
                streetId: '',


            }
        },
        components: {AddressSelect},
        created() {
            let data = new FormData()
            data.append('member_id', this.$route.query.member_id)
            data.append('member_type', 5)
            this.$store.dispatch('getSellerList', data)
        },
        computed: {
            tdes() {
                return this.$store.state.carriorModule.list
            },
            lastPage() {
                return this.$store.state.carriorModule.lastPage
            },
            titleInfo() {
                return this.$store.state.carriorModule.titleInfo
            }
        },
        methods: {
            // 省市区街道选择
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
            // 状态选择
            statusChange(val) {
                this.status = val
            },
            // 翻页
            pageChange(val) {
                let data = new FormData()
                data.append('member_id', this.$route.query.member_id)
                data.append('member_type', 5)
                data.append('store_name', this.store_name)
                data.append('member_name', this.member_name)
                data.append('store_state', this.status)
                data.append('province', this.provinceId)
                data.append('city', this.cityId)
                data.append('town', this.areaId)
                data.append('street', this.streetId)
                data.append('page', val)
                this.$store.dispatch('getSellerList', data)
            },
            // 搜索查询
            searchBtn() {
                let data = new FormData()
                data.append('member_id', this.$route.query.member_id)
                data.append('member_type', 5)
                data.append('store_name', this.store_name)
                data.append('member_name', this.member_name)
                data.append('store_state', this.status)
                data.append('province', this.provinceId)
                data.append('city', this.cityId)
                data.append('town', this.areaId)
                data.append('street', this.streetId)
                data.append('page', 1)
                this.$store.dispatch('getSellerList', data)
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .carrieroperatorInfo {
        line-height: 40px;
        text-align: left;
        font-size: 12px;
        background-color: #eee;
        span {
            padding-left: 10px;
            margin-right: 30px;
        }
        p {
            padding-left: 10px;
        }

    }


</style>
