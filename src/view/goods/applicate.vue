<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/goods">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>申请新规格</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <el-tabs v-model="name" @tab-click="handleClick">
                <el-tab-pane label="申请新的规格" name="size">
                    <el-form label-width="180px">
                        <el-form-item label="规格:">
                            <el-input v-model="specName"></el-input>
                        </el-form-item>
                        <el-form-item label="已有规格">
                            <el-collapse style="width:200px;text-align:left">
                                <el-collapse-item title="点击显示已有规格">
                                    <ul v-for="item,index in specArr">
                                        <li>{{index + 1}}---{{item.spec_name}}</li>
                                    </ul>
                                </el-collapse-item>
                            </el-collapse>
                        </el-form-item>
                        <el-form-item>
                            <div class="btnDiv">
                                <el-button>返回</el-button>
                                <el-button type="danger" @click="addSpec">提交</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="申请新的分类" name="type">
                    <el-form label-width="180px">
                        <el-form-item label="分类名称：">
                            <el-input v-model="typeName"></el-input>
                        </el-form-item>
                        <el-form-item label="分类图片：">
                            <div class="file">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="商品图片">
                                <i v-else class="el-icon-banner"></i>
                                <input ref="files" type="file" name="avatar" @change="upload">
                                <div @change="upload">上传商品图片</div>
                            </div>
                            <span class="tipText">只有一级分类可以上传照片</span>
                        </el-form-item>
                        <el-form-item label="上级分类：">
                            <el-select v-model="typeClass" placeholder="不要改所属分类(更改下拉)" @change="classChange">
                                <el-option-group
                                    v-for="group in typeClasses"
                                    :key="group.gc_name"
                                    :label="group.gc_name+'('+group.gc_id+')'">
                                    <el-option
                                        v-for="item in typeClasses"
                                        :key="item.gc_name"
                                        :label="item.label"
                                        :value="item.gc_name+'('+item.gc_id+')'"></el-option>
                                    <el-option
                                        v-for="item in group.two"
                                        :key="item.typeClass"
                                        :label="item.label"
                                        :value="item.gc_name+'('+item.gc_id+')'"></el-option>

                                </el-option-group>
                            </el-select>
                            <span class="tipText">如果选择上级分类，那么新增的分类则为被选择上级分类的子分类</span>
                        </el-form-item>
                        <el-form-item label="排序">
                            <el-input v-model="sortValue"></el-input>
                            <span class="tipText">数字范围为0-255，数字越小越靠前</span>
                        </el-form-item>
                        <el-form-item label="已有分类">
                            <el-collapse style="width:400px;text-align:left">
                                <el-collapse-item title="点击显示已有分类">
                                    <el-cascader
                                        change-on-select
                                        :options="classifyArr"
                                        v-model="classifyModel"
                                        @change="classifyChange"
                                        placeholder="点击查看已有分类">
                                    </el-cascader>
                                    <!--   <ul v-for="group,index in classifyArr">
                                          <li @click="showTwoLevel(index)">{{group.gc_name}}
                                              <ul v-for="item,index in group.two" v-show="towLevel">
                                                  <li>
                                                      {{item.gc_name}}
                                                      <ul v-for="level3,index in item.three" v-show="threeLevel">
                                                          <li>{{level3.gc_name}}</li>
                                                      </ul>
                                                  </li>
                                              </ul>
                                          </li>
                                      </ul> -->
                                </el-collapse-item>
                            </el-collapse>
                        </el-form-item>
                        <el-form-item>
                            <div class="btnDiv">
                                <el-button>返回</el-button>
                                <el-button type="danger" @click="addClass">提交</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                name: '',
                specName: '',
                specArr: [],

                typeName: '',
                typeClasses: [],
                // 分类数据信息
                classifyArr: [],
                classifyModel: [],
                // itemes:[],
                typeClass: '',
                imageUrl: '',
                sortValue: '',
                typeId: '',				// 新增分类的id


            }
        },

        created() {
            this.name =  this.$session.fetch('applicateActive').activeName || 'size'
            // 加载页面时直接请求上级分类列表
            this.$httpV3({
                method: 'post',
                url: 'Storegoods/goods_class',
                data: {
                    api_v: 'v3'
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.typeClasses = res.data.data
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
                }),
                // 加载页面时显示商品规格列表
                this.$httpV2({
                    method: 'post',
                    url: 'Storegoods/get_package_goods_spec',
                    data: {}
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.specArr = res.data.data
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
            //
            this.$httpV3({
                method: 'post',
                url: 'Storegoods/goods_class_josn_str',
                data: {
                    api_v: 'v3',
                    type: 1
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.classifyArr = res.data.data
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
            // 切换头
            handleClick(tab,index) {
                this.$session.save('applicateActive', {
                    'activeName': tab.name
                })
            },
            // 申请新规格
            addSpec() {
                this.$axios({
                    method: 'post',
                    url: 'Goods/add_spec',
                    data: {
                        spec_name: this.specName
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$notify({
                                title:'成功',
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            this.specName = ''
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

            // 添加图片的方法
            upload(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData();
                data.append('image', files[0]);
                data.append('type', 1);
                this.$upload({
                    method: 'post',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.imageUrl = res.data.data.url
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
            // // 上级分类
            classChange(val) {
                this.$axios({
                    method: 'post',
                    url: 'Storegoods/goods_class',
                    data: {
                        api_v: 'v3'
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.typeId = val.replace(/[^0-9]/ig, '')
                            this.typeClasses = res.data.data
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
            // 申请新分类
            addClass() {
                this.$axios({
                    method: 'post',
                    url: 'Goods/add_class',
                    data: {
                        gc_name: this.typeName,
                        gc_parent_id: this.typeId,
                        gc_sort: this.sortValue
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            setTimeout('location.reload()',1600)
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
            //
            classifyChange() {

            }


        }

    }
</script>

<style scoped lang="scss">
    .el-breadcrumb {
        line-height: 30px;
    }

    .el-form-item {
        margin: 10px 0;
    }

    .el-input {
        float: left;
        width: 200px;
    }

    .el-select {
        float: left;
        width: 220px;
    }

    .tipText {
        margin-left: 20px;
        color: #999;
    }


</style>
