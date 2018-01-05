<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{path:'/seller'}">餐餐抢商家</el-breadcrumb-item>
			<el-breadcrumb-item>添加商品</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">

			<div class="goodsOther">
				<el-form label-width="180px">
					<el-form-item label="商品名称：">
						<el-input v-model="goodsName"></el-input>
					</el-form-item>

					<el-form-item label="商品照片：">
						<p style="color:#e4393c;text-align:left;">(最少一张，最多三张) </p>
						<el-upload
							class="avatar-uploader"
							action="#"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-banner"></i>
							<el-button size="small">上传商品图片</el-button>
						</el-upload>
						<el-upload
							class="avatar-uploader"
							action="#"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-banner"></i>
							<el-button size="small">上传商品图片</el-button>
						</el-upload>
						<el-upload
							class="avatar-uploader"
							action="#"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-banner"></i>
							<el-button size="small">上传商品图片</el-button>
						</el-upload>
					</el-form-item>
					
					<el-form-item label="分类选择：">
						<industry-select></industry-select>
					</el-form-item>

					<el-form-item label="原价：">
						<el-input v-model="price" placeholder="不能为空"></el-input>
					</el-form-item>

					<el-form-item label="默认销量：">
						<el-input v-model="saleNum"></el-input>
					</el-form-item>

					<el-form-item label="规格：">
						<el-input v-model="guige"></el-input>
					</el-form-item>
					
					<div class="btnDiv">
						<el-button>返回</el-button>
						<el-button type="danger">放入仓库</el-button>
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
		num:120,
		show:false
	},
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'面条',
		price:'10',
		num:50,
		show:false
	},
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'汤粉',
		price:'12',
		num:10,
		show:false
	},
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'干拌',
		price:'8',
		num:40,
		show:false
	}
];
let drinkList = [
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'维他奶',
		price:'10',
		num:120,
		show:false
	},
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'大麻茶',
		price:'12',
		num:80,
		show:false
	},
	{
		bgimg:'http://pic35.nipic.com/20131121/2531170_145358633000_2.jpg',
		name:'红牛',
		price:'20',
		num:40,
		show:false
	}
];
import IndustrySelect from '../../components/public/industry'
export default{
	data(){
		return {
	        dialogImageUrl: '',
	        dialogVisible: false,
	        // 模拟主食
	        foods:foodsList,
	        // 模拟饮品
	        drinks:drinkList,
	        // 模拟table数据
	        tableData:[
		        {
		        	goodsOrder:'1',
		        	goodsName:'1',
		        	goodsType:'1',
		        	goodsSize:'1',
		        	goodsSellPrice:'1',
		        	goodsNum:'1',
		        }
	        ],
	        favRadio:'1',
	        sexRadio:'1',
	        certificateRadio:'1',
	        appointmentRadio:'1',
	    	
	    }
	   
	},
	components:{ IndustrySelect },
	methods:{
		// 删除
		deleteRow(index,rows) {
			rows.splice(index,1)
		},
		handlerClick(item){
			console.log(item)
			item.show = !item.show
		},
		handler(item) {
			item.show = !item.show
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
.el-form-item {
	margin: 12px 0;
}
.tip {
	font-size: 15px;
	border-bottom: 1px solid #dcdcdc;
}
.photoList {
	height: 166px;
	padding: 8px;
}
.photoList p {
	text-align: left;
}
.el-upload {
	float: left !important;
}
.el-icon-banner {
	width: 244px;
	height: 160px;
	background: url('../../assets/image/shenfenzheng.png') no-repeat;
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
	width: 200px;
}
.btnDiv {
	margin-left: 200px;
}
.btnDiv .el-button {
	width: 100px;
}
</style>