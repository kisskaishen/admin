<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>商品管理</h2>
            </el-col>
        </el-row>
        <el-tabs type="border-card" v-model="activeName" @tab-click="changeHandleClick">
            <!-- 套餐券 -->
            <el-tab-pane label="套餐券" name="list1" class="setMealTicket">
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
                                            :key="item.gc_id"
                                            :label="item.gc_name"
                                            :value="item.gc_id"></el-option>
                                    </el-select>

                                    <el-select v-model="level2" placeholder="二级分类" @change="level2Change"
                                               size="small">
                                        <el-option
                                            v-for="item in leveles2"
                                            :key="item.gc_id"
                                            :label="item.gc_name"
                                            :value="item.gc_id"></el-option>
                                    </el-select>

                                    <el-select v-model="level3" placeholder="三级分类" @change="level3Change"
                                               size="small">
                                        <el-option
                                            v-for="item in leveles3"
                                            :key="item.gc_id"
                                            :label="item.gc_name"
                                            :value="item.gc_id"></el-option>
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
                            <el-col style="float:right;">
                                <el-button type="primary" @click="groupOutExcel">导出excel</el-button>
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
                            <!-- <th>规格</th> -->
                            <th width="7%">店铺价格</th>
                            <th width="7%">餐餐抢价</th>
                            <th>折扣度</th>
                            <th width="12%">库存/上架库存/销量</th>
                            <th width="8%">添加/审核时间</th>
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
                                <p style="border-bottom: 1px dashed #666">名称：{{td.goods_name}}</p>
                                <p>分类：{{td.classify}}</p>
                            </td>
                            <td align="left">
                                <p v-for="item in td.detail">
                                    {{item.goods_union_name}}&times;{{item.goods_union_num}}</p>
                            </td>
                            <!-- <td>{{td.spec_name}}</td> -->
                            <td>{{td.goods_marketprice}}元</td>
                            <td>{{td.goods_price}}元</td>
                            <td>{{td.discount}}</td>
                            <td class="inventory">
                                <label>{{td.initial_storage}}</label><b>|</b>
                                <label>{{td.goods_storage}}</label><b>|</b>
                                <label>{{td.goods_salenum}}</label>
                                <span @click="showSetMeal(td)">改库存/有效期</span></td>
                            <td>
                                <p>{{td.goods_addtime}}</p>
                                <p style="border-top: 1px dashed #666;" class="curr2">{{td.goods_addtime}}</p>
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
                                <router-link :to="{path:'/goods/checkGroupGoods',query:{id:td.goods_id}}"
                                             v-if="td.is_applyonline == '修改'">
                                    <span>{{td.is_applyonline}}</span>
                                </router-link>
                                <router-link :to="{path:'/goods/checkGroupGoods',query:{id:td.goods_id,is_examine:1}}"
                                             v-if="td.is_applyonline == '审核'">
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
                    title="修改套餐券库存/时间"
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
                    <div>
                        <span class="fl">修改有效期：</span>
                        <span class="right">
                            <el-date-picker
                                type="date"
                                v-model="startDate"
                                @change="startDateChange"
                                placeholder="开始时间"
                                size="small"
                                style="width:120px;"></el-date-picker>
                                ~~
                            <el-date-picker
                                type="date"
                                v-model="endDate"
                                @change="endDateChange"
                                placeholder="截止时间"
                                size="small"
                                style="width:120px;"></el-date-picker>
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
                            :current-page="currentPage1"
                            :total="parseInt(groupLastPage)">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <!-- 单品券 -->
            <el-tab-pane label="单品券" name="list2" class="singleItemTicket">
                <div class="contentDiv">
                    <!-- 单品券搜索部分 -->
                    <!-- 商品列表搜索部分 -->
                    <el-form label-width='100px' class="condition">
                        <el-row>
                            <el-col>
                                <el-form-item label="单品券名称">
                                    <el-input v-model="goodsName" size="small"></el-input>
                                </el-form-item>
                            </el-col>


                            <el-col style="width: 356px;">
                                <el-form-item label="添加时间">
                                    <el-date-picker
                                        v-model="singleListStartTime"
                                        type="date"
                                        placeholder="开始日期"
                                        style="width:120px;"
                                        size="small"
                                        @change="singleStartTimeChange">
                                    </el-date-picker>
                                    ~
                                    <el-date-picker
                                        v-model="singleListEndTime"
                                        type="date"
                                        placeholder="结束日期"
                                        style="width:120px;"
                                        size="small"
                                        @change="singleEndTimeChange">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>

                            <el-col style="width:468px">
                                <el-form-item label="单品券分类">
                                    <el-select v-model="level" placeholder="一级分类" @change="levelChange" size="small">
                                        <el-option
                                            v-for="item in leveles1"
                                            :key="item.gc_id"
                                            :label="item.gc_name"
                                            :value="item.gc_id"></el-option>
                                    </el-select>

                                    <el-select v-model="level2" placeholder="二级分类" @change="level2Change"
                                               size="small">
                                        <el-option
                                            v-for="item in leveles2"
                                            :key="item.gc_id"
                                            :label="item.gc_name"
                                            :value="item.gc_id"></el-option>
                                    </el-select>

                                    <el-select v-model="level3" placeholder="三级分类" @change="level3Change"
                                               size="small">
                                        <el-option
                                            v-for="item in leveles"
                                            :key="item.gc_id3"
                                            :label="item.gc_name"
                                            :value="item.gc_id"></el-option>
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
                                    <el-select v-model="singleCheckStatus" size="small"
                                               @change="singleCheckStatusChange">
                                        <el-option
                                            v-for="item in checkStatuses"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col>
                                <i class="btn-search" @click="singleSearchBtn"></i>
                            </el-col>
                
                            <el-col style="float:right;">
                                <el-button type="primary" @click="singleOutExcel">导出excel</el-button>
                            </el-col>

                        </el-row>
                    </el-form>
                    <p class="tip">目前单品券总数共计<em style="color:#e4393c;">{{goodsSingleTotal}}</em>种，可根据条件进行详细筛选</p>
                    <!-- 单品券表格部分 -->
                    <table>
                        <tr class="thead">
                            <th width="6%">编号</th>
                            <th align="left">商家名称</th>
                            <th align="left">商品图</th>
                            <th width="12%" align="left">商品名</th>
                            <th width="8%" align="left">分类</th>
                            <th>规格</th>
                            <th>店铺价</th>
                            <th>验证价</th>
                            <th>折扣度</th>
                            <th>库存/销量</th>
                            <th width="7%">添加时间</th>
                            <th>状态</th>
                            <th width="7%">操作</th>
                        </tr>
                        <tr class="tbody" v-for="td,index in singleItemTdes">
                            <td>{{td.goods_id}}</td>
                            <td align="left">{{td.store_name}}</td>
                            <td align="left">
                                <img :src="td.goods_image" :alt="td.goods_name" class="goodsName"
                                     @click="biggerClick(td)">
                            </td>
                            <td align="left">{{td.goods_name}}</td>
                            <td align="left">
                                <p>{{td.classify}}</p>
                            </td>
                            <td>{{td.spec_name}}</td>
                            <td>{{td.goods_marketprice}}元</td>
                            <td>{{td.goods_price}}元</td>
                            <td>{{td.discount}}</td>
                            <td class="inventory">
                                <label>{{td.goods_storage}}</label> <b>|</b>
                                <label>{{td.goods_salenum}}</label>
                                <span @click="openAlterInventory(td)">改库存/时间</span>
                            </td>
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
                                <span style="display:inline-flex;" @click="openTicketDetail(td)">查看</span><em
                                v-if="td.is_applyonline">|</em>

                                <span @click="singleApplicate(td)"
                                      style="color:#e4393c;">{{td.is_applyonline}}</span><em v-if="td.is_delete">|</em>

                                <span @click="openSetMealTicketDel(td,index)">{{td.is_delete}}</span><em
                                v-if="td.is_downline">|</em>

                                <span @click="openTicketSoldOut(td,index)">{{td.is_downline}}</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- 单品券审核 -->
                <el-dialog
                    title="单品券审核"
                    :visible.sync="singleDialogVisible"
                    style="text-align:left">
                    <div class="singleInfo">
                        <div>
                            <span class="fl">单品券名称：</span>
                            <span class="right">{{singleGoodsName}}</span>
                        </div>
                        <div>
                            <span class="fl">商品图片：</span>
                            <div class="right img" style="min-height: 126px;">
                                <div class="file" v-for="item in singleGoodsImages">
                                    <img :src="item[1]" :alt="singleGoodsName">
                                </div>
                            </div>
                        </div>
                        <div>
                            <span class="fl">分类选择：</span>
                            <span
                                class="right">{{singleClassify[0]}} > {{singleClassify[1]}} > {{singleClassify[2]}}</span>
                        </div>
                        <div>
                            <span class="fl">原价：</span>
                            <span class="right">{{singleGoodsMarketprice}}元</span>
                        </div>
                        <div>
                            <span class="fl">餐餐抢价：</span>
                            <span class="right" style="color: #E4393C;">{{singleGoodsPrice}}元</span>
                        </div>
                        <div>
                            <span class="fl">折扣率：</span>
                            <span class="right" style="color: #E4393C;">{{singleDiscount}}折</span>
                        </div>
                        <div>
                            <span class="fl">规格：</span>
                            <span class="right">{{singleSpecName}}</span>
                        </div>
                        <div>
                            <span class="fl">上架库存：</span>
                            <span class="right">{{singleGoodsInitialStorage}}</span>
                        </div>
                        <div>
                            <span class="fl">销量：</span>
                            <span class="right">{{singleGoodsSalenum}}</span>
                        </div>
                        <div>
                            <span class="fl">剩余库存：</span>
                            <span class="right"><el-input v-model="singleGoodsStorage" size="small"
                                                          style="width:80px;margin-right:20px;"></el-input></span>
                        </div>
                        <div>
                            <span class="fl">商品状态：</span>
                            <span class="right">{{singleGoodsStatus}}</span>
                        </div>
                        <div style="height: 44px;">
                            <span class="fl">审核：</span>
                            <el-radio-group v-model="singleCheck" @change="singleCheckChoose" class="right"
                                            style="margin-top:-8px;">
                                <el-radio label="1">通过</el-radio>
                                <el-radio label="-1">拒绝</el-radio>
                            </el-radio-group>
                            <el-input type="text" v-model="singleRefuseReason" v-if="singleCheckRefuse"
                                      @change="addResult" size="small" style="width: 200px;margin-left: 30px;"
                                      placeholder="拒绝理由"></el-input>
                        </div>
                        <div>
                            <span class="fl">审核时间：</span>
                            <span class="right" v-if="singleCheckTime">{{singleCheckTime}}</span>
                            <span class="right" v-else>未有审核时间</span>
                        </div>

                        <br/><br/>
                        <div style="margin-top:20px;">
                            <span class="fl"></span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="singleDialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="singleApplicateSubmit">确 定</el-button>
                            </span>
                        </div>
                    </div>
                </el-dialog>
                <!-- 单品券查看 -->
                <el-dialog
                    title="单品券详情"
                    :visible.sync="singleWatchDialogVisible"
                    style="text-align:left">
                    <div class="watchSingleDetail">
                        <div>
                            <span class="fl">单品券名称：</span>
                            <span class="right">{{singleGoodsName}}</span>
                        </div>
                        <div style="height:30px;">
                            <span class="fl">商品图片：</span>
                            <span class="right error">(提示：请勿重复更改同一张图片)</span>
                        </div>
                        <div style="height:126px;">
                            <div class="right img" style="height: 100px;" v-if="singleGoodsImages.length == 0">
                                <div class="file">
                                    <img v-if="singleGoodsImage1" :src="singleGoodsImage1" alt="图片1">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange1">
                                </div>
                                <div class="file">
                                    <img v-if="singleGoodsImage2" :src="singleGoodsImage2" alt="图片2">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange2">
                                </div>
                                <div class="file">
                                    <img v-if="singleGoodsImage3" :src="singleGoodsImage3" alt="图片3">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange3">
                                </div>
                                <el-button class="sureRevise" type="danger" size="small" @click="sureImageRevise">确认修改
                                </el-button>
                            </div>
                            <div class="right img" style="height: 100px;" v-if="singleGoodsImages.length == 1">
                                <div class="file">
                                    <img v-if="singleGoodsImage1" :src="singleGoodsImage1" alt="图片1">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange1">
                                    <i class="closeIcon" @click="deleteImg1">&times;</i>
                                </div>
                                <div class="file">
                                    <img v-if="singleGoodsImage2" :src="singleGoodsImage2" alt="图片2">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange2">
                                </div>
                                <div class="file">
                                    <img v-if="singleGoodsImage3" :src="singleGoodsImage3" alt="图片3">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange3">
                                </div>
                                <el-button class="sureRevise" type="danger" size="small" @click="sureImageRevise">确认修改
                                </el-button>
                            </div>
                            <div class="right img" style="height: 100px;" v-if="singleGoodsImages.length == 2">
                                <div class="file">
                                    <img v-if="singleGoodsImage1" :src="singleGoodsImage1" alt="图片1">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange1">
                                    <i class="closeIcon" @click="deleteImg1">&times;</i>
                                </div>
                                <div class="file">
                                    <img v-if="singleGoodsImage2" :src="singleGoodsImage2" alt="图片2">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange2">
                                    <i class="closeIcon" @click="deleteImg2">&times;</i>
                                </div>
                                <div class="file">
                                    <img v-if="singleGoodsImage3" :src="singleGoodsImage3" alt="图片3">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange3">
                                </div>
                                <el-button class="sureRevise" type="danger" size="small" @click="sureImageRevise">确认修改
                                </el-button>
                            </div>
                            <div class="right img" style="height: 100px;" v-if="singleGoodsImages.length >= 3">
                                <div class="file">
                                    <img v-if="singleGoodsImage1" :src="singleGoodsImage1" :id="singleGoodsImages[0][0]"
                                         alt="图片1">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange1">
                                    <i class="closeIcon" @click="deleteImg1">&times;</i>
                                </div>
                                <div class="file">
                                    <img v-if="singleGoodsImage2" :src="singleGoodsImage2" :id="singleGoodsImages[1][0]"
                                         alt="图片2">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange2">
                                    <i class="closeIcon" @click="deleteImg2">&times;</i>
                                </div>
                                <div class="file">
                                    <img v-if="singleGoodsImage3" :src="singleGoodsImage3" :id="singleGoodsImages[2][0]"
                                         alt="图片3">
                                    <i v-else class="el-icon-goods"></i>
                                    <input type="file" @change="singleChange3">
                                    <i class="closeIcon" @click="deleteImg3">&times;</i>
                                </div>
                                <el-button class="sureRevise" type="danger" size="small" @click="sureImageRevise">确认修改
                                </el-button>
                            </div>
                        </div>
                        <div>
                            <span class="fl">分类选择：</span>
                            <!-- <span class="right" ><label v-for="item in singleClassify">{{singleClassify[0]}}</label></span> -->
                            <span
                                class="right">{{singleClassify[0]}} > {{singleClassify[1]}} > {{singleClassify[2]}}</span>
                        </div>
                        <div>
                            <span class="fl">原价：</span>
                            <span class="right">{{singleGoodsMarketprice}}元</span>
                        </div>
                        <div>
                            <span class="fl">餐餐抢价：</span>
                            <span class="right" style="color: #E4393C;">{{singleGoodsPrice}}元</span>
                        </div>
                        <div>
                            <span class="fl">折扣率：</span>
                            <span class="right" style="color: #E4393C;">{{singleDiscount}}折</span>
                        </div>
                        <div>
                            <span class="fl">规格：</span>
                            <span class="right">{{singleSpecName}}</span>
                        </div>
                        <div>
                            <span class="fl">上架库存：</span>
                            <span class="right">{{singleGoodsInitialStorage}}</span>
                        </div>
                        <div>
                            <span class="fl">销量：</span>
                            <span class="right">{{singleGoodsSalenum}}</span>
                        </div>
                        <div>
                            <span class="fl">剩余库存：</span>
                            <span class="right">{{singleGoodsStorage}}</span>
                        </div>
                        <div>
                            <span class="fl">商品状态：</span>
                            <span class="right">{{singleStatus}}</span>
                        </div>
                        <div v-if="singleStatusVal">
                            <span class="fl">被拒理由：</span>
                            <span class="right">{{singleRefuseReason}}</span>
                        </div>
                        <div>
                            <span class="fl">审核时间：</span>
                            <span class="right" v-if="singleCheckTime">{{singleCheckTime}}</span>
                            <span class="right" v-else>未有审核时间</span>
                        </div>
                    </div>
                </el-dialog>
                <!-- 单品券修改库存部分 -->
                <el-dialog

                    title="修改单品券库存/时间"
                    :visible.sync="reviseSingleDialogVisible"
                    size="tiny"
                    class="reviseSingleLayer">
                    <div>
                        <span class="fl">单品券名称：</span>
                        <span class="right">{{singleGoodsName}}</span>
                    </div>
                    <div>
                        <span class="fl">现有库存：</span>
                        <span class="right">{{nowSingleInventory}}</span>
                    </div>
                    <div>
                        <span class="fl">修改库存数量：</span>
                        <span class="right">
                            <el-input v-model="reviseSingleNum" style="width: 106px" size="small"></el-input>
                        </span>
                    </div>
                    <div>
                        <span class="fl">修改库存数量：</span>
                        <span class="right">
                            <el-date-picker
                                type="date"
                                v-model="startDate"
                                @change="startDateChange"
                                placeholder="开始时间"
                                size="small"
                                style="width:120px;"></el-date-picker>
                                ~~
                            <el-date-picker
                                type="date"
                                v-model="endDate"
                                @change="endDateChange"
                                placeholder="截止时间"
                                size="small"
                                style="width:120px;"></el-date-picker>
                        </span>
                    </div>
                    <span slot="footer" class="dialog-footer">
                            <el-button @click="reviseSingleDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="sureSingleReviseBtn">确 定</el-button>
                        </span>
                </el-dialog>

                <!-- 单品券删除部分 -->
                <el-dialog
                    title="删除商品"
                    :visible.sync="singleDeleteDialogVisible"
                    size="tiny">
                    <div class="txt">
                        <p>挥一挥手，不带走一片云彩。</p>
                        <p>此商品就这么木有了。</p>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="singleDeleteDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="singleDeleteBtn()">确 定</el-button>
                    </span>
                </el-dialog>

                <!-- 单品券下架部分 -->
                <el-dialog
                    title="删除商品"
                    :visible.sync="singleoutLineDialogVisible"
                    size="tiny">
                    <div class="txt">
                        <p>是否真的要把商品下架处理</p>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="singleoutLineDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="singleOutLineBtn">确 定</el-button>
                    </span>
                </el-dialog>

                <!-- 底部分页 -->
                <div class="footer">
                    <div class="fr">
                        <el-pagination
                            layout="prev, pager, next"
                            @current-change="SingleListCurrentChange"
                            :current-page="currentPage2"
                            :total="parseInt(singleLastPage)">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <!-- 商品列表 -->
            <el-tab-pane label="基础商品列表" name="list3">
                <div class="contentDiv">
                    <!-- 商品列表搜索部分 -->
                    <el-form label-width='100px' class="condition">
                        <el-row>
                            <el-col>
                                <el-form-item label="商品名称">
                                    <el-input v-model="goodsName" size="small"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col style="width:356px">
                                <el-form-item label="添加时间">
                                    <el-date-picker
                                        v-model="goodListStartTime"
                                        type="date"
                                        placeholder="开始日期"
                                        style="width:120px;"
                                        size="small"
                                        @change="goodStartTimeChange">
                                    </el-date-picker>
                                    ~
                                    <el-date-picker
                                        v-model="goodListEndTime"
                                        type="date"
                                        placeholder="结束日期"
                                        style="width:120px;"
                                        size="small"
                                        @change="goodEndTimeChange">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col>
                                <el-form-item label="商家名称">
                                    <el-input v-model="storeName" size="small"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col style="width:468px">
                                <el-form-item label="商品分类">
                                    <el-select v-model="level" placeholder="一级分类" @change="levelChange" size="small">
                                        <el-option
                                            v-for="item in leveles1"
                                            :key="item.gc_id"
                                            :label="item.gc_name"
                                            :value="item.gc_id"></el-option>
                                    </el-select>
                                    <el-select v-model="level2" placeholder="二级分类" @change="level2Change"
                                               size="small">
                                        <el-option
                                            v-for="item in leveles2"
                                            :key="item.gc_id"
                                            :label="item.gc_name"
                                            :value="item.gc_id"></el-option>
                                    </el-select>
                                    <el-select v-model="level3" placeholder="三级分类" @change="level3Change"
                                               size="small">
                                        <el-option
                                            v-for="item in leveles3"
                                            :key="item.gc_id"
                                            :label="item.gc_name"
                                            :value="item.gc_id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <i class="btn-search" @click="goodsSearchBtn"></i>
                            </el-col>
                        </el-row>
                    </el-form>
                    <p class="tip">目前商品列表总数共计<em style="color:#e4393c">{{goodsTotal}}</em>种，可根据条件进行详细筛选</p>
                    <!-- 商品列表表格部分 -->
                    <table>
                        <tr class="thead">
                            <th width="6%">编号</th>
                            <th align="left">商家名称</th>
                            <th align="left">商品图</th>
                            <th width="16%" align="left">名称</th>
                            <th width="10%" align="left">分类</th>
                            <th>规格</th>
                            <th>店铺价格</th>
                            <th>默认销售量</th>
                            <th>添加时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        <tr class="tbody" v-for="td,index in goodsList">
                            <td>{{td.goods_union_id}}</td>
                            <td align="left">{{td.store_name}}</td>
                            <td align="left">
                                <img :src="td.goods_image" :alt="td.goods_name" class="goodsName"
                                     @click="biggerClick(td)">
                            </td>
                            <td align="left">{{td.goods_name}}</td>
                            <td align="left">
                                <p>{{td.classify}}</p>
                            </td>
                            <td>{{td.spec_name}}</td>
                            <td>{{td.goods_costprice}}元</td>
                            <td>{{td.goods_salenum}}</td>
                            <td>
                                <p>{{td.goods_addtime}}</p>
                            </td>
                            <td>{{td.statue}}</td>
                            <td>
                                <span style="display:inline-flex;" @click="watchGoodsDetail(td)">查看</span><em
                                v-if="td.is_update">|</em>
                                <router-link :to="{path:'/goods/editGoods',query:{id:td.goods_union_id}}">
                                    <span>{{td.is_update}}</span></router-link>
                                <em v-if="td.is_delete">|</em>
                                <span @click="deleteGoods(td,index)">{{td.is_delete}}</span>
                            </td>
                        </tr>
                    </table>

                </div>
                <!-- 商品列表查看详情部分 -->
                <el-dialog
                    title="商品详情"
                    :visible.sync="goodsDialogVisible"
                    style="text-align:left;">
                    <div class="watchGoodsDetail">
                        <div>
                            <span class="fl">商品名称：</span>
                            <span class="right">{{goodsGoodsName}}</span>
                        </div>
                        <div style="height:88px;">
                            <span class="fl">商品图片：</span>
                            <div class="right img" v-for="item,index in goodsImage" style="display:inline-block;">
                                <img :src="item.abs_goods_image" :alt="goodsGoodsName"
                                     style="border:1px solid #dcdcdc;width:126px;height:80px;display:block">
                            </div>
                        </div>
                        <div>
                            <span class="fl">商品分类：</span>
                            <span class="right">{{goodsClassify}}</span>
                        </div>
                        <div>
                            <span class="fl">原价：</span>
                            <span class="right">{{goodsMarketprice}}</span>
                        </div>
                        <div>
                            <span class="fl">默认销量：</span>
                            <span class="right">{{goodsSalenum}}</span>
                        </div>
                        <div>
                            <span class="fl">规格：</span>
                            <span class="right">{{goodsSpecName}}</span>
                        </div>
                    </div>
                </el-dialog>
                <div class="footer">
                    <div class="fr">
                        <el-pagination
                            layout="prev, pager, next"
                            @current-change="GoodsListCurrentChange"
                            :current-page="currentPage3"
                            :total="parseInt(goodsLastPage)">
                        </el-pagination>
                    </div>
                </div>
            </el-tab-pane>

        </el-tabs>
        <div class="img-view">
            <div class="img-layer" v-if="showImg" @click="closeLayer"></div>
            <div class="img-img">
                <img :src="layerImg" alt="商品图片" v-if="showImg">
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import AddressSelect from '../../components/public/addressSelect5'


    export default {
        data() {
            return {
                activeName: '',
                goodsName: '',
                // 分类数组
                leveles1: [],
                level: '',
                leveles2: [],
                level2: '',
                leveles3: [],
                level3: '',
                levelId: '',
                level2Id: '',
                level3Id: '',
                // 搜索的开始结束时间
                goodListStartTime: '',
                goodListEndTime: '',
                singleListStartTime: '',
                singleListEndTime: '',
                groupListStartTime: '',
                groupListEndTime: '',

                platform: '',
                goodsType: '',
                goodsTypes: [],
                goodsGrounding: '',
                goodsGroundings: [],
                goodsSellerType: '',
                goodsSellerTypes: [],
                goodsCheck: '',
                goodsChecks: [],
                isGoodsCheck: '是',

                // 商品id
                goodsId: '',


                currentPage1: 1,
                currentPage2: 1,
                currentPage3: 1,

                // 商品
                goodsGoodsName: '',
                goodsImage: [],
                goodsClassify: '',
                goodsMarketprice: '',
                goodsSalenum: '',
                goodsSpecName: '',
                goodsDialogVisible: false,
                storeName: '',   // 商家名称


                // 单品券
                singleGoodsName: '',
                singleGoodsImages: [],
                originImagesId: [],
                newImagesId: [],
                singleGoodsImage1: '',
                singleGoodsImage2: '',
                singleGoodsImage3: '',
                singleClassify: '',
                singleGoodsMarketprice: '',
                singleGoodsPrice: '',
                singleDiscount: '',
                singleSpecName: '',
                singleGoodsInitialStorage: '',
                singleGoodsSalenum: '',
                singleGoodsStorage: '',
                singleStatus: '',
                singleStatusVal: false,
                status: '',
                storeId: '',
                singleGoodsStatus: '',
                singleCheckTime: '',
                //单品券审核
                singleDialogVisible: false,
                // 审核中的按钮
                singleCheck: '1',
                // 审核拒绝理由
                singleCheckRefuse: false,
                singleRefuseReason: '',
                // 单品券查看详情
                singleWatchDialogVisible: false,
                // 审核里面的修改库存
                reviseSingleStorage: '',
                //单品券删除
                singleDeleteDialogVisible: false,
                // 单品券下架
                singleoutLineDialogVisible: false,
                // 修改库存layer
                reviseSingleDialogVisible: false,
                // 现有单品券数量
                nowSingleInventory: '',
                // 修改后的库存
                reviseSingleNum: '',
                // 第几行
                index: '',
                singleStoreName: '',     // 单品券商家
                singleCheckStatus: '',
                // 单品券套餐券审核状态选择
                checkStatuses: [
                    {
                        label: '不限',
                        value: ''
                    },
                    {
                        label: '通过',
                        value: 1
                    },
                    {
                        label: '未通过',
                        value: -1
                    },
                    {
                        label: '审核中',
                        value: 10
                    }
                ],
                groupCheckStatus: '',
                // 套餐券
                // 套餐券详情弹框
                groupDialogVisible: false,
                groupName: '',           // 套餐名称
                groupDetailArr: [],         // 套餐内容
                groupImage: [],         // 套餐图片数组
                groupChain: '',          // 分店列表
                groupMarketprice: '',    // 套餐市场价
                groupPrice: '',          // 套餐餐餐抢价
                groupDiscount: '',       // 套餐折扣
                groupStorage: '',        // 套餐发布折扣券数量
                groupSalenum: '',        // 套餐销量
                groupOrder: '',          // 是否需要预约
                groupStartTime: '',      // 可使用时间起始时间
                groupEndTime: '',        // 可使用时间结束时间
                groupStartDate: '',      // 套餐有效期起始时间
                groupEndDate: '',        // 套餐有效期起始时间
                groupBenefit: '',        // 同时享有优惠
                groupSex: '',            // 是否有性别要求
                groupVoucher: '',        // 是否需要携带证件
                groupPeople: '',         // 默认用餐人数
                // groupCheck:'',          // 套餐检查
                groupDeleteDialogVisible: false,     //删除弹框
                type: '',                // 删除或下架的类型
                groupSelectMsg: '',      // 显示类型文字
                reviseGroupDialogVisible: false,      // 库存弹框
                nowGroupInventory: '',            // 修改库存时的现有库存
                reviseGroupNum: '',          // 修改后的库存
                groupStoreName: '',          // 套餐券搜索商家


                // 地址id
                provinceId: '',
                cityId: '',
                areaId: '',
                streetId: '',

                tuijianTxt: false,

                showImg: false,
                layerImg: '',

                // 修改套餐或单品券有效期
                startDate:'',
                endDate:'',


            }
        },
        computed:
            mapState({
                // 商品列表
                goodsList: state => state.goodsModule.goodsList,
                goodsLastPage: state => state.goodsModule.goodsLastPage,
                goodsTotal: state => state.goodsModule.goodsTotal,
                // 单品券列表
                singleItemTdes: state => state.goodsModule.singleItemTdes,
                singleLastPage: state => state.goodsModule.singleLastPage,
                goodsSingleTotal: state => state.goodsModule.goodsSingleTotal,

                // 套餐券列表
                setMealTdes: state => state.goodsModule.setMealTdes,
                groupLastPage: state => state.goodsModule.groupLastPage,
                goodsGroupTotal: state => state.goodsModule.goodsGroupTotal,


            }),
        components: {
            AddressSelect
        },
        created() {
            this.activeName = this.$session.fetch('goodsActive').activeName || 'list1'
            switch (this.activeName) {
                case 'list1':
                    let oldData1 = sessionStorage.getItem('goodsInfo1')
                    console.log(oldData1)
                    if (oldData1) {
                        let data = this.$session.fetch('goodsInfo1')
                        this.goodsName = data.goodsName || ''
                        this.storeName = data.storeName || ''
                        this.goodsGroupTotal = data.total
                        this.currentPage = data.currentPage || 1
                        let searchData = new FormData()
                        searchData.append('goods_name', this.goodsName)
                        searchData.append('store_name', this.storeName)
                        searchData.append('page', this.currentPage)
                        this.$store.dispatch('getGroupList', searchData)
                    } else {
                        // 商品列表
                        this.$store.dispatch('getGroupList')
                    }
                    break;
                case 'list2':
                    if (this.$route.query.singleGoodsName || this.$route.query.singleSellerName) {
                        this.singleGoodsName = this.$route.query.singleGoodsName || ''
                        this.storeName = this.$route.query.singleSellerName || ''
                        let data = new FormData()
                        data.append('goods_name', this.singleGoodsName)
                        data.append('store_name', this.storeName)
                        // 商品列表
                        this.$store.dispatch('getSingleList', data)
                    } else {
                        this.$store.dispatch('getSingleList')
                    }

                    break;
                case 'list3':
                    if (this.$route.query.goodsName) {
                        this.goodsName = this.$route.query.goodsName || ''
                        let data = new FormData()
                        data.append('goods_name', this.goodsName)
                        this.$store.dispatch('getGoodsList',data)
                    } else {
                         // 商品列表
                        this.$store.dispatch('getGoodsList')
                    }
                    break;
            }


            // 一级分类
            this.$httpV2({
                method: 'POST',
                url: 'Storegoods/get_next_class',
            })
                .then(res => {
                    this.leveles1 = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {
            // 导出套餐券
            groupOutExcel(){
                location.href = this.$baseUrl + 'Goods/goods_setmeal_list?goods_name='+this.goodsName+'&gc_id_1='+this.levelId+'&gc_id_2='+this.level2Id+
                            '&gc_id_3='+this.level3Id+'&store_name='+this.storeName+'&query_start_time='+this.goodListStartTime+'&query_end_time='+this.goodListEndTime+'&narea_p='+this.provinceId+'&narea_s='+this.cityId+'&narea_q='+this.areaId+'&narea_z='+this.streetId+'&goods_verify='+this.groupCheckStatus+'&is_outexcel=1'
            },
            // 导出单品券
            singleOutExcel() {
                location.href = this.$baseUrl + 'Goods/goods_single_list?goods_name='+this.goodsName+'&gc_id_1='+this.levelId+'&gc_id_2='+this.level2Id+
                            '&gc_id_3='+this.level3Id+'&store_name='+this.storeName+'&query_start_time='+this.goodListStartTime+'&query_end_time='+this.goodListEndTime+'&narea_p='+this.provinceId+'&narea_s='+this.cityId+'&narea_q='+this.areaId+'&narea_z='+this.streetId+'&goods_verify='+this.groupCheckStatus+'&is_outexcel=1'
            },

            biggerClick(val) {
                this.layerImg = val.goods_image
                this.showImg = true
            }
            ,
            closeLayer() {
                this.showImg = false
            }
            ,

            // 从地址里面选择
            listenProvince(val) {
                this.provinceId = val
            }
            ,
            listenCity(val) {
                this.cityId = val
            }
            ,
            listenArea(val) {
                this.areaId = val
            }
            ,
            listenStreet(val) {
                this.streetId = val
            }
            ,

            // 审核状态选择
            groupCheckStatusChange(val) {
                this.groupCheckStatus = val
            }
            ,
            singleCheckStatusChange(val) {
                this.singleCheckStatus = val
            }
            ,


            // 切换列表时加载对应的接口数据
            changeHandleClick(tab, e) {
                this.$session.save('goodsActive', {
                    'activeName': tab.name
                })
                this.$session.save('goodsInfo1', null)
                this.$router.replace('/goods')
                if (tab.index == 0) {
                    this.goodsName = ''
                    this.storeName = ''
                    this.goodListStartTime = ''
                    this.goodListEndTime = ''
                    this.level = ''
                    this.level2 = ''
                    this.level3 = ''
                    this.currentPage = 1
                    this.$store.dispatch('getGroupList')
                } else if (tab.index == 1) {
                    this.singleGoodsName = ''
                    this.storeName = ''
                    this.goodListStartTime = ''
                    this.goodListEndTime = ''
                    this.level = ''
                    this.level2 = ''
                    this.level3 = ''
                    this.currentPage = 1
                    this.$store.dispatch('getSingleList')

                } else {
                    this.groupName = ''
                    this.storeName = ''
                    this.goodListStartTime = ''
                    this.goodListEndTime = ''
                    this.level = ''
                    this.level2 = ''
                    this.level3 = ''
                    this.currentPage = 1
                    this.$store.dispatch('getGoodsList')

                }


            }
            ,
            // 商品列表更改页数
            GoodsListCurrentChange(val) {
                this.currentPage3 = val;
                let data = new FormData();
                data.append('goods_name', this.goodsName)
                data.append('gc_id_1', this.levelId)
                data.append('gc_id_2', this.level2Id)
                data.append('gc_id_3', this.level3Id)
                data.append('store_name', this.storeName)
                data.append('query_start_time', this.goodListStartTime)
                data.append('query_end_time', this.goodListEndTime)
                data.append('narea_p', this.provinceId)
                data.append('narea_s', this.cityId)
                data.append('narea_q', this.areaId)
                data.append('narea_z', this.streetId)
                data.append('page', this.currentPage3)
                this.$store.dispatch('getGoodsList', data)
            },
            // 单品券列表更改页数
            SingleListCurrentChange(val) {
                this.currentPage2 = val;
                let data = new FormData();
                data.append('goods_name', this.goodsName)
                data.append('gc_id_1', this.levelId)
                data.append('gc_id_2', this.level2Id)
                data.append('gc_id_3', this.level3Id)
                data.append('store_name', this.storeName)
                data.append('query_start_time', this.goodListStartTime)
                data.append('query_end_time', this.goodListEndTime)
                data.append('narea_p', this.provinceId)
                data.append('narea_s', this.cityId)
                data.append('narea_q', this.areaId)
                data.append('narea_z', this.streetId)
                data.append('goods_verify', this.singleCheckStatus)
                data.append('page', val)
                this.$store.dispatch('getSingleList', data)
            },
            // 套餐券列表更改页数
            GroupListCurrentChange(val) {
                this.currentPage1 = val;
                let data = new FormData();
                data.append('goods_name', this.goodsName)
                data.append('gc_id_1', this.levelId)
                data.append('gc_id_2', this.level2Id)
                data.append('gc_id_3', this.level3Id)
                data.append('store_name', this.storeName)
                data.append('query_start_time', this.goodListStartTime)
                data.append('query_end_time', this.goodListEndTime)
                data.append('narea_p', this.provinceId)
                data.append('narea_s', this.cityId)
                data.append('narea_q', this.areaId)
                data.append('narea_z', this.streetId)
                data.append('goods_verify', this.groupCheckStatus)
                data.append('page', this.currentPage1)
                this.$store.dispatch('getGroupList', data)
            },
            // 获取时间值
            goodStartTimeChange(value) {
                this.goodListStartTime = value
            },
            goodEndTimeChange(value) {
                this.goodListEndTime = value
            },
            singleStartTimeChange(value) {
                this.singleListStartTime = value
            },
            singleEndTimeChange(value) {
                this.singleListEndTime = value
            },
            groupStartTimeChange(value) {
                this.groupListStartTime = value
            }
            ,
            groupEndTimeChange(value) {
                this.groupListEndTime = value
            }
            ,

            // 商品列表搜索
            goodsSearchBtn() {
                let data = new FormData();
                data.append('goods_name', this.goodsName)
                data.append('gc_id_1', this.levelId)
                data.append('gc_id_2', this.level2Id)
                data.append('gc_id_3', this.level3Id)
                data.append('store_name', this.storeName)
                data.append('query_start_time', this.goodListStartTime)
                data.append('query_end_time', this.goodListEndTime)
                data.append('page', 1)
                this.$router.replace('/goods')
                this.$store.dispatch('getGoodsList', data)
            }
            ,
            // 单品券搜索
            singleSearchBtn() {
                let data = new FormData();
                data.append('goods_name', this.goodsName)
                data.append('gc_id_1', this.levelId)
                data.append('gc_id_2', this.level2Id)
                data.append('gc_id_3', this.level3Id)
                data.append('store_name', this.storeName)
                data.append('query_start_time', this.singleListStartTime)
                data.append('query_end_time', this.singleListEndTime)
                data.append('narea_p', this.provinceId)
                data.append('narea_s', this.cityId)
                data.append('narea_q', this.areaId)
                data.append('narea_z', this.streetId)
                data.append('goods_verify', this.singleCheckStatus)
                data.append('page', 1)
                this.$router.replace('/goods')
                this.$store.dispatch('getSingleList', data)
            }
            ,
            // 套餐券搜索
            groupSearchBtn() {
                let data = new FormData();
                data.append('goods_name', this.goodsName)
                data.append('gc_id_1', this.levelId)
                data.append('gc_id_2', this.level2Id)
                data.append('gc_id_3', this.level3Id)
                data.append('store_name', this.storeName)
                data.append('query_start_time', this.groupListStartTime)
                data.append('query_end_time', this.groupListEndTime)
                data.append('narea_p', this.provinceId)
                data.append('narea_s', this.cityId)
                data.append('narea_q', this.areaId)
                data.append('narea_z', this.streetId)
                data.append('goods_verify', this.groupCheckStatus)
                data.append('page', 1)

                this.$store.dispatch('getGroupList', data)
            }
            ,

            // 商品的操作
            // 查看详情
            watchGoodsDetail(val) {
                this.$httpV3({
                    method: 'post',
                    url: 'Storegoods/update_goods_info',
                    data: {
                        api_v: 'v3',
                        goods_union_id: val.goods_union_id
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.goodsGoodsName = res.data.data.goods_name,
                                this.goodsImage = res.data.data.image,
                                this.goodsClassify = res.data.data.gc_name_1 + ' > ' + res.data.data.gc_name_2 + ' > ' + res.data.data.gc_name_3,
                                this.goodsMarketprice = res.data.data.goods_costprice,
                                this.goodsSalenum = res.data.data.goods_salenum,
                                this.goodsSpecName = res.data.data.spec_name,
                                this.goodsDialogVisible = true
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
            ,
            // 删除商品
            deleteGoods(val, index) {
                this.$httpV3({
                    method: 'post',
                    url: 'Storegoods/del_goods',
                    data: {
                        api_v: 'v3',
                        goods_union_id: val.goods_union_id
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            this.goodsList.splice(index, 1)
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,

            // 单品券的操作
            // 单品券修改库存
            openAlterInventory(val) {
                console.log(val)
                this.goodsId = val.goods_id
                this.$axios({
                    method: 'post',
                    url: 'Goods/goods_single_info',
                    data: {
                        goods_id: this.goodsId,
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.singleGoodsName = res.data.data.goods_name
                            this.nowSingleInventory = res.data.data.goods_storage
                            this.startDate = val.valid_start_time
                            this.endDate = val.valid_end_time
                            this.reviseSingleDialogVisible = true
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,
            // 确定修改
            sureSingleReviseBtn() {
                this.$axios({
                    method: 'post',
                    url: 'Goods/update_goods_validity',
                    data: {
                        goods_id: this.goodsId,
                        update_num: this.reviseSingleNum,
                        valid_start_time:this.startDate,
                        valid_end_time:this.endDate
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            this.reviseSingleDialogVisible = false
                            setTimeout("location.reload()", 1600)
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,

            // 关闭详情
            closeDetail() {
                this.goodsDialogVisible = false
            }
            ,
            // 点击显示单品券详情
            openTicketDetail(val) {
//                console.log(val)
//                this.singleGoodsName = val.goods_name
//                this.singleSellerName = val.store_name
                this.goodsId = val.goods_id
                this.singleWatchDialogVisible = true
                // 单品券详情
                this.$axios({
                    method: 'post',
                    url: 'Goods/goods_single_info',
                    data: {
                        goods_id: this.goodsId
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {

                            this.singleGoodsName = res.data.data.goods_name

                            this.singleClassify = res.data.data.classify
                            this.singleGoodsMarketprice = res.data.data.goods_marketprice
                            this.singleGoodsPrice = res.data.data.goods_price
                            this.singleDiscount = res.data.data.discount
                            this.singleSpecName = res.data.data.spec_name
                            this.singleGoodsInitialStorage = res.data.data.initial_storage
                            this.singleGoodsSalenum = res.data.data.goods_salenum
                            this.singleGoodsStorage = res.data.data.goods_storage
                            this.singleStatus = res.data.data.status
                            this.singleGoodsImages = res.data.data.images
                            this.singleCheckTime = res.data.data.goods_verifytime


                            if (this.singleGoodsImages.length == 1) {
                                this.singleGoodsImage1 = this.singleGoodsImages[0][1]
                                this.originImagesId.push(this.singleGoodsImages[0][0])
                            } else if (this.singleGoodsImages.length == 2) {
                                this.singleGoodsImage1 = this.singleGoodsImages[0][1]
                                this.singleGoodsImage2 = this.singleGoodsImages[1][1]
                                this.originImagesId.push(this.singleGoodsImages[0][0])
                                this.originImagesId.push(this.singleGoodsImages[1][0])
                            } else if (this.singleGoodsImages.length == 3) {
                                this.singleGoodsImage1 = this.singleGoodsImages[0][1]
                                this.singleGoodsImage2 = this.singleGoodsImages[1][1]
                                this.singleGoodsImage3 = this.singleGoodsImages[2][1]
                                this.originImagesId.push(this.singleGoodsImages[0][0])
                                this.originImagesId.push(this.singleGoodsImages[1][0])
                                this.originImagesId.push(this.singleGoodsImages[2][0])
                            }

                            console.log(this.originImagesId)
                            console.log(this.newImagesId)


                            if (this.singleStatus == '被拒') {
                                this.singleStatusVal = true
                                this.singleRefuseReason = res.data.data.goods_verifyremark
                            }
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,
            // 点击关闭单品券详情
            closeTicketDetail() {
                this.setMealTicketDetail = false
            }
            ,

            // 更改单品券详情图片
            singleChange1(e) {

                e.preventDefault();
                let files = e.target.files;
                let data = new FormData();
                data.append('image', files[0]);
                data.append('type', 2);
                this.$upload({
                    method: 'POST',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {

                            this.singleGoodsImage1 = res.data.data.url
                            this.originImagesId.splice(0, 1)
                            this.newImagesId.push(res.data.data.id)

                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,
            singleChange2(e) {

                e.preventDefault();
                let files = e.target.files;
                let data = new FormData();
                data.append('image', files[0]);
                data.append('type', 2);
                this.$upload({
                    method: 'POST',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
//                            if (this.originImagesId.indexOf(e.path[1].children[0].attributes.id.nodeValue) != -1) {
//
//                            }
                            this.singleGoodsImage2 = res.data.data.url
                            this.originImagesId.splice(1, 1)
                            this.newImagesId.push(res.data.data.id)

                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,
            singleChange3(e) {
                e.preventDefault();
                let files = e.target.files;
                let data = new FormData();
                data.append('image', files[0]);
                data.append('type', 2);
                this.$upload({
                    method: 'POST',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.singleGoodsImage3 = res.data.data.url
                            this.originImagesId.splice(2, 1)
                            this.newImagesId.push(res.data.data.id)

                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,

            // 删除照片
            deleteImg1() {
                if (this.singleGoodsImages.length == 1) {
                    this.$message({
                        message: '单品券图片至少有一张',
                        type: 'error',
                        duration: 1600
                    })
                } else if (this.singleGoodsImages.length == 2) {
                    this.originImagesId.splice(0, 1)
                    this.singleGoodsImage1 = this.singleGoodsImage2
                    this.singleGoodsImage2 = false
                    this.singleGoodsImages.length -= 1

                } else if (this.singleGoodsImages.length >= 3) {
                    this.originImagesId.splice(0, 1)
                    this.singleGoodsImage1 = this.singleGoodsImage2
                    this.singleGoodsImage2 = this.singleGoodsImage3
                    this.singleGoodsImage3 = false
                    this.singleGoodsImages.length -= 1

                }
            }
            ,
            deleteImg2() {
                if (this.singleGoodsImages.length == 2) {
                    this.originImagesId.splice(1, 1)
                    this.singleGoodsImage2 = false
                    this.singleGoodsImages.length -= 1

                } else if (this.singleGoodsImages.length >= 3) {
                    this.originImagesId.splice(1, 1)
                    this.singleGoodsImage2 = this.singleGoodsImage3
                    this.singleGoodsImage3 = false
                    this.singleGoodsImages.length -= 1
                }
            }
            ,
            deleteImg3() {
                this.originImagesId.splice(2, 1)
                this.singleGoodsImage3 = false
                this.singleGoodsImages.length -= 1
                console.log(this.singleGoodsImages.length)
            }
            ,

            // 图片确认修改
            sureImageRevise() {
                this.$axios.post('Goods/modify_pic', {
                    goods_id: this.goodsId,
                    origin_images: JSON.stringify(this.originImagesId),
                    images: JSON.stringify(this.newImagesId)
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            this.singleWatchDialogVisible = false
                            this.$router.push({
                                path: '/goods',
                                query: {singleGoodsName: this.singleGoodsName, singleSellerName: this.singleSellerName}
                            })
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
            ,

            // 单品券审核
            // 显示数据
            singleApplicate(val) {
                this.goodsId = val.goods_id
                this.$axios({
                    method: 'post',
                    url: 'Goods/goods_single_info',
                    data: {
                        goods_id: this.goodsId
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.singleGoodsName = res.data.data.goods_name
                            this.singleGoodsImages = res.data.data.images
                            this.singleClassify = res.data.data.classify
                            this.singleGoodsMarketprice = res.data.data.goods_marketprice
                            this.singleGoodsPrice = res.data.data.goods_price
                            this.singleDiscount = res.data.data.discount
                            this.singleSpecName = res.data.data.spec_name
                            this.singleGoodsInitialStorage = res.data.data.initial_storage
                            this.singleGoodsSalenum = res.data.data.goods_salenum
                            this.singleGoodsStorage = res.data.data.goods_storage
                            this.singleGoodsStatus = res.data.data.status
                            this.singleCheck = res.data.data.goods_verify
                            this.singleCheckTime = res.data.data.goods_verifytime
                            if (this.singleCheck == -1) {
                                this.singleRefuseReason = res.data.data.goods_verifyremark
                                this.singleCheckRefuse = true
                            } else {
                                this.singleCheckRefuse = false
                                this.singleCheck = '1'
                            }
                            this.singleDialogVisible = true
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,
            // 添加拒绝理由
            addResult(val) {
                this.singleRefuseReason = val
            }
            ,
            // 审核通过与拒绝
            singleCheckChoose(index) {
                if (index == '-1') {
                    this.singleCheckRefuse = true
                    this.status = -1
                } else {
                    this.singleCheckRefuse = false
                    this.status = 1
                }
            }
            ,
            // 提交审核结果
            singleApplicateSubmit() {
                this.$axios({
                    method: 'post',
                    url: 'goods/re_online',
                    data: {
                        goods_id: this.goodsId,
                        update_num: this.singleGoodsStorage,
                        status: this.singleCheck,
                        goods_verifyremark: this.singleRefuseReason
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            this.singleDialogVisible = false
                            this.$router.push({
                                path: '/goods',
                                query: {singleGoodsName: this.singleGoodsName, singleSellerName: this.singleSellerName}
                            })
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,

            // 点击显示单品券删除窗口
            openSetMealTicketDel(val, index) {
                console.log(val)
                this.singleDeleteDialogVisible = true
                this.goodsId = val.goods_id
                this.storeId = val.store_name
                this.index = index
            }
            ,
            // 确定删除单品券
            singleDeleteBtn() {
                this.singleDeleteDialogVisible = false
                this.$httpV2({
                    method: 'post',
                    url: 'Storegoods/manage_bunding',
                    data: {
                        store_id: this.storeId,
                        goods_id: this.goodsId,
                        type: 2
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            this.singleItemTdes.splice(this.index, 1)
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,
            // 单品券下架
            openTicketSoldOut(val, index) {
                console.log(val, index)
                this.singleoutLineDialogVisible = true
                this.goodsId = val.goods_id
                this.storeId = val.store_name
                this.index = index
            }
            ,
            // 确定下架单品券
            singleOutLineBtn() {
                this.singleoutLineDialogVisible = false
                this.$httpV2({
                    method: 'post',
                    url: 'Storegoods/manage_bunding',
                    data: {
                        store_id: this.storeId,
                        goods_id: this.goodsId,
                        type: 1
                    }
                })
                    .then(res => {
                        this.$message({
                            message: res.data.message,
                            type: 'success',
                            duration: 1600
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,

            // 套餐券的操作
            // 添加推荐
            addReferee(td) {
                this.$axios.post('Goods/add_recommend', {
                    goods_id: td.goods_id
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                           setTimeout('location.reload()', 1600)
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,
            // 修改库存
            // 显示修改库存layer
            showSetMeal(val) {
                console.log(val)
                this.goodsId = val.goods_id
                this.$httpV2({
                    method: 'post',
                    url: 'Storegoods/get_ccq_detail',
                    data: {
                        goods_id: this.goodsId,
                        type: 1
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.singleGoodsName = res.data.data1.goods_name
                            this.nowGroupInventory = res.data.data1.goods_storage
                            this.startDate = val.valid_start_time
                            this.endDate = val.valid_end_time
                            this.reviseGroupDialogVisible = true
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 修改套餐券/单品券时间
            startDateChange(val) {
                this.startDate = val
            },
            endDateChange(val) {
                this.endDate = val
            },
            // 确定修改
            sureGroupReviseBtn() {
                this.$axios({
                    method: 'post',
                    url: 'Goods/update_goods_validity',
                    data: {
                        goods_id: this.goodsId,
                        update_num: this.reviseGroupNum,
                        valid_start_time:this.startDate,
                        valid_end_time:this.endDate,
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            setTimeout("location.reload()", 1600)
                            this.activeNameList = 'list3'

                            this.reviseGroupDialogVisible = false
                        }


                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,
            // 查看详情
            openGroupDetail(val) {
                this.goodsId = val.goods_id
                this.$httpV2({
                    method: 'post',
                    url: 'Storegoods/get_ccq_detail',
                    data: {
                        goods_id: this.goodsId,
                        type: 1
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.groupName = res.data.data1.goods_name                  // 套餐名称
                            this.groupDetailArr = res.data.data3                        // 套餐描述

                            this.groupImage = res.data.data2                           // 套餐照片
                            this.groupChain = res.data.data1.chain                      // 分店列表
                            this.groupMarketprice = res.data.data1.goods_marketprice    // 套餐门店价
                            this.groupPrice = res.data.data1.goods_price                // 套餐餐餐抢价
                            this.groupDiscount = res.data.data1.discount                // 套餐折扣
                            this.groupStorage = res.data.data1.goods_storage             // 套餐发布折扣券数量
                            this.groupSalenum = res.data.data1.goods_salenum             // 套餐销量

                            this.groupOrder = res.data.data1.is_order                   // 是否需要预约
                            this.groupStartTime = res.data.data1.offer_start_time       // 可使用时间起始时间
                            this.groupEndTime = res.data.data1.offer_end_time           // 可使用时间结束时间
                            this.groupStartDate = res.data.data1.valid_start_time       // 套餐有效期起始时间
                            this.groupEndDate = res.data.data1.valid_end_time           // 套餐有效期起始时间
                            this.groupBenefit = res.data.data1.benefit                  // 同时享有优惠
                            this.groupSex = res.data.data1.is_sex                       // 是否有性别要求
                            this.groupVoucher = res.data.data1.is_voucher               // 是否需要携带证件
                            this.groupPeople = res.data.data1.people                    // 默认用餐人数

                            this.groupDialogVisible = true
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,

            // 审核为跳转页面

            // 删除套餐券
            groupGoodsDelete(val, index) {
                this.goodsId = val.goods_id
                this.type = 2
                this.groupSelectMsg = '删除'
                this.groupDeleteDialogVisible = true
                this.index = index
            }
            ,
            // 套餐券下架
            openSoldOut(val, index) {
                this.goodsId = val.goods_id
                this.type = 1
                this.groupSelectMsg = '下架'
                this.groupDeleteDialogVisible = true
                this.index = index
            }
            ,
            // 确认删除或下架
            sureGroupDeleteBtn() {
                this.$httpV2({
                    method: 'post',
                    url: 'Storegoods/manage_bunding',
                    data: {
                        goods_id: this.goodsId,
                        type: this.type
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            this.setMealTdes.splice(this.index, 1)
                            this.groupDeleteDialogVisible = false
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,


            // 分类
            levelChange(val) {
                this.levelId = val
                if (val) {
                    type:''
                }
                this.$httpV2({
                    method: 'POST',
                    url: 'Storegoods/get_next_class',
                    data: {
                        gc_id: this.levelId
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.leveles2 = res.data.data
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,
            level2Change(val) {
                this.level2Id = val
                if (val) {
                    type:''
                }
                this.$httpV2({
                    method: 'POST',
                    url: 'Storegoods/get_next_class',
                    data: {
                        gc_id: this.level2Id
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.leveles3 = res.data.data
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            ,
            level3Change(val) {
                this.level3Id = val
            }
            ,

        }
        ,
        beforeRouteLeave(to, from, next) {
            this.$session.save('goodsInfo1', {
                goodsName: this.goodsName,
                storeName: this.storeName,
                currentPage: this.currentPage,
                total: this.goodsGroupTotal,
            })

            next()
        }
    }

</script>

<style scoped lang="scss">
    .contentDiv {
        border: none;
    }

    table {
        text-align: center;
    }

    table img {
        margin: 0 auto;
    }

    .goods .el-button {
        color: #bfc4fc;
        margin-right: 12px;
        background-color: transparent;
        border: none;
        font-size: 14px;
    }

    .goods i {
        display: inline-block;
        width: 30px;
        height: 18px;
        vertical-align: middle;
        background: url('../../assets/image/image-count.png') -10px -14px;
    }

    .btn-search {
        display: inline-block;
        width: 36px;
        height: 36px;
        background: url('../../assets/image/image-count.png') no-repeat -24px -53px;
        cursor: pointer;
        vertical-align: middle;
    }
    .el-dialog {
        .fl {
            line-height:30px;
        }
        .right {
            text-align:left;
            line-height:30px;
        }
    }

    .file {
        display: flex;
        position: relative;
        width: 156px;
        height: 100px;
        margin-right: 16px;
        border: 1px solid #dcdcdc;
        input[type='file'] {
            width: 150px;
            height: inherit;
        }
        img {
            width: inherit;
            height: inherit;
        }
        .el-icon-goods {
            width: inherit;
            height: inherit;
        }
        &:hover .closeIcon {
            display: block;
        }
        .closeIcon {
            display: none;
            position: absolute;
            top: -8px;
            right: -8px;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 50%;
            font-size: 20px;
            color: #fff;
            background-color: #e4393c;
            text-shadow: -2px 2px 2px #fff;
            z-index: 999;
        }

    }

    .sureRevise {
        position: absolute;
        right: 180px;
        z-index: 9999;
    }

    @media screen and (max-width: 1660px) {
        .sureRevise {
            right: 40px;
            top: 250px;
        }
    }

    .apply_btn {
        margin-top: 10px;
        padding-bottom: 8px;
        text-align: left;
        font-size: 0;
    }

    .apply_btn a {
        display: inline-block;
        width: 120px;
        height: 34px;
        line-height: 34px;
        border-radius: 5px;
        text-align: center;
        font-size: 12px;
        color: #fff;
    }

    .apply_btn a:nth-of-type(1) {
        margin-right: 16px;
        background-color: #ff9a9e;
    }

    .apply_btn a:nth-of-type(2) {
        background-color: #ffb1c0;
    }

    .tip {
        border-bottom: none;
        padding-left: 0;
    }

    .tip span {
        display: inline-block;
        height: 10px;
        line-height: 10px;
        padding-left: 10px;
        margin-right: 10px;
        color: #242424;
    }

    .tip span:nth-child(1) {
        border-left: 10px solid #ff8846;
    }

    .tip span:nth-child(2) {
        border-left: 10px solid #e4393c;
    }

    .inventory {
        label {
            width: 60px;
        }
        b {
            display: inline-block;
            width: 20px;
        }
        span {
            display: none;
            width: 80px;
            height: 30px;
            line-height: 30px;
            background-color: #ff9a9e;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            margin-left: 20px;
        }
    }

    .inventory:hover span {
        display: inline-block;
    }

    /* 商品详情 */
    .watchGoodsDetail div span {
        display: block;
        height: 44px;
    }

    .watchGoodsDetail .fl {
        width: 140px;
        text-align: right
    }

    /* 单品券详情 */
    .watchSingleDetail div span {
        display: block;
        height: 44px;
    }

    .watchSingleDetail .fl {
        width: 120px;
        text-align: right
    }

    /* 单品券审核 */
    .singleInfo div span {
        display: block;
        height: 44px;
    }

    .singleInfo .fl {
        width: 160px;
        text-align: right
    }

    .reviseGroupLayer div span {
        display: block;
        height: 44px;
    }

    .reviseGroupLayer .fl {
        width: 120px;
        text-align: right
    }

    .reviseSingleLayer div span {
        display: block;
        height: 44px;
    }

    .reviseSingleLayer .fl {
        width: 120px;
        text-align: right
    }

    .tbody img {
        display: block;
        width: 105px;
        height: 91px;
    }

    .img-view {
        .img-layer {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .6);
        }
        .img-img {
            img {
                display: block;
                position: fixed;
                top: 20%;
                left: 50%;
                margin-left: -300px;
                width: 600px;
                height: 380px;
                z-index: 99;
                border: 1px solid #dcdcdc;
            }
        }

    }

</style>
