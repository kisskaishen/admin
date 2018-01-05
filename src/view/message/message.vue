<template>
	<div>
		<el-row class="tac">
			<el-col :span="24">
				<h2>短信管理</h2>
			</el-col>
		</el-row>
		<div class="contentDiv">
			<el-form label-width="80px">
				<el-row>
					<el-col style="width:250px;">
						<el-form-item label="商家名称">
							<el-input v-model="sellerName" size="small"></el-input>
						</el-form-item>
					</el-col>
					<el-col style="width:240px;">
						<el-form-item label="短信类型">
							<el-select v-model="messageType" size="small">
								<el-option
									v-for="messageType in messageTypes"
									:key="messageType.messageType"
									:label="messageType.label"
									:value="messageType.messageType"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col style="width:300px;">
						<el-form-item label="时间">
							<el-date-picker
								v-model="messagetime"
								type="daterange"
								size="small"
								placeholder="请选择短信时间"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col style="width:240px">
						<el-form-item label="短信状态">
							<el-select v-model="messageStatus" size="small">
								<el-option
									v-for="messageStatus in messageStatuses"
									:key="messageStatus.messageStatus"
									:label="messageStatus.label"
									:value="messageStatus.messageStatus"
									placehoder="请选择"></el-option>
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
				<span>正常</span>
				<span>已冻结</span>
				<span>可删除</span>
			</div>
			<table>
				<tr class="thead">
					<th>商家名称</th>
					<th>短信类型</th>
					<th>内容</th>
					<th>目标群体</th>
					<th>发送类型</th>
					<th>提交时间</th>
					<th>审核时间</th>
					<th>审核</th>
					<th>发送状态</th>
					<th>操作</th>
				</tr>
				<tr class="tbody" v-for="td in tdes">
					<td>{{td.sellerName}}</td>
					<td>{{td.messageType}}</td>
					<td>{{td.messageContent}}</td>
					<td>{{td.messageOject}}</td>
					<td>{{td.messageSendType}}</td>
					<td>{{td.messageSubmitTime}}</td>
					<td>{{td.messageCheckTime}}</td>
					<td>{{td.messageCheck}}</td>
					<td>{{td.messageSendStatus}}</td>
					<td>
						<span style="color:#007aff;" @click="clickWatch">{{td.operateWatch}}</span><em>|</em>
						<span style="color:#e4393c;" @click="clickCheck">{{td.operateCheck}}</span>
					</td>
				</tr>
			</table>
		</div>
		<!-- 短信内容的弹框 -->
		<div class="layer" v-show="checkLayer">
			<div class="bgLayer" @click="hideCheckLayer"></div>
			<div class="messageInfo">
				<em @click="hideCheckLayer">&times;</em>
				<el-form>
					<div class="textarea">
						<p>短信内容：</p>
						<label>{{messageContent}}</label>
					</div>
					<el-form-item>
						<el-radio-group v-model="messageCheckRadio" style="margin-left:40px;;">
							<el-radio label="通过审核"></el-radio>
							<el-radio label="拒绝"></el-radio>
						</el-radio-group>
					</el-form-item>
					<div class="btnDiv">
						<el-button type="danger" @click="hideCheckLayer">提交</el-button>
						<el-button @click="hideCheckLayer">取消</el-button>
					</div>
				</el-form>
			</div>
		</div>
		<!-- 查看 -->
		<div class="layer" v-show="watchLayer">
			<div class="bgLayer" @click="hideWatchLayer"></div>
			<div class="watchInfo">
				<div class="infoDiv">
					<em @click="hideWatchLayer">&times;</em>
					<div class="info fl infoList">
						<p>商家名称：凯子火锅</p>
						<p>短信类型：营销短信</p>
						<p>发送类型：立即发送</p>
						<p>目标人群：所有会员</p>
						<p>提交时间：<span style="color:#ff8846">2017-06-15 18:08:00</span></p>
						<p>审核时间：<span style="color:#e4393c">2017-06-15 18:08:00</span></p>
						<p><el-tag type="success">成功：300条</el-tag></p>
						<p><el-tag type="danger">失败：5条</el-tag></p>
					</div>
					<div class="info fr infoMessage">
						<p>短信内容：</p>
						<label>{{messageContent}}</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				// 商家名称
				sellerName:'',
				// 短信类型
				messageType:'营销信息',
				messageTypes:[
					{
						messageType:'message1',
						label:'营销信息'
					},
					{
						messageType:'message2',
						label:'商家签名'
					},
				],
				// 短信时间
				messagetime:'',
				// 短信状态
				messageStatus:'',
				messageStatuses:[
					{
						messageStatus:'messageStatus1',
						label:'待审核'
					},
					{
						messageStatus:'messageStatus2',
						label:'失败'
					},
					{
						messageStatus:'messageStatus3',
						label:'成功'
					}
				],
				// tdes 
				tdes:[
					{
						sellerName:'凯子火锅',
						messageType:'营销',
						messageContent:'内容显示',
						messageOject:'所有会员',
						messageSendType:'立即发送',
						messageSubmitTime:'2017-06-15 12:00:00',
						messageCheckTime:'2017-06-15 16:12:00',
						messageCheck:'通过',
						messageSendStatus:'成功：300条  失败：5条',
						operateWatch:'查看',
						operateCheck:'审核'
					}
				],
				// 审核短信内容
				messageContent:'内容显示',
				// 审核选择
				messageCheckRadio:'通过审核',

				// 短信审核弹框，默认隐藏
				checkLayer:false,
				// 短信查看弹框，默认隐藏
				watchLayer:false

			}
		},
		computed:{

		},
		methods:{
			// 点击审核弹出框显示
			clickCheck(){
				this.checkLayer = true
			},
			// 关闭弹出框
			hideCheckLayer(){
				this.checkLayer = false
			},
			// 点击查看弹出框显示
			clickWatch(){
				this.watchLayer = true
			},
			// 关闭弹出框
			hideWatchLayer(){
				this.watchLayer = false
			}
		}
	}
