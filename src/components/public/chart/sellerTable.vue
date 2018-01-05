<template>
	<div>
		<div class="tableDiv">
			<div>
				<h5>会员</h5>
				<table>
					<tr>
						<th>新增会员</th>
						<td>{{tableInfo.member_count}}</td>
					</tr>
					<tr>
						<th>新增VIP</th>
						<td>{{tableInfo.vip_member_count}}</td>
					</tr>
				</table>
			</div>
			<div>
				<h5>订单</h5>
				<table>
					<tr v-for="item in tableInfo.order">
						<th>{{item.name}}</th>
						<td>{{item.num}}</td>
					</tr>
					</tr>
				</table>
			</div>
			<div>
				<h5>当前商品</h5>
				<table>
					<tr>
						<th>全部</th>
						<td>{{tableInfo.goods_all}}</td>
					</tr>
					<tr>
						<th>在售商品</th>
						<td>{{tableInfo.goods_state_verify}}</td>
					</tr>
					<tr>
						<th>已下架商品</th>
						<td>{{tableInfo.goods_state}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:['sellerTable','currentDate'],
		data() {
			return {

			}
		},
		computed:{
			tableInfo(){
				return this.sellerTable
			},
			// currentDateTxt(){
			// 	return this.currentDate
			// },
		},
		created() {

		}
	}
</script>
<style scoped lang="scss">
	.tableDiv {
		display: inline-block;
		width:400px;
		table {
			tr {
				line-height:30px;
				th,td {
					line-height:30px;
					font-weight:bold;
					border-radius:4px;
				}
				td {
					font-size:18px;
				}
			}
		}
		&>div {
			h5 {
				margin:10px 0 -10px;
			}
			&:nth-child(1) {
				th {
					background-color:#20d6fe !important;
				}
				td {
					color:#20d6fe;
				}
			}
			&:nth-child(2) {
				th {
					background-color:#60ecbe !important;
				}
				td {
					color:#60ecbe;
				}
			}
			&:nth-child(3) {
				th {
					background-color:#feadab !important;
				}
				td {
					color:#feadab;
				}
			}
		}
	}
</style>