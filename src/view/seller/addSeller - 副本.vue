<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{path:'/seller'}">餐餐抢商家</el-breadcrumb-item>
			<el-breadcrumb-item>添加商家</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<p class="tip">添加商家</p>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">

				<el-form-item label="商家名称：" prop="sellerName">
			        <el-input v-model="ruleForm.sellerName" placeholder="请输入店铺名称"></el-input>
			    </el-form-item>

				<el-form-item label="商家账号：" prop="sellerAccount">
			        <el-input v-model="ruleForm.sellerAccount" placeholder="请输入商家账号"></el-input>
			    </el-form-item>			    


			    <el-form-item label="所属行业" required style="text-align:left" prop="industry">
			        <industry-select @listenLevel="listenLevel" @listenType="listenType"></industry-select>
			    </el-form-item>

				
				<el-form-item label="开店时间：" prop="openSellerTime">
			        <el-date-picker
			        	v-model="ruleForm.openSellerTime"
			        	type="date"
			        	placeholder="请选择开店日期"></el-date-picker>
			    </el-form-item>

			    <el-form-item label="地址：" prop="sellerAddress">
			        <address-select 
			        	@listenProvince="listenProvince" 
			        	@listenCity="listenCity" 
			        	@listenArea="listenArea" 
			        	@listenStreet="listenStreet" 
			        	@listenDetail="listenDetail"></address-select>
			    </el-form-item>

			    <el-form-item label="商家经度：" prop="sellerLocationLong">
			        <el-input v-model="ruleForm.sellerLocationLong"  placeholder="请输入经度" style="width:120px;margin-right:20px;"></el-input>
			        <a href="http://lbs.amap.com/console/show/picker" target="_black" style="color:#3caaf7;float:left;margin-left:20px;">查看商家经纬度</a>
			    </el-form-item>

			    <el-form-item label="商家纬度：" prop="sellerLocationLat">
					<el-input v-model="ruleForm.sellerLocationLat" placeholder="请输入纬度" style="width:120px;"></el-input>
			    </el-form-item>



			    <el-form-item label="商家法人：" prop="sellerCorporation">
			        <el-input v-model="ruleForm.sellerCorporation"></el-input>
			    </el-form-item>

			    <el-form-item label="身份证号码：" prop="sellerIdentity">
			        <el-input v-model="ruleForm.sellerIdentity"></el-input>
			    </el-form-item>

			    <el-form-item label="联系电话：" prop="sellerTel">
			        <el-input v-model="ruleForm.sellerTel"></el-input>
			    </el-form-item>

			    <el-form-item label="服务电话" prop="sellerServerTel">
			        <el-input v-model="ruleForm.sellerServerTel"></el-input>
			    </el-form-item>
