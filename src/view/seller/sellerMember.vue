<template>
	<div>
		<!-- 面包屑导航 -->
		<el-breadcrumb separator=">">
		  <el-breadcrumb-item :to="{ path: '/seller' }">餐餐抢商家</el-breadcrumb-item>
		  <el-breadcrumb-item>商家会员</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<div class="sellerInfo">
				<span>商家：餐餐抢体验店</span>
				<span>商家账号：kisskaishen_123</span>
				<span>注册会员：15234</span>
				<span>VIP会员：12304</span>
			</div>
			<!-- 奖金类型 -->
			<el-form label-width="100px">
				<el-row>
					<el-col :lg="6">
						<el-form-item label="查询时间">
							<el-date-picker
						        v-model="time_value"
						        type="daterange"
						        placeholder="选择日期范围" size="small">
						    </el-date-picker>
						</el-form-item>
					</el-col>	
					<el-col :lg="4">
						<el-form-item label="VIP状态">
							<el-select v-model="vip_status" size="small">
								<el-option
							      v-for="vip_status in vip_statuses"
							      :key="vip_status.vip_status"
							      :label="vip_status.label"
							      :value="vip_status.vip_status"
							       placeholder="请选择">
							    </el-option>
						    </el-select>
						</el-form-item>
					</el-col>	
					<el-col :lg="4">
						<el-form-item label="购买商品次数">
							<el-select v-model="choose" size="small">
								<el-option
							      v-for="choose in chooses"
							      :key="choose.choose"
							      :label="choose.label"
							      :value="choose.choose"
							       placeholder="请选择" >
							    </el-option>
						    </el-select>
						</el-form-item>
					</el-col>	
					<el-col :lg="4">
						<el-form-item label="最近一次购买">
							<el-select v-model="last_buy" size="small">
								<el-option
							      v-for="last_buy in last_buies"
							      :key="last_buy.last_buy"
							      :label="last_buy.label"
							      :value="last_buy.last_buy">
							    </el-option>
						    </el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<!-- 表格显示 -->
			<table>
				<tr class="thead">
					<th v-for="th in thes">{{th.text}}</th>
				</tr>
				<tr v-for="td in tdes">
					<td>{{td.sellerMember}}</td>
					<td>{{td.regTime}}</td>
					<td>{{td.vipStatus}}</td>
					<td>{{td.choose}}</td>
					<td>{{td.lastBuy}}</td>
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
				time_value:'',
				// vip状态
				vip_statuses:[
					{
						vip_status:'vip_status1',
						label:'是'
					},
					{
						vip_status:'vip_status2',
						label:'否'
					}
				],
				vip_status:'',
				// 商品购买次数选择
				chooses:[
					{
						choose:'choose1',
						label:'>'
					},
					{
						choose:'choose2',
						label:'<'
					},
					{
						choose:'choose3',
						label:'='
					},
				],
				choose:'',
				// 最近一次购买
				last_buies:[
					{
						last_buy:'last_buy0',
						label:'所有'
					},
					{
						last_buy:'last_buy1',
						label:'一周内'
					},
					{
						last_buy:'last_buy2',
						label:'一个月内'
					},
					{
						last_buy:'last_buy3',
						label:'一年内'
					}
				],
				last_buy:'last_buy0',
				// 表头
				thes:[
					{text:'会员'},
					{text:'注册时间'},
					{text:'VIP状态 '},
					{text:'购买商品次数'},
					{text:'最近一次购买'},
				],
				//表身
				tdes:[
					{
						sellerMember:'13798238693',
						regTime:'2017-05-20',
						vipStatus:'是',
						choose:'10',
						lastBuy:'2017-05-20'
					},
					{
						sellerMember:'13798238693',
						regTime:'2017-05-20',
						vipStatus:'是',
						choose:'10',
						lastBuy:'2017-05-20'
					},
					{
						sellerMember:'13798238693',
						regTime:'2017-05-20',
						vipStatus:'是',
						choose:'10',
						lastBuy:'2017-05-20'
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
.el-form {
	margin-bottom: 10px;
}
.sellerInfo {
	height: 40px;
	line-height: 40px;
	text-align: left;
	font-size: 12px;
	background-color: #eee;
}
.sellerInfo span {
	padding-left: 10px;
	margin-right: 30px;
}
.thead {
	background: url('../../assets/image/thead.png') -10px -93px;
}




</style>