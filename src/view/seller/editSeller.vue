<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/seller'}">餐餐抢商家</el-breadcrumb-item>
            <el-breadcrumb-item>编辑商家</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">编辑商家信息</p>
            <el-form label-width="180px">

                <el-form-item label="商家名称：" required>
                    <el-input v-model="sellerName" placeholder="请输入商家名称"></el-input>
                </el-form-item>

                <el-form-item label="商家账号：" required>
                    <span>{{sellerAccount}}</span>
                </el-form-item>


                <el-form-item label="所属行业：" required style="text-align:left">
                    <industry-select
                        @listenLevel="listenLevel"
                        @listenType="listenType"
                        :level-value="level1Value"
                        :type-value="level2Value"></industry-select>
                </el-form-item>

                <el-form-item label="地址：" required>
                    <span>{{showAddress}}</span><br/>
                    <address-select
                        @listenProvince="listenProvince"
                        @listenProvinceVal="listenProvinceVal"
                        @listenCity="listenCity"
                        @listenCityVal="listenCityVal"
                        @listenArea="listenArea"
                        @listenAreaVal="listenAreaVal"
                        @listenStreet="listenStreet"
                        @listenStreetVal="listenStreetVal"
                        @listenDetail="listenDetail"></address-select>
                </el-form-item>

                <el-form-item label="商家经度：" required>
                    <el-input v-model="sellerLocationLong" placeholder="请输入经度"
                              style="width:120px;margin-right:20px;"></el-input>
                    <a href="http://lbs.amap.com/console/show/picker" target="_black"
                       style="color:#3caaf7;float:left;margin-left:20px;">查看商家经纬度</a>
                </el-form-item>

                <el-form-item label="商家纬度：" required>
                    <el-input v-model="sellerLocationLat" placeholder="请输入纬度" style="width:120px;"></el-input>
                </el-form-item>


                <el-form-item label="商家法人：" required>
                    <el-input v-model="sellerCorporation"></el-input>
                </el-form-item>

                <el-form-item label="身份证号码：" required>
                    <el-input v-model="sellerIdentity"></el-input>
                </el-form-item>

                <el-form-item label="联系电话：" required>
                    <el-input v-model="sellerTel"></el-input>
                </el-form-item>

                <el-form-item label="服务电话：" required>
                    <el-input v-model="sellerServerTel"></el-input>
                </el-form-item>


                <el-form-item label="营业执照：" required>
                    <div class="el-upload-tip">支持jpg、png的图片格式，且文件小于2M</div>
                    <div class="file">
                        <img v-if="LicenceImgUrl" :src="LicenceImgUrl" class="avatar" alt="营业执照">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="reviseLicence">
                        <div @change="reviseLicence">上传营业执照</div>
                        <span v-if="LicenceImgUrl" class="seeBig" @click="seeBig">查看大图</span>
                    </div>
                </el-form-item>

                <el-form-item label="资质证件：" required>
                    <div class="el-upload-tip">支持jpg、png的图片格式，且文件小于2M</div>
                    <div class="file">
                        <img v-if="zizhiImgUrl" :src="zizhiImgUrl" class="avatar" alt="资质证件">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadZizhi">
                        <div @change="uploadZizhi">上传资质证件</div>
                        <span v-if="zizhiImgUrl" class="seeBig" @click="seeBig">查看大图</span>
                    </div>
                </el-form-item>

                <el-form-item label="门店轮播图：" required>
                    <div class="file">
                        <img v-if="banner1ImgUrl" :src="banner1ImgUrl" class="avatar" alt="上传轮播图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadBanner">
                        <div @change="uploadBanner">上传轮播图</div>
                        <span v-if="banner1ImgUrl" class="seeBig" @click="seeBig">查看大图</span>
                    </div>
                </el-form-item>

                <el-form-item label="商家缩略图：" required>
                    <div class="file">
                        <img v-if="thumbImgUrl" :src="thumbImgUrl" class="avatar" alt="上传缩略图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadThumb">
                        <div @change="uploadThumb">上传缩略图</div>
                        <span v-if="thumbImgUrl" class="seeBig" @click="seeBig">查看大图</span>
                    </div>
                </el-form-item>


                <el-form-item label="外部环境图：" required>
                    <div class="file">
                        <img v-if="out1ImgUrl" :src="out1ImgUrl" class="avatar" alt="外部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadOut1">
                        <div @change="uploadOut1">上传外部环境图</div>
                        <span v-if="out1ImgUrl" class="seeBig" @click="seeBig">查看大图</span>
                    </div>
                    <div class="file">
                        <img v-if="out2ImgUrl" :src="out2ImgUrl" class="avatar" alt="外部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadOut2">
                        <div @change="uploadOut2">上传外部环境图</div>
                        <span v-if="out2ImgUrl" class="seeBig" @click="seeBig">查看大图</span>
                    </div>
                    <div class="file">
                        <img v-if="out3ImgUrl" :src="out3ImgUrl" class="avatar" alt="外部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadOut3">
                        <div @change="uploadOut3">上传外部环境图</div>
                        <span v-if="out3ImgUrl" class="seeBig" @click="seeBig">查看大图</span>
                    </div>
                </el-form-item>

                <el-form-item label="内部环境图：" required>
                    <div class="file">
                        <img v-if="inside1ImgUrl" :src="inside1ImgUrl" class="avatar" alt="内部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadInside1">
                        <div @change="uploadInside1">上传内部环境图</div>
                        <span v-if="inside1ImgUrl" class="seeBig" @click="seeBig">查看大图</span>
                    </div>
                    <div class="file">
                        <img v-if="inside2ImgUrl" :src="inside2ImgUrl" class="avatar" alt="内部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadInside2">
                        <div @change="uploadInside2">上传内部环境图</div>
                        <span v-if="inside2ImgUrl" class="seeBig" @click="seeBig">查看大图</span>
                    </div>
                    <div class="file">
                        <img v-if="inside3ImgUrl" :src="inside3ImgUrl" class="avatar" alt="内部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadInside3">
                        <div @change="uploadInside3">上传内部环境图</div>
                        <span v-if="inside3ImgUrl" class="seeBig" @click="seeBig">查看大图</span>
                    </div>

                </el-form-item>


                <el-form-item label="推荐人：" required>
                    <span>{{sellerReferee}}</span>
                </el-form-item>


                <el-form-item class="btnDiv">
                    <el-button @click="resetForm()">返回</el-button>
                    <el-button type="danger" @click="submitForm()">确定修改</el-button>
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
    import IndustrySelect from '../../components/public/industry'
    import AddressSelect from '../../components/public/addressSelect'


    export default {
        data() {
            return {
                storeInfo:'',                   // 商家所有信息
                storeId: '',						// 商家修改id
                sellerName: '',					// 商家名称
                sellerAccount: '',				// 商家账号

                levelId: '',						// 行业选择(子传父)
                level2Id: '',

                level1Value: '',					// 行业选择(父传子)
                level2Value: '',


                provinceId: '',                    // 地址id
                cityId: '',
                areaId: '',
                streetId: '',
                detail: '',

                provinceVal: '',                 // 地址val
                cityVal: '',
                areaVal: '',
                streetVal: '',
                detail: '',

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
                addstoreImage3: {},             // 商家内部图
                addstoreImage4: {},				// 商家内部图
                addstoreImage5: {},				// 商家banner图


                LicenceImgUrl: '',				// 营业执照
                LicenceImgUrlId: '',
                zizhiImgUrl: '',					// 资质证件
                zizhiImgUrlId: '',

                banner1ImgUrl: '',				// 轮播图
                banner1ImgUrlId: '',

                thumbImgUrl: '',					// 缩略图
                thumbImgUrlId: '',


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

                layerImg:'',         //放大图片
                showImg: false,


            }
        },
        components: {IndustrySelect, AddressSelect},
        created() {
            // 获取编辑列表中商品id
            this.storeId = this.$route.query.id
            // 根绝id显示商家申请信息
            this.$axios({
                method: 'post',
                url: 'store/check_store',
                data: {
                    store_id: this.storeId
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.storeInfo = res.data.data
                        this.sellerAccount = res.data.data.seller_name										// 商家账号
                        this.sellerName = res.data.data.store_name											// 商家名称
                        this.level1Value = res.data.data.p_sc_id_name + '(' + res.data.data.p_sc_id + ')'			// 所属行业
                        this.level2Value = res.data.data.sc_id_name + '(' + res.data.data.sc_id + ')'


                        this.sellerLocationLong = res.data.data.longitude									// 商家经度
                        this.sellerLocationLat = res.data.data.latitude										// 商家纬度
                        this.sellerCorporation = res.data.data.company_master								// 商家法人
                        this.sellerIdentity = res.data.data.id_card_no										// 身份证号码
                        this.sellerTel = res.data.data.store_phone											// 联系人电话
                        this.sellerServerTel = res.data.data.live_store_tel									// 服务电话
                        this.sellerReferee = res.data.data.inviter_name										// 推荐人

                        this.showAddress = res.data.data.store_address										// 显示地区
                        // this.showProvince = res.data.data.narea_p
                        // this.showCity = res.data.data.narea_s
                        // this.showArea = res.data.data.narea_q
                        // this.showStreet = res.data.data.narea_z
                        // this.showDetail = res.data.data.company_address_detail

                        this.LicenceImgUrl = res.data.data.addstore_image_03 								// 显示图片
                        this.LicenceImgUrlId = res.data.data.addstore_image_03_id
                        this.zizhiImgUrl = res.data.data.addstore_image_04
                        this.zizhiImgUrlId = res.data.data.addstore_image_04_id


                        this.banner1ImgUrl = res.data.data.banner_1
                        this.banner1ImgUrlId = res.data.data.banner_1_id

                        this.thumbImgUrl = res.data.data.thumb_image
                        this.thumbImgUrlId = res.data.data.thumb_image_id

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
                        this.$message.warning(res.data.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {
            // 图片放大
            seeBig(e) {
                this.showImg = true
                this.layerImg = e.path[1].children[0].currentSrc
            },
            // 点击阴影
            closeLayer() {
                this.showImg = false
            },
            // 从行业组件中获取levelId和level2Id
            listenLevel(val) {
                this.levelId = val
            },
            listenType(val) {
                this.level2Id = val
            },
            // 从地址里面选择
            listenProvince(val) {
                this.provinceId = val
            },
            listenProvinceVal(val) {
                this.provinceVal = val
            },
            listenCity(val) {
                this.cityId = val
            },
            listenCityVal(val) {
                this.cityVal = val
            },
            listenArea(val) {
                this.areaId = val
            },
            listenAreaVal(val) {
                this.areaVal = val
            },
            listenStreet(val) {
                this.streetId = val
            },
            listenStreetVal(val) {
                this.streetVal = val
            },
            listenDetail(val) {
                this.detail = val
            },
            // 审核
            checkSellerRadio(index) {
                if (index == 30) {
                    this.showRefuseReason = true
                } else {
                    this.showRefuseReason = false
                }
            },

            // 点击提交按钮(修改商家信息)
            submitForm() {
                // addstoreImage1
                this.addstoreImage1.id3 = this.LicenceImgUrlId
                this.addstoreImage1.id4 = this.zizhiImgUrlId
                // addstoreImage2
                this.addstoreImage2.id1 = this.out1ImgUrlId
                this.addstoreImage2.id2 = this.out2ImgUrlId
                this.addstoreImage2.id3 = this.out3ImgUrlId
                // addstoreImage3
                this.addstoreImage3.id1 = this.inside1ImgUrlId
                this.addstoreImage3.id2 = this.inside2ImgUrlId
                this.addstoreImage3.id3 = this.inside3ImgUrlId
                // addstoreImage4
                this.addstoreImage4.id1 = this.thumbImgUrlId
                // addstoreImage5
                this.addstoreImage5.id1 = this.banner1ImgUrlId


                if (this.provinceId == '' || this.cityId == '' || this.areaId == '' || this.streetId == '' || this.showAddress == '') {
                    this.$axios({
                        method: 'post',
                        url: 'store/update_store',
                        data: {
                            'store_id': this.storeId,
                            'store_name': this.sellerName,
                            'member_name': this.sellerAccount,

                            'sc_id': this.level2Id,
                            narea_p: this.storeInfo.narea_p_id,             // 小燕子改
                            narea_s: this.storeInfo.narea_s_id,
                            narea_q: this.storeInfo.narea_q_id,
                            narea_z: this.storeInfo.narea_z_id,
                            company_address_detail: this.showAddress,

                            'longitude': this.sellerLocationLong,
                            'latitude': this.sellerLocationLat,
                            'company_master': this.sellerCorporation,
                            'id_card_no': this.sellerIdentity,
                            'contacts_phone': this.sellerTel,
                            'company_phone': this.sellerServerTel,

                            'company_master': this.sellerReferee,

                            'addstore_image_01': JSON.stringify(this.addstoreImage1),
                            'addstore_image_02': JSON.stringify(this.addstoreImage2),
                            'addstore_image_03': JSON.stringify(this.addstoreImage3),
                            'addstore_image_04': JSON.stringify(this.addstoreImage4),
                            'addstore_image_05': JSON.stringify(this.addstoreImage5),

                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {

                                this.$notify({
                                    title: '成功',
                                    message: res.data.message,
                                    type: 'success',
                                    duration: 1600
                                })
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
                } else {
                    this.$axios({
                        method: 'post',
                        url: 'store/update_store',
                        data: {
                            'store_id': this.storeId,
                            'store_name': this.sellerName,
                            'member_name': this.sellerAccount,

                            'sc_id': this.level2Id,

                            'narea_p': this.provinceId,
                            'narea_s': this.cityId,
                            'narea_q': this.areaId,
                            'narea_z': this.streetId,
                            'company_address_detail': this.provinceVal +''+ this.cityVal +''+ this.areaVal +''+ this.streetVal +''+ this.detail,
                            'longitude': this.sellerLocationLong,
                            'latitude': this.sellerLocationLat,
                            'company_master': this.sellerCorporation,
                            'id_card_no': this.sellerIdentity,
                            'contacts_phone': this.sellerTel,
                            'company_phone': this.sellerServerTel,

                            'company_master': this.sellerReferee,

                            'addstore_image_01': JSON.stringify(this.addstoreImage1),
                            'addstore_image_02': JSON.stringify(this.addstoreImage2),
                            'addstore_image_03': JSON.stringify(this.addstoreImage3),
                            'addstore_image_04': JSON.stringify(this.addstoreImage4),
                            'addstore_image_05': JSON.stringify(this.addstoreImage5),

                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$notify({
                                    title: '成功',
                                    message: res.data.message,
                                    type: 'success',
                                    duration: 1600
                                })
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
            },
            // 返回商家列表
            resetForm() {
                history.go(-1)
            },
            // 上传或修改照片
            // 修改营业执照
            reviseLicence(e) {
                let _this = this
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 3)
                console.log(data)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.LicenceImgUrl = res.data.data.url
                            this.LicenceImgUrlId = res.data.data.id
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
            // 资质证件
            uploadZizhi(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 3)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.zizhiImgUrl = res.data.data.url
                            this.zizhiImgUrlId = res.data.data.id
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
            // 门店轮播图
            uploadBanner(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 10)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.banner1ImgUrl = res.data.data.url
                            this.banner1ImgUrlId = res.data.data.id
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
            // 缩略图
            uploadThumb(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 9)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.thumbImgUrl = res.data.data.url
                            this.thumbImgUrlId = res.data.data.id
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
            // 外部图
            uploadOut1(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 4)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.out1ImgUrl = res.data.data.url
                            this.out1ImgUrlId = res.data.data.id
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
            uploadOut2(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 4)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.out2ImgUrl = res.data.data.url
                            this.out2ImgUrlId = res.data.data.id
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
            uploadOut3(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 4)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.out3ImgUrl = res.data.data.url
                            this.out3ImgUrlId = res.data.data.id
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
            // 内部图
            uploadInside1(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 5)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.inside1ImgUrl = res.data.data.url
                            this.inside1ImgUrlId = res.data.data.id
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
            uploadInside2(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 5)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.inside2ImgUrl = res.data.data.url
                            this.inside2ImgUrlId = res.data.data.id
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
            uploadInside3(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 5)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.inside3ImgUrl = res.data.data.url
                            this.inside3ImgUrlId = res.data.data.id
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
            z-index: 9999;
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
                z-index: 9999;
                border: 1px solid #dcdcdc;
            }
        }

    }

</style>
