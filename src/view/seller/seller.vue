<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>餐餐抢商家</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <div class="sellerInfo">
                <router-link to="/seller/SellerIn" class="fl">
                    <el-button size="small" style="color:#e4393c;">前往商家入驻申请列表</el-button>
                </router-link>
                <router-link to="/seller/addSeller" class="fr">
                    <el-button size="small"><i class="addSeller"></i>添加商家</el-button>
                </router-link>
            </div>
            <el-form label-width="80px">
                <el-row class="condition">
                    <!-- 按店铺名称查询 -->
                    <el-col>
                        <el-form-item label="店铺名称">
                            <el-input v-model="sellerName" placeholder="请输入店铺名称..." size="small"
                                      style="width: 140px"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- 按商家账号 -->
                    <el-col>
                        <el-form-item label="商家账号">
                            <el-input v-model="sellerId" placeholder="请输入商家账号..." size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- 商家地区 -->
                    <el-col style="width:360px;">
                        <el-form-item label="商家地区">
                            <Address-Select @positionPro="listenPro" @positionCity="listenCity"></Address-Select>
                        </el-form-item>
                    </el-col>
                    <!-- 商家状态 -->
                    <el-col style="width:200px;">
                        <el-form-item label="商家状态">
                            <el-select v-model="status" size="small">
                                <el-option
                                    v-for="status in statuses"
                                    :key="status.status"
                                    :label="status.label"
                                    :value="status.status">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <!-- button按钮 -->
                    <el-col style="width:32px;margin-left:16px;">
                        <i class="btn-search" @click="btnSearch"></i>
                    </el-col>
                </el-row>
            </el-form>
            <div class="tip">
                <p style="float:left;">目前餐餐抢商家共计<span style="color:#e4393c;">{{total}}</span>家，可根据条件进行详细筛选</p>

                <el-button @click="outExcel" style="float: right;margin:-10px 6px 6px 0">导出excel</el-button>

            </div>
            <form action="#">
                <table>
                    <tr class="thead">
                        <th width="12%;">店铺</th>
                        <th width="8%">商家账号</th>
                        <th width="20%">商家地区</th>
                        <th>商家推荐人</th>
                        <th width="6%" align="center">注册会员</th>
                        <th width="6%" align="center">VIP会员</th>
                        <th width="6%" align="center">VIP收入</th>
                        <th width="6%" align="center">上架数量</th>
                        <th width="8%" align="center">添加/审核时间</th>
                        <th width="6%" align="center">状态</th>
                        <th width="12%" align="center">操作</th>
                    </tr>
                    <tr v-for="(td,index) in tdes">
                        <td>
                            <p>{{td.store_name}}</p>
                            <p>联系电话：{{td.phone}}</p>
                        </td>
                        <td>{{td.member_name}}</td>
                        <td>
                            <p style="line-height:26px">{{td.store_address}}</p>
                        </td>
                        <td>
                            <div class="referee fl">
                                <p>{{td.invite_name}}</p>
                                <p>{{td.invite_narea}}</p>
                            </div>
                            <div class="referee fr">
                                <el-button size="mini" @click="showLink(td)">分成关系链</el-button>
                            </div>
                        </td>
                        <td align="center">
                            <span @click="memberClick(td)">{{td.invite_member_count}}</span>
                        </td>
                        <td align="center">
                            <span @click="vipMemberClick(td)">{{td.invite_vip_count}}</span>
                        </td>
                        <td align="center">{{td.current_vip}}</td>
                        <td align="center">{{td.sale_goods_num}}</td>
                        <td align="center">
                            <p>{{td.addtime}}</p>
                            <p style="border-top:1px dashed #666;">{{td.store_time}}</p>
                        </td>
                        <td align="center">{{td.store_state}}</td>
                        <td align="center">
                            <router-link :to="{path:'/seller/editSeller',query:{id:td.store_id}}"><span
                                style="color:#007aff;">编辑</span></router-link>
                            <em>|</em>
                            <router-link :to="{path:'/seller/watchSeller',query:{id:td.store_id}}"><span
                                style="color:#007aff;">查看</span></router-link>
                            <em>|</em>
                            <span @click="isActive(td)">{{td.is_active}}</span><em v-if="td.is_active">|</em>
                            <span style="color:#e4393c;"
                                  @click="deleteSeller(td,index)">{{td.operation}}</span><em>|</em>
                            <span style="color:#007aff;" @click="addGoodsHandle(td)">添加商品</span>
                        </td>
                    </tr>
                </table>
            </form>
            <div class="footer" style="width:100%;height:30px;margin:20px 0;">
                <div class="fr">
                    <el-pagination
                        layout="prev, pager, next"
                        @current-change="sellerCurrentChange"
                        :current-page="currentPage"
                        :total="parseInt(lastPage)">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 添加商品选择layer -->
        <el-dialog
            title="添加商品选择"
            :visible.sync="dialogAddGoodsVisible"
            size="tiny"
            class="addGoodsClass">
            <router-link :to="{path:'/goods/addGoods',query:{id:storeId}}"><span class="addGoodImg addGoods1"></span>添加基础商品
            </router-link>
            <router-link :to="{path:'/goods/singleGoods',query:{id:storeId}}"><span class="addGoodImg addGoods2"></span>添加单品券
            </router-link>
            <router-link :to="{path:'/goods/groupGoods',query:{id:storeId}}"><span class="addGoodImg addGoods3"></span>添加套餐券
            </router-link>

        </el-dialog>
        <div class="bgShadow" v-show="showLinkInfo">
            <div class="bg"></div>
            <div class="link">
                <div class="linkTitleTip">
                    <h5 class="fl">分成关系链</h5>
                    <em class="fr" @click="closeLink">&times;</em>
                </div>
                <div class="linkInfo">
                    <p>商家：{{linkSellerName}}</p>
                    <p><span>商家账号：{{linkSellerAccount}}</span></p>
                    <p><span>联系电话：{{linkTel}}</span></p>
                    <p><span>地址：{{linkAddress}}</span></p>
                    <p>
                        <el-button size="small" @click="closeLink">返回</el-button>
                    </p>
                </div>
                <div class="linkList">
                    <div class="linkLink linkReferee fl">
                        <p class="linkTitle refereeTitle">推荐关系链</p>
                        <ul class="linkUlLi">
                            <li v-for="item in inviteArr">
                                <span>{{item.name}}：{{item.member_name}}</span>
                            </li>

                        </ul>
                        <p class="linkTipText">*罗列所有关系</p>
                    </div>
                    <div class="linkLink linkDevide fr">
                        <p class="linkTitle devideTitle">分成关系链</p>
                        <ul class="linkUlLi">
                            <li v-for="item in devideArr">
                                <span>{{item.name}}：{{item.member_name}}</span>
                            </li>
                        </ul>
                        <p class="linkTipText">*仅罗列有分成关系</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AddressSelect from '../../components/public/addressSelect2.vue'

    export default {
        data() {
            return {
                storeId: '',					// 商家id
                // 商家总数
                total: '',
                // 店铺名称
                sellerName: '',
                //商家账号
                sellerId: '',
                //按登录状态
                statuses: [
                    {
                        label: '不限',
                        status: ''
                    },
                    {
                        label: '开启',
                        status: 1
                    },
                    {
                        label: '关闭',
                        status: -1
                    }
                ],
                status: '',
                province: '',
                city: '',
                // table表单
                tdes: [],
                showLinkInfo: false,
                // 分成链信息
                linkSellerName: '',
                linkSellerAccount: '',
                linkTel: '',
                linkAddress: '',
                // 推荐关系链
                inviteArr: [],
                //分成关系链
                devideArr: [],

                lastPage: '',
                currentPage: 1,

                dialogAddGoodsVisible: false,		// 添加商品选择


            }
        },
        components: {AddressSelect},
        created() {

            // 循环商家列表
            let oldData = sessionStorage.getItem('seller')

            if (oldData) {
                let data = this.$session.fetch('seller')
                this.tdes = data.tdes
                this.total = data.total
                this.lastPage = data.lastPage
                this.currentPage = data.currentPage
            } else {
                this.$axios({
                    method: 'post',
                    url: 'Store/store_list',
                    data: {}
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.tdes = res.data.data.list
                            this.total = parseInt(res.data.data.total)
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
            }

        },
        methods: {
            // 导出商家
            outExcel() {
                location.href = '' + this.$baseUrl + 'Store/out_store_excel?store_name=' + this.sellerName + '&member_name=' + this.sellerId + '&store_state=' + this.status + '&province=' + this.province + '&city=' + this.city + ''
            },
            // 点击注册会员
            memberClick(val) {
                if (val.invite_member_count == 0) {
                    this.$message.warning('无注册会员！')
                } else {
                    this.$router.push({path:'/showList/member',query:{member_id:val.member_id,member_type:1}})
                }
            },
            // 点击vip
            vipMemberClick(val) {
                if (val.invite_member_count == 0) {
                    this.$message.warning('无VIP会员！')
                } else {
                    this.$router.push({path:'/showList/member',query:{member_id:val.member_id,member_type:1,is_vip:1}})
                }
            },
            // 激活商家
            isActive(val) {
                this.$axios.post('Store/active_store',{
                    store_id:val.store_id
                })
                .then(res=>{
                    if (res.data.code == 200) {
                        this.$message.success(res.data.message)
                        location.reload()
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            // 添加商品弹框
            addGoodsHandle(val) {
                this.dialogAddGoodsVisible = true
                this.storeId = val.store_id
            },
            // 删除商家
            deleteSeller(val, index) {
                if (val.operation == '关闭') {
                    this.$axios({
                        method: 'post',
                        url: 'Store/del_store',
                        data: {
                            store_id: val.store_id,
                            store_state: -1
                        }
                    })
                        .then(res => {
                            this.$message({
                                message: res.data.message,
                                duration: 1600,
                                type: 'success'
                            })
                            location.reload()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    this.$axios({
                        method: 'post',
                        url: 'Store/del_store',
                        data: {
                            store_id: val.store_id,
                            store_state: 70
                        }
                    })
                        .then(res => {
                            this.$message({
                                message: res.data.message,
                                duration: 1600,
                                type: 'success'
                            })
                            this.tdes.splice(index, 1)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }

            },
            // 遍历商家数据
            sellerCurrentChange(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Store/store_list',
                    data: {
                        store_name: this.sellerName,
                        member_name: this.sellerId,
                        store_state: this.status,
                        province: this.province,
                        city: this.city,
                        page: this.currentPage
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.tdes = res.data.data.list
                            this.total = parseInt(res.data.data.total)
                            this.lastPage = res.data.data.last_page * 10
                        } else {
                            this.$message({
                                message: res.data.message,
                                duration: 1600,
                                type: 'warning'
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 地理位置选择
            listenPro(provinceId) {
                this.province = provinceId
            },
            listenCity(cityId) {
                this.city = cityId
            },
            // 点击搜索
            btnSearch() {
                this.$axios({
                    method: 'post',
                    url: 'Store/store_list',
                    data: {
                        store_name: this.sellerName,
                        member_name: this.sellerId,
                        store_state: this.status,
                        province: this.province,
                        city: this.city,
                        page: this.currentPage
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            if (res.data.data.list == '') {
                                this.$message({
                                    message: 无查询结果,
                                    duration: 1600,
                                    type: 'warning'
                                })
                            } else {
                                this.tdes = res.data.data.list
                                this.lastPage = res.data.data.last_page * 10
                            }
                        } else {
                            this.$message({
                                message: res.data.message,
                                duration: 1600,
                                type: 'warning'
                            })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 显示分成关系链
            showLink(val) {
                this.storeId = val.store_id

                this.$axios({
                    method: 'post',
                    url: 'Store/relation_chain',
                    data: {
                        store_id: this.storeId
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.linkSellerName = res.data.data.member_info.store_name
                            this.linkSellerAccount = res.data.data.member_info.member_name
                            this.linkTel = res.data.data.member_info.store_phone
                            this.linkAddress = res.data.data.member_info.store_address
                            this.inviteArr = res.data.data.inviter
                            this.devideArr = res.data.data.divided
                            this.showLinkInfo = true
                        } else {
                            this.showLinkInfo = false;
                            this.$message({
                                message: res.data.message,
                                duration: 1600,
                                type: 'warning'
                            })

                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })


            },
            closeLink() {
                this.showLinkInfo = false
            }
        },
        // // 页面离开储存数据到session
        // beforeRouteLeave(to, from, next) {
        //     this.$session.save('seller', {
        //         'tdes': this.tdes,
        //         'total': this.total,
        //         'lastPage': this.lastPage,
        //         'currentPage': this.currentPage
        //     })
        //     next()
        // }
    }
</script>

<style scoped lang="scss">
    .sellerInfo {
        height: 40px;
        line-height: 40px;
        text-align: left;
        font-size: 12px;
        background-color: #eee;
        .el-button {
            color: #bfc4fc;
            margin-right: 12px;
            background-color: transparent;
            border: none;
            font-size: 14px;
            i {
                display: inline-block;
                width: 30px;
                height: 18px;
                vertical-align: middle;
                background: url('../../assets/image/image-count.png') -10px -14px;
            }
        }
    }

    .referee .el-button {
        width: 72px;
        margin-top: 12px;
        background: linear-gradient(to left, #e0c3fc, #8ec5fc);
        color: #fff;
    }

    .link {
        position: fixed;
        width: 1000px;
        height: 800px;
        left: 50%;
        top: 10%;
        margin-left: -500px;
        background-color: #f2f2f2;
        border-radius: 10px;
        z-index: 999;
        cursor: pointer;
        .linkTitleTip {
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            color: #fff;
            background-color: #e4393c;
            em {
                font-size: 36px;
            }
        }
        .linkInfo {
            width: 96%;
            line-height: 36px;
            margin: 12px auto 0;
            padding-left: 20px;
            padding-bottom: 10px;
            text-align: left;
            background-color: #fff;
            span {
                color: #848484;
            }
            .el-button {
                background-color: #c2c1c1;
                color: #fff;
                box-shadow: 1px 0 1px #c2c1c1, -1px 0 1px #c2c1c1, 0 2px 1px #c2c1c1, 0 -2px 1px #c2c1c1;
            }
        }
        .linkList {
            width: 880px;
            margin: 20px auto 0;
            .linkLink {
                position: relative;
                width: 400px;
                height: 500px;
                border-radius: 0 30px 30px 0;
                box-shadow: 4px 4px 8px #ceced9;
            }
        }
    }

    .linkReferee {
        background-color: #d9dbf7;
    }

    .linkDevide {
        background-color: #e4daf7;
    }

    .linkTitle {
        position: absolute;
        top: 14px;
        left: -6px;
        width: 140px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        text-align: center;
    }

    .refereeTitle {
        background-color: #d7c3fc;
    }

    .devideTitle {
        background-color: #c1c4fc;
    }

    .linkTipText {
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: #e4393c;
    }

    .linkUlLi {
        width: 96%;
        height: 380px;
        margin: 0 auto;
        padding-top: 80px;
        line-height: 36px;
        overflow-y: hidden;
        text-align: left;
    }

    .linkUlLi span {
        padding: 0 10px;

    }

    .bg {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #444;
        opacity: .4;
    }

    .addGoodsClass a {
        display: inline-block;
        width: 100px;
        height: 100px;
        margin: 0 10px;
    }

    .addGoodsClass a:nth-child(1) {
        color: #00BCD4;
    }

    .addGoodsClass a:hover {
        border-radius: 50%;
        box-shadow: inset 0 0 20px #e4393c;
    }

    .addGoodsClass a:nth-child(2) {
        color: #FFCA28;
    }

    .addGoodsClass a:nth-child(3) {
        color: #8BC34A;
    }

    .addGoodImg {
        display: block;
        width: 80px;
        height: 80px;
    }

    .addGoods1 {
        background: url('../../assets/image/addGoodsImg.png') no-repeat 0 -8px;
    }

    .addGoods2 {
        background: url('../../assets/image/addGoodsImg.png') no-repeat 0 -84px;
    }

    .addGoods3 {
        background: url('../../assets/image/addGoodsImg.png') no-repeat 0 -160px;
    }

    /*@import "../../assets/css/base.css";*/
    /*@import "../../assets/css/seller_part.css";*/

    @media screen and (max-width: 1660px) {
        .referee {
            float: none;
        }
    }


</style>
