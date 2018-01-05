<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item to="/vipRecharge">VIP充值</el-breadcrumb-item>
			<el-breadcrumb-item>会员充值记录次数</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<div>
				<el-row>
					<el-col :lg="4">会员账号：{{memberName}}</el-col>
					<el-col :lg="6">截止日期：{{overTime}}</el-col>
				</el-row>
				<el-row>
					<el-col :lg="4">VIP会员充值：{{vipRecharge}}次</el-col>
					<el-col :lg="6">VIP到期：{{vipOverTime}}</el-col>
				</el-row>

			</div>
			<div>
				<table>
					<tr class="thead">
						<th width="12%">会员</th>
						<th width="6%" align="center">类型</th>
						<th width="16%">订单号</th>
						<th width="10%">店铺</th>
						<th width="12%">付款时间</th>
						<th width="7%" align="center">充值金额</th>
						<th width="10%" align="center">支付方式</th>
						<th width="8%">状态</th>
						<th width="8%" align="center">充值时长</th>
						<th width="7%">确认款项</th>
						<th width="8%" align="center">操作</th>
					</tr>
					<tr v-for="td in tdes" class="tbody">
						<td>{{td.buyer_name}}</td>
						<td align="center">{{td.type}}</td>
						<td>{{td.order_sn}}</td>
						<td>{{td.store_name}}</td>
						<td>{{td.payment_time}}</td>
						<td align="center">{{td.order_amount}}元</td>
						<td align="center">{{td.payment_code}}</td>
						<td>{{td.order_state}}</td>
						<td align="center">{{td.goods_num}}</td>
						<td>{{td.rechargeSure}}</td>
						<td align="center">
							<router-link :to="{path:'/vipRecharge/vipRechargeDetails',query:{orderId:td.order_id}}"><span style="color:#007aff;">查看</span></router-link><em v-if="td.is_cancel">|</em>
							<span style="color:#e64e50;" @click="layerCancelClick(td)">{{td.is_cancel}}</span>
						</td>
					</tr>
				</table>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				tdes:[],
                buyerId:'',
                memberName:'',
                overTime:'',
                vipRecharge:'',
                vipOverTime:'',


			}
		},
        created(){
		    this.buyerId = this.$route.query.buyer_id
            this.memberName = this.$route.query.buyer_name
            this.$axios({
                method:'post',
                url:'Order/vip_order_list',
                data:{
                    buyer_id:this.buyerId,
                }
            })
                .then(res=>{
                    if (res.data.code == 200) {
                        this.tdes = res.data.data.list
                        this.overTime = res.data.data.over_time
                        this.vipRecharge = res.data.data.buy_total
                        this.vipOverTime = res.data.data.vip_endTime
                    } else {
                        this.$message({
                            message:res.data.message,
                            type:'warning',
                            duration:1600
                        })
                    }

                })
                .catch(err=>{
                    console.log(err)
                })
        },
        methods:{
            layerCancelClick(val){
                this.$axios.post('Order/vip_order_cancel',{
                    order_id:val.order_id
                })
                    .then(res=>{
                        if (res.data.code == 200) {
                            this.$message({
                                message:res.data.message,
                                type:'success',
                                duration:1600
                            })
                            setTimeout("location.reload()",1600)
                        }else {
                            this.$message({
                                message:res.data.message,
                                type:'warning',
                                duration:1600
                            })
                            setTimeout("location.reload()",1600)
                        }
                    })
            }
        }






	}
</script>

<style scoped lang="scss">
	.el-breadcrumb {
		line-height: 30px;
	}
	.el-row {
		padding: 10px ;
	}
	.el-col {
		text-align: left;
	}
	.el-col span {
		color: #e4393c;
	}
	.tip {
		padding-left: 10px;
	}
	.tip span {
	    display: inline-block;
	    height: 10px;
	    line-height: 10px;
	    padding-left: 10px;
	    margin-right: 10px;
	    color: #242424;
	}
	.tip span:nth-child(1) {
		border-left: 10px solid #ff8846;
	}
	.tip span:nth-child(2) {
		border-left: 10px solid #00d138;
	}
	table tr.thead {
		background: linear-gradient(to right,#ffa1a3,#fad0c4);
	}
	table td {
		color: #242424 !important;
	}

</style>
