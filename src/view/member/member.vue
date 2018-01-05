<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>会员管理</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <div class="loading" v-if="loading">
                Loading...
            </div>
            <el-row class="title">
                <el-col :span="24">
                    <div class="fl switch">
                        <router-link to="/member" class="curr">管理会员</router-link>
                        <router-link to="/member/addMember">新增会员</router-link>
                    </div>
                    <div class="fr total">
                        <span>会员总数：{{memberTotal}}</span>
                        <span>VIP会员：{{memberVipTotal}}</span>
                    </div>
                </el-col>
            </el-row>

            <el-row class="condition" style="padding-left: 10px">
                <!-- 按名称搜索选择 -->
                <el-col style="width: 244px;margin-right: 10px">
                    <el-select v-model="typeVal" size="small" @change="typeChange">
                        <el-option
                            v-for="item in types"
                            :label="item.label"
                            :key="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                    <el-input v-model="searchVal" size="small"></el-input>
                </el-col>

                <!-- 按排序 -->
                <el-col>
                    <el-select v-model="sortVal" size="small" placeholder="排序" @change="sortChange">
                        <el-option
                            v-for="item in sortes"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>

                <!-- 会员状态 -->
                <el-col>
                    <el-select v-model="statusVal" size="small" placeholder="登录状态" @change="statusChange">
                        <el-option
                            v-for="item in statuses"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>

                <!-- 推荐人身份 -->
                <el-col>
                    <el-select v-model="refereeVal" size="small" placeholder="推荐人身份" @change="refereeChange">
                        <el-option
                            v-for="item in referees"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>

            </el-row>
            <!-- VIP有效期 -->
            <el-row style="padding-left:10px;">
                <el-col style="width: 336px;">
                    <el-form label-width="80px">
                        <el-form-item label="注册日期">
                            <el-date-picker
                                v-model="addStartDate"
                                type="date"
                                @change="addStartDateChange"
                                placeholder="开始日期"
                                size="small"
                                style="width: 120px;">
                            </el-date-picker>
                            ~
                            <el-date-picker
                                v-model="addEndDate"
                                type="date"
                                @change="addEndDateChange"
                                placeholder="结束日期"
                                size="small"
                                style="width: 120px;">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col style="width: 336px;margin-left:20px;">
                    <el-form label-width="80px">
                        <el-form-item label="VIP有效期">
                            <el-date-picker
                                v-model="startDate"
                                type="date"
                                @change="startDateChange"
                                placeholder="开始日期"
                                size="small"
                                style="width: 120px;">
                            </el-date-picker>
                            ~
                            <el-date-picker
                                v-model="endDate"
                                type="date"
                                @change="endDateChange"
                                placeholder="结束日期"
                                size="small"
                                style="width: 120px;">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                </el-col>
                <!-- button按钮 -->
                <el-col style="width:100px;">
                    <i class="btn-search" @click="searchBtn"></i>
                </el-col>

                <el-col style="float:right;width:100px;margin-right:20px;">
                    <el-button type="primary" @click="outExcel">导出Excel</el-button>
                </el-col>
            </el-row>
            <div class="tip">
                <p style="font-size:14px;">操作提示</p>
                <p>1、通过会员管理你可以进行查看、编辑会员资料等操作</p>
                <p>2、你可以根据条件搜索会员，然后选择相应的操作;</p>
            </div>
            <form action="#">
                <table>
                    <tr class="thead">
                        <th width="18%">会员</th>
                        <th width="10%">登陆次数</th>
                        <th width="10%">最后登录</th>
                        <th width="10%">推荐人</th>
                        <th width="10%">推荐的会员</th>
                        <th width="8%">VIP状态</th>
                        <th width="8%">登录</th>
                        <th width="8%">VIP奖金</th>
                        <th width="8%">餐餐抢券</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="td in tdes">
                        <td>
                            <p>{{td.member_name}}</p>
                            <p>真实姓名-{{td.name}}</p>
                            <p class="regTime">注册时间：{{td.member_time}}</p>
                        </td>
                        <td>{{td.member_login_num}}</td>
                        <td>
                            <p>{{td.member_login_time}}</p>
                            <p>{{td.member_login_ip}}</p>
                        </td>
                        <td>
                            <p>{{td.inviter_name}}</p>
                            <p>{{td.refereeIdentity}}</p>
                        </td>
                        <td>
                            <span class="curr" @click="memberClick(td)">{{td.invite_member_count}} </span>
                                <!-- <router-link :to="{path:'/showList/member',}"></router-link> -->
                           
                        </td>
                        
                        <td>
                            <p>{{td.validity}}</p>
                            <p>{{td.vip_endtime}}</p>
                        </td>
                        <td>{{td.status}}</td>
                        <td class="attrColor">{{td.current_vip}}元</td>
                        <td class="attrColor">{{td.current_chan}}元</td>
                        <td>
                            <router-link :to="{path:'/member/editMember',query:{member_id:td.member_id}}"><span
                                style="color:#007aff;">编辑</span></router-link>
                            <em>|</em>
                            <router-link
                                :to="{path:'/member/memberMoney',query:{member_id:td.member_id,member_name:td.member_name}}"><span
                                style="color:#007aff;">详细奖金</span></router-link>
                            <em>|</em>
                            <span style="color:#e64e50;">锁定</span>
                        </td>
                    </tr>
                </table>
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="parseInt(pageTotal)">
                </el-pagination>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                // 按名称搜索选择
                types: [
                    {
                        value: 'member_name',
                        label: '会员名称'
                    },
                    {
                        value: 'member_mobile',
                        label: '手机号码'
                    },
                    {
                        value: 'member_truename',
                        label: '姓名'
                    },
                    {
                        value: 'member_email',
                        label: '邮件地址'
                    }
                ],
                typeVal: 'member_name',
                searchVal: '',
                //按排序
                sortes: [
                    {
                        value: '',
                        label: '排序'
                    },
                    {
                        value: '1',
                        label: '注册时间'
                    },
                    {
                        value: '2',
                        label: '登录次数'
                    },
                    {
                        value: '3',
                        label: '是否为VIP'
                    }
                ],
                sortVal: '',
                //按登录状态
                statuses: [
                    {
                        value: '',
                        label: '登录状态'
                    },
                    {
                        value: '1',
                        label: '允许'
                    },
                    {
                        value: '2',
                        label: '禁止'
                    }
                ],
                statusVal: '',
                //按推荐人身份
                referees: [
                    {
                        value: '',
                        label: '推荐人身份'
                    },
                    {
                        value: '9',
                        label: '会员'
                    },
                    {
                        value: '1',
                        label: '商家'
                    },
                    {
                        value: '5',
                        label: '运营商'
                    },
                    {
                        value: '4',
                        label: '代理'
                    }
                ],
                refereeVal: '',
                //VIP有效期
                startDate: '',
                endDate: '',
                // 注册日期
                addStartDate:'',
                addEndDate:'',
                loading: false,
                currentPage: 1,


            }

        },
        computed:
            mapState({
                tdes: state => state.memberModule.memberList,
                memberTotal: state => state.memberModule.memberTotal,
                memberVipTotal: state => state.memberModule.VipMember,
                pageTotal: state => state.memberModule.last_page * 10,

            }),
        created() {
            this.$store.dispatch('getMemberList')
        },
        methods: {
            // outExcel
            outExcel() {
                location.href = this.$baseUrl + 'Member/member_list?search_field_name='+this.typeVal+'&search_field_value='+this.searchVal+'&search_state='+this.statusVal+'&search_sort='+this.sortVal+'&search_inviter_type='+this.refereeVal+'&query_start_time='+this.startDate+'&query_end_time='+this.endDate+'&add_start_time='+this.addStartDate+'&add_end_time='+this.addEndDate+'&page='+this.currentPage+'&is_outexcel=1'
            },
            // 点击推荐会员跳转
            memberClick(val) {
                if(val.invite_member_count == '0') {
                    this.$message.warning('无推荐会员！')
                } else {
                    this.$router.push({path:'/showList/member',query:{member_id:val.member_id,member_type:0}})
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val
                let data = new FormData()
                data.append('search_field_name', this.typeVal)
                data.append('search_field_value', this.searchVal)
                data.append('search_state', this.statusVal)
                data.append('search_sort', this.sortVal)
                data.append('search_inviter_type', this.refereeVal)
                data.append('query_start_time', this.startDate)
                data.append('query_end_time', this.endDate)
                data.append('add_start_time', this.addStartDate)
                data.append('add_end_time', this.addEndDate)
                data.append('page', this.currentPage)
                this.$store.dispatch('getMemberList', data)
            },

            // 类型选择
            typeChange(val) {
                this.typeVal = val
            },
            // 排序选择
            sortChange(val) {
                this.sortVal = val
            },
            // 会员状态
            statusChange(val) {
                this.statusVal = val
            },
            // 推荐人身份
            refereeChange(val) {
                this.refereeVal = val
            },
            // 时间
            startDateChange(val) {
                this.startDate = val
            },
            endDateChange(val) {
                this.endDate = val
            },

            addStartDateChange(val) {
                this.addStartDate = val
            },
            addEndDateChange(val) {
                this.addEndDate = val
            },

            // 点击搜索按钮
            searchBtn() {
                let data = new FormData()
                data.append('search_field_name', this.typeVal)
                data.append('search_field_value', this.searchVal)
                data.append('search_state', this.statusVal)
                data.append('search_sort', this.sortVal)
                data.append('search_inviter_type', this.refereeVal)
                data.append('query_start_time', this.startDate)
                data.append('query_end_time', this.endDate)
                data.append('add_start_time', this.addStartDate)
                data.append('add_end_time', this.addEndDate)
                data.append('page', 1)
                this.$store.dispatch('getMemberList', data)
            }

        }
    }
</script>

<style scoped lang="scss">
    .condition {
        .el-col {
            width: 140px;
        }
    }

    .switch a.curr {
        border-left: none;
        margin-left: -2px;
    }

    .attrColor {
        color: #e4393c;
    }

    table p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    /*@import "../../assets/css/member_part.css";*/
</style>
