<template>
	<div>
		<div class="contentDiv">
			<el-row>
                <el-form class="condition" label-width="80px">
                    <el-col>
                        <el-form-item label="查询时间:">
                            <el-date-picker
                                v-model="startDate"
                                type="date"
                                placeholder="开始时间"
                                size="small"
                                style="width:120px;"
                                @change="startDateChange">
                            </el-date-picker>
                            ~~
                            <el-date-picker
                                v-model="endDate"
                                type="date"
                                placeholder="结束时间"
                                size="small"
                                style="width:120px;"
                                @change="endDateChange">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

					<el-col>
                        <el-form-item label="消费者:">
                            <el-input v-model="userName" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="订单号:">
                            <el-input v-model="orderSn" size="small" style="width:166px;"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <i class="btn-search" @click="searchBtn"></i>
                    </el-col>
                    <el-button size="small" type="primary" @click="outExcel">导出excel</el-button>
                </el-form>
            </el-row>
           
            <template>
            	<el-table
            		:data="tableData"
            		border
            		style="width:100%;">
					<el-table-column prop="id" label="序号" width="80"></el-table-column>
					<el-table-column prop="member_name" label="获得奖金的会员" width="140"></el-table-column>
					<el-table-column prop="type" label="奖金变动的类型" width="140"></el-table-column>
					<el-table-column prop="cm_id" label="消费者id" width="100"></el-table-column>
					<el-table-column prop="user_name" label="消费者用户名" width="120"></el-table-column>
					<el-table-column prop="datetime" label="时间" width="140"></el-table-column>
					<el-table-column prop="order_sn" label="订单号" width="180"></el-table-column>
					<el-table-column prop="old_amount" label="变动前的奖金" width="170"></el-table-column>
					<el-table-column prop="value"  label="变动金额" width="120"></el-table-column>
					<el-table-column prop="new_amount" label="变动后的奖金" width="170"></el-table-column>
					<el-table-column prop="intro" label="奖金变动说明"></el-table-column>
            	</el-table>
            </template>     
            <template>
            	<el-pagination
			      @current-change="pageChange"
			      layout="prev, pager, next"
			      :total="parseInt(lastPage)">
			    </el-pagination>
            </template>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				startDate:'',
                endDate:'',
                tableData:[],
                lastPage:'',
                userName:'',
                orderSn:'',
			}
		},
		created(){
			this.getList(1)
		},
		methods:{
			// 导出excel
            outExcel() {
                location.href = ''+ this.$baseUrl + 'Member/funds_list?query_start_time=' + this.startDate + '&query_end_time=' + this.endDate + 
                '&user_name=' + this.userName + '&order_sn=' +this.orderSn + '&type=2&is_outexcel=1'
            },
            startDateChange(val) {
                this.startDate = val
            },
            endDateChange(val) {
                this.endDate = val
            },
            // searchBtn
            searchBtn() {
				this.getList(1)
            },
            pageChange(val) {
				this.getList(val)
            },
            getList(val) {
            	this.$axios.post('Member/funds_list',{
					query_start_time:this.startDate,
					query_end_time:this.endDate,
					user_name:this.userName,
					order_sn:this.orderSn,
					type:2,
					page:val
				})
					.then(res=>{
						if (res.data.code == 200) {
							this.lastPage = res.data.data.last_page * 10
							this.tableData = res.data.data.list
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
	.condition {    
        .el-col {
            &:nth-child(1) {
                width:366px;
            }
            &:nth-child(4) {
                width:40px;
                margin-left:80px;
            }
        }
        .el-button {
            float:right;
            margin:10px 30px 0 0;
        }
    }
</style>
<style lang="scss">
	.el-table {
		th {
			background-color:#e4393c !important;
			text-align:center !important;
		}
	}
	.el-table__footer-wrapper thead div, .el-table__header-wrapper thead div {
		background-color:#e4393c !important;
		color:#fff !important;
	}
</style>