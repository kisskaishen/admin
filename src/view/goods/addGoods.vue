<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/goods'}">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">

            <div class="goodsOther">
                <!-- :model="ruleForm" :rules="rules" ref="ruleForm" -->
                <el-form label-width="180px" encType="enctype">
                    <el-form-item label="商品名称：" required>
                        <el-input v-model="goodsName"></el-input>
                    </el-form-item>

                    <el-form-item label="商品照片：" required>
                        <p style="color:#e4393c;text-align:left;">(商品图至少一张，最多三张) </p>
                        <div class="file">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="商品图片1">
                            <i v-else class="el-icon-banner"></i>
                            <input ref="files" type="file" name="avatar" @change="upload">
                            <div @change="upload1">上传商品图片1</div>
                        </div>
                        <div class="file">
                            <img v-if="imageUrl2" :src="imageUrl2" class="avatar" alt="商品图片2">
                            <i v-else class="el-icon-banner"></i>
                            <input ref="files" type="file" name="avatar" @change="upload2">
                            <div @change="upload2">上传商品图片2</div>
                        </div>
                        <div class="file">
                            <img v-if="imageUrl3" :src="imageUrl3" class="avatar" alt="商品图片3">
                            <i v-else class="el-icon-banner"></i>
                            <input ref="files" type="file" name="avatar" @change="upload3">
                            <div @change="upload3">上传商品图片3</div>
                        </div>

                    </el-form-item>

                    <el-form-item label="分类选择：" required>
                        <el-row>
                            <el-col style="width:180px;margin-right:20px">
                                <el-select v-model="level" placeholder="请选择" @change="levelChange">
                                    <el-option
                                        v-for="item in leveles1"
                                        :key="item.gc_id"
                                        :label="item.gc_name"
                                        :value="item.gc_id"></el-option>
                                </el-select>
                            </el-col>
                            <el-col style="width:180px;margin-right:20px">
                                <el-select v-model="level2" placeholder="请选择" @change="level2Change">
                                    <el-option
                                        v-for="item in leveles2"
                                        :key="item.gc_id"
                                        :label="item.gc_name"
                                        :value="item.gc_id"></el-option>
                                </el-select>
                            </el-col>
                            <el-col style="width:180px;margin-right:20px">
                                <el-select v-model="level3" placeholder="请选择" @change="level3Change">
                                    <el-option
                                        v-for="item in leveles3"
                                        :key="item.gc_id"
                                        :label="item.gc_name"
                                        :value="item.gc_id"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item label="原价：" required>
                        <el-input v-model="price" placeholder="不能为空"></el-input>
                    </el-form-item>

                    <el-form-item label="默认销量：">
                        <el-input v-model="saleNum"></el-input>
                    </el-form-item>

                    <el-form-item label="规格：">
                        <el-select v-model="guige" placeholder="请选择规格" style="float:left;width:140px;"
                                   @change="changeGuige">
                            <el-option
                                v-for="item in guigeList"
                                :key="item.spec_id"
                                :label="item.spec_name"
                                :value="item.spec_id"></el-option>
                        </el-select>

                    </el-form-item>

                    <div class="btnDiv">
                        <el-button>返回</el-button>
                        <el-button type="danger" @click="addGoodHandler">放入仓库</el-button>
                    </div>

                </el-form>
            </div>


        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                imageArr: [],
                imageUrl: '',
                imageUrl2: '',
                imageUrl3: '',
                imageUrlId: '',
                imageUrl2Id: '',
                imageUrl3Id: '',

                goodsName: '',
                leveles1: [],
                level: '',
                leveles2: [],
                level2: '',
                leveles3: [],
                level3: '',
                price: '',
                saleNum: '100',

                storeId: '',
                guigeList: '',		// 规格
                guige: '',
                guigeId: '',


                levelId: '',
                level2Id: '',
                level3Id: '',

            }

        },
        created() {
            // 获取商家id
            this.storeId = this.$route.query.id
            // 规格遍历
            this.$httpV2({
                method: 'post',
                url: 'Storegoods/get_package_goods_spec',
                data: {}
            })
                .then(res => {
                    this.guigeList = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {

            // 上传图片方法
            upload(e) {
                e.preventDefault();
                var files = e.target.files;
                var data = new FormData();
                data.append('image', files[0]);
                data.append('type', 1);

                this.$upload({
                    method: 'POST',
                    url: '',
                    data: data
                })
                    .then(res => {
                        this.imageUrl = res.data.data.url
                        this.imageUrlId = res.data.data.id
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            upload2(e) {
                e.preventDefault();
                var files = e.target.files;
                var data = new FormData();
                data.append('image', files[0]);
                data.append('type', 1);

                this.$upload({
                    method: 'POST',
                    url: '',
                    data: data
                })
                    .then(res => {
                        this.imageUrl2 = res.data.data.url
                        this.imageUrl2Id = res.data.data.id

                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            upload3(e) {
                e.preventDefault();
                var files = e.target.files;
                var data = new FormData();
                data.append('image', files[0]);
                data.append('type', 1);

                this.$upload({
                    method: 'POST',
                    url: '',
                    data: data
                })
                    .then(res => {
                        this.imageUrl3 = res.data.data.url
                        this.imageUrl3Id = res.data.data.id
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 分类选择
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
                        console.log(res.data)
                        this.leveles2 = res.data.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
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
                        this.leveles3 = res.data.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            level3Change(val) {
                this.level3Id = val
            },
            // 规格选择
            changeGuige(val) {
                this.guigeId = val.replace(/[^0-9]/ig, '')
            },
            // 放入仓库
            addGoodHandler() {
                // var formData = new FormData();
                this.imageArr.push(this.imageUrlId)
                this.imageArr.push(this.imageUrl2Id)
                this.imageArr.push(this.imageUrl3Id)

                this.$httpV2({
                    method: 'POST',
                    url: 'Storegoods/add_package_goods',
                    data: {
                        store_id: this.storeId,
                        goods_name: this.goodsName,
                        gc_id_1: this.levelId,
                        gc_id_2: this.level2Id,
                        gc_id_3: this.level3Id,
                        goods_images: JSON.stringify(this.imageArr),
                        goods_costprice: this.price,
                        goods_salenum: this.saleNum,
                        spec_id: this.guigeId,
                    }
                })
                    .then(res => {
                        if (this.goodsName != '' && this.imageArr != '' && this.price != '') {
                            if (res.data.code == 200) {
                                alert('提交成功')
                                this.$router.push('/seller')
                            } else {
                                alert('提交失败')
                            }
                        } else {
                            alert('请填写必填项')
                        }

                    })
                    .catch(err => {
                        alert('提交失败')
                    })
            }

        },
        beforeMount() {
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
        }
    }
</script>
<style scoped>
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

    .el-form-item {
        margin: 12px 0;
    }

    .tip {
        font-size: 15px;
        border-bottom: 1px solid #dcdcdc;
    }

    .photoList {
        height: 166px;
        padding: 8px;
    }

    .photoList p {
        text-align: left;
    }

    .el-upload {
        float: left !important;
    }

    .el-icon-banner {
        width: 244px;
        height: 160px;
        background: url('../../assets/image/shenfenzheng.png') no-repeat;
    }

    .goodsList {
        margin: 0 10px;
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
        width: 200px;
    }

    .btnDiv {
        margin-left: 200px;
    }

    .btnDiv .el-button {
        width: 100px;
    }
</style>
