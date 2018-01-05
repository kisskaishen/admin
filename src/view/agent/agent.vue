<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>代理商</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <el-form ref="form" class="condition" label-width="100px">
                <el-row>
                    <!-- 按店铺名称查询 -->
                    <el-col>
                        <el-form-item label="代理商名称">
                            <el-input v-model="agentName" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- 商家地区 -->
                    <el-col style="width:376px;">
                        <el-form-item label="代理地区">
                            <address-select
                                @positionPro="listenProvince"
                                @positionCity="listenCity"></address-select>
                        </el-form-item>
                    </el-col>
                    <!-- 商家状态 -->
                    <el-col>
                        <el-form-item label="代理级别">
                            <el-select v-model="levelVal" size="small" @change="levelChange">
                                <el-option
                                    v-for="item in leveles"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- 按商家账号 -->
                    <el-col>
                        <el-form-item label="加入时间">
                            <el-date-picker
                                v-model="joinDate"
                                type="date"
                                size="small"
                                placeholder="加入日期"
                                @change="dateChange">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <!-- button按钮 -->
                    <el-col style="width:32px;margin-left:16px;">
                        <i class="btn-search" @click="searchBtn"></i>
                    </el-col>


                    <p class="agent">
                        <router-link to="/agent/addAgent" class="fr">
                            <el-button size="small"><i class="addAgent"></i>添加代理</el-button>
                        </router-link>
                    </p>
                </el-row>
            </el-form>

            <form action="#">
                <table>
                    <tr class="thead">
                        <th width="200px">代理名称</th>
                        <th>级别</th>
                        <th>级别地区</th>
                        <th>下级代理</th>
                        <th>运营商</th>
                        <th>商家</th>
                        <th>会员</th>
                        <th>VIP会员</th>
                        <th>VIP奖金</th>
                        <th>餐餐抢奖金</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="td in tdes">
                        <td>
                            <p>{{td.member_mobile}}</p>
                            <p>{{td.member_name}}</p>
                            <p class="regTime">加入时间：{{td.member_time}}</p>
                        </td>
                        <td>{{td.level}}</td>
                        <td>{{td.narea}}</td>
                        <td>
                            <span @click="agentClick(td)">{{td.invite_daili_count}}</span>
                        </td>
                        <td>
                            <span @click="carriorClick(td)">{{td.invite_yunying_count}}</span>
                        </td>
                        <td>
                            <span @click="sellerClick(td)">{{td.invite_store_count}}</span>
                        </td>
                        <td>
                            <span @click="memberClick(td)">{{td.invite_member_count}}</span>
                        </td>
                        <td>
                            <span @click="vipMemberClick(td)">{{td.invite_vip_count}}</span>
                        </td>
                        <td>
                            <router-link
                                :to="{path:'/agent/agentMoney',query:{member_id:td.member_id}}"
                            ><span class="curr2">{{td.current_vip}}元</span>
                            </router-link>
                        </td>
                        <td>
                            <router-link
                                :to="{path:'/agent/agentMoney',query:{member_id:td.member_id}}"
                            ><span class="curr3">{{td.current_chan}}元</span>
                            </router-link>
                        </td>
                        <td>
                            <router-link :to="{path:'/agent/watchAgent',query:{member_id:td.member_id}}"><span
                                style="color:#007aff;">{{td.is_see}}</span>
                            </router-link>
                            <em>|</em>
                            <router-link :to="{path:'/agent/reviseAgent',query:{member_id:td.member_id}}"><span style="color:#007aff;">{{td.is_example}}</span>
                            </router-link>
                            <em>|</em>
                            <span style="color:#e64e50;" @click="clickClose(td)">{{td.is_close}}</span>
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
    import AddressSelect from '@/components/public/addressSelect2'

    export default {
        data() {
            return {
                agentName: '',
                leveles: [
                    {
                        value: '',
                        label: '不限'
                    },
                    {
                        value: '2',
                        label: '市'
                    },
                    {
                        value: '3',
                        label: '区'
                    },
                    {
                        value: '4',
                        label: '街道/镇'
                    }
                ],
                levelVal: '',
                joinDate: '',

                provinceId: '',
                cityId: '',
                currentPage: 1,

            }
        },

        created() {
            this.$store.dispatch('getAgentList')
        },
        computed: {
            tdes() {
                return this.$store.state.agentModule.agentList
            },
            lastPage() {
                return this.$store.state.agentModule.lastPage * 10
            }
        },
        components: {AddressSelect},
        methods: {
            // 下级代理
            agentClick(val) {
                if (val.invite_daili_count == 0) {
                    this.$message.warning('无下级代理！')
                } else {
                    this.$router.push({path:'/showList/agent',query:{member_id:val.member_id,member_type:4}})
                }
            },
            // 下级运营商
            carriorClick(val) {
                if (val.invite_yunying_count == 0) {
                    this.$message.warning('无下级运营商！')
                } else {
                    this.$router.push({path:'/showList/carrior',query:{member_id:val.member_id,member_type:4}})
                }
            },
            // 商家
            sellerClick(val) {
                if (val.invite_store_count == 0) {
                    this.$message.warning('无商家！')
                } else {
                    this.$router.push({path:'/showList/seller',query:{member_id:val.member_id,member_type:4}})
                }
            },
                                    
            // 会员
            memberClick(val) {
                if (val.invite_member_count == 0) {
                    this.$message.warning('无会员！')
                } else {
                    this.$router.push({path:'/showList/member',query:{member_id:val.member_id,member_type:4}})
                }
            },
            // VIP会员
            vipMemberClick(val) {
                if (val.invite_vip_count == 0) {
                    this.$message.warning('无VIP会员！')
                } else {
                    this.$router.push({path:'/showList/member',query:{member_id:val.member_id,member_type:4,is_vip:1}})
                }
            },
            // 省市选择
            listenProvince(val) {
                this.provinceId = val
            },
            listenCity(val) {
                this.cityId = val
            },
            // 代理级别选择
            levelChange(val) {
                console.log(val)
                this.levelVal = val
            },
            // 加入日期选择
            dateChange(val) {
                this.joinDate = val
            },
            // 翻页
            pageChange(val) {
                this.currentPage = val
                let data = new FormData()
                data.append('member_name', this.agentName)
                data.append('narea_p', this.provinceId)
                data.append('narea_s', this.cityId)
                data.append('member_time', this.joinDate)
                data.append('narea_type', this.levelVal)
                data.append('page', this.currentPage)
                this.$store.dispatch('getAgentList', data)
            },
            // 条件查询
            searchBtn() {
                let data = new FormData()
                data.append('member_name', this.agentName)
                data.append('narea_p', this.provinceId)
                data.append('narea_s', this.cityId)
                data.append('member_time', this.joinDate)
                data.append('narea_type', this.levelVal)
                data.append('page', 1)
                this.$store.dispatch('getAgentList', data)
            },
            // 关闭/冻结
            clickClose(val) {
                if (val.is_close == '冻结') {
                    this.$axios.post('Agent/change_status', {
                        member_id: val.member_id,
                        member_name: this.$local.fetch('info').member_name,
                        member_type: 4,
                        status: 2
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success',
                                    duration: 1600
                                })
                                setTimeout('location.reload()', 1600)
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
                } else {
                    this.$axios.post('Agent/change_status', {
                        member_id: val.member_id,
                        member_name: this.$local.fetch('info').member_name,
                        member_type: 4,
                        status: 40
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: res.data.message,
                                    type: 'success',
                                    duration: 1600
                                })
                                setTimeout('location.reload()', 1600)
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
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .agent {
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

    .el-select {
        width: 120px;
    }


</style>
