<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/member'}">会员管理</el-breadcrumb-item>
            <el-breadcrumb-item>实名认证</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <!-- 搜索栏 -->
            <el-form class="condition" label-width="80px">
                <el-row>
                    <el-col>
                        <el-form-item label="会员名称">
                            <el-input v-model="memberName" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="证件卡号">
                            <el-input v-model="certificateCode" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="状态">
                            <el-select v-model="statusVal" placeholder="请选择" size="small" @change="statusChange">
                                <el-option
                                    v-for="status in statuses"
                                    :key="status.value"
                                    :label="status.label"
                                    :value="status.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col style="width: 346px;">
                        <el-form label-width="90px">
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
                    <el-col>
                        <i class="btn-search" @click="searchBtn"></i>
                    </el-col>
                </el-row>
            </el-form>
            <div class="tip">
                <p style="font-size:14px;">操作提示</p>
                <p>1、通过会员管理你可以进行查看、编辑会员资料等操作</p>
                <p>2、你可以根据条件搜索会员，然后选择相应的操作;</p>
            </div>
            <!-- table列表栏 -->
            <el-form>
                <table>
                    <tr class="thead">
                        <th>UID</th>
                        <th>用户名称</th>
                        <th>证件类型</th>
                        <th>真实姓名</th>
                        <th>证件卡号</th>
                        <th>申请时间</th>
                        <th>审核时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    <tr class="tbody" v-for="td in tdes">
                        <td>{{td.id}}</td>
                        <td>{{td.member_name}}</td>
                        <td>{{td.type}}</td>
                        <td>{{td.name}}</td>
                        <td>{{td.number}}</td>
                        <td>{{td.add_time}}</td>
                        <td>{{td.r_time}}</td>
                        <td><span
                            :class="[td.status == '认证失败'?'curr':[td.status == '认证成功'?'curr2':'curr3']]">{{td.status}}</span>
                        </td>
                        <td>

                            <router-link :to="{path:'/member/watchMember',query:{id:td.id}}"><span
                                style="color:#007aff;">查看</span></router-link>
                            <em>|</em>
                            <router-link :to="{path:'/member/checkMember',query:{id:td.id}}"><span
                                style="color:#e4393c;">{{td.button}}</span></router-link>
                            <!--<em>|</em>-->
                            <!--<router-link to="/checkMember"><span style="color:#e4393c;">重新审核</span></router-link>-->
                            <!--<em>|</em>-->
                            <!--<span style="color:#e4393c;" @click="cancelCheck">取消审核</span>-->
                        </td>
                    </tr>
                </table>
                <!-- 取消认证弹出框 -->
                <div class="layer" v-show="layer" @click="closeLayer">
                    <div class="bg-layer"></div>
                    <div class="layerDiv">
                        <em @click="closeLayer">&times;</em>
                        <p>是否真的取消已通过认证的会员实名资格?</p>
                        <div class="layerBtn">
                            <el-button type="danger">确定</el-button>
                            <el-button @click="closeLayer">取消</el-button>
                        </div>
                    </div>
                </div>
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="pageChange"
                    :current-page="currentPage"
                    :total="parseInt(pageTotal)"
                    style="margin-top:20px;">
                </el-pagination>
            </el-form>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                memberName: '',
                certificateCode: '',
                statuses: [
                    {
                        value: '',
                        label: '不限 '
                    },
                    {
                        value: '1',
                        label: '待认证 '
                    },
                    {
                        value: '2',
                        label: '认证成功 '
                    },
                    {
                        value: '3',
                        label: '认证失败 '
                    },
                ],
                statusVal: '',
                startDate: '',
                endDate: '',
                currentPage: 1,
                isStatus: true,

                /*弹出框*/
                layer: false
            }
        },
        created() {
            this.$store.dispatch('getMemberRealNameList')
        },
        computed: {
            tdes() {
                return this.$store.state.memberModule.memberRealNameList
            },
            pageTotal() {
                return this.$store.state.memberModule.last_page * 10
            },
        },
        methods: {
            /*点击取消认证的方法*/
            cancelCheck() {
                this.layer = true
            },
            /*点击关闭layer方法*/
            closeLayer() {
                this.layer = false
            },

            // 选择状态
            statusChange(val) {
                this.statusVal = val
            },

            // 时间区间
            startDateChange(val) {
                this.startDate = val
            },
            endDateChange(val) {
                this.endDate = val
            },

            // 点击翻页
            pageChange(val) {
                this.currentPage = val
                let data = new FormData()
                data.append('member_name', this.memberName)
                data.append('number', this.certificateCode)
                data.append('status', this.statusVal)
                data.append('query_start_time', this.startDate)
                data.append('query_end_time', this.endDate)
                data.append('page', this.currentPage)
                this.$store.dispatch('getMemberRealNameList', data)
            },

            // 点击查询
            searchBtn() {
                let data = new FormData()
                data.append('member_name', this.memberName)
                data.append('number', this.certificateCode)
                data.append('status', this.statusVal)
                data.append('query_start_time', this.startDate)
                data.append('query_end_time', this.endDate)
                data.append('page', 1)
                this.$store.dispatch('getMemberRealNameList', data)
            },
        },

        // beforeRouteLeave(to,from,next) {
        //     this.$session.save('memberRealName',{
        //         'tdes':this.tdes,
        //         'memberName':this.memberName,
        //         'number':this.certificateCode,
        //         'status':this.statusVal,
        //         'startDate':this.startDate,
        //         'endDate':this.endDate,
        //         'lastPage':this.pageTotal,
        //         'currentPage':this.currentPage
        //     })
        //     next()
        // }
    }
</script>
<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .condition {
        .el-col {
            width: 200px;
            height: 40px;
            margin-right: 10px;
        }
    }


    .bg-layer {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .4);
    }

    .layerDiv {
        position: fixed;
        width: 400px;
        height: 200px;
        left: 50%;
        margin-left: -200px;
        background-color: #fff;
        border-radius: 4px
    }

    .layerDiv em {
        display: block;
        position: absolute;
        right: 20px;
        height: 40px;
        font-size: 36px;
    }

    .layerDiv p {
        padding-top: 66px;
    }

    .layerBtn {
        margin-top: 46px;
    }

    .layerBtn .el-button {
        width: 116px;
        height: 34px;
    }

    .el-button:last-child {
        color: #fff;
        background-color: #C6C5C5;
    }

    .thead {
        background: url('../../assets/image/thead.png') no-repeat -10px -30px;
    }

</style>
