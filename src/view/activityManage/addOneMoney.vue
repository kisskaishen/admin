<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item to="/activityManage/oneMoney">1元活动</el-breadcrumb-item>
			<el-breadcrumb-item>添加信息</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<add-activity v-if="this.$route.query.toPath == 'addActivity'"></add-activity>			<!-- 添加活动 -->
			
			<add-project v-if="this.$route.query.toPath == 'addProject'"></add-project>				<!-- 添加活动项目 -->
			
			<!-- <add-single v-if="this.$route.query.toPath == 'addSingle'"></add-single> -->				<!-- 添加单品券 -->
			
		</div>
	</div>
</template>
<script>
	import AddActivity from '../../components/public/activityManage/oneMoney/addActivity.vue'
	import AddProject from '../../components/public/activityManage/oneMoney/addProject.vue'
	// import AddSingle from '../../components/public/activityManage/oneMoney/addSingle.vue'
	export default {
		data() {
			return {
				
			}
		},
		created() {
		 
		},
		components:{
			AddProject,
			// AddSingle,
			AddActivity
		},
		methods:{

		},
		beforeRouteEnter(to,from,next) {
			next(vm=>{
				vm.fromPath = from.path
			})
		}
	}
</script>
<style scoped lang="scss">
	.el-breadcrumb {
		line-height:30px;
	}
</style>