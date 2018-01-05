<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{path:'/goods'}">商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>套餐券审核</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<p class="tip">套餐券审核</p>
			<!-- 上传照片 -->
			<div class="photoList">
				<p>请核对照片(可修改)</p>
				<el-upload
					class="avatar-uploader"
					action="#"
					:on-success="handleAvatarSuccess"
					:show-file-list="false">

					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-goods"></i>
					<el-button size="small">上传图片</el-button>
				</el-upload>
				<el-upload
					class="avatar-uploader"
					action="#"
					:on-success="handleAvatarSuccess"
					:show-file-list="false">

					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-goods"></i>
					<el-button size="small">上传图片</el-button>
				</el-upload>
				<el-upload
					class="avatar-uploader"
					action="#"
					:on-success="handleAvatarSuccess"
					:show-file-list="false">

					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-goods"></i>
					<el-button size="small">上传图片</el-button>
				</el-upload>
			</div>
			<!-- 商品选择 -->
			<div class="goodsList">
				<p>套餐商品(不可修改)</p>
				<el-collapse>
					<el-collapse-item title="主食类" name="1">
						<span class="fl">{{foodNum}}</span><span class="fl" style="margin:0 10px;">选</span><span>{{choosedNum}}</span><br/>
						<ul>
							<li v-for="item,index in foods">
								<img :src="item.bgimg" alt="">
								<p>{{item.name}}</p>
								<p>{{item.price}}元</p>
								<p>{{item.num}}份</p>
								<p>规格：{{item.spec}}(个)</p>
								<p>{{index}}</p>
							</li>
						</ul>
					</el-collapse-item>
					<el-collapse-item title="饮品类" name="2">
						<span class="fl">{{foodNum}}</span><span class="fl" style="margin:0 10px;">选</span><span>{{choosedNum}}</span><br/>
						<ul>
							<li v-for="item in drinks" @click="handler(item)">
								<img :src="item.bgimg" alt="">
								<p>{{item.name}}</p>
								<p>{{item.price}}元</p>
								<p>{{item.num}}份</p>
								<p>规格：{{item.spec}}(个)</p>
							</li>
						</ul>
					</el-collapse-item>
				</el-collapse>	
				<!-- <el-button type="danger">发布套餐内容</el-button>			 -->
			</div>


			<!-- 商品或商家其他信息 -->
			<div class="goodsOther">
				<el-form label-width="180px">
					<el-form-item label="套餐名称：">
						<el-input v-model="groupName" size="small" style="width:200px"></el-input>
					</el-form-item>

					<el-form-item label="套餐有效期：">
						<el-date-picker
							v-model="rangeDate"
							type="daterange"
							size="small"
							placeholder="选择有效期范围"></el-date-picker>
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
						<span>300</span>
					</el-form-item>

					<el-form-item label="餐餐抢价格：">
						<el-input v-model="ccqPrice" size="small"></el-input><span style="margin:0 10px">元</span>
						<span style="margin:0 40px;">折扣0</span>
						<span style="margin:0 40px;">用户节省300元</span>
					</el-form-item>

					<el-form-item label="发布券数量：">
						<el-input v-model="ccqTicketNum" size="small"></el-input><span style="margin:0 10px">张</span>
					</el-form-item>

					<el-form-item label="默认销售量：">
						<el-input v-model="goodsNum" size="small"></el-input><span style="margin:0 10px">张</span>
					</el-form-item>

					<el-form-item label="是否同时享有其他优惠：" >
						<el-radio-group v-model="favRadio" @change="couponHandle">
							<el-radio label="noOtherRadio">不享有</el-radio>
							<el-radio label="otherRadio">其他优惠说明</el-radio>
						</el-radio-group>
						<el-input v-model="otherCoupon" v-show="couponShow" placeholder="请填写其他优惠说明" size="small" style="width:180px;margin-left:20px;"></el-input>
					</el-form-item>

					<el-form-item label="是否限制性别：">
						<el-radio-group v-model="sexRadio">
							<el-radio label="1">不限制</el-radio>
							<el-radio label="2">男</el-radio>
							<el-radio label="3">女</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="是否需要证件：">
						<el-radio-group v-model="certificateRadio">
							<el-radio label="1">不需要</el-radio>
							<el-radio label="2">需要</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="是否需要预约：">
						<el-radio-group v-model="appointmentRadio">
							<el-radio label="1">不需要</el-radio>
							<el-radio label="2">需要</el-radio>
						</el-radio-group>
					</el-form-item>
					
					<el-form-item label="套餐说明：">
						<el-input type="textarea" v-model="other"></el-input>
					</el-form-item>

					<el-form-item label="审核：">
						<el-radio-group v-model="check" @change="checkOperate">
							<el-radio label="pass">通过</el-radio>
							<el-radio label="refuse">拒绝</el-radio>
						</el-radio-group>
						<el-input type="textarea" v-model="refuseText" placeholder="请输入拒绝理由....." v-show="refuseHandle" style="margin-top:10px;"></el-input>
					</el-form-item>
					
					<div class="btnDiv">
						<el-button type="danger">提交</el-button>
					</div>

				</el-form>
			</div>
			

			

		</div>
	</div>
</template>
<script>
let foodsList = [
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'米饭',
		price:'5',
		spec:120,
		num:10,
		show:false
	},
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'面条',
		price:'10',
		spec:50,
		num:10,
		show:false
	},
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'汤粉',
		price:'12',
		spec:10,
		num:10,
		show:false
	},
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'干拌',
		price:'8',
		spec:40,
		num:10,
		show:false
	}
];
let drinkList = [
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'维他奶',
		price:'10',
		spec:120,
		num:10,
		show:false
	},
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'大麻茶',
		price:'12',
		spec:80,
		num:10,
		show:false
	},
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'红牛',
		price:'20',
		spec:40,
		num:10,
		show:false
	}
];
export default{
	data(){
		return {
	        imageUrl: '',
	        dialogVisible: false,
	        // 主食类num选择数量
	        foodNum:4,
	        // 已选择数目
	        choosedNum:'1',
	        // 模拟主食
	        foods:foodsList,
	        // 模拟饮品
	        drinks:drinkList,
	        rangeDate:'',
	        startTime:'',
	        endTime:'',
	        favRadio:'noOtherRadio',
	        sexRadio:'1',
	        certificateRadio:'1',
	        appointmentRadio:'1',
	        ccqPrice:'',
	        ccqTicketNum:'',
	        goodsNum:'',
	        other:'',
	        otherCoupon:'',
	        couponShow:false


	    	
	    }
	 
	},

	methods:{
		// 审核radio
		checkOperate(index){
			if (index == 'refuse') {
				this.refuseHandle = true
			}else {
				this.refuseHandle = false
			}
		},
		// 删除
		deleteRow(index,rows) {
			rows.splice(index,1)
		},
		handlerClick(item,index){
			item.show = !item.show
		},
		handler(item) {
			item.show = !item.show
		},
		handleAvatarSuccess(){
			alert('添加钩子')
		},
		couponHandle(index){
			if (index=='noOtherRadio') {
				this.couponShow = false
			}else {
				this.couponShow = true
			}
		}
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
	margin:0 10px;
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