<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>运营商</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <el-form ref="form" class="condition" label-width="80px">
                <el-row>
                    <el-col style="width:250px;">
                        <el-form-item label-width="0px">
                            <el-select v-model="chooseVal" size="small" @change="chooseChange">
                                <el-option
                                    v-for="item in chooses"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-model="chooseName" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="类型" label-width="60px">
                            <el-select v-model="typeVal" size="small" @change="typeChange">
                                <el-option
                                    v-for="item in types"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="加入时间" @change="joinChange">
                            <el-date-picker
                                v-model="joinVal"
                                type="date"
                                size="small">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="状态">
                            <el-select v-model="statusVal" size="small" @change="statusChange">
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
                    <el-col style="width:620px;">
                        <el-form-item label="运营商注册地" label-width="100px">
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
                    <p class="agent">
                        <router-link to="/Carrieroperator/addCarrieroperator" class="fr">
                            <el-button size="small"><i class="addCarrieroperator"></i>添加运营商</el-button>
                        </router-link>
                    </p>
                </el-row>
            </el-form>

            <form action="#">
                <table>
                    <tr class="thead">
                        <th width="200px">运营商名称</th>
                        <th width="200px">注册地</th>
                        <th>推荐人</th>
                        <th>类型</th>
                        <th width="6%">是否缴费</th>
                        <th>推荐运营商</th>
                        <th width="6%">推荐商家</th>
                        <th width="6%">注册会员</th>
                        <th width="6%">VIP会员</th>
                        <th width="6%">VIP奖金</th>
                        <th width="7%">餐餐抢奖金</th>
                        <th width="6%">状态</th>
                        <th width="10%">操作</th>
                    </tr>
                    <tr v-for="td in tdes">
                        <td>
                            <p>手机号：{{td.member_mobile}}</p>
                            <p>账号：{{td.member_name}}</p>
                            <p>真实姓名：{{td.member_truename}}</p>
                            <p class="regTime">加入时间：{{td.member_time}}</p>
                        </td>
                        <td>{{td.narea}}</td>
                        <td>
                            <p>{{td.invite_name}}</p>
                            <p>{{td.invite_mobile}}</p>
                            <p>({{(td.invite_narea)}})</p>
                        </td>
                        <td>
                            <p>{{td.identity}}</p>
                            <p v-if="td.endtime"><span v-if="td.endtime!='已过期'">到期时间:</span>{{td.endtime}}</p>
                        </td>
                        <td>
                            <p :class="[td.ispay=='已缴'?'':'curr4']">{{td.ispay}}</p>
                        </td>
                        <td>
                            <span style="color:#ff5269;" @click="carriorClick(td)">{{td.invite_yunying_count}}</span>
                        </td>
                        <td>
                            <span style="color:#9930ff;" @click="sellerClick(td)">{{td.invite_store_count}}</span>
                        </td>
                        <td>
                            <span style="color:#0fd0f9;" @click="memberClick(td)">{{td.invite_member_count}}</span>
                        </td>
                        <td>
                            <span style="color:#0fd0f9;" @click="vipMemberClick(td)">{{td.invite_vip_count}}</span>
                        </td>
                        <td>
                            <router-link
                                :to="{path:'/Carrieroperator/carrieroperatorMoney',query:{member_id:td.member_id}}">
                                {{td.current_vip}}元
                            </router-link>
                        </td>
                        <td>
                            <router-link
                                :to="{path:'/Carrieroperator/carrieroperatorMoney',query:{member_id:td.member_id,is_ccq:2}}">
                                {{td.current_chan}}元
                            </router-link>
                        </td>
                        <td><span
                            :class="[td.status_info == '正常'?'curr2':td.status_info == '审核中'?'curr4':'currs']">{{td.status_info}}</span>
                        </td>
                        <td>
                            <router-link
                                :to="{path:'/Carrieroperator/watchCarrieroperator',query:{member_id:td.member_id}}"><span
                                style="color:#007aff;">{{td.is_see}}</span></router-link>
                            <em>|</em>
                            <router-link
                                :to="{path:'/Carrieroperator/reviseCarrieroperator',query:{member_id:td.member_id,type:td.is_example=='审核'?'check':'revise'}}"><span
                                style="color:#007aff;">{{td.is_example}}</span></router-link>
                            <em>|</em>
                            <span style="color:#e64e50;">{{td.is_close}}</span>
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
    import AddressSelect from '@/components/public/addressSelect6'

    export default {
        data() {
            return {
                chooses: [
                    {
                        value: '1',
                        label: '运营商账号'
                    },
                    {
                        value: '2',
                        label: '运营商推荐人'
                    },
                    {
                        value: '3',
                        label: '运营商姓名'
                    },
                    {
                        value: '4',
                        label: '运营商手机号'
                    }
                ],
                chooseVal: '1',
                chooseName: '',
                //按登录状态
                types: [
                    {
                        value: '1',
                        label: '正式'
                    },
                    {
                        value: '2',
                        label: '分期(年缴)'
                    },
                    {
                        value: '3',
                        label: '合伙(月缴)'
                    },
                ],
                typeVal: '',
                // 加入时间
                joinVal: '',
                statuses: [
                    {
                        value: '',
                        label: '不限'
                    },
                    {
                        value: '1',
                        label: '正常'
                    },
                    {
                        value: '2',
                        label: '关闭'
                    },
                    {
                        value: '3',
                        label: '审核中'
                    }
                ],
                statusVal: '',

                province: '',
                city: '',
                area: '',
                street: '',

            }
        },
        components: {AddressSelect},
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
        created() {
            let data = new FormData()
            data.append('type', 5)
            this.$store.dispatch('getList', data)
        },
        methods: {
            // 运营商
            carriorClick(val) {
                if (val.invite_yunying_count == 0) {
                    this.$message.warning('无运营商！')
                } else {
                    this.$router.push({path:'/showList/carrior',query:{member_id:val.member_id,member_type:5}})
                }
            },
           // 商家
            sellerClick(val) {
                if (val.invite_store_count == 0) {
                    this.$message.warning('无商家！')
                } else {
                    this.$router.push({path:'/showList/seller',query:{member_id:val.member_id,member_type:5}})
                }
            },
            // 会员
            memberClick(val) {
                if (val.invite_member_count == 0) {
                    this.$message.warning('无会员！')
                } else {
                    this.$router.push({path:'/showList/member',query:{member_id:val.member_id,member_type:5}})
                }
            },
            // VIP会员
            vipMemberClick(val) {
                if (val.invite_vip_count == 0) {
                    this.$message.warning('无VIP会员！')
                } else {
                    this.$router.push({path:'/showList/member',query:{member_id:val.member_id,member_type:5,is_vip:1}})
                }
            },
            // 省市区街道选择
            listenProvince(val) {
                this.province = val
            },
            listenCity(val) {
                this.city = val
            },
            listenArea(val) {
                this.area = val
            },
            listenStreet(val) {
                this.street = val
            },

            // 条件筛选
            chooseChange(val) {
                this.chooseVal = val
            },
            typeChange(val) {
                this.typeVal = val
            },
            statusChange(val) {
                this.statusVal = val
            },
            joinChange(val) {
                this.joinVal = val
            },

            // 搜索
            searchBtn() {
                let data = new FormData()
                data.append('name_type', this.chooseVal)
                data.append('member_name', this.chooseName)
                data.append('narea_info', this.province + '' + this.city + '' + this.area + '' + this.street)
                data.append('member_time', this.joinVal)
                data.append('identity', this.typeVal)
                data.append('status', this.statusVal)
                data.append('type', 5)
                this.$store.dispatch('getList', data)
            },
            // 翻页
            pageChange(val) {
                let data = new FormData()
                data.append('name_type', this.chooseVal)
                data.append('member_name', this.chooseName)
                data.append('narea_info', this.province + '' + this.city + '' + this.area + '' + this.street)
                data.append('member_time', this.joinVal)
                data.append('identity', this.typeVal)
                data.append('status', this.statusVal)
                data.append('type', 5)
                data.append('page', val)
                this.$store.dispatch('getList', data)
            }
        }
    }
</script>

<style scoped lang="scss">
    .condition {
        padding-left: 10px;
    }

    .agent .el-button {
        color: #bfc4fc;
        margin-right: 12px;
        background-color: transparent;
        border: none;
        font-size: 14px;
    }

    .agent i {
        display: inline-block;
        width: 30px;
        height: 18px;
        vertical-align: middle;
        background: url('../../assets/image/image-count.png') -10px -14px;
    }

    .tip span {
        display: inline-block;
        height: 10px;
        line-height: 10px;
        padding-left: 10px;
        margin-right: 10px;
        color: #242424;
    }

    .tip span:nth-child(1) {
        border-left: 10px solid #00d138;
    }

    .tip span:nth-child(2) {
        border-left: 10px solid #ff8846;
    }

    .tip span:nth-child(3) {
        border-left: 10px solid #e4393c;
    }

    .el-select {
        width: 120px;
    }

    @import "../../assets/css/base.css";
    @import "../../assets/css/carrieroperator_part.css";

    @media screen and (max-width: 1660px) {
        .referee {
            float: none;
        }
    }


</style>
