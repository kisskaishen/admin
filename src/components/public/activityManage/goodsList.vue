<template>
    <div>
        <div class="contentDiv">
            <div class="title">第一步：<span @click="toGoods" style="cursor: pointer;color: #2f69b8;">去商品管理添加活动商品</span>
            </div>
            <div class="title">第二步：对商品进行排序 <span class="error">（倒序排序（1-99），数字越大越排在前面）</span></div>
            <table>
                <tr class="thead">
                    <th width="80px">排序</th>
                    <th width="160px">商品图片</th>
                    <th>商品分类</th>
                    <th width="120px">商品价格</th>
                    <th width="120px">餐餐抢价格</th>
                    <th>时间</th>
                    <th width="120px">操作</th>
                </tr>
                <tr v-for="item in list">
                    <td>
                        <div class="sortClass">
                            <div>{{item.recommend_sort}}</div>
                            <el-input v-model="sortNum" size="mini" @change="numChange(item)"
                                      @blur="sortChange(item)"></el-input>
                        </div>
                    </td>
                    <td><img :src="item.goods_image" :alt="item.goods_name"></td>
                    <td>
                        <p>{{item.classify}}</p>
                        <p>{{item.goods_name}}</p>
                    </td>
                    <td>{{item.goods_marketprice}}元</td>
                    <td>{{item.goods_price}}元</td>
                    <td>{{item.recommend_time}}</td>
                    <td>
                        <el-button type="danger" size="small" @click="deleteBtn(item)">删除</el-button>
                    </td>
                </tr>
            </table>
            <div>
                <el-button type="danger" @click="sortSubmit" style="margin-top: 20px;float: left" v-if="this.list.length != 0">提交修改排序</el-button>
            </div>
            <div class="footer">
                <el-pagination
                    layout="prev, pager, next"
                    @current-change="changePage"
                    :total="parseInt(lastPage)">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                lastPage: '',
                sortNum: '',
            }
        },
        created() {
            this.$axios.post('Activity/recommend_list')
                .then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data.list
                        this.lastPage = res.data.data.last_page * 10
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
            numChange(val) {
                val.recommend_sort = this.sortNum
            },
            // 翻页操作
            changePage(val) {
                this.$axios.post('Activity/recommend_list', {
                    page: val
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            console.log(res.data.data)
                            this.list = res.data.data.list
                            this.lastPage = res.data.data.last_page * 10
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
            // toGoods去商品管理列表
            toGoods() {
                this.$router.push({path: '/goods'})
            },
            // 更改排序
            sortChange(val) {
                this.$axios.post('Activity/update_recommend_sort', {
                    goods_id: val.goods_id,
                    sort_num: this.sortNum
                })
                    .then(res => {
                        console.log(res.data)
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            location.reload()
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'warning',
                                duration: 1600
                            })
                        }
                        this.sortNum = ''
                    })
                    .catch(err => {

                    })
            },
            // 删除推荐商品
            deleteBtn(val) {
                this.$axios.post('Activity/del_recommend', {
                    goods_id: val.goods_id
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
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
            },
            // 提交修改排序
            sortSubmit() {
                location.reload()
            }
        }
    }
</script>
<style lang="scss" scoped>
    .contentDiv {
        margin: 0 30px;
        .title {
            height: 40px;
            line-height: 40px;
            text-align: left;
            margin: 0;
        }
        table {
            tr {
                img {
                    display: block;
                    width: 105px;
                    height: 91px;
                    margin: 0 auto
                }

                .sortClass {
                    .el-input {
                        display: none;
                        width: 40px;
                        height: 80px;
                        text-align: center;
                        margin: 0 auto;
                    }
                }
                .sortClass:hover {
                    .el-input {
                        display: block;
                        height: 26px;
                    }

                }
            }
        }
        .footer {
            text-align: right;
        }

    }
</style>
