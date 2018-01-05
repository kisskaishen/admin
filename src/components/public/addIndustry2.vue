<!-- 三级分类 -->
<template>
	<div>
		<el-row>
			<el-col style="width:372px">
				<el-select v-model="level1" placeholder="一级分类" @change="level1Change" size="small">
				    <el-option
				        v-for="item in leveles1"
				        :key="item.gc_id"
				        :label="item.gc_name"
				        :value="item.gc_id"></el-option>
				</el-select>
	
				<el-select v-model="level2" placeholder="二级分类" @change="level2Change" size="small">
				    <el-option
				        v-for="item in leveles2"
				        :key="item.gc_id"
				        :label="item.gc_name"
				        :value="item.gc_id"></el-option>
				</el-select>
		
				<el-select v-model="level3" placeholder="三级分类" @change="level3Change" size="small">
				    <el-option
				        v-for="item in leveles3"
				        :key="item.gc_id"
				        :label="item.gc_name"
				        :value="item.gc_id"></el-option>
				</el-select>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				leveles1:[],
				level1:'',
				leveles2:[],
				level2:'',
				leveles3:[],
				level3:'',
			}
		},
		created() {
			this.$httpV2.post('Storegoods/get_next_class')
				.then(res=>{
					this.leveles1 = res.data.data
				})
				.catch(err=>{
					console.log(err)
				})
		},
		methods:{
			// 点击一级触发二级
			level1Change(val) {
				this.$httpV2.post('Storegoods/get_next_class',{
					gc_id:val
				})
					.then(res=>{
						this.leveles2 = res.data.data
						this.level1 = val
						this.$emit('toLevel1',this.level1)
					})
					.catch(err=>{
						console.log(err)
					})
			},
			level2Change(val) {
				this.$httpV2.post('Storegoods/get_next_class',{
					gc_id:val
				})
					.then(res=>{
						this.leveles3 = res.data.data
						this.level2 = val
						this.$emit('toLevel2',this.level2)
					})
					.catch(err=>{
						console.log(err)
					})
			},
			level3Change(val) {
				this.level3 = val
				this.$emit('toLevel3',this.level3)
			},
		}

	}
</script>
<style scoped>
.el-col {
	text-align: left;
	width: 180px;
	margin-right: 10px;
}
</style>