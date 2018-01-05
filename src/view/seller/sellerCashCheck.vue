<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{path:'/memberMember'}">餐餐抢商家</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path:'/manageCash'}">商家提现</el-breadcrumb-item>
			<el-breadcrumb-item>提现审核</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<div class="tip">
				<h4>商家提现审核</h4>
				<p>*除用户余额不收取手续费,其他提现都需要扣除20%的手续费</p>
			</div>
			<el-form class="listDiv" label-width="140px">
				<el-form-item label="商家名称：">
			        <span>13798238693</span>
				</el-form-item>
				<el-form-item label="商家类型：">
			        <span>店铺</span>
				</el-form-item>
				<el-form-item label="提现金额：">
			        <span>￥100.00</span>
				</el-form-item>
				<el-form-item label="提现类型：">
			        <span>VIP奖金</span>
				</el-form-item>
				<el-form-item label="手续费：">
			        <span style="color:#5cdc76">￥20.00</span>
				</el-form-item>
				<el-form-item label="实打金额：">
			        <span>￥80.00</span>
				</el-form-item>
				<el-form-item label="申请时间：">
			        <span>2017-05-24 15:09</span>
				</el-form-item>
				<el-form-item label="审核时间：">
			        <span>待审核</span>
				</el-form-item>
				<el-form-item label="银行开户名：">
			        <span>秦辰</span>
				</el-form-item>
				<el-form-item label="银行名称：">
			        <span>中国银行</span>
				</el-form-item>
				<el-form-item label="银行卡号：">
			        <span>6222 9800 2860 4058</span>
				</el-form-item>
				<el-form-item label="身份证照扫描件：">
			        <img src="../../assets/image/logo.png" height="200" width="200" alt="">
					<el-input placeholder="请输入手机号" style="width:200px;"></el-input>
					<el-button>短信通知用户</el-button>
				</el-form-item>
				<el-form-item label="原因：" prop="reason">
				    <el-radio-group v-model="reason">
				        <el-radio label="审核通过"></el-radio>
				        <el-radio label="审核失败"></el-radio>
				    </el-radio-group>
			    </el-form-item>
			    <el-form-item class="btnDiv">
				    <el-button>返回</el-button>
				    <el-button type="danger" @click="onSubmit">提交审核结果</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			reason:'审核通过'
		}
	}
}
</script>
<style scoped>

.el-breadcrumb {
	line-height: 30px;
}

.el-row {
	height: 40px;
}
.el-form-item {
	margin-bottom: 0;
}
.btn-search {
	display: inline-block;
	width: 32px;
	height: 32px;
	margin-top: 4px;
	background: url('../../assets/image/image-count.png') no-repeat -14px -54px;
	cursor: pointer;
}
.tip {
	margin-top: 10px;
	padding-left: 10px;
	text-align: left;
	line-height: 24px;
}
.tip h4 {
	font-weight: normal;
}
.tip p {
	color: #e4393c;
}
.listDiv {
	padding-left: 20px;
}
.listDiv label {
	text-align: right;
}
.listDiv span {
	float: left;
	text-align: left;
}
.avatar-uploader {
	float: left;
}
.el-icon-identity {
	display:block;
	width: 244px;
	height: 160px;
	background: url('../../assets/image/image-count.png') no-repeat -12px -224px;
}


</style>