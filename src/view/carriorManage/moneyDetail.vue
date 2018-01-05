<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item to="/carriorManage/index">运营商</el-breadcrumb-item>
			<el-breadcrumb-item>资金详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<el-tabs v-model="activeName" type="border-card" @tab-click="switchChange">
				<el-tab-pane label="VIP会员费" name="first">
					<money-block></money-block>
				</el-tab-pane>
				<el-tab-pane label="餐餐抢券费" name="second">
					<money-blocks></money-blocks>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
import moneyBlock from '../../components/public/carriorManage/moneyDetail.vue'
import moneyBlocks from '../../components/public/carriorManage/moneyDetail2.vue'
	export default {
		data(){
			return {
				activeName:'first',

			}
		},

		components:{ moneyBlock,moneyBlocks },
		methods:{
			switchChange(){

			}
		}
	}
</script>
<style scoped lang="scss">
	.el-breadcrumb {
		line-height: 30px;
	}
</style>
