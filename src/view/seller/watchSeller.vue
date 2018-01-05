<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/seller'}">餐餐抢商家</el-breadcrumb-item>
            <el-breadcrumb-item>查看商家</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">审核商家信息</p>
            <el-form label-width="180px">

                <el-form-item label="商家名称：">
                    <span>{{sellerName}}</span>
                </el-form-item>

                <el-form-item label="商家账号：">
                    <span>{{sellerAccount}}</span>
                </el-form-item>


                <el-form-item label="所属行业：" style="text-align:left">
                    <span>{{level1Value}}</span> <span v-if="level2Value"> > </span> <span>{{level2Value}}</span>
                </el-form-item>

                <el-form-item label="地址：">
                    <span>{{showAddress}}</span>
                </el-form-item>

                <el-form-item label="商家经度：">
                    <span>{{sellerLocationLong}}</span>
                </el-form-item>

                <el-form-item label="商家纬度：">
                    <span>{{sellerLocationLat}}</span>
                </el-form-item>


                <el-form-item label="商家法人：">
                    <span>{{sellerCorporation}}</span>
                </el-form-item>

                <el-form-item label="身份证号码：">
                    <span>{{sellerIdentity}}</span>
                </el-form-item>

                <el-form-item label="联系电话：">
                    <span>{{sellerTel}}</span>
                </el-form-item>

                <el-form-item label="服务电话：">
                    <span>{{sellerServerTel}}</span>
                </el-form-item>


                <el-form-item label="营业执照：">

                    <div class="file">
                        <img :src="LicenceImgUrl" class="avatar" alt="营业执照" @click="yingyeClick">
                    </div>
                </el-form-item>

                <el-form-item label="资质证件：">
                    <div class="file">
                        <img :src="zizhiImgUrl" class="avatar" alt="资质证件" @click="zizhiClick">
                    </div>
                </el-form-item>

                <el-form-item label="门店轮播图：">
                    <div class="file">
                        <img :src="banner1ImgUrl" class="avatar" alt="轮播图" @click="lunboClick">
                    </div>
                </el-form-item>

                <el-form-item label="商家缩略图：">
                    <div class="file">
                        <img :src="thumbImage" class="avatar" alt="商家缩略图" @click="suolueClick">
                    </div>
                </el-form-item>


                <el-form-item label="外部环境图：">
                    <div class="file">
                        <img :src="out1ImgUrl" class="avatar" alt="外部环境图" @click="waibuClick">
                    </div>
                    <div class="file">
                        <img :src="out2ImgUrl" class="avatar" alt="外部环境图" @click="waibuClick">
                    </div>
                    <div class="file">
                        <img :src="out3ImgUrl" class="avatar" alt="外部环境图" @click="waibuClick">
                    </div>
                </el-form-item>

                <el-form-item label="内部环境图：">
                    <div class="file">
                        <img :src="inside1ImgUrl" class="avatar" alt="内部环境图" @click="neibuClick">
                    </div>
                    <div class="file">
                        <img :src="inside2ImgUrl" class="avatar" alt="内部环境图" @click="neibuClick">
                    </div>
                    <div class="file">
                        <img :src="inside3ImgUrl" class="avatar" alt="内部环境图" @click="neibuClick">
                    </div>

                </el-form-item>


                <el-form-item label="推荐人：">
                    <span>{{sellerReferee}}</span>
                </el-form-item>

                <el-form-item class="btnDiv">
                    <el-button @click="resetForm()">返    回</el-button>
                </el-form-item>
            </el-form>
            <div class="img-view">
                <div class="img-layer" v-if="showImg" @click="closeLayer"></div>
                <div class="img-img">
                    <img :src="layerImg" alt="商品图片" v-if="showImg">
                </div>
            </div>
        </div>
    </div>
