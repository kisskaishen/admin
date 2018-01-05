<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/activityManage' }">活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>1元活动</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <el-form class="condition" label-width="100">
                <el-row>
                    <el-col>
                        <el-form-item label="活动名称">
                            <el-input v-model="name" size="small" placeholder="活动名称"></el-input>
                        </el-form-item>
                    </el-col>
                
                    <el-col style="width:354px">
                        <el-form-item label="投放时间段">
                            <el-date-picker
                                v-model="startDate"
                                type="date"
                                placeholder="开始时间"
                                size="small"
                                @change="startDateChange"></el-date-picker>
                            ~~
                            <el-date-picker
                                v-model="endDate"
                                type="date"
                                placeholder="结束时间"
                                size="small"
                                @change="endDateChange"></el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:32px;margin-left:16px;">
                        <i class="btn-search" @click="btnSearch"></i>
                    </el-col>

                    <el-col style="float: right;width:300px;">
                        <el-button type="primary" @Click="outExcel" style="margin-right:40px">导出Excel</el-button>
                        <router-link :to="{path:'/activityManage/addOneMoney',query:{toPath:'addActivity'}}"><el-button type="danger">添加活动</el-button></router-link>
                    </el-col>
                </el-row>
            </el-form>

            <el-table
                :data="tableData"
                fixed
                height="666"
                border
                style="width: 100%">
                <el-table-column prop="activity_id" label="活动ID" width="120"></el-table-column>
                <el-table-column prop="activity_title" label="活动名称" width="180"></el-table-column>
                <el-table-column prop="address" label="总投放" width="80"></el-table-column>
                <el-table-column prop="address" label="剩余" width="80"></el-table-column>
                <el-table-column prop="address" label="活动包含项目"></el-table-column>
                <el-table-column prop="address" label="浏览量" width="80"></el-table-column>
                <el-table-column prop="activity_type" label="类型" width="80"></el-table-column>
                <el-table-column prop="address" label="累计订单" width="100"></el-table-column>
                <el-table-column prop="activity_state" label="状态" width="80">
                    <template scope="scope">
                        <p>{{scope.row.activity_state}}</p>
                        <el-button class="statusClass" type="danger" size="mini" @click="open(scope.row)">{{scope.row.activity_state=='关闭'?'开启':'关闭'}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="120">
                    <template scope="scope">
                        <router-link :to="{path:'/activityManage/activityGoodsList',query:{activity_id:scope.row.activity_id}}" type="text" size="small">管理</router-link>
                        <b>|</b>
                        <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        

    </div>
</template>
<script>
    export default {
        data() {
            return {
                name:'',
                startDate:'',
                endDate:'',
                // table信息
                tableData:[],

            }
        },
        created() {
            this.$axios.post('activity/activity_list')
                .then(res=>{
                    if (res.data.code == 200) {
                        this.tableData = res.data.data
                    } else {
                        this.$message.warning(res.data.message)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        methods: {
            // 导出
            outExcel() {
                // location.href = 
            },
            // 时间段
            startDateChange(val) {
                this.startDate = val
            },
            endDateChange(val) {
                this.endDate = val
            },
            // 开启
            open(val) {
                console.log(val)
                this.$axios.post('activity/update_activity',{
                    activity_id:val.activity_id,
                    status:val.activity_state == '关闭'?'1':'0'
                })
                    .then(res=>{
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message)
                            setTimeout(()=>{
                                location.reload()
                            },1600)
                        } else {
                            this.$message.success(res.data.message)
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            // btnSearch
            btnSearch() {

            },
            // 删除
            deleteClick(val) {
                console.log(val)
            }

        }
    }
</script>
<style lang="scss" scoped>
    .el-breadcrumb {
        line-height:30px;
    }
    .contentDiv {
        h4 {
            text-align:left;
        }
        .el-form {
            padding: 10px;
        }
        .el-table {
            .statusClass {
                display: none;
            }
            tr:hover {
                .statusClass {
                    display: block;
                }
            }
        }
    }
</style>