<!-- 
				
			    <el-form-item label="营业执照：" prop="LicenceImgUrl">
			    	<div class="el-upload-tip">支持jpg、png的图片格式，且文件小于2M</div>
				    <div class="file">
						<img v-if="ruleForm.LicenceImgUrl" :src="ruleForm.LicenceImgUrl" class="avatar" alt="营业执照">
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传营业执照</span>
					</div>
				</el-form-item>

			    <el-form-item label="资质证件：" prop="sellerzizhi">
			    	<div class="el-upload-tip">支持jpg、png的图片格式，且文件小于2M</div>
				    <div class="file">
						<img v-if="ruleForm.zizhiImgUrl" :src="ruleForm.zizhiImgUrl" class="avatar" alt="资质证件">
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传资质证件</span>
					</div>
				</el-form-item>

				<el-form-item label="门店轮播图：" prop="bannerImg">
					<div class="file">
						<img v-if="ruleForm.banner1ImgUrl" :src="ruleForm.banner1ImgUrl" class="avatar" alt="上传轮播图">
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传轮播图</span>
					</div>
					<div class="file">
						<img v-if="ruleForm.banner2ImgUrl" :src="ruleForm.banner2ImgUrl" class="avatar" alt="上传轮播图">
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传轮播图</span>
					</div>
					<div class="file">
						<img v-if="ruleForm.banner3ImgUrl" :src="ruleForm.banner3ImgUrl" class="avatar" alt="上传轮播图">
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传轮播图</span>
					</div>
					<div class="file">
						<img v-if="ruleForm.banner4ImgUrl" :src="ruleForm.banner4ImgUrl" class="avatar" alt="上传轮播图">
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传轮播图</span>
					</div>
					<div class="file">
						<img v-if="ruleForm.banner5ImgUrl" :src="ruleForm.banner5ImgUrl" class="avatar" alt="上传轮播图">
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传轮播图</span>
					</div>
					<div class="file">
						<img v-if="ruleForm.banner6ImgUrl" :src="ruleForm.banner6ImgUrl" class="avatar" alt="上传轮播图">
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传轮播图</span>
					</div>


			    </el-form-item>


			    <el-form-item label="外部环境图：" prop="outImg">
			    	<div class="file">
						<img v-if="ruleForm.out1ImgUrl" :src="ruleForm.out1ImgUrl" class="avatar" alt=外部环境图>
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传外部环境图</span>
					</div>
					<div class="file">
						<img v-if="ruleForm.out2ImgUrl" :src="ruleForm.out2ImgUrl" class="avatar" alt=外部环境图>
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传外部环境图</span>
					</div>
					<div class="file">
						<img v-if="ruleForm.out3ImgUrl" :src="ruleForm.out3ImgUrl" class="avatar" alt=外部环境图>
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传外部环境图</span>
					</div>
			    </el-form-item>

			    <el-form-item label="内部环境图：" prop="bannerImg">
					<div class="file">
						<img v-if="ruleForm.inside1ImgUrl" :src="ruleForm.inside1ImgUrl" class="avatar" alt=内部环境图>
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传内部环境图</span>
					</div>
					<div class="file">
						<img v-if="ruleForm.inside2ImgUrl" :src="ruleForm.inside2ImgUrl" class="avatar" alt=内部环境图>
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传内部环境图</span>
					</div>
					<div class="file">
						<img v-if="ruleForm.inside3ImgUrl" :src="ruleForm.inside3ImgUrl" class="avatar" alt=内部环境图>
						<i v-else class="el-icon-banner"></i>
						<input ref="files" type="file" name="avatar" @change="upload"><br/><span>上传内部环境图</span>
					</div>

			    </el-form-item> -->


				<el-form-item label="推荐人：" prop="sellerReferee">
			    	<el-input v-model="ruleForm.sellerReferee"></el-input>
			    </el-form-item>


				<el-form-item class="btnDiv">
				    <el-button @click="resetForm('ruleForm')">重置</el-button>
				    <el-button type="danger" @click="submitForm('ruleForm')">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import IndustrySelect from '../../components/public/industry'
import AddressSelect from '../../components/public/addressSelect'
import axios from 'axios'
let qs = require('qs')
let addSellerUrl = 'http://over.28yun.cn/index.php/webapi_v2/Marketer/add_store'
let uploadUrl ='http://112.74.172.160/public/index.php?s=/webapi/Img2/upload';


