<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item to="/goods">商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>分类管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<el-tabs v-model="activeName" type="card">
				<el-tab-pane label="管理" name="first">
					<div class="tip">
						<p style="font-size=13px">操作提示</p>
						<p>1.当店主添加商品时可选择商品分类,用户可根据俄分类查询商品列表</p>
						<p>2.点击分类名前"+",显示当前分类的下级分类</p>
					</div>
					<table>
						<tr class="thead">
							<th width="60px"></th>
							<th width="160px">排序</th>
							<th style="text-align:left">分类名称</th>
							<th width="120px">类型</th>
							<th width="120px">分佣比例</th>
							<th width="200px">操作</th>
						</tr>
						<tr v-for="td in tdes">
							<td style="cursor:pointer;font-size:16px;" @click="toggleLower">{{lowerTr?'-':'+'}}</td>
							<td>{{td.sortNumber}}</td>
							<td style="text-align:left;">{{td.className}}</td>
							<td>{{td.typeName}}</td>
							<td>{{td.percent}}%</td>
							<td>
								<router-link to="/goods/setClassGoods"><span>设置</span></router-link><em>|</em>
								<router-link to="/goods/editClassGoods"><span>编辑</span></router-link><em>|</em>
								<span @click="showDeleteLayer">删除</span>
							</td>
						</tr>
						<tr v-if="lowerTr">
							<td>------</td>
							<td>123</td>
							<td style="text-align:left;">456789</td>
							<td>91011</td>
							<td>121314</td>
							<td>
								<router-link to="editClassGoods"><span>编辑</span></router-link><em>|</em>
								<span @click="showDeleteLayer">删除</span>
							</td>
						</tr>
					</table>
					<div class="layer" v-show="showDelete">
						<div class="bgLayer" @click="hideDeleteLayer"></div>
						<div class="deleteLayer">
							<em @click="hideDeleteLayer">&times;</em>
							<div>
								<p>删除该分类将会同时删除该分类的所有下级分类,您确定要删除吗</p>
								<div class="btnDiv">
									<el-button @click="hideDeleteLayer">取消</el-button>
									<el-button type="danger" @click="hideDeleteLayer">确定</el-button>
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="新增" name="second">
					<el-form :model="ruleForm" ref="ruleForm"  :rules="rules" label-width="180px">
						<el-form-item label="分类名称：">
							<el-input v-model="className" placeholder="全部分类"></el-input>
						</el-form-item>
						<el-form-item label="分类图片：">
							<el-upload
					    	  class="avatar-uploader"
							  action="#"
							  :on-preview="handlePictureCardPreview">
							  <i class="el-icon-identity"></i>
							  <el-button size="small">上传图片</el-button>
							</el-upload>
							<el-dialog v-model="dialogVisible" size="tiny">
							  <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
							<span class="formTip">只有第一级分类可以上传图片,建议用16px*16px,超出后自动隐藏</span>
						</el-form-item>
						<el-form-item label="发布虚拟商品：">
							<el-radio-group v-model="virtualGoods">
								<el-radio label="不允许"></el-radio>
								<el-radio label="允许"></el-radio>
							</el-radio-group>
							<span class="formTip">勾选允许发布虚拟商品后,在发布该分类的商品时选择交易类型为"虚拟兑换码"形式</span>
						</el-form-item>
						<el-form-item label="分佣比例：">
							<el-input v-model="percent" style="width:80px;"></el-input>
							<span>%</span>
							<span class="formTip">必须为0-100的整数</span>
						</el-form-item>
						<el-form-item label="上级分类：">
							<el-select v-model="subClass">
								<el-option
									v-for="item in subClasses"
									:key="item.subClass"
									:label="item.label"
									:value="item.subClass"></el-option>
							</el-select>
							<span class="formTip">如果选择上级分类,那么新增的分类则为被选择上级分类的子分类</span>
						</el-form-item>
						<el-form-item label="分类：">
							<el-select v-model="thisClass">
								<el-option
									v-for="item in thisClasses"
									:key="item.thisClass"
									:label="item.label"
									:value="item.thisClass"></el-option>
							</el-select><br/>
							<el-radio-group v-model="typeChoose">
								<el-radio label="无类型"></el-radio><br/>
								<el-radio label="套餐"></el-radio><br/>
								<el-radio label="关联到子分类"></el-radio><br/>
								<el-radio label="颜色"></el-radio><br/>
								<el-radio label="服饰/鞋/女装/针织衫"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="排序：">
							<el-input v-model="sortNumber"></el-input>
							<span class="formTip">数字范围0-255,数字越小越靠前</span>
						</el-form-item>

						<el-form-item>
							<div class="btnDiv" style="text-align:left;">
								<button class="addSubmit">提交</button>
							</div>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="导入" name="third">
					<el-form label-width="180px">
						<el-form-item label="请选择文件：">
							<el-upload
							  class="upload-demo fl"
							  ref="upload"
							  action="https://jsonplaceholder.typicode.com/posts/"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :file-list="fileList"
							  :auto-upload="false">
							  <el-button slot="trigger" size="small" type="primary">点击上传文件</el-button>
							 </el-upload>
							<!-- <input type="file" style="float:left;padding-top:6px;"> -->
							<span class="formTip">如果导入速度较慢,建议把文件拆分为几个小文件,然后分别导入</span>
						</el-form-item>
						<el-form-item label="文件格式">
							<el-button style="float:left">点击下载导入例子文件</el-button><br/>
							<table class="sortTable">
								<tr>
									<th>排序</th>
									<td>一级分类</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<th>排序</th>
									<td></td>
									<td>二级分类</td>
									<td></td>
								</tr>
								<tr>
									<th>排序</th>
									<td></td>
									<td></td>
									<td>三级分类</td>
								</tr>
								<tr>
									<th>排序</th>
									<td>一级分类</td>
									<td></td>
									<td></td>
								</tr>
							</table>
						</el-form-item>
						<el-form-item>
							<button class="addSubmit" style="float:left;">导入</button>
						</el-form-item>						
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="TAG管理" name="fourth">
					<el-form>
						<el-row>
							<el-col style="width:180px;margin-left:10px;">
								<el-form-item label="分类" style="margin-bottom:0 !important;">
									<el-select v-model="tagType" size="small">
										<el-option
											v-for="item in tagTypes"
											:key="item.tagType"
											:label="item.label"
											:value="item.tagType"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<!-- button按钮 -->
							<el-col style="width:32px;margin-left:16px;">
								<i class="btn-search"></i>
							</el-col> 
						</el-row>
					</el-form>
					<div class="tip">
						<p style="font-size:15px;">操作提示</p>
						<p>1.TAG值是分类搜索的关键字，请精确的填写TAG值。TAG值可以填写多个，每个值之间需要用逗号隔开。</p>
						<p>2.导入/重置TAG功能可以根据商品分类重新更新TAG，TAG值默认为各级商品分类值。</p>
					</div>
					<div class="operateDiv">
						<el-button>更新TAG名称</el-button>
						<el-button>导入/重置TAG</el-button>
					</div>
					<table>
						<tr class="thead">
							<th>TAG名称</th>
							<th>TAG值</th>
							<th>操作</th>
						</tr>
						<tr class="tbody" v-for="td in tagTdes">
							<td>{{td.tagName}}</td>
							<td>{{td.tagValue}}</td>
							<td style="color:#007aff;cursor:pointer" @click="deleteTag">{{td.tagDelete}}</td>
						</tr>
					</table>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			activeName:'first',
			tdes:[
				{
					sortNumber:'10',
					className:'全部分类',
					typeName:'套餐',
					percent:'0'
				}
			],
			showDelete:false,
			lowerTr:false,

			// 新增
			virtualGoods:'允许',
			subClass:'',
			subClasses:[
				{
					subClass:'subClass1',
					label:'1'
				},
				{
					subClass:'subClass2',
					label:'2'
				}
			],
			thisClass:'',
			thisClasses:[
				{
					thisClass:'thisClass1',
					label:'1'
				},
				{
					thisClass:'thisClass2',
					label:'2'
				}
			],
			typeChoose:'无类型',


			// TAG
			tagType:'',
			tagTypes:[
				{
					tagType:'tagType1',
					label:'1'
				},
				{
					tagType:'tagType2',
					label:'2'
				}
			],
			tagTdes:[
				{
					tagName:'服装鞋帽>女装>T恤',
					tagValue:'服装鞋帽,女装,T恤',
					tagDelete:'删除'
				},
				{
					tagName:'服装鞋帽>女装>T恤',
					tagValue:'服装鞋帽,女装,T恤',
					tagDelete:'删除'
				}
			],

		}


		
	},
	methods:{
		showDeleteLayer(){
			this.showDelete = true
		},
		hideDeleteLayer(){
			this.showDelete = false
		},
		toggleLower(){
			this.lowerTr = !this.lowerTr
		},
		deleteTag(index){
			this.tagTdes.splice(index,1)
		}
	}
}
</script>



