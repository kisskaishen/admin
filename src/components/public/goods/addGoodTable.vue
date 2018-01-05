<template>
	<div>
		<div class="contentDiv goodTable">
			<table>
				<tr>
					<th width="60px">编号</th>
					<th width="80px">商品图</th>
					<th>名称</th>
					<th>分类</th>
					<th width="60px">规格</th>
					<th>店铺价格</th>
					<th width="88px">默认销售量</th>	
					<th>添加时间</th>
					<th width="90px">设置餐餐抢价</th>
					<th width="80px">库存</th>

				</tr>
				<tr v-for="item,index in goodsList">
					<td>{{item.goods_union_id}}</td>
					<td><img :src="item.goods_image" :alt="item.goods_name"></td>
					<td>{{item.goods_name}}</td>
					<td>{{item.classify}}</td>
					<td>{{item.spec_name}}</td>
					<td>{{item.goods_costprice}}元</td>
					<td>{{item.goods_salenum}}</td>
					<td>{{item.goods_addtime}}</td>
					<td><el-input v-model="item.setCcqPrice" size="small" style="width:60px;"></el-input></td>
					<td><el-input v-model="item.setStock" size="small" style="width:60px;" @blur="testBlur(item)"></el-input></td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	props:['goodsList'],
	data(){
		return {
			setCcqPrice:'',
			setStock:'',
			goods_union_id:'',
			dataObj:{},
			dataArr:[],
		}
	},
	methods:{
		testBlur(val) {			
			for(let i=0;i<this.goodsList.length;i++) {
				if (val.goods_union_id == this.goodsList[i].goods_union_id) {	
					delete this.goodsList[i].goods_image
					delete this.goodsList[i].goods_name
					delete this.goodsList[i].show
					delete this.goodsList[i].spec_name
					delete this.goodsList[i].goods_costprice
					this.dataArr.push(this.goodsList[i])

				}
			}

			this.$emit('toParent',JSON.stringify(this.dataArr).replace(/setCcqPrice/ig,'price').replace(/setStock/ig,'sum'))
		},
	}
}
	
</script>

<style scoped>
.goodTable {
	margin-top: 20px;
}
.goodTable img {
	display: block;
	width: 60px;
	height: 60px;
	margin: 6px auto;
	border: 1px solid #dcdcdc;
}
</style>