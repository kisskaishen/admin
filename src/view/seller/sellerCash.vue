<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator=">">
		  <el-breadcrumb-item :to="{ path: '/seller' }">餐餐抢商家</el-breadcrumb-item>
		  <el-breadcrumb-item>商家提现</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<!-- 搜索栏 -->
			<el-form>
				<el-row>
					<el-col style="width:280px;">
						<el-form-item label="查询时间">
							<el-date-picker
								v-model="searchTime"
								type="daterange"
								placeholder="请选择日期范围"
								size="small"
								style="width:200px;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col style="width:200px;">
						<el-form-item label="会员名称">
							<el-input v-model="memberName" placeholder="请输入会员名称..." size="small" style="width:130px;"></el-input>
						</el-form-item>
					</el-col>
					<!-- button按钮 -->
					<el-col style="width:32px;">
						<i class="btn-search"></i>
					</el-col>
					<p class="fr" style="margin:4px 20px 0 0;"><el-button size="small">导出Excel</el-button></p>
				</el-row>
			</el-form>
			<!-- table列表栏 -->
			<el-form>
				<table>
					<tr class="thead">
						<th v-for="th in thes">{{th.text}}</th>
					</tr>
					<tr class="tbody" v-for="td in tdes">
						<td>{{td.memberName}}</td>
						<td>{{td.payeeName}}</td>
						<td>{{td.moneytype}}</td>
						<td>{{td.totalMoney}}</td>
						<td>{{td.poundage}}</td>
						<td>{{td.payAmount}}</td>
						<td style="line-height:24px;">{{td.bankName}}</td>
						<td style="line-height:24px;">{{td.backCode}}</td>
						<td style="line-height:24px;">{{td.IDNumber}}</td>
						<td style="line-height:24px;">{{td.openAccount}}</td>
						<td style="line-height:24px;">{{td.appliacationTime}}</td>
						<td>{{td.operateStatus}}</td>
						<td>
							<span style="color:#007aff;" @click="clickPass">{{td.operatePass}}</span><em>|</em>
							<router-link to="/sellerCashCheck"><span style="color:#007aff;">{{td.operateCheck}}</span></router-link><em>|</em>
							<router-link to="/sellerCashCheckRefuse"><span style="color:#e64e50;">{{td.operateRefuse}}</span></router-link>
						</td>
					</tr>
				</table>
				<el-pagination
				    layout="prev, pager, next"
				    :total="100"
				    style="margin-top:20px;">
				</el-pagination>
			</el-form>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			searchTime:'',			
			memberName:'',
			thes:[
				{text:'用户名称'},
				{text:'收款人姓名'},
				{text:'类型'},
				{text:'金额'},
				{text:'手续费'},
				{text:'实付金额'},
				{text:'银行名称'},
				{text:'银行卡号'},
				{text:'身份证'},
				{text:'开户行'},
				{text:'申请时间'},
				{text:'状态'},
				{text:'操作'}
			],
			tdes:[
				{
					memberName:'123456789',
					payeeName:'秦辰',
					moneytype:'Vip会员费',
					totalMoney:'￥172016.00',
					poundage:'￥172.00',
					payAmount:'￥172000.00',
					bankName:'中国建设银行深圳市西丽支行',
					backCode:'6222 9800 2860 4058',
					IDNumber:'410823199510240078',
					openAccount:'中国建设银行深圳市西丽支行',
					appliacationTime:'2017-02-18 19:00',
					operateStatus:'未处理',
					operatePass:'通过',
					operateCheck:'审核',
					operateRefuse:'拒绝'
				}
			]
		}
	},
	methods:{
		clickPass(){
			confirm('通过？');
		}
	}
}
</script>
<style scoped>
.el-breadcrumb {
	line-height: 30px;
}
.el-row {
	padding-left: 6px;
}
.el-col {
	height: 40px;
	margin-right: 10px;
}
.thead {
	background: url('../../assets/image/thead.png') -10px -93px;
}


@import "../../assets/css/base.css";
@import "../../assets/css/seller_part.css";

</style>