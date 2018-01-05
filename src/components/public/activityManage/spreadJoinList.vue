<template>
    <div>
        <div class="contentDiv">
        	<el-form class="condition" label-width="80px">
        		<el-row>
        			<el-col style="width:256px;">
        				<el-form-item label-width="0">
        					<el-select v-model="searchType" size="small" @change="typeChange">
        						<el-option
        							v-for="item in types"
        							:key="item.value"
        							:label="item.label"
        							:value="item.value"></el-option>
        					</el-select>
        					<el-input v-model="searchTxt" size="small"></el-input>
        				</el-form-item>
        			</el-col>
        			<el-col style="width:350px;">
        				<el-form-item label="参与时间">
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
        						placeholder="截止时间"
        						size="small"
        						@change="endDateChange"></el-date-picker>
        				</el-form-item>
        			</el-col>
        			<el-col style="width:32px;margin-left:16px;">
                        <i class="btn-search" @click="searchBtn"></i>
                    </el-col>

                    <el-col style="float:right">
                        <el-button type="primary" @click="outExcel">导出excel</el-button>
                    </el-col>

                    <el-col style="float:right">
                        <el-button type="danger" @click="addSpread">添加地推人员</el-button>
                    </el-col>
        		</el-row>
        	</el-form>           
           	<el-table
           		:data="tableData"
           		border
           		style="width:100%;">
				<el-table-column prop="member_truename" label="地推人员姓名"></el-table-column>
				<el-table-column prop="member_mobile" label="手机号码"></el-table-column>
				<el-table-column prop="extend_time" label="参与时间"></el-table-column>
				<el-table-column prop="order_num" label="订单数量"></el-table-column>
				<el-table-column prop="is_operation" label="操作">
                    <template scope="scope">
                        <el-button size="small" @click="deleteBtn(scope)">删除</el-button>
                    </template>            
                </el-table-column>
				<el-table-column prop="url" label="二维码/URL查看">
                    <template scope="scope">
                        <el-button size="small" @click="codeBtn(scope.row)">二维码/URL</el-button>
                    </template>               
                </el-table-column>
           	</el-table>
            <div class="footer">
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="changePage"
                    :total="parseInt(lastPage)">
                </el-pagination>
            </div>
        </div>

        <el-dialog
            title="添加地推名单"
            :visible.sync="dialogAddVisible">
            <AddSpread></AddSpread>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSureBtn">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="删除"
            :visible.sync="dialogDeleteVisible"
            size="tiny">
            <b>删除后，对应的推广数据将无法恢复!</b>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDeleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteSureBtn">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="推广二维码"
            :visible.sync="dialogCodeVisible"
            size="tiny">
            <p>推广人：<b>{{codeInfo.member_truename}}</b>专属二维码右键可保存至本地</p>
            <img :src="codeInfo.url" alt="" style="display:block;width:150px;height:150px;border:1px solid #dcdcdc;margin:10px auto;">
            <p>推广网址:{{codeInfo.url}}</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCodeVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import AddSpread from './addSpread'
    export default {
        data() {
            return {
            	types:[
            		{
            			label:'推荐人账号',
            			value:'1'
            		},
            		{
            			label:'手机号码',
            			value:'2'
            		},
                    {
                        label:'推荐人姓名',
                        value:'3'
                    }                    
            	],
            	searchType:'1',
            	searchTxt:'',
            	startDate:'',
            	endDate:'',
               	lastPage:'',

                tableData:[],

                deleteVal:'',   // 删除信息
                codeInfo:'',        // 查看信息


                dialogDeleteVisible:false,
                dialogAddVisible:false,
                dialogCodeVisible:false
            }
        },
        created() {
            this.getList(1)
        },
        components:{ AddSpread },
        methods: {
        	// 导出
        	outExcel() {
                location.href = this.$baseUrl + 'Activity/extend_list?search_field_name='+this.searchType+'&search_field_value='+this.searchTxt+'&query_start_time='+this.startDate+'&query_end_time='+this.endDate+'&is_outexcel=1'
        	},
            // addSureBtn
            addSureBtn() {
                location.reload()
            },
            // 删除推广人员
            deleteBtn(val) {
                this.dialogDeleteVisible = true
                this.deleteVal = val
            },
            deleteSureBtn() {
                this.$axios.post('Activity/del_extend',{
                    member_id:this.deleteVal.row.member_id
                })
                    .then(res=>{
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message)
                            this.tableData.splice(this.deleteVal.$index,1)
                            this.dialogDeleteVisible = false
                        } else {
                            this.$message.error(res.data.message)
                        }
                    })
            },
            // 查看推广人员二维码
            codeBtn(val) {
                this.dialogCodeVisible = true
                this.codeInfo = val
            },
            searchBtn(){ 
                this.getList(1)
            },
            typeChange(val) {
                this.searchType = val
            },
            // 显示添加地推人员
            addSpread() {
                this.dialogAddVisible = true
            },
        	// 时间
        	startDateChange(val) {
        		this.startDate = val
        	},
        	endDateChange(val) {
        		this.endDate = val
        	},
        	changePage(val) {
                this.getList(val)
        	},
            getList(val) {
                this.$axios.post('Activity/extend_list',{
                    search_field_name:this.searchType,
                    search_field_value:this.searchTxt,
                    query_start_time:this.startDate,
                    query_end_time:this.endDate,
                    page:val
                })
                .then(res=>{
                    if (res.data.code == 200) {
                        this.tableData = res.data.data.list
                        this.lastPage = res.data.data.last_page * 10
                    } else {
                        this.$message.warning(res.data.message)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .contentDiv {
        margin: 0 22px;
        .condition {
			border-bottom:1px solid #dcdcdc;
        }
        
        .footer {
            text-align: right;
        }

    }
</style>
