<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator=">">
		  <el-breadcrumb-item :to="{ path: '/seller' }">餐餐抢商家</el-breadcrumb-item>
		  <el-breadcrumb-item>商家资金</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<p style="color:#007aff;line-height:36px;padding-left:6px;text-align:left;">会员：{{memberName}}</p>
			<!-- 奖金类型 -->
			<el-row>
				<el-col class="active">
					<router-link to="sellerMoney_vip">
						<i class="fl vipMoney"></i>
						<div class="fr">
							<h4>VIP奖金</h4>
							<b>1512.00元</b>
						</div>
					</router-link>
				</el-col>
				<el-col>
					<router-link to="sellerMoney_ccq">
						<i class="fl ccqMoney"></i>
						<div class="fr">
							<h4>餐餐抢奖金</h4>
							<b>1512.00元</b>
						</div>
					</router-link>
				</el-col>
				<el-col>
					<router-link to="sellerMoney_vipCash">
						<i class="fl drawVipMoney"></i>
						<div class="fr">
							<h4>提取VIP奖金</h4>
							<b>1512.00元</b>
						</div>
					</router-link>
				</el-col>
				<el-col>
					<router-link to="sellerMoney_ccqCash">
						<i class="fl drawCcqMoney"></i>
						<div class="fr">
							<h4>提取餐餐抢奖金</h4>
							<b>1512.00元</b>
						</div>
					</router-link>
				</el-col>
			</el-row>
			<!-- 查看其它商家 -->
			<div class="otherOperate">
				<el-form label-width="110px" class="fl">
					<el-form-item label="查看其它商家：">
					    <el-input v-model="otherName" size="small"></el-input>
					    <i class="btn-search"></i>
					 </el-form-item>
				</el-form>
				<p class="fr"><el-button size="small">导出Excel</el-button></p>
			</div>
			<!-- 表格显示 -->
			<table>
				<tr class="thead">
					<th v-for="th in thes">{{th.text}}</th>
				</tr>
				<tr v-for="td in tdes">
					<td style="color:#8e8e8e;">{{td.data}}</td>
					<td style="color:#e64e50;">{{td.changeVip}}</td>
					<td style="color:#51baf9;">{{td.balanceVip}}</td>
					<td style="color:#ff9259;">{{td.type}}</td>
					<td>{{td.customer}}</td>
					<td>{{td.customerCode}}</td>
					<td>{{td.explain}}</td>
				</tr>
			</table>
			<el-pagination
			    layout="prev, pager, next"
			    :total="100"
			    style="margin-top:20px;">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				memberName:'13798238693',
				// 表头
				thes:[
					{text:'日期时间'},
					{text:'变动VIP提成'},
					{text:'结存VIP提成'},
					{text:'类型'},
					{text:'消费者'},
					{text:'消费者订单号'},
					{text:'说明'}
				],
				//表身
				tdes:[
					{
						data:'2017-05-19 16:00',
						changeVip:'+3.00元',
						balanceVip:'5770.00元',
						type:'系统赠送',
						customer:'13798238693',
						customerCode:'20170519123456',
						explain:'很长的'
					},
					{
						data:'2017-05-19 16:00',
						changeVip:'+3.00元',
						balanceVip:'5770.00元',
						type:'系统赠送',
						customer:'13798238693',
						customerCode:'20170519123456',
						explain:'很长的'
					},
					{
						data:'2017-05-19 16:00',
						changeVip:'+3.00元',
						balanceVip:'5770.00元',
						type:'系统赠送',
						customer:'13798238693',
						customerCode:'20170519123456',
						explain:'很长的'
					}
				]
			}
		}
	}
</script>

<style scoped>
.el-breadcrumb {
	line-height: 30px;
}

.el-row {
	padding-bottom: 16px;
	padding-left: 6px;
	border-bottom: 1px solid #dcdcdc;
}
.el-col {
	border: 1px solid #dcdcdc;
	box-sizing: border-box;
	height: 102px;
	width: 220px;
	padding: 10px;
	margin-right: 16px;
	border-radius: 4px;
	cursor: pointer;
}
.active {
	border:3px solid #ffca2e;
}
.otherOperate {
	width: 100%;
	height: 40px;
}
.otherOperate .el-form {
	padding-left: 10px;
	margin-top: 0;
}
.otherOperate .fr {
	padding-right: 10px;
}
.fr {
	width: 114px;
	line-height: 40px;
	text-align: center;
}
.fr h4 {
	font-size: 15px;
	font-weight: normal;
}
.fr p {
	color: #e4393c;
}
.el-col i {
	display: block;
	width:80px;
	height: 80px; 
}
.vipMoney {
	background: url('../../assets/image/image-count.png') -204px -100px;
}
.ccqMoney {
	background: url('../../assets/image/image-count.png') -294px -100px;
}
.drawVipMoney {
	background: url('../../assets/image/image-count.png') -374px -100px;
}
.drawCcqMoney {
	background: url('../../assets/image/image-count.png') -450px -100px;
}
.el-input {
	width: 200px;
}
.fr b {
	color: #242424;
}
.thead {
	background: url('../../assets/image/thead.png') -10px -93px;
}




</style>