<template>
	<div>
		<h3>添加活动</h3>
		<div>
			<el-form label-width="180px">
				<el-form-item label="活动名称：">
					<el-input v-model="name" placeholder="活动名称"></el-input>
				</el-form-item>
				<el-form-item label="投放日期：">
					<el-row class="condition">
						<el-col>
							<el-date-picker
								v-model="date1"
								type="date"
								placeholder="日期1"
								:picker-options="pickerOptions"
								@change="date1Change"></el-date-picker>
						</el-col>

						<el-col>
							<el-date-picker
								v-model="date2"
								type="date"
								placeholder="日期2"
								:picker-options="pickerOptions"
								@change="date2Change"></el-date-picker>
						</el-col>

						<el-col>
							<el-date-picker
								v-model="date3"
								type="date"
								placeholder="日期3"
								:picker-options="pickerOptions"
								@change="date3Change"></el-date-picker>
						</el-col>
					</el-row>

					<el-row class="condition">
						<el-col>
							<el-date-picker
								v-model="date4"
								type="date"
								placeholder="日期4"
								:picker-options="pickerOptions"
								@change="date4Change"></el-date-picker>
						</el-col>

						<el-col>
							<el-date-picker
								v-model="date5"
								type="date"
								placeholder="日期5"
								:picker-options="pickerOptions"
								@change="date5Change"></el-date-picker>
						</el-col>

						<el-col>
							<el-date-picker
								v-model="date6"
								type="date"
								placeholder="日期6"
								:picker-options="pickerOptions"
								@change="date6Change"></el-date-picker>
						</el-col>
					</el-row>
				</el-form-item>

				<el-form-item label="投放时段：">
					<el-row class="condition">
						<el-col>
							<el-time-select
								v-model="time1"
								:picker-options="{
								    start: '00:00',
								    step: '00:30',
								    end: '23:30'
								  }"
								placeholder="时间1"
								@change="time1Change"></el-time-select>
						</el-col>

						<el-col>
							<el-time-select
								v-model="time2"
								:picker-options="{
								    start: '00:00',
								    step: '00:30',
								    end: '23:30'
								  }"
								placeholder="时间2"
								@change="time2Change"></el-time-select>
						</el-col>

						<el-col>
							<el-time-select
								v-model="time3"
								:picker-options="{
								    start: '00:00',
								    step: '00:30',
								    end: '23:30'
								  }"
								placeholder="时间3"
								@change="time3Change"></el-time-select>
						</el-col>
					</el-row>

					<el-row class="condition">
						<el-col>
							<el-time-select
								v-model="time4"
								:picker-options="{
								    start: '00:00',
								    step: '00:30',
								    end: '23:30'
								  }"
								placeholder="时间4"
								@change="time4Change"></el-time-select>
						</el-col>

						<el-col>
							<el-time-select
								v-model="time5"
								:picker-options="{
								    start: '00:00',
								    step: '00:30',
								    end: '23:30'
								  }"
								placeholder="时间5"
								@change="time5Change"></el-time-select>
						</el-col>

					</el-row>
				</el-form-item>

				<el-form-item label="购买限制：">
					<el-select v-model="buyType" @change="buyTypeChange">
							<el-option 
								v-for="item in buyTypes"
								:key="item.value"
								:label="item.label"
								:value="item.value"></el-option>
						</el-select>
				</el-form-item>
				
				<el-form-item label="">
					<el-button @click="goBack">返回</el-button>
					<el-button type="danger" @click="submit">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				name:'',
				date1:'',
				date2:'',
				date3:'',
				date4:'',
				date5:'',
				date6:'',
				time1:'',
				time2:'',
				time3:'',
				time4:'',
				time5:'',
				pickerOptions:{
					disabledDate(time) {
			            return time.getTime() < Date.now() - 8.64e7;
			        }
				},

				buyTypes:[
					{
						label:'全部会员限购一次',
						value:'1'
					},
					{
						label:'不限制',
						value:'0'
					}
				],
				buyType:'1',

				dateTimeObj:{},			// 活动日期与时间
				dateTimeArr:[],
				dateArr:[],				// 日期数组
				timeArr:[],				// 时间数组
				timeObj:{},

			}
		},
		created() {

		},
		methods:{
			// 提交
			submit() {
				if (this.date1 != '' && this.date2 != '' && this.date3 != '' && this.date4 != '' && this.date5 != '' && this.date6 != '' && this.time1 != '' && this.time2 != '' && this.time3 != '' && this.time4 != '' && this.time5 != '') {
					this.$axios.post('activity/add_activity',{
						activity_title:this.name,
						activity_time:JSON.stringify(this.dateTimeObj),
						activity_order_type:this.buyType
					})
						.then(res=>{
							if (res.data.code == 200) {
								this.$message.success(res.data.message)

								this.$router.push({path:'/activityManage/oneMoney'})
							
							} else {
								this.$message.error(res.data.message)
							}
						})
						.catch(err=>{
							console.log(err)
						})
					} else {
						this.$message.error('日期和时间必须全填！')
					}
			},
			// 返回上一页
			goBack() {
				history.go(-1)
			},
			// 投放日期选择
			date1Change(val) {
				this.date1 = val
				this.dateArr[0] = this.date1.replace(/\-/ig,'')
			},
			date2Change(val) {
				this.date2 = val
				this.dateArr[1] = this.date2.replace(/\-/ig,'')
			},
			date3Change(val) {
				this.date3 = val
				this.dateArr[2] = this.date3.replace(/\-/ig,'')
			},
			date4Change(val) {
				this.date4 = val
				this.dateArr[3] = this.date4.replace(/\-/ig,'')
			},
			date5Change(val) {
				this.date5 = val
				this.dateArr[4] = this.date5.replace(/\-/ig,'')
			},
			date6Change(val) {
				this.date6 = val
				this.dateArr[5] = this.date6.replace(/\-/ig,'')
			},
			// 投放时间选择
			time1Change(val) {
				this.timeArr[0] = val
				for(let i=0;i<this.dateArr.length;i++) {
					this.dateTimeObj[this.dateArr[i]] = this.timeArr
				}
			},
			time2Change(val) {
				this.timeArr[1] = val
				for(let i=0;i<this.dateArr.length;i++) {
					this.dateTimeObj[this.dateArr[i]] = this.timeArr
				}
			},
			time3Change(val) {
				this.timeArr[2] = val
				for(let i=0;i<this.dateArr.length;i++) {
					this.dateTimeObj[this.dateArr[i]] = this.timeArr
				}
			},
			time4Change(val) {
				this.timeArr[3] = val
				for(let i=0;i<this.dateArr.length;i++) {
					this.dateTimeObj[this.dateArr[i]] = this.timeArr
				}
			},
			time5Change(val) {
				this.timeArr[4] = val
				for(let i=0;i<this.dateArr.length;i++) {
					this.dateTimeObj[this.dateArr[i]] = this.timeArr
				}
			},
			// 购买限制选择
			buyTypeChange(val) {
				this.buyType = val
			}
		}
	}
</script>
<style scoped lang="scss">
	h3 {
		text-align:left;
		padding: 10px 0 10px 40px;
	}
	.el-form {
		.el-form-item {
			margin-bottom:22px !important;
			.el-input {
				float: left;
				width:200px;
			}
			.el-select {
				float: left;
				width:200px;
			}
			.el-button {
				float: left;
			}
		}
	}
</style>