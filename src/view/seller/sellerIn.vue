<template>

    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/seller'}">餐餐抢商家</el-breadcrumb-item>
            <el-breadcrumb-item>商家入驻申请列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <el-form ref="form" class="condition" label-width="80px">
                <el-row>
                    <!-- 按店铺名称查询 -->
                    <el-col style="width:200px;">
                        <el-form-item label="店铺名称">
                            <el-input v-model="sellerName" placeholder="请输入店铺名称..." size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- 按商家账号 -->
                    <el-col style="width:200px;">
                        <el-form-item label="会员账号">
                            <el-input v-model="memberId" placeholder="请输入会员账号..." size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- 商家状态 -->
                    <el-col style="width:240px;">
                        <el-form-item label="申请状态">
                            <el-select v-model="status" size="small" style="width:140px;">
                                <el-option
                                    v-for="item in statuses"
                                    :key="item.status"
                                    :label="item.label"
                                    :value="item.status">
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
                <p>目前餐餐抢商家共计<span style="color:#e4393c;">{{total}}</span>家，可根据条件进行详细筛选</p>
            </div>
            <form action="#">
                <table>
                    <tr class="thead">
                        <th>店铺</th>
                        <th>商家账号</th>
                        <th width="28%">商家地区</th>
                        <th>商家推荐人</th>
                        <th>添加/审核时间</th>
                        <th>状态</th>
                        <th align="center">操作</th>
                    </tr>
                    <tr v-for="td in tdes">
                        <td>
                            <p>{{td.store_name}}</p>
                            <p>联系电话：{{td.contacts_phone}}</p>
                        </td>
                        <td>{{td.member_name}}</td>
                        <td>
                            <p style="line-height:26px">{{td.company_address}}</p>
                        </td>
                        <td>
                            <div class="referee">
                                <p>{{td.invite_name}}</p>
                                <p>{{td.invite_narea}}-{{td.invite_type}}</p>
                            </div>
                        </td>
                        <td>
                            <p>{{td.addtime}}</p>
                            <p  style="border-top:1px dashed #666;color:#1AAD16">{{td.c_time}}</p>
                        </td>
                        <td>{{td.joinin_state}}</td>
                        <td align="center">

                            <router-link :to="{path:'/seller/checkSeller',query:{id:td.id}}"><span
                                class="curr5">{{td.is_examine}}</span></router-link>
                            <em v-if="td.is_examine&&td.is_see">|</em>
                            <router-link :to="{path:'/seller/watchSellerIn',query:{id:td.id}}"><span
                                class="curr5">{{td.is_see}}</span></router-link>
                            <em v-if="td.is_delete">|</em>
                            <span class="curr" @click="deleteSeller(td)">{{td.is_delete}}</span>
                            <span class="curr4" @click="cancelSeller(td)">{{td.is_cannel}}</span>
                        </td>
                    </tr>
                </table>
                <div class="footer" style="width:100%;height:30px;margin:20px 0;">
                    <div class="fr">
                        <el-pagination
                            layout="prev, pager, next"
                            @current-change="sellerInCurrentChange"
                            :total="parseInt(lastPage)">
                        </el-pagination>
                    </div>
                </div>

            </form>
            <el-dialog
                title="提示"
                size="tiny"
                :visible.sync="dialogCancelVisible">
                <p>确认下架？</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogCancelVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sureCancel">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>

</template>
<script>

    export default {
        data() {
            return {
                sellerName: '',
                memberId: '',
                statuses: [
                    {
                        label: '已提交申请',
                        status: 10
                    },
                    {
                        label: '审核失败',
                        status: 30
                    },
                    {
                        label: '审核通过开店',
                        status: 40
                    },
                    {
                        label: '店铺申请下架',
                        status: 50
                    }
                ],
                status: '',
                tdes: [],
                total: '',
                lastPage: '',
                currentPage: 1,		// 当前页码

                dialogCancelVisible:false,       // 申请下架
                store_id:'',            // 商家id
            }
        },
        created() {
            // 遍历出列表
            this.$axios({
                method: 'post',
                url: 'Store/store_joinin_list',
                data: {}
            })
                .then(res => {
                    if (res.data.code == 200) {
                        this.tdes = res.data.data.list
                        this.total = res.data.data.total
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
            // 翻页
            sellerInCurrentChange(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Store/store_joinin_list',
                    data: {
                        page: this.currentPage
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.tdes = res.data.data.list
                            this.total = res.data.data.total
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
            // 申请下架
            cancelSeller(val) {
                this.dialogCancelVisible = true
                this.store_id = val.store_id
            },
            // 确认下架
            sureCancel() {
                this.$axios({
                    method: 'post',
                    url: 'Store/del_store',
                    data: {
                        store_id: this.store_id,
                        store_state:-1
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message)
                            this.dialogCancelVisible = false
                            location.reload()
                        } else {
                            this.$message.error(res.data.message)
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 删除申请
            deleteSeller(val) {
                this.$axios({
                    method: 'post',
                    url: 'Store/del_store_joinin',
                    data: {
                        id: val.id
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            setTimeout("location.reload()",1600)
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
            // 搜索按钮
            btnSearch() {
                this.$axios({
                    method: 'post',
                    url: 'Store/store_joinin_list',
                    data: {
                        store_name: this.sellerName,
                        member_name: this.memberId,
                        joinin_state: this.status
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.tdes = res.data.data.list
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
        }
    }
</script>
<style scoped lang="scss">


    .el-breadcrumb {
        line-height: 30px;
    }

    .tip {
        font-size: 15px;
        border-bottom: 1px solid #dcdcdc;
    }

    .el-select {
        width: 120px;
    }


</style>
