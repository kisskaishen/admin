<template>
	<div>
		<h3>添加项目信息</h3>
		<div>
			<el-form label-width="180px">
				<el-form-item label="活动项目名称：">
					<span>{{this.$route.query.name}}</span>
				</el-form-item>

				<el-form-item label="商家名称：">
					<el-input v-model="storeName"></el-input>
				</el-form-item>

				<el-form-item label="活动页面海报：">
					<div class="file">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="活动图片">
                        <i v-else class="el-icon-activity"></i>
                        <input ref="files" type="file" name="avatar" @change="upload">
                        <div @change="upload">上传活动图片</div>
                    </div>
				</el-form-item>
				
				<hr><br/> 

				<el-form-item label="活动类型：">
					<el-select v-model="type" @change="typeChange">
						<el-option
							v-for="item in types"
							:key="item.value"
							:label="item.label"
							:value="item.value"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="置顶文本：">
					<el-input v-model="topText"></el-input>
				</el-form-item>

				<el-form-item label="举行地点：">
					<el-input v-model="place"></el-input>
				</el-form-item>

				<el-form-item label="电影效果：">
					<el-input v-model="effect"></el-input>
				</el-form-item>

				<el-form-item label="电影题材：">
					<el-input v-model="material"></el-input>
				</el-form-item>

				<el-form-item label="电影时长：">
					<el-input v-model="duration"></el-input>
				</el-form-item>

				<el-form-item label="上映时间：">
					<el-input v-model="showTime"></el-input>
				</el-form-item>

				<hr><br/>
				
				<el-form-item label="影院地址：">
					<el-input v-model="cinemaAddress"></el-input><span style="color:#666;">(若活动地址为空，则使用基础商品地址)</span>
				</el-form-item>

				<el-form-item label="经纬度：">
					<el-input v-model="longitude" placeholder="经度" style="margin-right:40px;"></el-input>
					<el-input v-model="latitude" placeholder="纬度"></el-input>
					<a href="http://lbs.amap.com/console/show/picker" target="_black"
                       style="color:#3caaf7;float:left;margin-left:20px;">查看经纬度</a>
				</el-form-item>

				<el-form-item label="规则1：">
					<span>{{rule1}}</span><br>
					<el-input type="textarea" v-model="rule1More" :autosize="{ minRows: 2, maxRows: 4}" placeholder="规则详情"></el-input>
				</el-form-item>

				<el-form-item label="规则2：">
					<span>{{rule2}}</span><br>
					<el-input type="textarea" v-model="rule2More" :autosize="{ minRows: 2, maxRows: 4}" placeholder="规则详情"></el-input>
				</el-form-item>

				<el-form-item label="电影描述：">
					<el-input type="textarea" v-model="description" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
				</el-form-item>
				
				<el-form-item label="各时间段投放券数：">
					<el-input v-model="num"></el-input> 
					<b class="error">提示：为避免不可控的错误，请选择投放数量在选择日期！</b>
				</el-form-item>
 
				<el-form-item label="投放信息：">
					<table>
						<tr class="thead">
							<th>投放日期/时间段</th>
							<th v-for="item,index in dateArr">{{index}}</th>
						</tr>
						<tr class="tbody">
							<td>{{timeArr0[0].time}}</td>
							<td><el-checkbox @change="check00Change"></el-checkbox></td>
							<td><el-checkbox @change="check01Change"></el-checkbox></td>
							<td><el-checkbox @change="check02Change"></el-checkbox></td>
							<td><el-checkbox @change="check03Change"></el-checkbox></td>
							<td><el-checkbox @change="check04Change"></el-checkbox></td>
							<td><el-checkbox @change="check05Change"></el-checkbox></td>
						</tr>
						<tr class="tbody">
							<td>{{timeArr0[1].time}}</td>
							<td><el-checkbox @change="check10Change"></el-checkbox></td>
							<td><el-checkbox @change="check11Change"></el-checkbox></td>
							<td><el-checkbox @change="check12Change"></el-checkbox></td>
							<td><el-checkbox @change="check13Change"></el-checkbox></td>
							<td><el-checkbox @change="check14Change"></el-checkbox></td>
							<td><el-checkbox @change="check15Change"></el-checkbox></td>
						</tr>
						<tr class="tbody">
							<td>{{timeArr0[2].time}}</td>
							<td><el-checkbox @change="check20Change"></el-checkbox></td>
							<td><el-checkbox @change="check21Change"></el-checkbox></td>
							<td><el-checkbox @change="check22Change"></el-checkbox></td>
							<td><el-checkbox @change="check23Change"></el-checkbox></td>
							<td><el-checkbox @change="check24Change"></el-checkbox></td>
							<td><el-checkbox @change="check25Change"></el-checkbox></td>
						</tr>
						<tr class="tbody">
							<td>{{timeArr0[3].time}}</td>
							<td><el-checkbox @change="check30Change"></el-checkbox></td>
							<td><el-checkbox @change="check31Change"></el-checkbox></td>
							<td><el-checkbox @change="check32Change"></el-checkbox></td>
							<td><el-checkbox @change="check33Change"></el-checkbox></td>
							<td><el-checkbox @change="check34Change"></el-checkbox></td>
							<td><el-checkbox @change="check35Change"></el-checkbox></td>
						</tr>
						<tr class="tbody">
							<td>{{timeArr0[4].time}}</td>
							<td><el-checkbox @change="check40Change"></el-checkbox></td>
							<td><el-checkbox @change="check41Change"></el-checkbox></td>
							<td><el-checkbox @change="check42Change"></el-checkbox></td>
							<td><el-checkbox @change="check43Change"></el-checkbox></td>
							<td><el-checkbox @change="check44Change"></el-checkbox></td>
							<td><el-checkbox @change="check45Change"></el-checkbox></td>
						</tr>
					</table>
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
				types:[
					{
						label:'电影',
						value:'1'
					},
					{
						label:'通用',
						value:'2'
					}
				],
				type:'1',
				name:'',
				storeName:'',
				imageUrl:'',
				imageUrlId:'',
				topText:'',
				place:'',
				effect:'',
				material:'',
				duration:'',
				showTime:'',
				cinemaAddress:'',
				longitude:'',
				latitude:'',
				rule1:'选座规则',
				rule1More:'',
				rule2:'使用规则',
				rule2More:'',
				description:'',

				num:'',
				dateArr:[],
				dateArrLength:[],
				dateArrId:[],

				timeArr0:[],
				timeArr1:[],
				timeArr2:[],
				timeArr3:[],
				timeArr4:[],
				timeArr5:[],

				titleArr:[],

				setDateArr:[],			// 发送给后台的时间数组

			}
		},
		created() {              
			// 时间段
			this.$axios.post('activity/activity_time',{
				activity_id:this.$route.query.activity_id
			})
				.then(res=>{
					if (res.data.code == 200) {
						this.dateArr = res.data.data

						for (let i in this.dateArr) { 
							this.titleArr.push(i)
						}		

						this.timeArr0 = res.data.data[this.titleArr[0]]
						this.timeArr1 = res.data.data[this.titleArr[1]] 
						this.timeArr2 = res.data.data[this.titleArr[2]]
						this.timeArr3 = res.data.data[this.titleArr[3]]
						this.timeArr4 = res.data.data[this.titleArr[4]]
						this.timeArr5 = res.data.data[this.titleArr[5]]
						console.log(res.data.data)

					} else {
						this.$message.warning(res.data.message)
					}
				})
				.catch(err=>{
					console.log(err)
				})

			
		},

		methods:{
			// 提交
			submit() {
				if (this.storeName == '' || this.imageUrl == '' || this.cinemaAddress == '' || this.topText == '' || this.place == '' || this.activity_item_character == '' || this.material == '' || this.duration == '' || this.showTime == '' || this.longitude == '' || this.latitude == '' || this.rule1More == '' || this.rule2More == '' || this.description == '' || JSON.stringify(this.setDateArr) == '' || this.num == '') {
						this.$message.error('信息必填！')
				} else {
					this.$axios.post('activity/add_activity_detail',{
						activity_id:this.$route.query.activity_id,
						goods_id:this.$route.query.goods_id,
						image_id:this.imageUrlId,
						store_name:this.storeName,
						activity_item_address:this.cinemaAddress,			// 影院地址（商家地址）
						activity_header_text:this.topText,			
						activity_item_venue:this.place,
						activity_item_character:this.activity_item_character,			// 电影效果（电影特点）,
						activity_item_type:this.material,
						activity_item_long:this.duration,
						activity_item_time:this.showTime,				// 上映时间（举行时间）
						activity_item_lng:this.longitude,
						activity_item_lat:this.latitude,
						activity_item_rule1:this.rule1More,
						activity_item_rule2:this.rule2More,
						activity_item_remark:this.description,
						activity_time:JSON.stringify(this.setDateArr).replace(/null,/ig,"").replace(/undefined,/ig,"").replace(/"",/ig,''),
						activity_item_storage:this.num
					})
						.then(res=>{
							if (res.data.code == 200) {
								this.$message.success(res.data.message)
							} else {
								this.$message.error(res.data.message)
							}
						})
						.catch(err=>{
							console.log(err)
						})
				}
				
			},
			// 上传图片
			upload(e) {
				 e.preventDefault();
	                var files = e.target.files;
	                var data = new FormData();
	                data.append('image', files[0]);
	                data.append('type', 12);

	                this.$upload({
	                    method: 'POST',
	                    url: '',
	                    data: data
	                })
	                    .then(res => {
	                        if (res.data.code == 200) {
	                        	this.imageUrl = res.data.data.url
	                        	this.imageUrlId = res.data.data.id
	                        } else {
	                        	this.$message.error('上传图片出错！')
	                        }
	                    })
	                    .catch(err => {
	                        console.log(err)
	                    })
			},
			// 类型改变
			typeChange(val) {
				this.type = val
			},
			
			// 返回上一页
			goBack() {
				history.go(-1)
			},
			// 时间选择
			// 第一行
			check00Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr0[0].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[0] = obj
				} else {
					this.setDateArr[0] = ''
				}
			},
			check01Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr1[0].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[1] = obj
				} else {
					this.setDateArr[1] = ''
				}
			},
			check02Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr2[0].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[2] = obj
				} else {
					this.setDateArr[2] = ''
				}
			},
			check03Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr3[0].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[3] = obj
				} else {
					this.setDateArr[3] = ''
				}
			},
			check04Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr4[0].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[4] = obj
				} else {
					this.setDateArr[4] = ''
				}
			},
			check05Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr5[0].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[5] = obj
				} else {
					this.setDateArr[5] = ''
				}
			},

			//第二行
			check10Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr0[1].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[6] = obj
				} else {
					this.setDateArr[6] = ''
				}
			},
			check11Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr1[1].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[7] = obj
				} else {
					this.setDateArr[7] = ''
				}
			},
			check12Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr2[1].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[8] = obj
				} else {
					this.setDateArr[8] = ''
				}
			},
			check13Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr3[1].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[9] = obj
				} else {
					this.setDateArr[9] = ''
				}
			},
			check14Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr4[1].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[10] = obj
				} else {
					this.setDateArr[10] = ''
				}
			},
			check15Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr5[1].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[11] = obj
				} else {
					this.setDateArr[11] = ''
				}
			},

			//第三行
			check20Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr0[2].activity_time_id
					console.log(this.timeArr2[0].activity_time_id)
					obj.activity_item_storage = this.num
					this.setDateArr[12] = obj
				} else {
					this.setDateArr[12] = ''
				}
			},
			check21Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr1[2].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[13] = obj
				} else {
					this.setDateArr[13] = ''
				}
			},
			check22Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr2[2].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[14] = obj
				} else {
					this.setDateArr[14] = ''
				}
			},
			check23Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr3[2].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[15] = obj
				} else {
					this.setDateArr[15] = ''
				}
			},
			check24Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr4[2].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[16] = obj
				} else {
					this.setDateArr[16] = ''
				}
			},
			check25Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr5[2].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[17] = obj
				} else {
					this.setDateArr[17] = ''
				}
			},

			//第四行
			check30Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr0[3].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[18] = obj
				} else {
					this.setDateArr[18] = ''
				}
			},
			check31Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr1[3].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[19] = obj
				} else {
					this.setDateArr[19] = ''
				}
			},
			check32Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr2[3].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[20] = obj
				} else {
					this.setDateArr[20] = ''
				}
			},
			check33Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr3[3].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[21] = obj
				} else {
					this.setDateArr[21] = ''
				}
			},
			check34Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr4[3].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[22] = obj
				} else {
					this.setDateArr[22] = ''
				}
			},
			check35Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr5[3].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[23] = obj
				} else {
					this.setDateArr[23] = ''
				}
			},

			//第五行
			check40Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr0[4].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[24] = obj
				} else {
					this.setDateArr[24] = ''
				}
			},
			check41Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr1[4].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[25] = obj
				} else {
					this.setDateArr[25] = ''
				}
			},
			check42Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr2[4].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[26] = obj
				} else {
					this.setDateArr[26] = ''
				}
			},
			check43Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr3[4].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[27] = obj
				} else {
					this.setDateArr[27] = ''
				}
			},
			check44Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr4[4].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[28] = obj
				} else {
					this.setDateArr[28] = ''
				}
			},
			check45Change(e) {
				if (e.target.checked) {
					let obj = {}
					obj.activity_time_id = this.timeArr5[4].activity_time_id
					obj.activity_item_storage = this.num
					this.setDateArr[29] = obj
				} else {
					this.setDateArr[29] = ''
				}
			},
		},
		
	}
</script>
<style scoped lang="scss">
	h3 {
		text-align:left;
		padding: 10px 20px;
	}
	.el-form {
		padding: 0 20px;
		.el-form-item {
			margin-bottom:22px !important;
			.file {
				width:184px;
				height:288px;
				img {
					display: block;
					width:184px;
					height:248px;
				}
				input[type="file"] {
					width:184px;
					height:288px;
				}
			}
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
			.el-textarea {
				float: left;
				width:300px;
				margin-top:10px;
			}
			table {
				width:80%;
			}
			.error {
				float:left;
				margin-left:20px;
			}
		}
	}
</style>