<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item><span @click="goBack">返回上一级</span></el-breadcrumb-item>
            <el-breadcrumb-item :to="this.$route.query.member_type==5?'/carrierOperator':'/agent'">{{this.$route.query.member_type==5?'运营商':'代理商'}}</el-breadcrumb-item>
            <el-breadcrumb-item>商家</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <div class="agentInfo">
                <span>{{this.$route.query.member_type==5?'运营':'代理'}}：{{sellerInfo.member_name}}</span>
                <span>地区：{{sellerInfo.address}}</span>
                <span>注册会员：{{sellerInfo.member_num}}</span>
                <span>VIP会员：{{sellerInfo.vip_member_num}}</span>
            </div>
            <el-form ref="form" class="condition" label-width="88px">
                <el-row>
                    <el-col style="width:256px;">
                        <el-form-item label-width="0">
                            <el-select v-model="type" size="small" @change="typeChange"> 
                                <el-option
                                    v-for="item in types"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                            <el-input v-model="searchName" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <!-- <el-col style="width:310px;">
                        <el-form-item label="商家地区">
                            <el-cascader
                                :options="areas"
                                v-model="area"
                                @change="areaChange"
                                change-on-select
                                class="areaClass"></el-cascader>
                        </el-form-item>
                    </el-col> -->

                    <el-col>
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

                    <el-col style="width:350px;">
                        <el-form-item label="添加时间">
                            <el-date-picker
                                v-model="startDate"
                                type="date"
                                placeholder="开始时间"
                                size="small"
                                @change="startChange">
                            </el-date-picker>
                            ~
                            <el-date-picker
                                v-model="endDate"
                                type="date"
                                placeholder="结束时间"
                                size="small"
                                @change="endChange">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>                  

                    <!-- button按钮 -->
                    <el-col style="width:32px;margin-left:16px;">
                        <i class="btn-search" @click="searchBtn"></i>
                    </el-col>

                    <el-col>
                        <el-button @click="outExcel">导出Excel</el-button>
                    </el-col>
                </el-row>
            </el-form>

            <form action="#">
                <table>
                    <tr class="thead">
                        <th width="200px;">店铺</th>
                        <th width="120px">商家账号</th>
                        <th>商家地区</th>
                        <!-- <th>商家推荐人</th> -->             <!-- 20171128老大原型要求删除 -->
                        <th width="140px">添加时间</th>
                        <th width="100px">注册会员</th>
                        <th width="100px">VIP会员</th>
                        <!-- <th width="100px">VIP收入</th> -->
                        <th width="80px">上架数量</th>
                        <th width="60px">订单</th>
                        <th width="60px">验券</th>
                        <th width="80px">验证率</th>
                        <th width="100px">状态</th>
                    </tr>
                    <tr v-for="td in tdes">
                        <td>
                            <p>{{td.store_name}}</p>
                            <p class="regTime">联系电话：{{td.phone}}</p>
                        </td>
                        <td>{{td.member_name}}</td>
                        <td>{{td.store_address}}</td>
                <!--         <td>
                            <p>{{td.invite_name}}</p>
                            <p>{{td.invite_narea}}</p>
                            <p>{{td.invite_type}}</p>
                            <p>{{td.member_truename}}</p>
                        </td> -->
                        <td>{{td.addtime}}</td>           <!-- 添加时间 -->
                        <td>
                            <span @click="memberClick(td)">{{td.invite_member_count}}</span>
                        </td>
                        <td>
                            <span @click="vipMemberClick(td)">{{td.invite_vip_count}}</span>
                        </td>
                        <td>{{td.sale_goods_num}}</td>
                        <td>{{td.order_count}}</td>          <!-- 订单 -->
                        <td>{{td.order_checked_count}}</td>          <!-- 验券 -->
                        <td><router-link :to="{path:'/chart/sellerChart',query:{store_id:td.store_id}}">{{td.order_checked_rate}}%</router-link></td>          <!-- 验证率 -->
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
                sellerInfo:'',
                areas: [],
                area: '',
                types:[
                    {
                        label:'商家名称',
                        value:'1'
                    },
                    {
                        label:'商家账号',
                        value:'2'
                    }
                ],
                type:'1',
                searchName:'',
                statuses: [
                    {
                        label: '关闭',
                        value: '-1'
                    },
                    {
                        label: '开启',
                        value: '1'
                    }
                ],
                status: '',
                areaId: '',
                streetId: '',

                startDate:'',
                endDate:'',

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
            this.getList(1)
            
        },
        methods: {
            // 导出
            outExcel() {
                let type1 = this.type == 1?this.searchName:''
                let type2 = this.type == 1?'':this.searchName
                location.href = this.$baseUrl+'Adminagent/agent_store?member_id='+this.$route.query.member_id+'&member_type='+this.$route.query.member_type+'&store_name='+type1+'&member_name='+type2+'&store_state='+this.status+'&query_start_time='+this.startDate+'&query_end_time='+this.endDate+'&is_outexcel=1'
                return
                location.href = this.$baseUrl+'Adminagent/agent_store?member_id='+this.$route.query.member_id+'&member_type='+this.$route.query.member_type+'&store_name='+this.type==1?this.searchName:''+'&member_name='+this.type==1?'':this.searchName+'&store_state='+this.status+'&query_start_time='+this.startDate+'&query_end_time='+this.endDate+'&is_outexcel=1'
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
            // 返回上一级
            goBack(){
                history.go(-1)
            },
            // 日期选择
            startChange(val) {
                this.startDate = val
            },
            endChange(val) {
                this.endDate = val
            },
            // 地区选择
            areaChange(val) {
                this.areaId = val[0]
                this.streetId = val[1] || ''
            },
            // 翻页
            pageChange(val) {
                this.getList(val)
            },
            // 商家名称/商家账号
            typeChange(val) {
                this.type = val
            },
            // 商家状态
            statusChange(val) {
                this.status = val
            },
            // 搜索
            searchBtn() {
                this.getList(1)
            },

            // 列表
            getList(val) {
                this.$axios.post('Adminagent/agent_store', {
                    member_id: this.$route.query.member_id,
                    member_type: this.$route.query.member_type,
                    store_name: this.type == 1?this.searchName:'',
                    member_name: this.type == 1?'':this.searchName,
                    query_start_time:this.startDate,
                    query_end_time:this.endDate,
                    store_state: this.status,
                    town: this.areaId,
                    street: this.streetId,
                    page:val
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            if (res.data.data.list == '') {
                                this.$message({
                                    message: '无数据！',
                                    type: 'warning',
                                    duration: 1600
                                })
                            } else {
                                this.sellerInfo = res.data.data
                                this.tdes = res.data.data.list
                                this.lastPage = res.data.data.last_page * 10
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
            }
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
