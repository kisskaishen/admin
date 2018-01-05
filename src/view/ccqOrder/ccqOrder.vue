<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>餐餐抢订单</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <el-form class="condition" label-width="80px">
                <el-row>
                    <el-col style="width:246px">
                        <el-form-item label="订单号">
                            <el-input v-model="ccqOrderNum" size="small" style="width:166px"></el-input>
                        </el-form-item>
                    </el-col>


                    <el-col>
                        <el-form-item label="买家">
                            <el-input v-model="buyerName" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="订单状态">
                            <el-select v-model="orderStatus" size="small" @change="statusChange">
                                <el-option
                                    v-for="item in orderStatuses"
                                    :key="item.orderStatus"
                                    :label="item.label"
                                    :value="item.orderStatus">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="订单类型">
                            <el-select v-model="orderType" size="small" @change="orderTypeChange">
                                <el-option
                                    v-for="item in orderTypes"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:380px;">
                        <el-form-item label="选择时间段" label-width="100px">
                            <el-date-picker
                                v-model="startTime"
                                type="date"
                                size="small"
                                placeholder="开始日期"
                                style="width:120px;"
                                @change="startTimeChange">
                            </el-date-picker>
                            ~
                            <el-date-picker
                                v-model="endTime"
                                type="date"
                                size="small"
                                placeholder="结束日期"
                                style="width:120px;"
                                @change="endTimeChange">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="width:246px">
                        <el-form-item label="商家名称">
                            <el-input v-model="sellerName" size="small"  style="width:166px"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="支付方式">
                            <el-select v-model="payType" size="small" @change="payTypeChange">
                                <el-option
                                    v-for="item in payTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:614px">
                        <el-form-item label="地址" label-width="80px">
                            <address-select
                                @listenProvince="listenProvince"
                                @listenCity="listenCity"
                                @listenArea="listenArea"
                                @listenStreet="listenStreet"></address-select>
                        </el-form-item>
                    </el-col>

                    <!-- button按钮 -->
                    <el-col style="width:32px;margin-left:16px;">
                        <i class="btn-search" @click="btnSearch"></i>
                    </el-col>

                </el-row>
            </el-form>

            <div style="width: 100%;line-height: 40px;">
                <span class="fl" style="margin-left: 20px">目前订单量共有 <em style="color: #e4393c;">{{total}}</em>单</span>
                <el-button class="fr" style="margin-right: 20px" @click="outExcel">导出excel</el-button>
            </div>

            <form action="#">
                <table>
                    <tr class="thead">
                        <th width="13%" align="left">订单号</th>
                        <th width="10%" align="left">店铺</th>
                        <th width="6%">商家类型</th>
                        <th width="8%">买家</th>
                        <th width="11%">下单时间</th>
                        <th width="6%">订单总额</th>
                        <th width="10%">支付方式</th>
                        <th width="10%">订单状态</th>
                        <th width="5%">券码</th>
                        <th width="8%">分润/利润</th>
                        <th width="7%">确认款项</th>
                        <th width="8%">操作</th>
                    </tr>
                    <tr v-for="td in tdes" class="tbody">
                        <td align="left">{{td.order_sn}}</td>
                        <td align="left">{{td.store_name}}</td>
                        <td>{{td.store_type}}</td>
                        <td>
                            <router-link
                                :to="{path:'/CcqOrder/ccqOrderRecord',query:{buyerId:td.buyer_id,buyerName:td.buyer_name}}"
                                style="color:#29b3b9">{{td.buyer_name}}
                            </router-link>
                        </td>
                        <td>{{td.add_time}}</td>
                        <td>{{td.order_amount}}</td>
                        <td>{{td.payment_code}}</td>
                        <td>{{td.order_state}}</td>
                        <td>{{td.check_number}}</td>
                        <td><b style="margin-right:6px">{{td.benefit}}</b>/<b style="margin-left:6px">{{td.profit}}</b></td>
                        <td style="cursor:pointer;color:#26cdff" @click="layerSureClick(td)">{{td.is_sure}}</td>
                        <td>
                            <router-link :to="{path:'/CcqOrder/ccqOrderDetails',query:{id:td.order_id}}"><span
                                style="color:#007aff;">查看</span></router-link>
                            <em v-if="td.is_cancel">|</em>
                            <span style="color:#e64e50;" @click="layerCancelClick(td)">{{td.is_cancel}}</span>
                        </td>
                    </tr>
                </table>
                <!-- 确认收款弹出框 -->
                <div class="layer" v-show="layerSure">
                    <div class="bgLayer" @click="layerSureClose"></div>
                    <div class="sureDiv">
                        <div class="infoDiv">
                            <em @click="layerSureClose">&times;</em>
                            <p><label>会员账号：</label>{{layerMember}}</p>
                            <p><label>订单号：</label>{{layerOrder}}</p>
                            <p><label>商家店铺：</label>{{layerStore}}</p>
                            <p><label>应该付：</label>{{layerPrice}}元</p>
                            <p><label>下单时间：</label>{{layerTime}}</p>
                            <p><label>支付方式：</label>{{layerPayType}}</p>
                            <span>*请财务部查看并确认，已收到相关的款项，一经确认，将无可复原</span>
                            <div class="btnDiv">
                                <el-button @click="layerSureClose">取消</el-button>
                                <el-button type="danger" @click="layerSureSure">确定</el-button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 取消订单弹出框 -->
                <el-dialog
                    title="提示"
                    :visible.sync="dialogCancelVisible"
                    size="tiny">
                    <p>是否取消该订单？</p>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogCancelVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogSureVisible">确 定</el-button>
                    </span>
                </el-dialog>
                <div class="footer">
                    <div class="fr">
                        <el-pagination
                            layout="prev, pager, next"
                            @current-change="orderPage"
                            :current-page="currentPage"
                            :total="parseInt(lastPage)">
                        </el-pagination>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import AddressSelect from '../../components/public/addressSelect5.vue'
    export default {
        data() {
            return {
                ccqOrderNum: '',			// 餐餐抢订单
                sellerName: '',			// 商家名称
                buyerName: '',			// 买家


                orderStatuses: [			// 订单状态
                    {
                        orderStatus: '',
                        label: '不限'
                    },
                    {
                        orderStatus: 10,
                        label: '未付款'
                    },
                    {
                        orderStatus: 20,
                        label: '已付款/待验证'
                    },
                    {
                        orderStatus: 40,
                        label: '已验证'
                    },
                    {
                        orderStatus: -1,
                        label: '已取消'
                    }
                ],
                orderStatus: '',
                orderStatusCode: '',

                startTime: '',			// 开始时间
                endTime: '',				// 结束时间

                // 支付方式
                payTypes: [
                
                    {
                        value: '',
                        label: '不限'
                    },
                    {
                        value: 'alipay',
                        label: '支付宝'
                    },
                    {
                        value: 'wx_saoma',
                        label: '微信'
                    },
                    // {
                    //     value: 'wx_public',
                    //     label: '微信公众号'
                    // },
                    {
                        value: 'current_balance',
                        label: '账户余额'
                    },
                    {
                        value: 'online',
                        label: '在线支付'
                    },
                    {
                        value: 'offline',
                        label: '货到付款'
                    },
                    {
                        value: 'current_merchants',
                        label: '招商奖金支付'
                    },
                    {
                        value: 'current_point',
                        label: '云币支付'
                    },
                    {
                        value: 'current_promote',
                        label: '推广提成支付'
                    },
                    {
                        value: 'current_distribution',
                        label: '分销奖金支付'
                    },
                    {
                        value: 'current_vip',
                        label: 'vip奖金支付'
                    }
                ],
                payType: '',

                orderTypes:[
                    {
                        label:'餐餐抢订单',
                        value:'1'
                    },
                    {
                        label:'先消费后买单',
                        value:'2'
                    },
                ],
                orderType: '1',


                // table数据
                tdes: [],
                lastPage: '',		// 最后一页
                currentPage: 1,		// 当前页


                //弹框
                layerMember: '',
                layerOrder: '',
                layerStore: '',
                layerPrice: '',
                layerTime: '',
                layerPayType: '',

                layerSure: false,               // 确认购买的layer
                dialogCancelVisible: false,     // 取消dialog
                orderId: '',
                total: '',               //订单量

                provinceId:'',
                cityId:'',
                areaId:'',
                streetId:'',
            }
        },
        components:{ AddressSelect },
        created() {
            this.getList(1)
        },
        methods: {
            // 导出excel
            outExcel() {
                location.href = this.$baseUrl + 'Order/out_order_excel?order_sn=' + this.ccqOrderNum + '&store_name=' + this.sellerName + '' +
                    '&buyer_name=' + this.buyerName + '&order_state=' + this.orderStatusCode + '' +
                    '&query_start_time=' + this.startTime + '&query_end_time=' + this.endTime + '&payment_code=' + this.payType + '&union_type='+this.orderType
            },
            // 条件筛选
            // 开始时间
            startTimeChange(val) {
                this.startTime = val
            },
            endTimeChange(val) {
                this.endTime = val
            },
            // 订单状态
            statusChange(val) {
                this.orderStatusCode = val
            },
            // 支付方式
            payTypeChange(val) {
                this.payType = val
            },
            // 订单类型
            orderTypeChange(val) {
                console.log(val)
                this.orderType = val
            },
            // 地址
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

            // 按条件查询
            btnSearch() {
                this.getList(1)
            },
            // 点击翻页
            orderPage(val) {
                this.getList(val)
            },
            // 获取列表
            getList(val) {
                this.$axios.post('Order/order_list',{
                    order_sn: this.ccqOrderNum || '',
                    store_name: this.sellerName || '',
                    buyer_name: this.buyerName || '',
                    order_state: this.orderStatusCode || '',
                    query_start_time: this.startTime || '',
                    query_end_time: this.endTime || '',
                    payment_code: this.payType || '',
                    union_type:this.orderType,
                    narea_p:this.provinceId,
                    narea_s:this.cityId,
                    narea_q:this.areaId,
                    narea_z:this.streetId,
                    page: val || '1'
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.tdes = res.data.data.list,
                            this.total = res.data.data.total,
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
            // 点击确认收款显示layer框
            layerSureClick(val) {
                this.orderId = val.order_id
                if (val.is_sure == '已经收到款项') {
                    alert('已收到款项，请勿重复点击')
                } else {
                    this.$axios({
                        method: 'post',
                        url: 'Order/order_detail',
                        data: {
                            order_id: this.orderId
                        }
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.layerMember = res.data.data.buyer_name
                                this.layerOrder = res.data.data.order_sn
                                this.layerStore = res.data.data.store_name
                                this.layerPrice = res.data.data.order_amount
                                this.layerTime = res.data.data.add_time
                                this.layerPayType = res.data.data.payment_code
                                this.layerSure = true
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
            layerSureSure() {
                this.$axios({
                    method: 'post',
                    url: 'Order/confirm_money',
                    data: {
                        order_id: this.orderId
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            this.layerSure = false
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
            // 点击layerSureClose关闭layer
            layerSureClose() {
                this.layerSure = false
            },

            // 点击取消
            layerCancelClick(val) {
                this.orderId = val.order_id
                this.dialogCancelVisible = true
            },
            dialogSureVisible() {
                this.$axios({
                    method: 'post',
                    url: 'Order/order_cancel',
                    data: {
                        order_id: this.orderId
                    }
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            this.dialogCancelVisible = false
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

        // beforeRouteLeave(to, from, next) {
        //     this.$session.save('order', {
        //         'tdes': this.tdes,
        //         'lastPage': this.lastPage,
        //         'total': this.total,
        //         'currentPage': this.currentPage
        //     })
        //     next()
        // }
    }
</script>

<style scoped lang="scss">
    table {
        text-align: center;
        .thead {
            background: url('../../assets/image/thead.png') no-repeat -10px -288px;
        }
    }

    /* 弹框*/
    .bgLayer {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .sureDiv {
        position: fixed;
        left: 50%;
        margin-left: -250px;
        top: 240px;
        width: 500px;
        height: 440px;
        background: linear-gradient(45deg, #19D2EE, #92FE9D);
        .infoDiv {
            position: relative;
            width: 474px;
            height: 360px;
            margin: 14px auto;
            padding-top: 50px;
            background-color: #fff;
            em {
                position: absolute;
                right: 20px;
                top: 6px;
                font-size: 36px;
                cursor: pointer;
            }
            p {
                width: 80%;
                line-height: 30px;
                margin: 0 auto;
                text-align: left;
                color: #242424;
                label {
                    display: inline-block;
                    width: 120px;
                    text-align: right;
                }
            }
            span {
                display: block;
                margin-top: 40px;
                color: #e4393c;
            }
            .btnDiv {
                margin-top: 20px;
                text-align: center;
                .el-button {
                    width: 116px;
                }
            }
        }
    }

    @import "../../assets/css/base.css";


</style>
