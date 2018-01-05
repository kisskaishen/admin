<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/activityManage">活动管理</el-breadcrumb-item>
            <el-breadcrumb-item to="/activityManage/oneMoney">1元活动</el-breadcrumb-item>
            <el-breadcrumb-item>单品券列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <el-form class="condition" label-width="100px">
                <el-row>
                    <el-col>
                        <el-form-item label="商品名称：">
                            <el-input v-model="goodsName" size="small" placeholder="商品名称"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="商家名称：">
                            <el-input v-model="storeName" size="small" placeholder="商家名称"></el-input>
                        </el-form-item>
                    </el-col>
                <!-- </el-row>
                    
                <el-row> -->
                    <el-col style="width:468px">
                        <el-form-item label="商品分类：">
                            <three-type @toLevel1="getLevel1" @toLevel2="getLevel2" @toLevel3="getLevel3"></three-type>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:32px;margin-left:16px;">
                        <i class="btn-search" @click="btnSearch"></i>
                    </el-col>

                </el-row>
            </el-form>

            <el-table
                :data="tableData"
                fixed
                height="720"
                border
                style="width: 100%">
                <el-table-column prop="goods_id" label="编号"></el-table-column>
                <el-table-column prop="store_name" label="商家名称"></el-table-column>
                <el-table-column prop="goods_image" label="图片">
                    <template scope="scope">
                        <img :src="scope.row.goods_image" :alt="scope.row.goods_name" width="105" height="91">
                    </template>
                </el-table-column>
                <el-table-column prop="goods_name" label="活动名称"></el-table-column>
                <el-table-column prop="classify" label="分类"></el-table-column>
                <el-table-column prop="spec_name" label="规格"></el-table-column>
                <el-table-column prop="goods_marketprice" label="店铺价格"></el-table-column>
                <el-table-column prop="goods_price" label="验证价"></el-table-column>
                <el-table-column prop="discount" label="折扣度"></el-table-column>
                <el-table-column prop="goods_salenum" label="库存/销量">
                    <template scope="scope">
                        <span>{{scope.row.goods_storage}}</span>
                        <b>|</b>
                        <span>{{scope.row.goods_salenum}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_addtime" label="添加时间"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column prop="address" label="操作">
                    <template scope="scope">
                        <el-button @click="seeClick(scope.row)" type="text" size="small">查看</el-button><b>|</b>
                        <router-link :to="{path:'/activityManage/addOneMoney',query:{toPath:'addProject',goods_id:scope.row.goods_id,activity_id:activity_id,name:name}}" 
                            type="text" size="small">添加</router-link>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                layout="prev, pager, next"
                @current-change="pageChange"
                :total="parseInt(lastPage)"></el-pagination>
            <el-dialog title="单品券详情" :visible.sync="dialogFormVisible" size="tiny">
                <el-form label-width="160px">
                    <el-form-item label="单品券名称：">
                        <span>{{singleInfo.goods_name}}</span>
                    </el-form-item>
                    <el-form-item label="商品图片：">
                        <img :src="singleInfo.goods_image" :alt="singleInfo.goods_name">
                    </el-form-item>
                    <el-form-item label="分类：">
                        <span>{{singleInfo.classify}}</span>
                    </el-form-item>
                    <el-form-item label="原价：">
                        <span>{{singleInfo.goods_marketprice}}</span>
                    </el-form-item>
                    <el-form-item label="餐餐抢价：">
                        <span>{{singleInfo.goods_price}}</span>
                    </el-form-item>
                    <el-form-item label="折扣率：">
                        <span>{{singleInfo.discount}}</span>
                    </el-form-item>
                    <el-form-item label="规格：">
                        <span>{{singleInfo.spec_name}}</span>
                    </el-form-item>
                    <el-form-item label="上架库存：">
                        <span>{{singleInfo.goods_storage}}</span>
                    </el-form-item>
                    <el-form-item label="销量：">
                        <span>{{singleInfo.goods_salenum}}</span>
                    </el-form-item>
                    <el-form-item label="剩余库存：">
                        <span>{{singleInfo.initial_storage}}</span>
                    </el-form-item>
                    <el-form-item label="商品状态：">
                        <span>{{singleInfo.status}}</span>
                    </el-form-item>
                    <el-form-item label="审核时间：">
                        <span>{{singleInfo.goods_verifytime==''?'未有审核时间':singleInfo.goods_verifytime}}</span>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </div>
        
    </div>
</template>
<script>
    import ThreeType from '../../components/public/addIndustry2.vue'
    export default {
        data() {
            return {
                activity_id:'',
                goodsName:'',
                storeName:'',
                name:'',        // 活动名称
                level1:'',
                level2:'',
                level3:'',
                // table信息
                tableData:[],
                lastPage:'',
                dialogFormVisible:false,
                singleInfo:'',
            }
        },
        created() {
            this.activity_id = this.$route.query.activity_id
            this.name = this.$route.query.name
            this.getList(1)
           
        },
        components:{ ThreeType },
        methods: {

            // 分类
            getLevel1(val) {
                this.level1 = val
            },
            getLevel2(val) {
                this.level2 = val
            },
            getLevel3(val) {
                this.level3 = val
            },
            // getList列表
            getList(val) {
                this.$axios.post('Goods/goods_single_list',{
                    store_name:this.storeName,
                    goods_name:this.goodsName,
                    gc_id_1:this.level1,
                    gc_id_2:this.level2,
                    gc_id_3:this.level3,
                    page:val
                })
                    .then(res=>{
                        if (res.data.code == 200) {
                            this.tableData = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
                        } else {
                            this.$message.warning(res.data.message)
                        }
                    })
            },  
            // 翻页 
            pageChange(val) {
                this.getList(val)
            },
            // btnSearch
            btnSearch() {
                this.getList(1)
            },
            // 删除
            seeClick(val) {
                this.singleInfo = val
                this.dialogFormVisible = true
            }

        }
    }
</script>
<style lang="scss" scoped>
    .el-breadcrumb {
        line-height:30px;
    }
    .contentDiv {
        h4 {
            text-align:left;
        }
        .el-form {
            padding: 10px;
        }
        img {
            display: block;
            width:105px;
            height: 91px;
        }
    }
</style>
