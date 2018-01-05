<template>
    <div>
        <div class="contentDiv">
            <!-- 商品列表搜索部分 -->
            <el-form label-width='100px' class="condition">
                <el-row>
                    <el-col>
                        <el-form-item label="套餐券名称">
                            <el-input v-model="goodsName" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:356px">
                        <el-form-item label="添加时间">
                            <el-date-picker
                                v-model="groupListStartTime"
                                type="date"
                                placeholder="开始日期"
                                style="width:120px;"
                                size="small"
                                @change="groupStartTimeChange">
                            </el-date-picker>
                            ~
                            <el-date-picker
                                v-model="groupListEndTime"
                                type="date"
                                placeholder="结束日期"
                                style="width:120px;"
                                size="small"
                                @change="groupEndTimeChange">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:468px">
                        <el-form-item label="套餐分类">
                            <el-select v-model="level" placeholder="一级分类" @change="levelChange" size="small">
                                <el-option
                                    v-for="item in leveles1"
                                    :key="item.level"
                                    :label="item.label"
                                    :value="item.gc_name+'('+item.gc_id+')'"></el-option>
                            </el-select>

                            <el-select v-model="level2" placeholder="二级分类" @change="level2Change"
                                       size="small">
                                <el-option
                                    v-for="item in leveles2"
                                    :key="item.level2"
                                    :label="item.label"
                                    :value="item.gc_name+'('+item.gc_id+')'"></el-option>
                            </el-select>

                            <el-select v-model="level3" placeholder="三级分类" @change="level3Change"
                                       size="small">
                                <el-option
                                    v-for="item in leveles3"
                                    :key="item.level3"
                                    :label="item.label"
                                    :value="item.gc_name+'('+item.gc_id+')'"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>


                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="商家名称">
                            <el-input v-model="storeName" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:614px">
                        <el-form-item label="商家地址">
                            <address-select
                                @listenProvince="listenProvince"
                                @listenCity="listenCity"
                                @listenArea="listenArea"
                                @listenStreet="listenStreet"
                                style="width: 600px"></address-select>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="审核状态">
                            <el-select v-model="groupCheckStatus" size="small" @change="groupCheckStatusChange">
                                <el-option
                                    v-for="item in checkStatuses"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <i class="btn-search" @click="groupSearchBtn"></i>
                    </el-col>
                </el-row>
            </el-form>

            <p class="tip">目前套餐券列表总数共计<em style="color:#e4393c">{{goodsGroupTotal}}</em>种，可根据条件进行详细筛选</p>
            <!-- 套餐券表格部分 -->
            <table>
                <tr class="thead">
                    <th width="5%">编号</th>
                    <th width="7%" align="left">商家名称</th>
                    <th align="left" width="120px">商品图</th>
                    <th width="12%" align="left">套餐名称/分类</th>
                    <th width="8%" align="left">套餐内容</th>
                    <th>规格</th>
                    <th width="7%">店铺价格</th>
                    <th width="7%">餐餐抢价</th>
                    <th>折扣度</th>
                    <th width="7%">上架库存</th>
                    <th>库存</th>
                    <th width="6%">销量</th>
                    <th width="8%">添加时间</th>
                    <th>状态</th>
                    <th width="7%">操作</th>
                </tr>
                <tr class="tbody" v-for="td,index in setMealTdes">
                    <td>{{td.goods_id}}</td>
                    <td align="left">{{td.store_name}}</td>
                    <td align="left">
                        <img :src="td.goods_image" :alt="td.goods_name" class="goodsName">
                    </td>
                    <td align="left">
                        <p>分类：{{td.classify}}</p>
                        <p>{{td.goods_name}}</p>
                    </td>
                    <td align="left">
                        <p v-for="item in td.detail">
                            {{item.goods_union_name}}&times;{{item.goods_union_num}}</p>
                    </td>
                    <td>{{td.spec_name}}</td>
                    <td>{{td.goods_marketprice}}元</td>
                    <td>{{td.goods_price}}元</td>
                    <td>{{td.discount}}</td>
                    <td>{{td.initial_storage}}</td>
                    <td class="inventory">{{td.goods_storage}} <span @click="showSetMeal(td)">改库存</span></td>
                    <td>{{td.goods_salenum}}</td>
                    <td>
                        <p>{{td.goods_addtime}}</p>
                    </td>
                    <td>
                        <span>{{td.status}}</span>
                        <el-button type="danger" size="small" @click="addReferee(td)"
                                   v-if="td.recommend_info == '添加推荐'">{{td.recommend_info}}
                        </el-button>
                        <div style="color: #e4393c;" v-else-if="td.recommend_info == '推荐商品'">{{td.recommend_info}}</div>
                        <div style="color: #e4393c;"><span v-if="tuijianTxt">推荐商品</span></div>
                    </td>
                    <td>
                        <router-link :to="{path:'/goods/watchGroupDetail',query:{id:td.goods_id}}"
                                     style="color:#242424;"><span style="display:inline-flex;"
                                                                  @click="openGroupDetail(td)">查看</span>
                        </router-link>
                        <em v-if="td.is_applyonline">|</em>
                        <router-link :to="{path:'/goods/checkGroupGoods',query:{id:td.goods_id}}" v-if="td.is_applyonline == '修改'">
                            <span>{{td.is_applyonline}}</span>
                        </router-link>
                        <router-link :to="{path:'/goods/checkGroupGoods',query:{id:td.goods_id,is_examine:1}}" v-if="td.is_applyonline == '审核'">
                            <span>{{td.is_applyonline}}</span>
                        </router-link>
                        <em v-if="td.is_delete">|</em>
                        <span @click="groupGoodsDelete(td,index)">{{td.is_delete}}</span><em
                        v-if="td.is_downline">|</em>
                        <span @click="openSoldOut(td,index)">{{td.is_downline}}</span>
                    </td>
                </tr>
            </table>
        </div>

        <!-- 删除或下架dialog -->
        <el-dialog
            title="套餐券提示"
            :visible.sync="groupDeleteDialogVisible"
            size="tiny">
            <p>{{groupSelectMsg}}！这是一个严重的错误，真的不</p>
            <p>考虑一下么？</p>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="groupDeleteDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sureGroupDeleteBtn">确 定</el-button>
                    </span>
        </el-dialog>


        <!-- 修改套餐券库存 -->
        <el-dialog
            title="修改套餐券库存"
            :visible.sync="reviseGroupDialogVisible"
            size="tiny"
            class="reviseGroupLayer">
            <div>
                <span class="fl">套餐券名称：</span>
                <span class="right">{{singleGoodsName}}</span>
            </div>
            <div>
                <span class="fl">现有库存：</span>
                <span class="right">{{nowGroupInventory}}</span>
            </div>
            <div>
                <span class="fl">修改库存数量：</span>
                <span class="right">
                            <el-input v-model="reviseGroupNum" style="width: 106px" size="small"></el-input>
                        </span>
            </div>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="reviseGroupDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sureGroupReviseBtn">确 定</el-button>
                    </span>
        </el-dialog>

        <!-- 底部部分 -->
        <div class="footer">
            <div class="fr">
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="GroupListCurrentChange"
                    :total="parseInt(groupLastPage)">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        created() {

        },
        computed:{
            // 套餐券列表
            setMealTdes: state => state.goodsModule.setMealTdes,
            groupLastPage: state => state.goodsModule.groupLastPage,
            goodsGroupTotal: state => state.goodsModule.goodsGroupTotal,
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>

</style>
