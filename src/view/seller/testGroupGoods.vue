<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{path:'/seller'}">餐餐抢商家</el-breadcrumb-item>
			<el-breadcrumb-item>添加套餐券</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<p class="tip">套餐添加</p>
			<div class="photoList">
				<p>请添加照片</p>
			    <div class="file">
					<img v-if="imageUrl" :src="imageUrl" class="avatar" alt="套餐券图片">
					<i v-else class="el-icon-banner"></i>
					<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传套餐券图片</span>
				</div>
			</div>

			<div class="goodsList">
				<p>请选择商品</p>
				<el-row>
					<el-col :span="18">
						<select-type
							@listenLevel1="listenLevel1"
							@listenLevel2="listenLevel2"
							@listenLevel3="listenLevel3"></select-type>
					</el-col>
					<el-col style="width:160px;float:right;margin-top:4px;" >
						<span class="fl" style="width:60px;height:20px;border:1px solid #ccc;border-radius:4px;">{{foodNum}}</span>
						<span class="fl" style="margin:0 10px;">选</span><el-input v-model="foodsChoose" size="mini" class="fl" style="width:60px;"></el-input>
					</el-col>
				</el-row>
				<div>
					<ul style="margin-top:44px;">
						<li v-for="item in goodsList" :class="{'active':item.show == true}"  @click="handlerClick(item)">
							<img :src="item.goods_image" :alt="item.goods_name">
							<p>{{item.goods_name}}</p>
							<p>{{item.goods_costprice}}元</p>
							<p>规格：{{item.spec_name}}</p>
						</li>
					</ul>
					<el-button type="danger" size="mini" v-if="level3Id" @click="addTodetail">添加</el-button>
				</div>
			</div>

			<!-- 商品或商家其他信息 -->
			<div class="goodsOther">
				<el-form label-width="180px">
					<el-form-item label="套餐名称：">
						<el-input v-model="groupName" size="small" style="width:200px"></el-input>
					</el-form-item>

					<el-form-item label="套餐详情：">
						<table>
							<tr v-for="group in groupList">
								{{group}}
							</tr>
						</table>
					</el-form-item>

					<el-form-item label="套餐有效期：">
						<el-date-picker
					      v-model="startDate"
					      type="date"
					      placeholder="选择开始日期"
					      size="small"
					      style="width:140px;margin-right:20px">
					    </el-date-picker>
					    <el-date-picker
					      v-model="endDate"
					      type="date"
					      placeholder="选择结束日期"
					      size="small"
					      style="width:140px;">
					    </el-date-picker>
					</el-form-item>
					<el-form-item label="提供时间段：">
						<el-time-select
							style="width:160px;margin-right:20px;"
							placeholder="开始时间"
							v-model="startTime"
							size="small"
							:picker-options="{
								start:'08:00',
								step:'01:00',
								end:'23:00'
								}">
						</el-time-select>
						<el-time-select
							style="width:160px;"
							placeholder="结束时间"
							v-model="endTime"
							size="small"
							:picker-options="{
								start:'08:00',
								step:'01:00',
								end:'23:00',
								minTime:startTime
								}">
						</el-time-select>
					</el-form-item>

					<el-form-item label="商品和计价：">
						<span>{{originPrice}}元</span>
					</el-form-item>

					<el-form-item label="餐餐抢价格：">
						<el-input v-model="ccqPrice" size="small" @change="showOther"></el-input><span style="margin:0 10px">元</span>
						<span style="margin:0 40px;">折扣{{discount}}折</span>
						<span style="margin:0 40px;">用户节省{{savePrice}}元</span>
					</el-form-item>

					<el-form-item label="发布券数量：">
						<el-input v-model="ccqTicketNum" size="small"></el-input><span style="margin:0 10px">张</span>
					</el-form-item>

					<el-form-item label="默认销售量：">
						<el-input v-model="goodsNum" size="small"></el-input><span style="margin:0 10px">张</span>
					</el-form-item>

					<el-form-item label="用餐人数：">
						<el-radio-group v-model="people">
							<el-radio label="0">单人餐</el-radio>
							<el-radio label="1">双人餐</el-radio>
							<el-radio label="2">三人餐</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="是否同时享有其他优惠：" >
						<el-radio-group v-model="favRadio" @change="couponHandle">
							<el-radio label="0">不享有</el-radio>
							<el-radio label="1">其他优惠说明</el-radio>
						</el-radio-group>
						<el-input v-model="otherCoupon" v-show="couponShow" placeholder="请填写其他优惠说明" size="small" style="width:180px;margin-left:20px;"></el-input>
					</el-form-item>

					<el-form-item label="是否限制性别：">
						<el-radio-group v-model="sexRadio">
							<el-radio label="0">不限制</el-radio>
							<el-radio label="1">男</el-radio>
							<el-radio label="2">女</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="是否需要证件：">
						<el-radio-group v-model="certificateRadio">
							<el-radio label="0">不需要</el-radio>
							<el-radio label="1">需要</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="是否需要预约：">
						<el-radio-group v-model="appointmentRadio">
							<el-radio label="0">不需要</el-radio>
							<el-radio label="1">需要</el-radio>
						</el-radio-group>
					</el-form-item>
					
					<el-form-item label="套餐说明：">
						<el-input type="textarea" v-model="other" style="width:400px;float:left"></el-input>
					</el-form-item>
					
					<div class="btnDiv">
						<el-button type="danger" @click="addGroup">发布</el-button>
					</div>

				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
