<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>支付开通列表</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <div class="condition">
                <el-form label-width="54px">
                    <el-row>
                        <el-col style="width: 346px;">
                            <el-form-item label="" label-width="0">
                                <el-select v-model="typeSelect" size="small" @change="typeChange">
                                    <el-option
                                        v-for="item in typeSelects"
                                        :label="item.label"
                                        :key="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                                <el-input v-model="searchTxt" size="small" style="width:200px;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:320px;">
                            <el-form-item label="按时间">
                                <el-date-picker
                                    v-model="startDate"
                                    type="date"
                                    @change="startDateChange"
                                    size="small"></el-date-picker>
                                ~
                                <el-date-picker
                                    v-model="endDate"
                                    type="date"
                                    @change="endDateChange"
                                    size="small"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col style="width:180px;">
                            <el-form-item label="状态">
                                <el-select v-model="status" size="small">
                                    <el-option
                                        v-for="item in statuses"
                                        :label="item.label"
                                        :key="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <i class="btn-search"></i>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="list">
                <table>
                    <tr>
                        <th width="60px">排序</th>
                        <th>交易时间</th>
                        <th>订单账号</th>
                        <th>交易商家</th>
                        <th>订单金额</th>
                        <th>结算费率</th>
                        <th>共营收</th>
                        <th>实际利润营收</th>
                        <th>总额结算</th>
                        <th>参与分成关系链接</th>
                    </tr>
                    <tr v-for="item in list">
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="footer">
                <el-pagination
                    class="fr"
                    layout="prev,pager,next"
                    @current-page="currentChange"
                    :total="50"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // 类型选择
                typeSelects: [
                    {
                        label: '商家名称',
                        value: 1
                    },
                    {
                        label: '法人名称',
                        value: 2
                    },
                    {
                        label: '开户银行',
                        value: 3
                    },
                    {
                        label: '银行账号',
                        value: 4
                    }
                ],
                typeSelect: '',

                // 日期查询
                startDate:'',
                endDate:'',
                // 状态选择
                statuses:[
                    {
                        label:'全部',
                        value:0
                    },
                    {
                        label:'开通',
                        value:1
                    },
                    {
                        label:'待审核',
                        value:2
                    },
                    {
                        label:'拒绝',
                        value:3
                    },
                ],
                status:'',
                // 列表
                list:[],
            }
        },
        created() {

        },
        methods: {
            // 类型选择
            typeChange() {

            },
            // 日期段选择
            startDateChange(val) {
                this.startDate = val
            },
            endDateChange(val) {
                this.endDate = val
            }
        }
    }
</script>
<style lang="scss" scoped>
    .contentDiv {
        .condition {

        }
        .list {

        }
    }
</style>
