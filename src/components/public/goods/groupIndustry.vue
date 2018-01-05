<template>
	<div>
		<el-form>
			<el-row>
				<el-col>
					<el-form-item style="width:180px;margin-right:20px">
						<el-select v-model="level1" placeholder="一级分类" @change="levelChange" size="small">
							<el-option 
								v-for="item in leveles1"
								:key="item.level1"
								:label="item.label"
								:value="item.gc_name+'('+item.gc_id+')'"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col>
					<el-form-item style="width:180px;margin-right:20px">
						<el-select v-model="level2" placeholder="二级分类" @change="level2Change" size="small">
							<el-option 
								v-for="item in leveles2"
								:key="item.level2"
								:label="item.label"
								:value="item.gc_name+'('+item.gc_id+')'"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col>
					<el-form-item style="width:180px;margin-right:20px">
						<el-select v-model="level3" placeholder="三级分类" @change="level3Change" size="small">
							<el-option 
								v-for="item in leveles3"
								:key="item.level3"
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
		data(){
			return {
				leveles1:[],
				leveles2:[],
				leveles3:[],
				level1:'',
				level2:'',
				level3:'',
				levelId:'',
				level2Id:'',
				level3Id:'',


			}
		},
		methods:{
		// 分类选择
			levelChange(val){
				this.levelId = val.replace(/[^0-9]/ig,'')
				this.$emit('listenLevel1',this.levelId)
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
					this.leveles2 = res.data.data
				}) 
				.catch(err=>{
					console.log(err)
				})
			},
			level2Change(val) {
				this.level2Id = val.replace(/[^0-9]/ig,'')
				this.$emit('listenLevel2',this.level2Id)

				if (val) {
					type:''
				}
				this.$httpV2({
					method:'POST',
					url:'Storegoods/get_next_class',
					data:{
						gc_id:this.level2Id
					}
				})
				.then(res=>{
					this.leveles3 = res.data.data
				}) 
				.catch(err=>{
					console.log(err)
				})
			},
			level3Change(val) {
				this.level3Id = val.replace(/[^0-9]/ig,'')
				this.$emit('listenLevel3',this.level3Id)

			
				
			},
		},
		created(){
			// 分类选择
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