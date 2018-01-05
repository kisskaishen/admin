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
        				<el-form-item label="时间">
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
        		</el-row>
        	</el-form>           
           	<el-table
           		:data="tableData"
           		border
           		style="width:100%;">
				<el-table-column prop="buyer_mobile" label="会员手机号码"></el-table-column>
				<el-table-column prop="order_sn" label="订单号"></el-table-column>
				<el-table-column prop="add_time" label="订单生成时间"></el-table-column>
				<el-table-column prop="payment_time" label="支付时间"></el-table-column>
				<el-table-column prop="order_state" label="验证状态"></el-table-column>
				<el-table-column prop="member_name" label="推荐人"></el-table-column>
           	</el-table>
            <div class="footer">
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="changePage"
                    :total="parseInt(lastPage)">
                </el-pagination>
            </div>
        </div>
        
    </div>
</template>
<script>
    export default {
        data() {
            return {
            	types:[
            		{
            			label:'推荐人账号',
            			value:'1'
            		},
            		{
            			label:'会员手机号码',
            			value:'2'
            		}
            	],
            	searchType:'1',
            	searchTxt:'',
            	startDate:'',
            	endDate:'',

            	tableData:[],
               	lastPage:'',
                currentPage:1

            }
        },
        created() {
            this.getList(1)
        },
        methods: {
        	// 导出
        	outExcel() {
        		location.href = this.$baseUrl + 'Activity/extend_orderlist?search_field_name='+this.searchType+'&search_field_value='+this.searchTxt+'&query_start_time='+this.startDate+'&query_end_time='+this.endDate+'&is_outexcel=1'
        	},
        	typeChange(val) {
        		this.searchType = val
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
        	searchBtn() {
                this.getList(1)   		
        	},
            getList(currentPage) {
                this.$axios.post('Activity/extend_orderlist',{
                    search_field_name:this.searchType,
                    search_field_value:this.searchTxt,
                    query_start_time:this.startDate,
                    query_end_time:this.endDate,
                    page:currentPage
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
