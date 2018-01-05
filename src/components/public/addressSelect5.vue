<!--四级联动-不含具体地址-----id-->
<template>
	<div>
	 <!-- :model="form" :rules="rules" ref="form" -->
		<el-form>
			<el-row>
				<el-col>
					<el-form-item>
						<el-select v-model="province" size="small" placeholder="省份" @change="proChange">
							<el-option
								v-for="item in provinces"
								:key="item.id"
								:label="item.name"
								:value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col>
					<el-form-item>
						<el-select v-model="city" size="small" placeholder="市" @change="cityChange">
							<el-option
								v-for="item in cities"
								:key="item.id"
								:label="item.name"
								:value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>



				<el-col>
					<el-form-item>
						<el-select v-model="area" size="small" placeholder="区" @change="areaChange">
							<el-option
								v-for="item in areas"
								:key="item.id"
								:label="item.name"
								:value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>

				<el-col>
					<el-form-item>
						<el-select v-model="street" size="small" placeholder="街道/镇" @change="streetChange">
							<el-option
								v-for="item in streets"
								:key="item.id"
								:label="item.name"
								:value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>
<script>

	export default {
		props:['provinceValue','cityValue','areaValue','streetValue','detailValue'],
		data(){
			return {
				provinces:[],
				cities:[],
				areas:[],
				streets:[],

				province:this.provinceValue,
				city:this.cityValue,
				area:this.areaValue,
				street:this.streetValue,
				detail:this.detailValue,

				provinceId:'',
				cityId:'',
				areaId:'',
				streetId:'',



			}
		},
		methods:{
			proChange(newVal) {
				this.provinceId = newVal.replace(/[^0-9]/ig,'')
				this.$emit('listenProvince',this.provinceId)
				if (newVal) {
					this.city = ''
					this.area = ''
					this.street = ''
					this.detail = ''
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
				this.$emit('listenCity',this.cityId)
				if (newVal) {
					this.area = ''
					this.street = ''
					this.detail = ''
				}
				this.$axios({
					method:'POST',
					url:'store/get_narea',
					data:{
						parent_id:this.cityId
					}
				})
				.then(res=>{
					this.areas = res.data.data
				})
				.catch(err=>{
					console.log('err')
				})
			},
			areaChange(newVal) {
				this.areaId = newVal.replace(/[^0-9]/ig,'')
				this.$emit('listenArea',this.areaId)
				if (newVal) {
					this.street = ''
					this.detail = ''
				}
				this.$axios({
					method:'POST',
					url:'store/get_narea',
					data:{
						parent_id:this.areaId
					}
				})
				.then(res=>{
					this.streets = res.data.data
				})
				.catch(err=>{
					console.log('err')
				})
			},
			streetChange(newVal) {
				this.streetId = newVal.replace(/[^0-9]/ig,'')
				this.$emit('listenStreet',this.streetId)
				if (newVal) {
					this.detail = ''
				}
			},
			detailChange() {
				this.$emit('listenDetail',this.detail)
			}
		},
		watch:{
			provinceValue(val) {
				this.province = val
			},
			cityValue(val) {
				this.city = val
			},
			areaValue(val) {
				this.area = val
			},
			streetValue(val) {
				this.street = val
			},
			detailValue(val) {
				this.detail = val
			},
		},
		created(){
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
<style scoped>
.el-col {
	width: 120px;
	margin-right: 10px;
}
.el-input {
	width: 600px;
}
</style>
