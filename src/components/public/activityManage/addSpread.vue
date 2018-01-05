<template>
    <div>
        <div class="contentDiv">
        	<el-form class="condition" label-width="80px">
        		<el-row>
        			<el-col style="width:256px;">
        				<el-form-item label-width="0">
        					<el-select v-model="searchType" size="small" @change="typeChange">
        						<el-option
        							v-for="item in types"
        							:key="item.value"
        							:label="item.label"
        							:value="item.value"></el-option>
        					</el-select>
        					<el-input v-model="searchTxt" size="small" @focus="textFocus"></el-input>
        				</el-form-item>
        			</el-col>
 
        			<el-col style="width:32px;margin-left:16px;">
                        <i class="btn-search" @click="searchBtn"></i>
                    </el-col>

                    <el-col>
                        <span class="error" v-if="errorTip">运营商账号不存在或输入错误，请重新输入</span>
                    </el-col>
       
        		</el-row>
        	</el-form>           
           	<el-table
                v-if="table"
           		:data="tableData"
           		border
           		height="400"
           		style="width:100%;">
				<el-table-column prop="member_truename" label="运营商姓名"></el-table-column>
				<el-table-column prop="member_name" label="运营商账号"></el-table-column>
				<el-table-column prop="member_mobile" label="手机号码"></el-table-column>
				<el-table-column prop="identity" label="状态"></el-table-column>
				<el-table-column prop="is_overtime" label="到期时间"></el-table-column>
				<el-table-column prop="" label="操作">
					<template scope="scope">
						<el-button @click="addUser(scope.row)" size="small">添加</el-button>
					</template>
				</el-table-column>
           	</el-table>
           <!--  <div class="footer">
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="changePage"
                    :total="parseInt(lastPage)">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            	types:[
            		
            		{
            			label:'运营商账号',
            			value:'1'
            		},
            		{
            			label:'手机号码',
            			value:'2'
            		},
                    {
                        label:'运营商姓名',
                        value:'3'
                    }
            	],
            	searchType:'1',
            	searchTxt:'',
            	tableData:[],
               	lastPage:'',
                errorTip:false,
                table:false
            }
        },
        created() {
            
        },
        methods: {
        	searchBtn(){
                this.$axios.post('Activity/get_operator',{
                    search_field_name:this.searchType,
                    search_field_value:this.searchTxt
                })
                    .then(res=>{
                        if (res.data.code == 200) {
                            this.tableData = res.data.data
                            this.table = true
                        } else {
                            this.errorTip = true
                            this.table = false
                        }
                    })
        	},
            typeChange(val) {
                this.searchType = val
            },
            textFocus() {
                this.errorTip = false
            },
        	// 添加
            addUser(val) {
                this.$axios.post('Activity/add_extend',{
                    member_id:val.member_id
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
            },
        }
    }
</script>
<style lang="scss" scoped>
    .contentDiv {
        margin: 0 10px;
        .condition {
			border-bottom:1px solid #dcdcdc;
        }
        
        .footer {
            text-align: right;
            margin:0
        }

    }
</style>