</script>


<style scoped>
	.thead {
		background: url('../../assets/image/thead.png') no-repeat -10px -480px;
	}
	.tip span {
		display: inline-block;
		height: 10px;
		line-height: 10px;
		padding-left: 10px;
		margin-right: 10px;
		color: #242424;
	}
	.tip span:nth-child(1){
		border-left: 10px solid #00d138;
	}
	.tip span:nth-child(2){
		border-left: 10px solid #ff8846;
	}
	.tip span:nth-child(3){
		border-left: 10px solid #e4393c;
	}
	
	.bgLayer {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, .4);
	}
	.messageInfo {
		position: fixed;
		width: 680px;
		height: 324px;
		left: 50%;
		margin-left: -340px;
		background-color: #fff;
	}
	.messageInfo em {
		position: absolute;
		right: 40px;
		font-size: 36px;
		color: #dcdcdc;
		cursor: pointer;
	}
	.textarea {
		position: relative;
		width: 88%;
		height: 180px;
		margin: 40px auto 0;
		border: 1px solid #dcdcdc;
	}
	.textarea p {
		text-align: left;
		padding: 6px 0 0 10px;
	}
	.textarea label {
		display: block;
		padding:10px 0;
		text-indent: 40px;
		text-align: left;
		color: #9c9c9c;		
		border: none;
		resize: none;
		outline: none;
	}
	.btnDiv {
		text-align: center;
	}

	.watchInfo {
		position: fixed;
		width: 1156px;
		height: 600px;
		left: 50%;
		top: 200px;
		margin-left: -578px;
		background: linear-gradient(45deg,#fda085,#f8c86c);
	}
	.infoDiv {
		position: relative;
		width: 974px;
		height: 432px;
		padding: 56px 68px;
		margin: 28px 0 0 23px;
		background-color: #fff;
	}
	.infoDiv em {
		position: absolute;
		right: 40px;
		top: 20px;
		font-size: 36px;
		color: #dcdcdc;
		cursor: pointer;
	}
	.infoDiv .info {
		width: 420px;
		height: 430px;
		padding: 10px;
		border: 1px solid #dcdcdc;
	}
	.infoDiv .info p {
		line-height: 34px;
		text-align: left;
	}
	.el-tag {
		width: 180px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin-top: 10px;
	}
	.infoMessage label {
		display: block;
		width: 100%;
		text-indent: 40px;
		text-align: left;
		color: #9c9c9c;
	}

</style>