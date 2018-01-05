<template>
	<div>
		<el-breadcrumb separator=">">
			<el-breadcrumb-item to="/goods">商品管理</el-breadcrumb-item>
			<el-breadcrumb-item to="/classGoods">分类管理</el-breadcrumb-item>
			<el-breadcrumb-item>设置分类</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="contentDiv">
			<div class="tip">
				<p style="font-size=13px">操作提示</p>
				<p>1.设置前台左上侧商品分类导航的相关信息，可以设置分类别名、推荐分类、推荐品牌以及两张广告图片。</p>
				<p>2.分类导航信息设置完成后，需进入“平台->设置->清理缓存->首页及频道”操作后生效。</p>
			</div>
			<el-form :model="ruleForm" ref="ruleForm"  :rules="rules" label-width="180px">
				<el-form-item label="分类名称：">
					<el-input v-model="className" placeholder="全部分类"></el-input>
					<span class="formTip">可选项。设置别名后，别名将会替代原分类名称展示在分类导航菜单列表中。</span>
				</el-form-item>
				<el-form-item label="推荐分类：">
					<span>分类下的三级分类</span>
					<el-radio-group v-model="recommendType">
						<el-radio label="显示未选项"></el-radio>
						<el-radio label="隐藏未选项"></el-radio>
					</el-radio-group>
					<span class="formTip">推荐分类将在展开后的二、三级导航列表上方突出显示，建议根据分类名称长度控制选择数量不超过8个以确保展示效果。</span>
				</el-form-item>
				
				<el-form-item label="推荐品牌：">
					<el-select v-model="recommendBrand">
						<el-option
							v-for="item in recommendBrandes"
							:key="item.recommendBrand"
							:label="item.label"
							:value="item.recommendBrand"></el-option>
					</el-select>
					<span style="cursor:pointer" @click="toggleType">分类下对应的品牌<i :class="topBottom?'el-icon-arrow-down':'el-icon-arrow-up'"></i></span>
					<div class="typeBrand" v-if="showBrand">
						<dl>
							<dt>默认</dt>
							<dd>
								<label for="brand_id"><input type="checkbox" name="brand_id" id="brand_id" value="">123456</label>
								<label for="brand_id"><input type="checkbox" name="brand_id" id="brand_id" value="">123456</label>
								<label for="brand_id"><input type="checkbox" name="brand_id" id="brand_id" value="">123456</label>
								<label for="brand_id"><input type="checkbox" name="brand_id" id="brand_id" value="">123456</label>
								<label for="brand_id"><input type="checkbox" name="brand_id" id="brand_id" value="">123456</label>
								<label for="brand_id"><input type="checkbox" name="brand_id" id="brand_id" value="">123456</label>
							</dd>
						</dl>

					</div>

				</el-form-item>

				<el-form-item label="广告图1：">
					<input type="file" style="float:left"><i class="icon-href"></i><el-input size="small"></el-input>
					<span class="formTip">广告照片将展示在推荐品牌下方，请使用宽度190像素，高度165像素的jpg/gif/png格式图片作为分类导航广告上传。如需跳转请在后方添加http://开头的链接地址。</span>
				</el-form-item>
				<el-form-item label="广告图2：">
					<input type="file" style="float:left"><i class="icon-href"></i><el-input size="small"></el-input>
					<span class="formTip">广告照片将展示在推荐品牌下方，请使用宽度190像素，高度165像素的jpg/gif/png格式图片作为分类导航广告上传。如需跳转请在后方添加http://开头的链接地址。</span>
				</el-form-item>
	
				

				<el-form-item>
					<div class="btnDiv">
						<el-button>返回</el-button>
						<el-button type="danger">提交</el-button>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			recommendType:'显示未选项',
			showBrand:false,
			topBottom:true

		}
	},
	methods:{
		toggleType(){
			this.topBottom = !this.topBottom
			this.showBrand = !this.showBrand
		}
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
.el-input {
	width: 200px;
	float: left;
}
.el-select {
	float: left;
	width: 120px;
	margin-right: 20px;
}
.tip {
	border-bottom: 0;
}
.formTip {
	display: inline-block;
	margin-left: 30px;
	color: #848484;
}
/* .el-radio {
	float: left;
	width: 160px;
	height: 34px;
} */
.typeBrand {
	text-align: left;
	height: 140px;
	margin-top: 40px;
	padding-left: 20px;
	overflow-y: scroll;
	border: 1px dashed #ccc;
}
.typeBrand label {
	float: left;
	width: 16%;
	line-height: 30px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.icon-href {
	float: left;
	display: block;
	width: 30px;
	height: 30px;
	border: 1px solid #ccc;
}
</style>