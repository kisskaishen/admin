<template>
	<div>
		<el-breadcrumb separator=">">
            <el-breadcrumb-item><span @click="goBack">返回上一级</span></el-breadcrumb-item>
            <el-breadcrumb-item>商家</el-breadcrumb-item>
        </el-breadcrumb>
		<div class="contentDiv">
			<el-form label-width="160px">
				<el-form-item label="商家名称：">
					<h4>{{sellerInfo.store_name}}</h4>
					<p>{{sellerInfo.store_address}}</p>
				</el-form-item>
				<el-form-item label="分析条件：">
					<el-date-picker
						v-model="chooseDate"
						type="daterange"
						align="left"
						unlink-panels
						range-separator="至"
						placeholder="当月"
						:picker-options="pickerOptions"
						@change="timeChange">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="图形：">
					<div id="c1"></div>
					<seller-table class="sellerTable" :sellerTable="sellerInfo2" :currentDate="currentDate"></seller-table>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	// DataSet是数据处理模块
	const { DataView } = DataSet;

	import SellerTable from '../../components/public/chart/sellerTable.vue'
	export default {
		data() {
			return {
				// 快捷日期选择
				pickerOptions: {
					disabledDate(time) {
			            return time.getTime() > Date.now();
			        },
					shortcuts: [
						{
							text: '当天',
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime());
								picker.$emit('pick', [start, end]);
							}
						}, 
						{
							text: '当月',
							onClick(picker) {
							  	const end = new Date();
							  	const start = new Date();
							  	start.setDate(1)
							  	picker.$emit('pick', [start, end]);
							}
						}, 
						{
							text: '当年',
							onClick(picker) {
							  	const end = new Date();
							  	const start = new Date();
								start.setDate(1)
								start.setMonth(0)

							  	picker.$emit('pick', [start, end]);
							}
						}
					]
		        },
				chooseDate:'',
				startDate:'',
				endDate:'',
				currentDate:'',			// 当前时间，传给子组件

				getData:[],
				chart:'',
				sellerInfo:'',
				sellerInfo2:'',

				totalNum:'',



			}
		},
		created() {
			this.startDate = new Date().getFullYear() +''+ (new Date().getMonth()+1) + '01'
			this.endDate = new Date().getFullYear() +''+ (new Date().getMonth()+1) + (new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate())
			this.$axios.post('adminagent/store_operational_data',{
				store_id:this.$route.query.store_id,
				start_time:this.startDate,
				end_time:this.endDate
			})
				.then(res=>{
					if (res.data.code == 200) {
						this.sellerInfo = res.data.data.store_info
						this.sellerInfo2 = res.data.data
						this.totalNum = res.data.data.order[3].num
						this.getData = res.data.data.order_percent

						this.getData[0].num = parseInt(this.getData[0].num)
						this.getData[1].num = parseInt(this.getData[1].num)
						this.getData[2].num = parseInt(this.getData[2].num)

						this.getData = eval('('+JSON.stringify(this.getData).replace(/"name"/ig,'item').replace(/"num"/ig,'count')+')')
						this.draw()

					} else {
						this.$message.warning(res.data.message)
					}
				})
				.catch(err=>{
					console.log(err)
				})
		},
		components:{ SellerTable },
		mounted() {
			this.draw()
		},
		methods:{
			// 返回上一页
			goBack() {
				history.go(-1)
			},
			timeChange(val) {
				this.currentDate = val
				this.startDate = val.substring(0,10).replace(/\-/ig,'')
				this.endDate = val.substring(11)
				this.$axios.post('adminagent/store_operational_data',{
					store_id:this.$route.query.store_id,
					start_time:this.startDate,
					end_time:this.endDate
				})
					.then(res=>{
						if (res.data.code == 200) {
							this.sellerInfo = res.data.data.store_info
							this.sellerInfo2 = res.data.data
							this.totalNum = res.data.data.order[3].num
							this.getData = res.data.data.order_percent

							this.getData[0].num = parseInt(this.getData[0].num)
							this.getData[1].num = parseInt(this.getData[1].num)
							this.getData[2].num = parseInt(this.getData[2].num)

							this.getData = eval('('+JSON.stringify(this.getData).replace(/"name"/ig,'item').replace(/"num"/ig,'count')+')')
							
							this.draw()
							

						} else {
							this.$message.warning(res.data.message)
						}
					})
					.catch(err=>{
						console.log(err)
					})
			},

			// chart图形
			draw() {
 				const dv = new DataView();
			
				dv.source(this.getData).transform({
					type: 'percent',
					field: 'count',
					dimension: 'item',
					as: 'percent'
				});
				this.chart && this.chart.destroy();
				// 创建一个画布
				this.chart = new G2.Chart({
					container: 'c1',
					// forceFit: true,
					width:540,
					height: 400,
				});
				// 数据格式化
				this.chart.source(dv, {
					percent: {
					  	formatter: val => {
					    	val = (Math.round(val*100) / 100) + '%';
					    	return val;
					  	}
					}
				});
				// 图表类型,设置坐标系(rect（直角坐标系）、polar、theta（饼图）、helix（螺旋坐标系）)
				this.chart.coord('theta', {
				    radius: 0.75,
				    innerRadius: 0.6
				});
				// 提示信息
				this.chart.tooltip({
				    showTitle: false,
				    itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
				});
				// 辅助文本
				this.chart.guide().html({
				    position: [ '50%', '50%' ],
				    html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">订单总数<br>\
				    <b style="color:#8c8c8c;font-size:20px">'+this.totalNum+'</b></div>',
				    alignX: 'middle',
				    alignY: 'middle'
				});
				// 图表的其他属性
				this.chart.intervalStack()
					.position('percent')
				    .color('item')
				    .label('percent', {
				      formatter: (val, item) => {
				        return item.point.item + ': ' + val;
				      }
				    })
				    .tooltip('item*percent', (item, percent) => {
				      percent = Math.round(percent * 100) / 100 +'%';
				      return {
				        name: item,
				        value: percent
				      };
				    })
				    .style({
				      lineWidth: 1,
				      stroke: '#fff'
				    });
				// 渲染
				this.chart.render();
			}
		}

	}
</script>
<style scoped lang="scss">
	.el-breadcrumb {
		line-height:30px;
	}
	.el-form-item {
		text-align:left;
		margin-bottom:22px !important;
	}
	#c1 {
		display: inline-block;
		float: left;
		width:520px;
		height: 400px;
	}
	.sellerTable {
		display: inline-block;
		float: left;
		margin-left:60px;
	}
</style>