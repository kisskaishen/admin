<template>
	<div>
		<div class="contentDiv">
			<h3>添加单品券</h3>
			<div class="goodsList">
				<p>请选择商品</p>
				<ul>
					<li v-for="item in singleGoods" @click="handlerClick(item)" :class="{'active':item.show == true}">
						<img :src="item.goods_image" :alt="item.goods_name">
						<p>{{item.goods_name}}</p>
						<p>{{item.goods_costprice}}元</p>
						<p>规格：{{item.spec_name}}</p>
					</li>
				</ul>
			</div>
		</div>
		<good-table :goodsList="addGoods" @toParent="getChildValue"></good-table>
		<div class="btDiv">
			<el-button type="danger" @click="publishSingle">发布</el-button>
		</div>
	</div>
</template>
<script>
import GoodTable from '../../goods/addGoodTable.vue'

export default {
	data(){
		return {
			singleGoods:[],
			// 点击的数据列表
			addGoods:[],
			formData:[],
			storeId:'',		// 商家id
			singleObj:{},		// 单品对象
		}
	},
	components:{ GoodTable },
	created(){
		// 展示相关storeId下的商品
		this.$axios.post('Goods/package_list',{
				store_id:this.$route.query.id					
			}
		)
			.then(res=>{
				if (res.data.code == 200) {
					this.singleGoods = res.data.data
				}else {
					this.$message.warning(res.data.message)
				}
			})
			.catch(err=>{
				console.log(err)
			})
	},
	computed:{
		
	},
	methods:{
		handlerClick(item){
			let i = 0;
			item.show = !item.show
			if (item.show = item.show) {
				this.addGoods.push(item)
			}else {
				for(;i<this.addGoods.length;i++) {
					if (this.addGoods[i].goods_union_id == item.goods_union_id) {
						this.addGoods.splice(i,1)
					} else {
						console.log('没有找到呢')
					}
				}
				
			}
			
		},
		// 获取子组件的值
		getChildValue(data){
			this.singleObj = data
		},
		// 发布按钮
		publishSingle(){
			this.$axios({
				method:'POST',
				url:'Goods/add_batch_single',
				data:{
					store_id:this.$route.query.id,				
					goods_union_arr:this.singleObj
				}
			})
			.then(res=>{
				if (res.data.code == 200) {
					this.$message.success(res.data.message)
					this.$router.push('/activityManage/activityGoodsList')
				} else {
					this.$message.error(res.data.message)
				}
				
			})
			.catch(err=>{
				console.log(err)
			})
		}		
		

	}
}
	
</script>

<style scoped lang="scss">
h3 {
	padding: 10px 20px;
	text-align:left;
}
.active {
	border: 2px solid #e4393c !important;
}
.active:after {
	position: absolute;
	content: '';
	width: 32px;
	height: 32px;
	right: -2px;
	bottom: -2px;
	background: url('../../../../assets/image/active_after.png') no-repeat center /100%;
}
.el-breadcrumb {
	line-height: 30px;
}
.goodsList {
	margin: 0 10px;
	padding: 6px 10px;
	text-align: left;
	border: 1px solid #dcdcdc;
}
.goodsList li {
	position: relative;
	display: inline-block;
	margin: 10px 8px;
	padding: 6px 4px;
	border: 1px solid #dcdcdc;
	box-sizing: border-box;
}
.goodsList li img {
	display: block;
	width: 134px;
	height: 118px;
	border: 1px solid #ccc;
}
.goodsList li p {
	color: #242424;
	line-height: 24px;
}

.goodTable {
	margin-top: 20px;
	img {
		display: block;
		width: 60px;
		height: 60px;
		margin: 6px auto;
		border: 1px solid #dcdcdc;
	}
}
table {
	width:100% !important;
}

</style>