<template>
	<div>
		<el-breadcrumb separator=">">
            <el-breadcrumb-item to="/activityManage">活动管理</el-breadcrumb-item>
            <el-breadcrumb-item to="/activityManage/oneMoney">1元活动</el-breadcrumb-item>
            <el-breadcrumb-item>活动信息管理</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="contentDiv">
        	<div class="condition">
        		<h3>活动信息管理</h3>
				<el-row>
		        	<el-col>
		        		<h5>活动名称：{{activityInfo.activity_title}}</h5>
		        	</el-col>
		        	<el-col>
		        		<span>活动状态：{{activityInfo.activity_state}}</span>
		        	</el-col>
		        	<el-col style="float:right">
		        		<router-link :to="{path:'/activityManage/oneMoneySingle',query:{activity_id:activity_id,name:this.activityInfo.activity_title}}"><el-button type="primary" icon="plus">添加活动项目</el-button></router-link>
		        	</el-col>
		        </el-row>
		        <el-row>
		        	<el-col>
		        		<span>浏览量：{{activityInfo.click}}</span>
		        	</el-col>
		        	<el-col>
		        		<span>总投放：{{activityInfo.original_storage}}</span>
		        	</el-col>
		        	<el-col>
		        		<span>剩余：{{activityInfo.storage}}</span>
		        	</el-col>
		        </el-row>
			</div>
			<div class="table">
				<el-table
	                :data="tableData"
	                fixed
	                height="666"
	                border
	                style="width: 100%">
	                <el-table-column prop="activity_detail_id" label="编号" ></el-table-column>
	                <el-table-column prop="goods_id" label="活动项目ID" ></el-table-column>
	                <el-table-column prop="store_name" label="商家名称" ></el-table-column>
	                <el-table-column prop="" label="图片" >
	                	<template scope="scope">
	                        <img :src="scope.row.img_url" alt="图片">
	                    </template>
	                </el-table-column>
	                <el-table-column prop="item_name" label="名称" ></el-table-column>
	                <el-table-column prop="gc_name" label="分类"></el-table-column>
	                <el-table-column prop="spec_name" label="规格" ></el-table-column>
	                <el-table-column prop="goods_marketprice" label="店铺价格" ></el-table-column>
	                <el-table-column prop="goods_price" label="验券价格" ></el-table-column>
	                <el-table-column prop="add_time" label="添加时间" >
	                	<template scope="scope">
	                		<span>{{scope.row.add_time | formatDate}}</span>
	                	</template>
	                </el-table-column>
	                <el-table-column prop="" label="操作" >
	                    <template scope="scope">
	                        <el-button type="primary" size="small"><router-link :to="{path:'/activityManage/seeGoods',query:{activity_detail_id:scope.row.activity_detail_id}}">查看</router-link></el-button>
	                        <el-button type="danger" size="small">删除</el-button>
	                    </template>
	                </el-table-column>
	            </el-table>
			</div>
        </div>
	</div>
</template>
<script>
	import {formatDate} from '../../components/public/date.js'
	export default {
		data() {
			return {
				tableData:[],
				activityInfo:'',
				activity_id:'',
			}
		},
		created() {
			this.activity_id = this.$route.query.activity_id
			this.getList(1)			
			this.$axios.post('activity/check_activity',{
				activity_id:this.$route.query.activity_id
			})
				.then(res=>{
					if (res.data.code == 200) {
						this.activityInfo = res.data.data
					} else {
						this.$message.warning(res.data.message)
					}
				})
				.catch(err=>{
					console.log(err)
				})
		},
		filters:{
			formatDate(time) {
				let date = new Date(time * 1000)
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		},
		methods:{
			// 翻页
			pageChange(val) {
				this.getList(val)
			},

			// 列表信息
			getList(val) {
				this.$axios.post('activity/activity_detail_list',{
					activity_id:this.$route.query.activity_id,
					page:val
				})	
					.then(res=>{
						if(res.data.code == 200) {
							this.tableData = res.data.data
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
<style scoped lang="scss">
	.el-breadcrumb {
		line-height: 30px;
	}
	
	.contentDiv {
		.condition {
			h3 {
				text-align:left;
				padding: 0 0 10px 20px;
			}
		}
		.table {
			img {
				display: block;
				width:115px;
				height: 91px;
			}
			a {
				color:#fff;
			}
		}
	}
</style>