<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/seller'}">餐餐抢商家</el-breadcrumb-item>
            <el-breadcrumb-item>添加商家</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <p class="tip">添加商家信息</p>
            <el-form label-width="180px">

                <el-form-item label="商家名称：" required>
                    <el-input v-model="sellerName" placeholder="请输入商家名称"></el-input>
                </el-form-item>

                <el-form-item label="会员账号：" required>
                    <el-input v-model="sellerAccount" placeholder="请输入商家名称"></el-input>
                </el-form-item>


                <el-form-item label="所属行业：" required style="text-align:left">
                    <industry-select
                        @listenLevel="listenLevel"
                        @listenType="listenType"></industry-select>
                </el-form-item>

                <el-form-item label="地址：" required>
                    <address-select
                        @listenProvince="listenProvince"
                        @listenCity="listenCity"
                        @listenArea="listenArea"
                        @listenStreet="listenStreet"
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
                    </div>
                </el-form-item>

                <el-form-item label="资质证件：" required>
                    <div class="el-upload-tip">支持jpg、png的图片格式，且文件小于2M</div>
                    <div class="file">
                        <img v-if="zizhiImgUrl" :src="zizhiImgUrl" class="avatar" alt="资质证件">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadZizhi">
                        <div @change="uploadZizhi">上传资质证件</div>
                    </div>
                </el-form-item>

                <el-form-item label="门店轮播图：" required>
                    <div class="file">
                        <img v-if="banner1ImgUrl" :src="banner1ImgUrl" class="avatar" alt="上传轮播图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadBanner">
                        <div @change="uploadBanner">上传轮播图</div>
                    </div>


                </el-form-item>

                <el-form-item label="列表缩略图：" required>
                    <div class="file">
                        <img v-if="list1ImgUrl" :src="list1ImgUrl" class="avatar" alt="列表缩略图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadList1">
                        <div @change="uploadList1">上传列表缩略图</div>
                    </div>
                </el-form-item>


                <el-form-item label="外部环境图：" required>
                    <div class="file">
                        <img v-if="out1ImgUrl" :src="out1ImgUrl" class="avatar" alt="外部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadOut1">
                        <div @change="uploadOut1">上传外部环境图</div>
                    </div>
                    <div class="file">
                        <img v-if="out2ImgUrl" :src="out2ImgUrl" class="avatar" alt="外部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadOut2">
                        <div @change="uploadOut2">上传外部环境图</div>
                    </div>
                    <div class="file">
                        <img v-if="out3ImgUrl" :src="out3ImgUrl" class="avatar" alt="外部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadOut3">
                        <div @change="uploadOut3">上传外部环境图</div>
                    </div>
                </el-form-item>

                <el-form-item label="内部环境图：" required>
                    <div class="file">
                        <img v-if="inside1ImgUrl" :src="inside1ImgUrl" class="avatar" alt="内部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadInside1">
                        <div @change="uploadInside1">上传内部环境图</div>
                    </div>
                    <div class="file">
                        <img v-if="inside2ImgUrl" :src="inside2ImgUrl" class="avatar" alt="内部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadInside2">
                        <div @change="uploadInside2">上传内部环境图</div>
                    </div>
                    <div class="file">
                        <img v-if="inside3ImgUrl" :src="inside3ImgUrl" class="avatar" alt="内部环境图">
                        <i v-else class="el-icon-banner"></i>
                        <input ref="files" type="file" name="avatar" @change="uploadInside3">
                        <div @change="uploadInside3">上传内部环境图</div>
                    </div>

                </el-form-item>


                <el-form-item label="推荐人：" required>
                    <el-input v-model="sellerReferee"></el-input>
                </el-form-item>


                <el-form-item class="btnDiv">
                    <el-button type="danger" @click="submitForm()">申请开店</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import IndustrySelect from '../../components/public/industry'
    import AddressSelect from '../../components/public/addressSelect'



    export default {
        data() {
            return {
                sellerName: '',					// 商家名称
                sellerAccount: '',				// 商家账号

                levelId: '',						// 行业选择(子传父)
                level2Id: '',


                provinceId: '',					// 地址id
                cityId: '',
                areaId: '',
                streetId: '',
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
                addstoreImage1: {"id1": "0", "id2": "0"},				// 商家基本信息图
                addstoreImage2: {},				// 商家外部图
                addstoreImage3: {},				// 商家内部图
                addstoreImage4: {},				// 商家列表缩略图
                addstoreImage5: {},				// 商家banner图


                LicenceImgUrl: '',				// 营业执照
                LicenceImgUrlId: '',
                zizhiImgUrl: '',					// 资质证件
                zizhiImgUrlId: '',

                banner1ImgUrl: '',				// 轮播图
                banner1ImgUrlId: '',

                list1ImgUrl: '',					// 缩略图
                list1ImgUrlId: '',

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


            }
        },
        components: {IndustrySelect, AddressSelect},


        methods: {
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
            listenCity(val) {
                this.cityId = val
            },
            listenArea(val) {
                this.areaId = val
            },
            listenStreet(val) {
                this.streetId = val
            },
            listenDetail(val) {
                this.detail = val
            },


            // 点击提交按钮
            submitForm() {
                // addstoreImage1
                this.addstoreImage1.id3 = this.LicenceImgUrlId
                this.addstoreImage1.id4 = this.zizhiImgUrlId
                // console.log(this.addstoreImage1)
                // addstoreImage2
                this.addstoreImage2.id1 = this.out1ImgUrlId
                this.addstoreImage2.id2 = this.out2ImgUrlId
                this.addstoreImage2.id3 = this.out3ImgUrlId
                // addstoreImage3
                this.addstoreImage3.id1 = this.inside1ImgUrlId
                this.addstoreImage3.id2 = this.inside2ImgUrlId
                this.addstoreImage3.id3 = this.inside3ImgUrlId
                // addstoreImage4
                this.addstoreImage4.id1 = this.list1ImgUrlId
                // addstoreImage5
                this.addstoreImage5.id1 = this.banner1ImgUrlId

                this.$axios({
                    method: 'post',
                    url: 'store/store',
                    data: {
                        store_name: this.sellerName,
                        member_name: this.sellerAccount,

                        sc_id: this.level2Id,

                        narea_p: this.provinceId,
                        narea_s: this.cityId,
                        narea_q: this.areaId,
                        narea_z: this.streetId,
                        company_address_detail: this.detail,
                        longitude: this.sellerLocationLong,
                        latitude: this.sellerLocationLat,
                        company_master: this.sellerCorporation,
                        id_card_no: this.sellerIdentity,
                        contacts_phone: this.sellerTel,
                        company_phone: this.sellerServerTel,


                        addstore_image_01: JSON.stringify(this.addstoreImage1),
                        addstore_image_02: JSON.stringify(this.addstoreImage2),
                        addstore_image_03: JSON.stringify(this.addstoreImage3),
                        addstore_image_04: JSON.stringify(this.addstoreImage4),
                        addstore_image_05: JSON.stringify(this.addstoreImage5),
                        inviter_name: this.sellerReferee
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message:res.data.message,
                                type:'success',
                                duration:1600
                            })
                        } else {
                            this.$message({
                                message:res.data.message,
                                type:'warning',
                                duration:1600
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            },
            // 上传或修改照片
            // 添加营业执照
            reviseLicence(e) {
                let _this = this
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
                        this.LicenceImgUrl = res.data.data.url
                        this.LicenceImgUrlId = res.data.data.id
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
                        this.zizhiImgUrl = res.data.data.url
                        this.zizhiImgUrlId = res.data.data.id
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
                        this.banner1ImgUrl = res.data.data.url
                        this.banner1ImgUrlId = res.data.data.id
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 列表缩略图
            uploadList1(e) {
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
                        this.list1ImgUrl = res.data.data.url
                        this.list1ImgUrlId = res.data.data.id
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
                        this.out1ImgUrl = res.data.data.url
                        this.out1ImgUrlId = res.data.data.id
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
                        this.out2ImgUrl = res.data.data.url
                        this.out2ImgUrlId = res.data.data.id
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
                        this.out3ImgUrl = res.data.data.url
                        this.out3ImgUrlId = res.data.data.id
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
                        this.inside1ImgUrl = res.data.data.url
                        this.inside1ImgUrlId = res.data.data.id
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
                        this.inside2ImgUrl = res.data.data.url
                        this.inside2ImgUrlId = res.data.data.id
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
                        this.inside3ImgUrl = res.data.data.url
                        this.inside3ImgUrlId = res.data.data.id
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },


        }
    }
</script>
<style scoped>
    .el-breadcrumb {
        line-height: 30px;
    }

    .el-form-item {
        margin-bottom: 22px !important;
    }

    .el-form-item
    .el-input {
        width: 200px;
        float: left;
    }

    .el-select {
        float: left;
        width: 120px;
        margin-right: 20px;
    }

    @import "../../assets/css/seller_part.css";
</style>
