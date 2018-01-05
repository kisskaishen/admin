<!--二级联动---id-->
<template>
	<div>
	 <!-- :model="form" :rules="rules" ref="form" -->
		<el-form>
			<el-row>

				<el-col style="width:128px;">
					<el-form-item>
						<el-select v-model="province" placeholder="请选择省份" @change="proChange" size="small">
							<el-option
								v-for="(item,index) in provinces"
								:key="item.province"
								:label="item.label"
								:value="item.name+'('+item.id+')'"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col style="width:128px;">
					<el-form-item>
						<el-select v-model="city" placeholder="请选择市" @change="cityChange" size="small">
							<el-option
								v-for="item in cities"
								:key="item.city"
								:label="item.label"
								:value="item.name+'('+item.id+')'"></el-option>
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
				provinces:[],
				cities:[],
				province:'',
				city:'',
				provinceId:'',
				cityId:'',

			}
		},
		methods:{
			proChange(newVal) {
				this.provinceId = newVal.replace(/[^0-9]/ig,'')
				this.$emit('positionPro',this.provinceId);
				if (newVal) {
					this.city = ''
				}
				this.$axios({
					method:'POST',
					url:'store/get_narea',
					data:{
						parent_id:this.provinceId
					}
				})
				.then(res=>{
					this.cities = res.data.data

				})
				.catch(err=>{
					console.log('err')
				})



			},
			cityChange(newVal) {
				this.cityId = newVal.replace(/[^0-9]/ig,'')
				this.$emit('positionCity',this.cityId);
			}
		},
		beforeMount(){
			this.$axios.post('store/get_narea')
			.then(res=>{
				this.provinces = res.data.data
			})
			.catch(err=>{
				console.log(err)
			})

		}
	}
</script>
<style scoped lang="scss">
.el-col {
	width: 180px;
	margin-right: 10px;
}
.el-input {
	width: 600px;
}
.el-select {
	width: 120px;
}
</style>
