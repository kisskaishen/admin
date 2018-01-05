<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/goods'}">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>套餐券审核</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">套餐券审核</p>
            <div class="photoList">
                <p>套餐照片(可修改)</p>
                <div class="needAddImg" v-if="groupImageLength == 0">
                    <div class="file">
                        <img v-if="groupImage1" :src="groupImage1" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage">
                        <div v-if="groupImage1" @change="reviseImage1">修改商品图片</div>
                        <div v-else @change="reviseImage1">添加商品图片</div>
                    </div>

                    <div class="file">
                        <img v-if="groupImage2" :src="groupImage2" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage2">
                        <div v-if="groupImage2" @change="reviseImage2">修改商品图片</div>
                        <div v-else @change="reviseImage2">添加商品图片</div>
                    </div>
                    <div class="file">
                        <img v-if="groupImage3" :src="groupImage3" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage3">
                        <div v-if="groupImage3" @change="reviseImage3">修改商品图片</div>
                        <div v-else @change="reviseImage3">添加商品图片</div>
                    </div>
                </div>
                <div class="needAddImg" v-if="groupImageLength == 1">
                    <div class="file">
                        <img v-if="groupImage1" :src="groupImage1" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage">
                        <div @change="reviseImage">修改商品图片</div>
                        <span class="error" @click="seeBig" v-if="seeBig1">查看大图</span>
                    </div>

                    <div class="file">
                        <img v-if="groupImage2" :src="groupImage2" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage2">
                        <div v-if="groupImage2" @change="reviseImage2">修改商品图片</div>
                        <div v-else @change="reviseImage2">添加商品图片</div>
                    </div>
                    <div class="file">
                        <img v-if="groupImage3" :src="groupImage3" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage3">
                        <div v-if="groupImage3" @change="reviseImage3">修改商品图片</div>
                        <div v-else @change="reviseImage3">添加商品图片</div>
                    </div>
                </div>
                <div class="needAddImg" v-if="groupImageLength == 2">
                    <div class="file">
                        <img v-if="groupImage1" :src="groupImage1" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage">
                        <div @change="reviseImage">修改商品图片</div>
                        <i v-if="groupImage1" class="closeIcon" @click="deleteImg1">×</i>
                        <span class="error" @click="seeBig" v-if="seeBig1">查看大图</span>
                    </div>

                    <div class="file">
                        <img v-if="groupImage2" :src="groupImage2" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage2">
                        <div v-if="groupImage2" @change="reviseImage2">修改商品图片</div>
                        <div v-else @change="reviseImage2">添加商品图片</div>
                        <i v-if="groupImage2" class="closeIcon" @click="deleteImg2">×</i>
                        <span class="error" @click="seeBig" v-if="seeBig2">查看大图</span>
                    </div>

                    <div class="file">
                        <img v-if="groupImage3" :src="groupImage3" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage3">
                        <div v-if="groupImage3" @change="reviseImage2">修改商品图片</div>
                        <div v-else @change="reviseImage3">添加商品图片</div>
                    </div>
                </div>
                <div class="needAddImg" v-if="groupImageLength >= 3">
                    <div class="file">
                        <img v-if="groupImage1" :src="groupImage1" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage">
                        <div @change="reviseImage">修改商品图片</div>
                        <i v-if="groupImage1" class="closeIcon" @click="deleteImg1">×</i>
                        <span class="error" @click="seeBig" v-if="seeBig1">查看大图</span>
                    </div>

                    <div class="file">
                        <img v-if="groupImage2" :src="groupImage2" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage2">
                        <div v-if="groupImage2" @change="reviseImage2">修改商品图片</div>
                        <div v-else @change="reviseImage2">添加商品图片</div>
                        <i v-if="groupImage2" class="closeIcon" @click="deleteImg2">×</i>
                        <span class="error" @click="seeBig" v-if="seeBig2">查看大图</span>
                    </div>

                    <div class="file">
                        <img v-if="groupImage3" :src="groupImage3" class="avatar" alt="商品图片">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseImage3">
                        <div v-if="groupImage3" @change="reviseImage2">修改商品图片</div>
                        <div v-else @change="reviseImage3">添加商品图片</div>
                        <i v-if="groupImage3" class="closeIcon" @click="deleteImg3">×</i>
                        <span class="error" @click="seeBig" v-if="seeBig3">查看大图</span>
                    </div>
                </div>


            </div>

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
                        <el-input v-model="ccqPrice" size="small" @change="showOther"></el-input>
                        <span style="margin:0 10px">元</span>
                        <span style="margin:0 40px;">折扣{{discount}}折</span>
                        <span style="margin:0 40px;">用户节省{{savePrice}}元</span>
                    </el-form-item>

                    <el-form-item label="发布券数量：">
                        <el-input v-model="ccqTicketNum" size="small"></el-input>
                        <span style="margin:0 10px">张</span>
                    </el-form-item>

                    <el-form-item label="默认销售量：">
                        <el-input v-model="goodsNum" size="small"></el-input>
                        <span style="margin:0 10px">张</span>
                    </el-form-item>

                    <el-form-item label="用餐人数：">
                        <el-radio-group v-model="people" @change="peopleChange">
                            <el-radio label="0">单人餐</el-radio>
                            <el-radio label="1">双人餐</el-radio>
                            <el-radio label="3">三人餐</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="是否同时享有其他优惠：">
                        <el-radio-group v-model="favRadio" @change="couponChange">
                            <el-radio label="无" style="display: inline-block;vertical-align: top;">不享有</el-radio>
                            <el-radio label="有">
                                <span>其他优惠说明</span>
                                <span style="vertical-align:top;">
									<el-input v-model="otherCoupon" v-show="couponShow" @change="favRadioValueChange"
                                              placeholder="请填写其他优惠说明"
                                              style="width:180px;margin-left:20px;margin-top: -10px"></el-input>
								</span>

                            </el-radio>
                        </el-radio-group>

                    </el-form-item>

                    <el-form-item label="是否限制性别：" @change="sexChange">
                        <el-radio-group v-model="sexRadio">
                            <el-radio label="0">不限制</el-radio>
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="是否需要证件：" @change="certificateChange">
                        <el-radio-group v-model="certificateRadio">
                            <el-radio label="0">不需要</el-radio>
                            <el-radio label="1">身份证</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="是否需要预约：" @change="orderChange">
                        <el-radio-group v-model="orderRadio">
                            <el-radio label="0">不需要</el-radio>
                            <el-radio label="1">需要</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="套餐说明：">
                        <el-input type="textarea" v-model="remark" style="width:400px;float:left"></el-input>
                    </el-form-item>

                    <el-form-item label="审核：">
                        <el-radio-group v-model="groupCheck" @change="checkGroupRadio">
                            <el-radio label="1">通过</el-radio>
                            <el-radio label="-1">不通过</el-radio>
                        </el-radio-group>
                        <br/>
                        <el-input type="textarea" v-model="refuseReason" v-if="checkGroupShow"
                                  style="width:400px;;float:left" placeholder="请填写不通过理由"></el-input>
                    </el-form-item>

                    <el-form-item label="审核时间：">
                        <span v-if="goodsInfo.goods_verifytime">{{goodsInfo.goods_verifytime}}</span>
                        <span v-else>未有审核时间</span>
                    </el-form-item>

                    <div class="btnDiv">
                        <el-button type="danger" @click="checkGroupBtn">确定</el-button>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="img-view">
            <div class="img-layer" v-if="showImg" @click="closeLayer"></div>
            <div class="img-img">
                <img :src="layerImg" alt="套餐图" v-if="showImg">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                groupImage: [],
                groupImage1: '',
                groupImage2: '',
                groupImage3: '',
                groupImageLength: '',            // 已显示图片的个数
                // 上传图片
                reviseImageUrl: '',
                reviseImage2Url: '',
                reviseImage3Url: '',
                reviseImageUrlIdArr: [],
                // 老的图片id
                originImagesArr: [],

                goodsInfo: '',
                goodsInfo2: '',
                goodsInfo3: '',
                // 选择不同列表数组
                groupDetail: [],

                discount: '',
                savePrice: '',
                people: '0',
                favRadio: '无',
                favRadioValue: '无',
                sexRadio: '0',
                certificateRadio: '0',
                orderRadio: '0',
                checkGroupShow: false,
                refuseReason: '',
                groupCheck: '1',
                ccqPrice: '',
                ccqTicketNum: '',
                goodsNum: '',
                remark: '',
                otherCoupon: '',
                couponShow: false,
                show: false,

                // 套餐id
                goodsId: '',

                // 图片id数组
                groupImageArr: [],

                showImg: false,
                layerImg: '',

                seeBig1: false,
                seeBig2: false,
                seeBig3: false,

            }

        },

        created() {
            this.goodsId = this.$route.query.id
            // 根据id显示内容
            this.$httpV3({
                method: 'post',
                url: 'Goods/ccq_goods',
                data: {
                    api_v: 'v3',
                    goods_id: this.goodsId,
                    type: 1
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.goodsInfo = res.data.data.goods_info                   // 套餐基本信息
                        this.goodsInfo2 = res.data.data.goods_bunding_info          // 套餐基本信息2
                        this.goodsInfo3 = res.data.data.goods_bunding_info_new      // 套餐基本信息3
                        this.groupDetail = res.data.data.goods_bunding_group             // 套餐详情

                        this.ccqPrice = res.data.data.goods_info.goods_price
                        this.discount = res.data.data.goods_bunding_info.discount
                        this.savePrice = res.data.data.goods_info.goods_marketprice - res.data.data.goods_info.goods_price
                        this.ccqTicketNum = res.data.data.goods_info.goods_storage
                        this.goodsNum = res.data.data.goods_info.goods_salenum

                        this.people = res.data.data.goods_bunding_info.people
                        if (res.data.data.goods_bunding_info.benefit == '无') {
                            this.favRadio = res.data.data.goods_bunding_info.benefit
                        } else {
                            this.favRadio = '有'
                            this.otherCoupon = res.data.data.goods_bunding_info.benefit
                            this.favRadioValue = res.data.data.goods_bunding_info.benefit
                        }
                        this.sexRadio = res.data.data.goods_bunding_info.is_sex

                        this.certificateRadio = res.data.data.goods_bunding_info.is_voucher
                        this.orderRadio = res.data.data.goods_bunding_info.is_order


                        this.remark = res.data.data.goods_bunding_info.remark

                        this.groupCheck = res.data.data.goods_info.goods_verify
                        if (this.groupCheck == -1) {
                            this.checkGroupShow = true
                            this.refuseReason = res.data.data.goods_info.goods_verifyremark
                        } else {
                            this.checkGroupShow = false
                            this.refuseReason = ''
                        }

                        this.groupImageLength = res.data.data.goods_image_list.length
                        if (this.groupImageLength == 0) {

                        } else if (this.groupImageLength == 1) {
                            this.groupImage1 = res.data.data.goods_image_list[0].abs_images
                            this.originImagesArr.push(res.data.data.goods_image_list[0].store_image_id)
                            this.seeBig1 = true
                        } else if (this.groupImageLength == 2) {
                            this.groupImage1 = res.data.data.goods_image_list[0].abs_images
                            this.originImagesArr.push(res.data.data.goods_image_list[0].store_image_id)
                            this.groupImage2 = res.data.data.goods_image_list[1].abs_images
                            this.originImagesArr.push(res.data.data.goods_image_list[1].store_image_id)
                            this.seeBig1 = true
                            this.seeBig2 = true
                        } else if (this.groupImageLength >= 3) {
                            this.groupImage1 = res.data.data.goods_image_list[0].abs_images
                            this.originImagesArr.push(res.data.data.goods_image_list[0].store_image_id)
                            this.groupImage2 = res.data.data.goods_image_list[1].abs_images
                            this.originImagesArr.push(res.data.data.goods_image_list[1].store_image_id)
                            this.groupImage3 = res.data.data.goods_image_list[2].abs_images
                            this.originImagesArr.push(res.data.data.goods_image_list[2].store_image_id)
                            this.seeBig1 = true
                            this.seeBig2 = true
                            this.seeBig3 = true
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
        },

        methods: {

            // 点击放大图片
            seeBig(e) {
                this.showImg = true
                this.layerImg = e.path[1].children[0].currentSrc
            },
            // 点击阴影
            closeLayer() {
                this.showImg = false
            },

            // 删除套餐图片
            deleteImg1() {

                if (this.originImagesArr.length == 1) {
                    this.$message({
                        message: '套餐券图片至少为一张',
                        type: 'error',
                        duration: 1600
                    })
                    this.groupImage1 = this.groupImage1
                } else {
                    this.originImagesArr.splice(0, 1)
                    if (this.originImagesArr.length == 1) {
                        this.groupImage1 = this.groupImage2
                        this.groupImage2 = false
                        this.seeBig2 = false
                        this.groupImageLength -= 1
                    } else if (this.originImagesArr.length == 2) {
                        this.groupImage1 = this.groupImage2
                        this.groupImage2 = this.groupImage3
                        this.groupImage3 = false
                        this.groupImageLength -= 1
                    }


                }

            },
            deleteImg2() {
                this.originImagesArr.splice(1, 1)
                if (this.originImagesArr.length == 1) {
                    this.groupImage2 = false
                    this.seeBig2 = false
                } else if (this.originImagesArr.length == 2) {
                    this.groupImage2 = this.groupImage3
                    this.groupImage3 = false
                    this.seeBig3 = false
                }
            },
            deleteImg3() {
                this.originImagesArr.splice(2, 1)
                this.groupImage3 = false
                this.seeBig3 = false
            },

            // 其他优惠说明的修改
            favRadioValueChange(val) {
                this.favRadioValue = val
            },

            // 修改上传图片
            // 上传图片方法
            reviseImage(e) {
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
                            this.groupImage1 = res.data.data.url
                            this.reviseImageUrlIdArr.push(res.data.data.id)
                            this.originImagesArr.splice(0, 1)
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

            reviseImage1(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 2)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        this.groupImage1 = res.data.data.url
                        this.reviseImageUrlIdArr.push(res.data.data.id)
                        this.originImagesArr.splice(0, 1)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            reviseImage2(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 2)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        this.groupImage2 = res.data.data.url
                        this.reviseImageUrlIdArr.push(res.data.data.id)
                        this.originImagesArr.splice(1, 1)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },

            reviseImage3(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 2)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        this.groupImage3 = res.data.data.url
                        this.reviseImageUrlIdArr.push(res.data.data.id)
                        this.originImagesArr[2] = ''
                        this.originImagesArr.splice(2, 1)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 价格计算
            showOther() {
                this.discount = ((parseFloat(this.ccqPrice) / parseFloat(this.originPrice)) * 10).toFixed(2)
                this.savePrice = this.originPrice - this.ccqPrice
            },
            // 用餐人数
            peopleChange(index) {
                this.people = index
            },
            // 优惠券
            couponChange(index) {
                if (index == '无') {
                    this.couponShow = false
                    this.favRadioValue = '无'
                } else {
                    this.couponShow = true
                    this.favRadioValue = this.otherCoupon
                }
            },
            // 性别
            sexChange(index) {
                this.sexRadio = index
            },
            // 证件
            certificateChange(index) {
                this.certificateRadio = index
            },
            // 预约
            orderChange(index) {
                this.orderRadio = index
            },
            // 审核选择
            checkGroupRadio(index) {
                if (index == 1) {
                    this.checkGroupShow = false
                } else {
                    this.checkGroupShow = true
                }
            },

            // 审核套餐券
            checkGroupBtn() {
                this.$axios({
                    method: 'post',
                    url: 'Goods/update_setmeal',
                    data: {
                        goods_id: this.goodsId,					// 商品id
                        images: JSON.stringify(this.reviseImageUrlIdArr),			// 修改的商品图片
                        origin_images: JSON.stringify(this.originImagesArr),		// 未修改照片
                        goods_name: this.goodsInfo.goods_name,				// 套餐名称
                        goods_marketprice: this.goodsInfo.goods_marketprice,     // 门店销售价
                        goods_costprice: this.ccqPrice,		// 餐餐抢价
                        people: this.people,						// 用餐人数
                        goods_storage: this.ccqTicketNum,        // 套餐券数量
                        goods_salenum: this.goodsNum,            // 默认销售量

                        discount: this.discount,                 // 折扣
                        benefit: this.favRadioValue,					// 同时享有优惠
                        is_order: this.orderRadio,				// 是否需要预约
                        is_sex: this.sexRadio,					// 是否需要性别
                        is_voucher: this.certificateRadio,		// 是否需要证件
                        remark: this.remark, 						// 套餐描述
                        goods_verify: this.groupCheck,			// 审核
                        goods_verifyremark: this.refuseReason,	// 拒绝理由
                        is_examine: this.$route.query.is_examine || ''
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            setTimeout(this.$router.push('/goods'), 1600)
//                            location.reload()
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


        }
    }
</script>
<style scoped lang="scss">
    .closeIcon {
        position: absolute;
        display: none;
        top: -10px;
        right: 0px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 24px;
        color: #fff;
        text-shadow: -2px 1px 3px #fff;
        text-align: center;
        background-color: #e4393c;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        z-index: 99;
    }

    .file:hover .closeIcon {
        display: block;
    }

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

    .photoList .el-upload {
        float: left !important;
    }

    .photoList .el-button {
        margin-top: 10px;
    }

    table {
        width: 600px;

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
        margin: 20px 0 0 10px;
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

    .error {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 99
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
                z-index: 999;
                border: 1px solid #dcdcdc;
            }
        }

    }
</style>
