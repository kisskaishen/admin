<template>
	<div>
		<el-form>
			<el-row>
				<el-col>
					<el-form-item>
						<el-select v-model="level" placeholder="请选择" @change="levelChange">
							<el-option 
								v-for="item in leveles1"
								:key="item.gc_id"
								:label="item.gc_name"
								:value="item.gc_id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col>
					<el-form-item>
						<el-select v-model="type" placeholder="请选择" @change="typeChange">
							<el-option 
								v-for="item in types"
								:key="item.gc_id"
								:label="item.gc_name"
								:value="item.gc_id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>
<script>

	export default {
		props:['level','type'],
		data(){
			return {
				leveles1:[],
				level:this.level1Value,
				levelId:'',
				types:[],
				type:this.level2Value,
				typeId:'',

			}
		},
		methods:{
			levelChange(val){
				this.levelId = val
				this.$emit('listenLevel',this.levelId)
				if (val) {
					type:''
				}
				this.$httpV2({
					method:'POST',
					url:'Storegoods/get_next_class',
					data:{
						token:'',
						gc_id:this.levelId
					}
				})
				.then(res=>{
					this.types = res.data.data
				}) 
				.catch(err=>{
					console.log(err)
				})
			},
			typeChange(val) {
				this.typeId = val
				this.$emit('listenType',this.typeId)
			}
		},
		created(){
			this.$httpV2({
				method:'POST',
				url:'Storegoods/get_next_class',
			})
			.then(res=>{
				this.leveles1 = res.data.data
			}) 
			.catch(err=>{
				console.log(err)
			})
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