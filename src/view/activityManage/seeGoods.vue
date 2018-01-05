<template>
	<div>
		<el-breadcrumb separator=">">
            <el-breadcrumb-item to="/activityManage">活动管理</el-breadcrumb-item>
            <el-breadcrumb-item to="/activityManage/oneMoney">1元活动</el-breadcrumb-item>
            <el-breadcrumb-item to="/activityManage/activityGoodsList">活动信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动项目详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="contentDiv">
        	<div class="condition">			
		        <el-row>
		        	<el-col style="padding:0;width:200px;">
		        		<img :src="info.img_url" alt="图片">
		        	</el-col>
		        	<el-col style="padding-top:118px;">
		        		<p>活动项目ID：</p>
		        		<span>{{info.activity_id}}</span>
		        		<p>活动名称：</p>
		        		<span>{{info.item_name}}</span>
		        	</el-col>
		        	<el-col>
		        		<p>总投放：</p>
		        		<span>{{info.original_storage}}</span>
		        	</el-col>
		        	<el-col>
		        		<p>剩余：</p>
		        		<span>{{info.storage}}</span>
		        	</el-col>
		        	<el-col>
		        		<p>浏览量：</p>
		        		<span>{{info.click}}</span>
		        	</el-col>
		        	<el-col>
		        		<p>活动举办时间：</p>
		        		<span>{{info.activity_item_time}}</span>
		        	</el-col>
		        	<el-col style="float:right">
		        		<el-button type="primary" @click="outExcel">导出Excel</el-button>
		        	</el-col>
		        	<el-col style="float:right">
		        		<el-button><router-link :to="{path:'/activityManage/activityChart',query:{type:'all'}}">数据分析</router-link></el-button>
		        	</el-col>
		        	
		        </el-row>
			</div>
			<div class="table">
				<el-table
	                :data="tableData"
	                fixed
	                height="520"
	                border
	                style="width: 100%">
	                <el-table-column prop="activity_start_time" label="投放时间" width="300"></el-table-column>
	                <el-table-column prop="activity_item_original_storage" label="投放" width="200"></el-table-column>
	                <el-table-column prop="activity_item_storage" label="剩余" width="200"></el-table-column>
	                <el-table-column prop="order_num" label="订单总数"></el-table-column>
	                <el-table-column prop="order_num_no_pay" label="未付款订单数"></el-table-column>
	                <el-table-column prop="detail_state" label="状态" width="200"></el-table-column>
	                <el-table-column prop="address" label="操作">
	                    <template scope="scope">
	                        <el-button @click="toChart(scope.row)" type="text" size="small">数据分析</el-button>
	                        <el-button type="text" size="small" @click="reveseNum(scope.row)">修改</el-button>
	                        <el-button type="text" size="small">关闭</el-button>
	                    </template>
	                </el-table-column>
	            </el-table>
			</div>
			<el-dialog title="修改库存" style="text-align:left" :visible.sync="dialogFormVisible" size="tiny">
				<b>增减该时间段投放量</b>
				<el-input v-model="num" style="width:220px;" placeholder="增加：+10/减少：-20"></el-input>
				<div slot="footer" class="dialog-footer">
				    <el-button @click="dialogFormVisible = false">取 消</el-button>
				    <el-button type="primary" @click="sureClick">确 定</el-button>
				</div>
			</el-dialog>
        </div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				tableData:[],
				info:'',		// 活动总信息
				num:'',
				timeInfo:'',		// 单个时间信息
				dialogFormVisible:false,
			}
		},
		created() {
			this.$axios.post('activity/activity_detail_data',{
				activity_detail_id:this.$route.query.activity_detail_id
			})
				.then(res=>{
					if (res.data.code == 200) {
						this.tableData = res.data.data.list
						this.info = res.data.data.activity_detail_info
					} else {
						this.$message.warning(res.data.message)
					}
				})
				.catch(err=>{
					console.log(err)
				})
		},
		methods:{
			// 导出excel
			outExcel() {

			},
			// toChart
			toChart(val) {
				this.$router.push({path:'/activityManage/activityChart'})
			},
			// 修改库存
			reveseNum(val) {
				this.timeInfo = val
				this.dialogFormVisible = true
			},
			// 确定修改的库存
			sureClick() {
				this.$axios.post('activity/update_activity_detail_storage',{
					activity_detail_id:this.timeInfo.activity_detail_id,
					activity_time_id:this.timeInfo.activity_time_id,
					storage:this.num
				})
					.then(res=>{
						if (res.data.code == 200) {
							this.$message.success(res.data.message)
							location.reload()
						} else {
							this.$message.error(res.data.message)
						}
					})
			}
		}
	}
</script>
<style scoped lang="scss">
	.el-breadcrumb {
		line-height: 30px;
	}
	
	.contentDiv {
		.condition {
			padding: 20px;
			.el-col {
				width:120px;
				padding-top:188px;
				text-align:left;
				img {
					display: block;
					width:184px;
					height:248px;
					border:1px solid red;
				}
				p {
					line-height:30px;
					font-size:16px;
				}
				span {
					display: block;
					margin-bottom:20px;
				}
			}
			
		}
	}
</style>