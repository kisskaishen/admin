<template>
	<div>
		<el-breadcrumb separator=">">
            <el-breadcrumb-item to="/activityManage/activityGoodsList">返回</el-breadcrumb-item>
            <el-breadcrumb-item>数据分析</el-breadcrumb-item>
        </el-breadcrumb>

      	<div class="contentDiv">
      		<all-detail v-if="this.$route.query.type=='all'"></all-detail>
      		<part-detail v-else></part-detail>
      	</div>

	</div>
</template>
<script>
	import AllDetail from '../../components/public/activityManage/oneMoney/allDetail.vue'
	import partDetail from '../../components/public/activityManage/oneMoney/partDetail.vue'
	export default {
		data() {
			return {
				
			}
		},
		created() {
			
		},
		components:{ AllDetail,partDetail },
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
				th,td {
					text-align:left;
					padding-left:40px;
				}
			}
		}
	}
</style>