export default{
	data(){
		// 自定义验证规则	
			// 身份证号验证
		let validateIdentity = (rule,value,callback) => {
			if (value == '') {
				callback(new Error('请输入身份证号'))
			} else {
				var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
				if (regIdCard.test(value)) {
					
				}else {
					callback(new Error('请输入正确的身份证号'))
				}
			}
		};
			// 联系电话验证
		let validateTel = (rule,value,callback) => {
			if (value == '') {
				callback(new Error('请输入手机号'))
			} else {
				var tel = /^1[34578]\d{9}$/;
				if (tel.test(value)) {

				} else {
					callback(new Error('请输入正确的手机号'))
				}
			}
		}
		return {
			ruleForm:{
				sellerName:'',					// 商家名称
				sellerAccount:'',				// 商家账号

				openSellerTime:'',				// 开店时间
								
				levelId:'',						// 行业选择
				level2Id:'',

				provinceId:'',					// 地址id
				cityId:'',
				areaId:'',
				streetId:'',
				moreDetail:'',

				sellerLocationLong:'',			// 商家经度
				sellerLocationLat:'',			// 商家纬度
				sellerCorporation:'',			// 商家法人
				sellerIdentity:'',				// 身份证号
				sellerTel:'',					// 商家联系电话
				sellerServerTel:'',				// 商家服务电话

				// 图片信息
				LicenceImgUrl:'',				// 营业执照
				zizhiImgUrl:'',					// 资质证件

				banner1ImgUrl:'',				// 轮播图
				banner2ImgUrl:'',
				banner3ImgUrl:'',
				banner4ImgUrl:'',
				banner5ImgUrl:'',
				banner6ImgUrl:'',

				out1ImgUrl:'',					// 外部环境图
				out2ImgUrl:'',
				out3ImgUrl:'',

				inside1ImgUrl:'',				// 内部环境图
				inside2ImgUrl:'',
				inside3ImgUrl:'',

			},		
			
			rules: {
				sellerName:{required:true,message:'请输入商家名称',trigger: 'blur'},   
	        	sellerAccount: { required: true, message: '请输入商家账号', trigger: 'blur' },

	          	// industry:{required:true,message:'请选择所属行业',trigger:'change'},

	          	openSellerTime:{required:true,type:'date',message:'请输入开店时间',trigger:'blur'},	 
	          	sellerLocationLong:{required:true,message:'请输入店面经度',trigger:'blur'},
	          	sellerLocationLat:{required:true,message:'请输入店面纬度',trigger:'blur'},
	          	sellerCorporation:{required:true,message:'请输入商家法人名称',trigger:'blur'},
	          	sellerIdentity:[{validator:validateIdentity,trigger:'blur'}],		// 身份证验证
	          	sellerTel:[{validator:validateTel,trigger:'blur'}],					// 手机号验证
	          	sellerServerTel:{required:true,message:'请输入商家联系电话',trigger:'blur'},
	          	identification:{required:true,message:'请上传身份证照片',trigger:'blur'},
	          	sellerLicence:{required:true,message:'请上传营业执照',trigger:'blur'},
	          	sellerReferee:{required:true,message:'请输入推荐人',trigger:'blur'},

	        }
		}
	},
	components:{ IndustrySelect,AddressSelect },
	
	methods: {
		// 从行业组件中获取levelId和level2Id
		listenLevel(val){
			this.levelId = val
		},
		listenType(val){
			this.level2Id = val
		},
		// 从地址里面选择
		listenProvince(val){
			this.provinceId = val
		},
		listenCity(val){
			this.cityId = val
		},
		listenArea(val){
			this.areaId = val
		},
		listenStreet(val){
			this.StreetId = val
		},
		listenDetail(val){
			this.moreDetail = val
		},

		// 点击提交按钮
		submitForm(formName){
			alert(formName)
			this.$refs[formName].validate((valid)=>{
				if (valid) {
					// let formData = new FormData();
					axios({
						method:'post',
						url:addSellerUrl,
						data:formData
					})
					.then(res=>{
						alert('添加成功')
					})
					.catch(err=>{
						alert('添加出错')
					})
				} else {
					alert('提交错误!')
					return false
				}
			})
			
		},
		resetForm(formName){
			this.$refs[formName].resetFields();
		},
		upload(e) {
			e.preventDefault()
			let files = e.target.files
			let data = new FormData()
			data.append('image',files[0])
			data.append('type',1)
			axios({
				method:'post',
				url:uploadUrl,
				data:data
			})
			.then(res=>{
				this.LicenceImgUrl = res.data.data.url
			})
			.catch(err=>{
				alert('err')
			})
		},
		// upload(e) {
		// 	e.preventDefault()
		// 	let files = e.target.files
		// 	let data = new FormData()
		// 	data.append('image',files[0])
		// 	data.append('type',1)
		// 	axios({
		// 		method:'post',
		// 		url:uploadUrl,
		// 		data:data
		// 	})
		// 	.then(res=>{
		// 		this.zizhiImgUrl = res.data.data.url
		// 	})
		// 	.catch(err=>{
		// 		alert('err')
		// 	})
		// },
		// upload(e) {
		// 	e.preventDefault()
		// 	let files = e.target.files
		// 	let data = new FormData()
		// 	data.append('image',files[0])
		// 	data.append('type',1)
		// 	axios({
		// 		method:'post',
		// 		url:uploadUrl,
		// 		data:data
		// 	})
		// 	.then(res=>{
		// 		this.banner1ImgUrl = res.data.data.url
		// 	})
		// 	.catch(err=>{
		// 		alert('err')
		// 	})
		// }
	}
}
</script>
<style scoped>
	.el-breadcrumb {
		line-height: 30px;
	}
	.el-form-item {
		margin-bottom: 22px !important;
	}
	.el-form-item 
	.el-input {
		width: 200px;
		float: left;
	}
	.el-select {
		float: left;
		width: 120px;
		margin-right: 20px;
	}

	@import "../../assets/css/seller_part.css";
</style>