<template>
	<div>
		<el-form>
			<el-row>
				<el-col>
					<el-form-item>
						<el-select v-model="level" placeholder="请选择" @change="levelChange">
							<el-option 
								v-for="item in leveles1"
								:key="item.level"
								:label="item.label"
								:value="item.gc_name+'('+item.gc_id+')'"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col>
					<el-form-item>
						<el-select v-model="type" placeholder="请选择" @change="typeChange">
							<el-option 
								v-for="item in types"
								:key="item.type"
								:label="item.label"
								:value="item.gc_name+'('+item.gc_id+')'"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>
<script>

	export default {
		props:['levelValue','typeValue'],
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
				this.levelId = val.replace(/[^0-9]/ig,'')
				this.$emit('listenLevel',this.levelId)
				if (val) {
					type:''
				}
				this.$httpV2({
					method:'POST',
					url:'Storegoods/get_next_class',
					data:{
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
				this.typeId = val.replace(/[^0-9]/ig,'')
				this.$emit('listenType',this.typeId)
			}
		},
		// watch检测val值变化
		watch:{

			levelValue(val) {
				this.level = val
			},
			typeValue(val) {
				this.type = val
			}
		},
		beforeMount(){
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