import selectType from '../../components/public/goods/groupIndustry'
import axios from 'axios'
// let qs = require('qs')

let uploadUrl ='http://112.74.172.160/public/index.php?s=/webapi/Img2/upload'


export default {
	data(){
		return {
			goodsList:[],
 			// 上传图片
	        imageUrl: '',
	        imageUrlId:'',
	        imageArr:[],

	        // 主食类num选择数量，根据点击内容发生改变
	        foodNum:0,
	        // 手动填写多少个，小于等于foodNum
	        foodsChoose:0,
	        
	        // 选择不同列表数组
	        groupList:[],
	        chooseGoodsObj:{},
	        groupGoodsContentArr:[],

	        groupName:'',
	        originPrice:100,
	        startDate:'',
	        endDate:'',
	        rangeDate:'',
	        startTime:'',
	        endTime:'',
	        discount:'',
	        savePrice:'',
	        people:'0',
	        favRadio:'0',
	        sexRadio:'0',
	        certificateRadio:'0',
	        appointmentRadio:'0',
	        ccqPrice:'',
	        ccqTicketNum:'',
	        goodsNum:'',
	        other:'',
	        otherCoupon:'',
	        couponShow:false,
	        show:false,
	        // 分类
	        leveles1:[],
			level:'',
			leveles2:[],
			level2:'',
			leveles3:[],
			level3:'',
			levelId:'',
	        level2Id:'',
	        level3Id:'',

	        length:'',
	        storeId:'',		// 商家id

	        obj:{},
	        arr:[],
	        goodsItem:'',
	        goodsNameArr:[],

			
		}
	},
	components:{ selectType },

	created(){
		var url = location.search; //获取url中"?"符后的字串
		if (url.indexOf("?") != -1) {    //判断是否有参数
		  	var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
		 	var strs = str.split("=");   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
		  	this.storeId = strs[1]
		}
	},

	methods: {
		// 分类
			listenLevel1(val) {
				this.levelId = val
			},
			listenLevel2(val) {
				this.level2Id = val
			},
			listenLevel3(val) {
				this.level3Id = val
				// 如果val值被修改先判断是都有填写数量
				if (this.foodNum > 0) {
					alert('请先将已选择商品添加')
				}else{
					this.$httpV2({
						method:'POST',
						url:'Storegoods/get_package_goods_list',
						data:{
							store_id:this.storeId,
							gc_id:this.level3Id
						}
					})
					.then(res=>{
						if (res.data.code == 200) {
							this.goodsList = res.data.data
							this.length = this.goodsList.length
						} else {
							alert(res.data.message)
						} 
					}) 
					.catch(err=>{
						console.log(err)
					})
				}
			},

		// 上传或修改照片
			upload(e) {
				let _this = this
				e.preventDefault()
				let files = e.target.files
				let data = new FormData()
				data.append('image',files[0])
				data.append('type',2)
				axios({
					method:'post',
					url:uploadUrl,
					data:data
				})
				.then(res=>{
					this.imageUrl = res.data.data.url
					this.imageUrlId = res.data.data.id
					this.imageArr.push(this.imageUrlId)
					console.log(JSON.stringify(this.imageArr))
				})
				.catch(err=>{
					alert('修改图片出错了')
				})
			},
			// 价格计算
				showOther(){
					this.discount = ((parseFloat(this.ccqPrice) / parseFloat(this.originPrice))*10).toFixed(2)
					this.savePrice = parseInt(this.originPrice) - parseInt(this.ccqPrice)
				},
			// 点击一个li
				handlerClick(item){
					if (this.foodNum<this.length) {
						this.foodNum += 1
						this.originPrice = parseFloat(this.originPrice) + parseFloat(item.goods_costprice)
					}

					// console.log(item)
					this.goodsItem = item
					this.goodsNameArr.push(item.goods_name)
					// console.log(this.goodsNameArr)
					// console.log(JSON.stringify(this.goodsNameArr))

					if (this.groupGoodsContentArr) {
						this.groupGoodsContentArr.push(item.goods_name)
					}else {
						this.groupGoodsContentArr = item.goods_name
					}
				},

			// 几选几方法
				addTodetail(key){
					let isHave = false

					if (this.foodsChoose <= this.foodNum && this.foodsChoose != 0) {
						
						this.obj.title = this.goodsItem.goods_name+''+ this.foodNum +'选'+ this.foodsChoose 
						this.obj.sum = this.foodNum 
						this.obj.choose_num = this.foodsChoose
						this.obj.content = this.goodsItem.goods_union_id+'|'+1
						// console.log(this.obj)
						this.arr.push(this.obj)
						// console.log(JSON.stringify(this.arr))
						// console.log(this.arr)



						this.chooseGoodsObj.title = this.goodsNameArr+''+ this.foodNum +'选'+ this.foodsChoose 
						
						this.chooseGoodsObj.content = this.groupGoodsContentArr
						this.groupList.push(JSON.stringify(this.chooseGoodsObj))
						// console.log(this.groupList)
						// console.log(this.groupList[0])
						console.log(JSON.stringify(this.chooseGoodsObj.title))
		
						this.foodNum = 0
						this.foodsChoose = 0
						this.groupGoodsContentArr = []

					}else {
						alert('可选数不能大于已选商品数量,且可选数不能为0')
						this.foodsChoose = 0
					}
				},
			// 优惠券
				couponHandle(index){
					if (index=='0') {
						this.couponShow = false
					}else {
						this.couponShow = true
					}
				},

			// 发布套餐券
			addGroup(){
				if (this.groupName == '') {
					alert('请输入套餐名称！')
				}else if (this.ccqPrice == '') {
					alert('请输入餐餐抢价格！')
				}else {
					this.$httpV2({
						method:'post',
						url:'Storegoods/add_ccq',
						data:{
							store_id:this.storeId,					// 商家id
							goods_name:this.groupName,				// 套餐名称
							images:JSON.stringify(this.imageArr),	// 商品图片
							goods_detail: JSON.stringify(this.arr),					// 套餐详情
							goods_marketprice:this.originPrice,     // 门店销售价
							goods_costprice:this.ccqPrice,		// 餐餐抢价
							goods_storage:this.ccqTicketNum,		// 库存
							goods_salenum:this.goodsNum,			// 默认销售量
							people:this.people,						// 用餐人数
							offer_start_time:this.startTime,		// 营业时间开始
							offer_end_time:this.endTime,			// 营业时间结束
							valid_start_time:this.startDate,		// 开始日期
							valid_end_time:this.endDate,			// 结束日期
							benefit:this.favRadio,					// 同时享有优惠
							is_order:this.appointmentRadio,			// 是否需要预约 
							is_sex:this.sexRadio,					// 是否需要性别
							is_voucher:this.certificateRadio,		// 是否需要证件
							remark:this.other 						// 套餐描述
						}
					})
					.then(res=>{
						alert('发布成功')
					})
					.catch(err=>{
						alert('发布失败')
					})
				}
			},
		

	}
}
</script>

<style scoped>
.active {
	border: 2px solid #e4393c !important;
}
.active:after {
	position: absolute;
	content: '';
	width: 20px;
	height: 20px;
	right: 0;
	bottom: 0;
	background: url('../../assets/image/image-count.png') no-repeat -20px -10px;
}
.el-breadcrumb {
	line-height: 30px;
}
.tip {
	font-size: 15px;
	border-bottom: 1px solid #dcdcdc;
}
.photoList {
	height: 200px;
	padding: 8px;
}
.photoList p {
	text-align: left;
}
.photoList .el-upload {
	float: left !important;
}

.photoList .el-button {
	margin-top: 10px;
}



.goodsList {
	min-height: 80px;
	margin:10px;
	padding: 14px 10px;
	text-align: left;
	border:1px solid #dcdcdc;
}
.goodsList .goodTitle {
	text-align: center;
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
	padding: 0 10px;
}
.goodTable img {
	display: block;
	width: 60px;
	height: 60px;
	margin: 0 auto;
	border: 1px solid red;
}
.goodsOther {
	margin: 0 10px;
}
.el-input {
	float: left;
	width: 100px;
}
.btnDiv {
	margin-left: 200px;
}
.btnDiv .el-button {
	width: 100px;
}
</style>
