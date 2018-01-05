<template>
	<div>

    	<div class="condition">			
	        <el-row>
	        	<el-col style="padding:0;width:200px;">
	        		<img src="" alt="">
	        	</el-col>
	        	<el-col style="padding-top:118px;">
	        		<p>活动项目ID：</p>
	        		<span>id</span>
	        		<p>活动名称：</p>
	        		<span>mingchengh</span>
	        	</el-col>
	        	<el-col>
	        		<p>总投放：</p>
	        		<span>12</span>
	        	</el-col>
	        	<el-col>
	        		<p>剩余：</p>
	        		<span>12</span>
	        	</el-col>
	        	<el-col>
	        		<p>浏览量：</p>
	        		<span>12</span>
	        	</el-col>
	        	<el-col>
	        		<p>活动类型：</p>
	        		<span>电影</span>
	        	</el-col>
	        	<el-col>
	        		<p>活动举办时间：</p>
	        		<span>2017.12.07 12:00</span>
	        	</el-col>
	        </el-row>
		</div>
		<div class="chart">
			<!-- <div id="c1"></div> -->
			<table>
				<tr>
					<th>投放时间段：</th>
					<td>2017.12.12 12:12</td>
				</tr>
				<tr>
					<th>该投放时段浏览量：</th>
					<td>2017.12.12 12:12</td>
				</tr>
				<tr>
					<th>未成功支付用户量：</th>
					<td>2017.12.12 12:12</td>
				</tr>
				<tr>
					<th>“立即支付”点击量</th>
					<td>2017.12.12 12:12</td>
				</tr>
			</table>
		</div>


	</div>
</template>
<script>
	export default {
		data() {
			return {
				tableData:[],
			}
		},
		created() {
			
		},
		methods:{
			// 返回
			goBack() {
				history.go(-1)
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
				width:140px;
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
		.chart {
			height: 520px;
			#c1 {
				float: left;
				width:400px;
				height: 400px;
				margin:0 60px;
				border:1px solid red;
			}
			table {
				float: left;
				width:400px;
				margin-left:40px;
				th,td {
					text-align:left;
					padding-left:40px;
				}
			}
		}
	}
</style>