</template>
<script>


    export default {
        data() {
            return {
                applicateId: '',					// 商家申请id
                sellerName: '',					// 商家名称
                sellerAccount: '',				// 商家账号

                levelId: '',						// 行业选择(子传父)
                level2Id: '',

                level1Value: '',					// 行业选择(父传子)
                level2Value: '',


                provinceId: '',					// 地址id
                cityId: '',
                areaId: '',
                streetId: '',
                detail: '',


                // 显示商家地址信息
                showAddress: '',
                showProvince: '',
                showCity: '',
                showArea: '',
                showStreet: '',
                showDetail: '',

                sellerLocationLong: '',			// 商家经度
                sellerLocationLat: '',			// 商家纬度
                sellerCorporation: '',			// 商家法人
                sellerIdentity: '',				// 身份证号
                sellerTel: '',					// 商家联系电话
                sellerServerTel: '',				// 商家服务电话
                sellerReferee: '',				// 推荐人

                // 图片信息
                //
                addstoreImage1: {},				// 商家基本信息图
                addstoreImage2: {},				// 商家外部图
                addstoreImage3: {},				// 商家内部图
                addstoreImage5: {},				// 商家banner图


                LicenceImgUrl: '',				// 营业执照
                LicenceImgUrlId: '',
                zizhiImgUrl: '',					// 资质证件
                zizhiImgUrlId: '',

                banner1ImgUrl: '',				// 轮播图
                banner1ImgUrlId: '',

                thumbImage: '',					// 缩略图
                thumbImageId: '',

                out1ImgUrl: '',					// 外部环境图
                out2ImgUrl: '',
                out3ImgUrl: '',
                out1ImgUrlId: '',
                out2ImgUrlId: '',
                out3ImgUrlId: '',


                inside1ImgUrl: '',				// 内部环境图
                inside2ImgUrl: '',
                inside3ImgUrl: '',
                inside1ImgUrlId: '',
                inside2ImgUrlId: '',
                inside3ImgUrlId: '',


                showImg: false,
                layerImg: ''


            }
        },
        created() {
            // 获取编辑列表中商品id
            this.applicateId = this.$route.query.id
            // 根绝id显示商家申请信息
            this.$axios({
                method: 'post',
                url: 'store/check_store',
                data: {
                    store_id: this.applicateId
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.sellerAccount = res.data.data.seller_name										// 商家账号
                        this.sellerName = res.data.data.store_name											// 商家名称
                        this.level1Value = res.data.data.p_sc_id_name										// 所属行业
                        this.level2Value = res.data.data.sc_id_name


                        this.sellerLocationLong = res.data.data.longitude									// 商家经度
                        this.sellerLocationLat = res.data.data.latitude										// 商家纬度
                        this.sellerCorporation = res.data.data.company_master								// 商家法人
                        this.sellerIdentity = res.data.data.id_card_no										// 身份证号码
                        this.sellerTel = res.data.data.store_phone											// 联系人电话
                        this.sellerServerTel = res.data.data.live_store_tel									// 服务电话
                        this.sellerReferee = res.data.data.inviter_name										// 推荐人

                        this.showAddress = res.data.data.store_address										// 显示地区

                        this.showProvince = res.data.data.narea_p
                        this.showCity = res.data.data.narea_s
                        this.showArea = res.data.data.narea_q
                        this.showStreet = res.data.data.narea_z
                        this.showDetail = res.data.data.company_address_detail

                        this.LicenceImgUrl = res.data.data.addstore_image_03 								// 显示图片
                        this.LicenceImgUrlId = res.data.data.addstore_image_03_id
                        this.zizhiImgUrl = res.data.data.addstore_image_04
                        this.zizhiImgUrlId = res.data.data.addstore_image_04_id


                        this.banner1ImgUrl = res.data.data.banner_1
                        this.banner1ImgUrlId = res.data.data.banner_1_id

                        this.thumbImage = res.data.data.thumb_image
                        this.thumbImageId = res.data.data.thumb_image_id

                        this.out1ImgUrl = res.data.data.store_list.store_list_01
                        this.out2ImgUrl = res.data.data.store_list.store_list_02
                        this.out3ImgUrl = res.data.data.store_list.store_list_03
                        this.out1ImgUrlId = res.data.data.store_list.store_list_01_id
                        this.out2ImgUrlId = res.data.data.store_list.store_list_02_id
                        this.out3ImgUrlId = res.data.data.store_list.store_list_03_id

                        this.inside1ImgUrl = res.data.data.kitchen_list.kitchen_list_01
                        this.inside2ImgUrl = res.data.data.kitchen_list.kitchen_list_02
                        this.inside3ImgUrl = res.data.data.kitchen_list.kitchen_list_03

                        this.inside1ImgUrlId = res.data.data.kitchen_list.kitchen_list_01_id
                        this.inside2ImgUrlId = res.data.data.kitchen_list.kitchen_list_02_id
                        this.inside3ImgUrlId = res.data.data.kitchen_list.kitchen_list_03_id


                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'warning',
                            duration: 1600
                        })
                    }
                })
                .catch(err => {
                    alert('出错了')
                })
        },
        methods: {
            // 返回
            resetForm() {
                history.go(-1)
            },
            yingyeClick(e) {
                this.showImg = true
                this.layerImg = e.target.currentSrc
            },
            zizhiClick(e) {
                this.showImg = true
                this.layerImg = e.target.currentSrc
            },
            lunboClick(e) {
                this.showImg = true
                this.layerImg = e.target.currentSrc
            },
            suolueClick(e) {
                this.showImg = true
                this.layerImg = e.target.currentSrc
            },
            waibuClick(e) {
                this.showImg = true
                this.layerImg = e.target.currentSrc
            },
            neibuClick(e) {
                this.showImg = true
                this.layerImg = e.target.currentSrc
            },
            // 点击阴影
            closeLayer() {
                this.showImg = false
            }

        }
    }
</script>
<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .el-form-item {
        margin-bottom: 22px !important;
    }

    .el-form-item {
        .el-input {
            width: 200px;
            float: left;
        }

        .el-select {
            float: left;
            width: 120px;
            margin-right: 20px;
        }
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

    @import "../../assets/css/seller_part.css";
</style>