<style scoped>
.el-breadcrumb {
	line-height: 30px;
}
.bgLayer {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, .4);
}
.deleteLayer {
	position: fixed;
	width: 300px;
	height: 160px;
	left: 50%;
	margin-left: -160px;
	top: 30%;
	padding: 20px 50px;
	background-color: #fff;
}
.deleteLayer p {
	font-size: 16px;
	padding-top: 30px;
	line-height: 30px;
}
.deleteLayer em {
	position: absolute;
	right: 20px;
	top: 6px;
	font-size: 36px;
	cursor: pointer;
}
.btnDiv {
	text-align: center;
}
.btnDiv .el-button {
	width: 120px;
	margin-right: 0;
}
.addSubmit {
	width: 120px;
	height: 40px;
	line-height: 40px;
	background-color: #e4393c;
	color: #fff;
	font-size: 16px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
.tip {
	border-bottom: none;
}
.operateDiv {
	text-align: right;
	margin: 0 20px 10px;
}

.el-form-item {
	margin-bottom: 22px !important;
}
.el-input {
	width: 200px;
	float: left;
}
.el-select {
	float: left;
	width: 120px;
	margin-right: 20px;
}
.formTip {
	display: inline-block;
	margin-left: 30px;
	color: #848484;
}
.el-radio {
	float: left;
	width: 160px;
	height: 34px;
}
.sortTable {
	width: 260px;
	
}
.sortTable th {
	width: 50px;
	background-color: #fdafb2;
	border: 2px solid #fff;
	border-right: none;
	box-sizing: border-box;
}
.sortTable td {
	width: 70px;
	border: 2px solid #fff;
	border-left: none;
	background-color: #fb9da0;
	box-sizing: border-box;
	color: #fff;
}
.el-upload-list {
	display: inline-block;
}

.thead {
	background: url('../../assets/image/image-count.png') no-repeat -10px -749px;
}
</style>