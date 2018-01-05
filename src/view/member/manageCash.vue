<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{path:'/member'}">会员管理</el-breadcrumb-item>
			<el-breadcrumb-item>会员提现</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<!-- 搜索栏 -->
			<el-form label-width="80px" class="condition">
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
						<el-form-item label="会员身份">
							<el-select v-model="memberIdentity"  size="small" placeholder="选择身份" style="width:120px;">
								<el-option
									v-for="member in memberes"
									:key="member.member_value"
									:label="member.label"
									:value="member.member_value"></el-option>
							</el-select>
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
						<td>{{td.memberIdentity}}</td>
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
							<span style="color:#007aff;" @click="cashPass">{{td.operatePass}}</span><em>|</em>
							<router-link to="/cashCheck"><span style="color:#007aff;">{{td.operateCheck}}</span></router-link><em v-if="td.operateRefuse">|</em>
							<router-link to="/cashCheckRefuse"><span style="color:#e64e50;">{{td.operateRefuse}}</span></router-link>
						</td>
					</tr>
				</table>
			</el-form>
		</div>
		<el-pagination
		    layout="prev, pager, next"
		    :total="100"
		    style="margin-top:20px;">
		</el-pagination>
	</div>
</template>
<script>
export default{
	data(){
		return {
			searchTime:'',
			memberIdentity:'',
			memberes:[
                {
                    member_value:'',
                    label:'身份选择'
                },
				{
					member_value:'member1',
					label:'会员'
				},
				{
					member_value:'member2',
					label:'商家'
				},
				{
					member_value:'member3',
					label:'运营商'
				},
				{
					member_value:'member4',
					label:'代理商'
				}
			],
			memberName:'',
			thes:[
				{text:'用户名称'},
				{text:'会员身份'},
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
			tdes:[]
		}
	},
	methods:{
		cashPass(){
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
	background: url('../../assets/image/thead.png') no-repeat -10px -30px;
}


@import '../../assets/css/member_part.css'

</style>
