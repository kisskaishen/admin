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
		<div class="info">
			<el-row :gutter="20">
				<el-col :span="6">
					<p>各个入口,注册用户、未注册用户的点击量</p>
					<span>200</span>
					<hr>
				</el-col>
				<el-col :span="6">
					<p>活动主页，点击“下一天”箭头按钮的触发量</p>
					<span>200</span>
					<hr>
				</el-col>
				<el-col :span="6">
					<p>本次活动项目，点击支付，未成功付款人数</p>
					<span>200</span>
					<hr>
				</el-col>
				<el-col :span="6">
					<p>活动支付页面，绑定成功人数</p>
					<span>200</span>
					<hr>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6">
					<p>活动详情页，绑定入口，绑定成功人数</p>
					<span>200</span>
					<hr>
				</el-col>
				<el-col :span="6">
					<p>活动详情页，浏览量（PV）</p>
					<span>200</span>
					<hr>
				</el-col>
				<el-col :span="6">
					<p>活动详情页，“立即支付”点击量</p>
					<span>200</span>
					<hr>
				</el-col>
				<el-col :span="6">
					<p>活动详情页，地图点击量</p>
					<span>200</span>
					<hr>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="6">
					<p>活动详情页，分享按钮点击量</p>
					<span>200</span>
					<hr>
				</el-col>
			</el-row>
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
		.info {
			.el-col {
				height: 100px;
				p {
					line-height:60px;
				}
				span {
					line-height:40px;
				}
			}
		}
	
	}
</style>