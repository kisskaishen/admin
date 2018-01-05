<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/goods'}">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>套餐券查看</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">套餐查看</p>
            <!-- 上传照片 -->
            <div class="photoList">
                <p>套餐照片</p>
                <div v-for="item,index in groupImage">
                    <div class="file">
                        <img :src="item.abs_images" class="avatar" :title="item.abs_images" alt="商品图片"
                             style="width:246px;height:156px;display:block" @click="biggerImg(item)">
                    </div>
                </div>

            </div>
            <br/>


            <!-- 商品或商家其他信息 -->
            <div class="goodsOther">
                <el-form label-width="180px">
                    <el-form-item label="套餐名称：">
                        <span>{{goodsInfo.goods_name}}</span>
                    </el-form-item>

                    <el-form-item label="套餐详情：">
                        <table>
                            <tr v-for="item,index in groupDetail">
                                <th>{{item.name}}</th>
                                <td>
                                    <p v-for="item in item.list">{{item.goods_name}} * {{item.quantity}}</p>
                                </td>
                            </tr>
                        </table>
                    </el-form-item>

                    <el-form-item label="套餐有效期：">
                        <span>{{goodsInfo2.valid_start_time}}</span><span>~~</span><span>{{goodsInfo2.valid_end_time}}</span>
                    </el-form-item>
                    <el-form-item label="提供时间段：">
                        <span>{{goodsInfo2.offer_start_time}}</span><span>~~</span><span>{{goodsInfo2.offer_end_time}}</span>
                    </el-form-item>

                    <el-form-item label="商品和计价：">
                        <span>{{goodsInfo.goods_marketprice}}元</span>
                    </el-form-item>

                    <el-form-item label="餐餐抢价格：">
                        <span>{{goodsInfo.goods_price}}元</span>
                        <span style="margin:0 40px;">折扣{{goodsInfo2.discount}}折</span>
                        <span style="margin:0 40px;">用户节省{{goodsInfo.goods_marketprice-goodsInfo.goods_price}}元</span>
                    </el-form-item>

                    <el-form-item label="发布券数量：">
                        <span>{{goodsInfo.goods_storage}}</span><span>张</span>
                    </el-form-item>

                    <el-form-item label="默认销售量：">
                        <span>{{goodsInfo.goods_salenum}}</span>
                    </el-form-item>

                    <el-form-item label="用餐人数：">
                        <el-radio-group v-model="goodsInfo2.people">
                            <el-radio label="0">单人餐</el-radio>
                            <el-radio label="1">双人餐</el-radio>
                            <el-radio label="3">三人餐</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="是否同时享有其他优惠：">
                        <el-radio-group v-model="goodsInfo2.benefit">
                            <el-radio label="无" style="display: inline-block;vertical-align: top;">不享有</el-radio>
                            <el-radio label="有">
                                <span>其他优惠说明</span>

                                <span style="vertical-align:top;">
									<el-input v-model="goodsInfo2.benefit" v-if="goodsInfo2.benefit != '无'"
                                              style="width:180px;margin-left:20px;margin-top: -10px" disabled></el-input>
								</span>
                            </el-radio>
                        </el-radio-group>

                    </el-form-item>

                    <el-form-item label="是否限制性别：">
                        <el-radio-group v-model="goodsInfo2.is_sex">
                            <el-radio label="0">不限制</el-radio>
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="是否需要证件：">
                        <el-radio-group v-model="goodsInfo2.is_voucher">
                            <el-radio label="0">不需要</el-radio>
                            <el-radio label="1">身份证</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="是否需要预约：">
                        <el-radio-group v-model="goodsInfo2.is_order">
                            <el-radio label="0">不需要</el-radio>
                            <el-radio label="1">需要</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="套餐说明：">
                        <span>{{goodsInfo2.remark}}</span>
                    </el-form-item>

                    <el-form-item label="审核状态：">
                        <span>{{goodsInfo.goods_status_info}}</span>
                    </el-form-item>

                    <el-form-item label="被拒理由：" v-if="goodsInfo.goods_status_info == -1">
                        <span>{{goodsInfo.goods_verifyremark}}</span>
                    </el-form-item>

                    <el-form-item label="审核时间：">
                        <span v-if="goodsInfo.goods_verifytime">{{goodsInfo.goods_verifytime}}</span>
                        <span v-else>未有审核时间</span>
                    </el-form-item>

                    <div class="btnDiv">
                        <el-button type="danger" @click="goBack">返回</el-button>
                    </div>

                </el-form>
            </div>
            <div class="img-view">
                <div class="img-layer" v-if="showImg" @click="closeLayer"></div>
                <div class="img-img">
                    <img :src="layerImg" alt="套餐图" v-if="showImg">
                </div>
            </div>


        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                groupImage: [],
                // 上传图片
                goodsInfo:'',       // 套餐基本信息
                goodsInfo2:'',      // 套餐基本信息2
                goodsInfo3:'',      // 套餐基本信息2
                groupDetail: [],        // 套餐详情

                // 套餐id
                goodsId: '',


                showImg: false,
                layerImg: ''

            }

        },

        created() {
            // 根据url获取id
            this.goodsId = this.$route.query.id
            // 根据id显示内容
            this.$httpV3({
                method: 'post',
                url: 'Goods/ccq_goods',
                data: {
                    api_v:'v3',
                    goods_id: this.goodsId,
                    type: 1
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.groupImage = res.data.data.goods_image_list          // 套餐照片
                        this.goodsInfo = res.data.data.goods_info                   // 套餐基本信息
                        this.goodsInfo2 = res.data.data.goods_bunding_info          // 套餐基本信息2
                        this.goodsInfo3 = res.data.data.goods_bunding_info_new      // 套餐基本信息3
                        this.groupDetail = res.data.data.goods_bunding_group             // 套餐详情

                    } else {
                        alert(res.data.message)
                    }

                })
                .catch(err => {
                    console.log(err)
                    // alert('显示内容出错了')
                })
        },

        methods: {
            // 返回上一页
            goBack() {
                window.history.go(-1)
            },
            // 点击放大图片
            biggerImg(val) {
                this.showImg = true
                this.layerImg = val.abs_images
            },
            // 点击阴影
            closeLayer() {
                this.showImg = false
            }
        }
    }
</script>
<style scoped lang="scss">
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

    .tip {
        font-size: 15px;
        border-bottom: 1px solid #dcdcdc;
    }

    .photoList {
        height: 200px;
        padding: 12px 20px;
    }

    .photoList p {
        text-align: left;
        margin: 0 0 10px 0;
    }

    .photoList > div {
        margin-left: 20px;
    }

    table {
        width:600px;

        th {
            background-color: #fff;
            color: #000;
            width: 200px;
        }
        td {
            text-align: left;
            padding-left: 30px;
            line-height: 30px;
        }
    }

    .goodsList {
        margin: 10px;
        padding: 14px 10px;
        text-align: left;
        border: 1px solid #dcdcdc;
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
        width: 100px;
    }

    .btnDiv {
        margin-left: 200px;
    }

    .btnDiv .el-button {
        width: 100px;
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
                position: absolute;
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
