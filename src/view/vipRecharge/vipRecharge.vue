<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>VIP充值订单</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <el-form ref="form" class="condition" label-width="100px">
                <el-row>

                    <el-col>
                        <el-form-item label="会员">
                            <el-input v-model="buyerName" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="订单状态">
                            <el-select v-model="order_status" size="small">
                                <el-option
                                    v-for="item in order_statuses"
                                    :key="item.order_status"
                                    :label="item.label"
                                    :value="item.order_status">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col style="width:360px">
                        <el-form-item label="查询时间" size="small">
                            <el-date-picker
                                v-model="startTime"
                                type="date"
                                placeholder="开始时间"
                                size="small"
                                style="width:120px;"
                                @change="startChange"></el-date-picker>
                            ~
                            <el-date-picker
                                v-model="endTime"
                                type="date"
                                placeholder="结束时间"
                                size="small"
                                style="width:120px;"
                                @change="endChange"></el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col>
                        <el-form-item label="支付方式">
                            <el-select v-model="payType" style="width:120px;" size="small" @change="payTypeChange">
                                <el-option
                                    v-for="item in payTypes"
                                    :key="item.payType"
                                    :label="item.label"
                                    :value="item.payType"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!-- button按钮 -->
                    <el-col style="width:32px;margin-left:16px;">
                        <i class="btn-search" @click="btnSearch"></i>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col style="width:430px">
                        <el-form-item label="设定VIP月费">
                            <el-select v-model="vipMonthType" size="small" @change="vipChooseChange">
                                <el-option
                                    v-for="item,index in vipMonthTypes"
                                    :key="item.id"
                                    :label="item.label"
                                    :value="item.attr_name"></el-option>
                            </el-select>
                            <el-input v-model="vipMoneyNum" size="small" style="width:60px;"></el-input>
                            <em style="display:inline-block;margin-right:12px;">元</em>
                            <em style="color:#e4393c;">赠送：</em>
                            <el-input v-model="presentMonth" size="small" style="width:48px"></el-input>
                            <em>月</em>
                        </el-form-item>
                    </el-col>
                    <el-col style="width:220px;margin: 4px 6px 0 20px;">
                        <el-button type="danger" @click="reviseVipMoney" size="small">确定修改</el-button>
                        <span style="color:#e4393c">（注:999代表终身VIP）</span>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col style="width:80%;">
                        <el-form-item label="当前设定" style="color:#2685ff">
                            <ul>
                                <li v-for="item in vipList">
                                    <span>月费{{item.attr_value}}元</span>
                                    <span style="margin:0 30px 0 8px;">赠送{{item.gift}}月</span>
                                </li>
                            </ul>

                        </el-form-item>
                    </el-col>
                    <el-col style="width:20%;">
                        <el-button class="fr" style="margin-right: 20px" @click="outExcel">导出excel</el-button>
                    </el-col>
                </el-row>


            </el-form>


            <form action="#">
                <table>
                    <tr class="thead">
                        <th width="8%">会员</th>
                        <th width="6%" align="center">类型</th>
                        <th width="12%">订单号</th>
                        <th width="10%">店铺</th>
                        <th width="11%">付款时间</th>
                        <th width="6%">充值金额</th>
                        <th width="8%">支付方式</th>
                        <th width="8%">状态</th>
                        <th width="8%">分润/利润</th>
                        <th width="6%">充值时长</th>
                        <th width="6%">确认款项</th>
                        <th width="8%" align="center">操作</th>
                    </tr>
                    <tr v-for="td in tdes" class="tbody">
                        <td>
                            <router-link
                                :to="{path:'/vipRecharge/vipRechargeRecord',query:{buyer_id:td.buyer_id,buyer_name:td.buyer_name}}">
                                {{td.buyer_name}}
                            </router-link>
                        </td>
                        <td align="center">{{td.type}}</td>
                        <td>{{td.order_sn}}</td>
                        <td>{{td.store_name}}</td>
                        <td>{{td.payment_time}}</td>
                        <td>{{td.order_amount}}元</td>
                        <td>{{td.payment_code}}</td>
                        <td>{{td.order_state}}</td>
                        <td><b style="margin-right:6px">{{td.benefit}}</b>/<b style="margin-left:6px">{{td.profit}}</b></td>
                        <td>{{td.goods_num}}</td>
                        <td><span @click="layerSureClick(td)" style="color: #FEA7A7;">{{td.is_sure}}</span></td>
                        <td align="center">
                            <router-link
                                :to="{path:'/vipRecharge/vipRechargeDetails',query:{orderId:td.order_id}}"><span
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


                <div class="fr">
                    <el-pagination
                        layout="prev, pager, next"
                        @current-change="pageChange"
                        :current-page="currentPage"
                        :total="parseInt(lastPage)">
                    </el-pagination>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 当前操作者的账号
                memberName: this.$memberName,
                // 会员
                buyerName: '',
                // 订单状态
                order_statuses: [
                    {
                        order_status: '',
                        label: '不限'
                    },
                    {
                        order_status: '10',
                        label: '未付款'
                    },
                    {
                        order_status: '40',
                        label: '交易完成'
                    },
                    {
                        order_status: '-1',
                        label: '已取消'
                    }
                ],
                order_status: '',

                // 查询时间
                startTime: '',
                endTime: '',

                // 支付方式
                payTypes: [
                    {
                        payType: '',
                        label: '不限'
                    },
                    {
                        payType: 'online',
                        label: '在线支付'
                    },
                    {
                        payType: 'offline',
                        label: '货到付款'
                    },
                    {
                        payType: 'alipay',
                        label: '支付宝'
                    },
                    {
                        payType: 'wx_saoma',
                        label: '微信'
                    },
                    // {
                    //     payType: 'wx_public',
                    //     label: '微信公众号'
                    // },
                    {
                        payType: 'current_balance',
                        label: '账户余额'
                    },
                    {
                        payType: 'current_merchants',
                        label: '招商奖金支付'
                    },
                    {
                        payType: 'current_point',
                        label: '云币支付'
                    },
                    {
                        payType: 'current_promote',
                        label: '推广提成支付'
                    },
                    {
                        payType: 'current_distribution',
                        label: '分销奖金支付'
                    },
                    {
                        payType: 'current_vip',
                        label: 'vip奖金支付'
                    }
                ],
                payType: '',
                payTypeCode: '',


                // table数据
                tdes: [],
                lastPage: '',		// 最后一页
                currentPage: 1,		// 当前页

                // 月费选择
                vipMonthTypes: [],
                vipMonthType: '',        // 默认月数
                vipMoneyNum: '',         // 对应的钱数
                presentMonth: '',
                reviseVipId: '',
                vipList: [],


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
            }
        },
        created() {
            let oldData = sessionStorage.getItem('vipRecharge')
            if (oldData) {
                let data = this.$session.fetch('vipRecharge')
                this.tdes = data.tdes
                this.lastPage = data.lastPage
                this.currentPage = data.currentPage
                this.vipMoneyNum = data.vipMoneyNum
                this.vipMonthType = data.vipMonthType
                this.presentMonth = data.presentMonth
                this.vipList = data.vipList
                this.vipMonthTypes = data.vipMonthTypes
            } else {
                // 读取vip信息
                this.$axios.post('Order/vip_info')
                    .then(res => {
                        this.vipMoneyNum = res.data.data[0].attr_value
                        this.vipMonthType = res.data.data[0].attr_name
                        this.presentMonth = res.data.data[0].gift
                        this.vipList = res.data.data
                        this.vipMonthTypes = res.data.data

                    })
                    .catch(err => {
                        console.log(err)
                    })
                // 遍历列表数据
                this.$axios.post('Order/vip_order_list')
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

        },
        methods: {
            // outExcel
            outExcel() {

                location.href = ''+this.$baseUrl+'Order/vip_order_list?buyer_name='+this.buyerName+'&order_state='+this.order_status+'&query_start_time='+this.startTime+'&query_end_time='+this.endTime+'&payment_code='+this.payTypeCode+'&is_outexcel=1'
            },
            // vip金额的修改
            reviseVipMoney() {
                this.$axios({
                    method: 'post',
                    url: 'Order/update_vip_info',
                    data: {
                        id: this.reviseVipId,
                        member_name: this.memberName,
                        attr_value: this.vipMoneyNum,
                        gift: this.presentMonth
                    }
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
                            setTimeout("location.reload()", 1600)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // vip月费的change
            vipChooseChange(val) {
                this.$axios({
                    url: 'Order/vip_info'
                })
                    .then(res => {
                        if (val == '一个月') {
                            this.reviseVipId = res.data.data[0].id
                            this.vipMoneyNum = res.data.data[0].attr_value
                            this.vipMonthType = res.data.data[0].attr_name
                            this.presentMonth = res.data.data[0].gift
                        } else if (val == '三个月') {
                            this.reviseVipId = res.data.data[1].id
                            this.vipMoneyNum = res.data.data[1].attr_value
                            this.vipMonthType = res.data.data[1].attr_name
                            this.presentMonth = res.data.data[1].gift
                        } else if (val == '一年') {
                            this.reviseVipId = res.data.data[2].id
                            this.vipMoneyNum = res.data.data[2].attr_value
                            this.vipMonthType = res.data.data[2].attr_name
                            this.presentMonth = res.data.data[2].gift
                        } else {
                            this.reviseVipId = res.data.data[3].id
                            this.vipMoneyNum = res.data.data[3].attr_value
                            this.vipMonthType = res.data.data[3].attr_name
                            this.presentMonth = res.data.data[3].gift
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            },
            // 开始结束时间的获取
            startChange(val) {
                this.startTime = val
            },
            endChange(val) {
                this.endTime = val
            },
            // 支付方式
            payTypeChange(val) {
                this.payTypeCode = val
            },
            payTypeClassChange(val) {
                this.payTypeCode = val
            },
            // 条件查询
            btnSearch() {
                this.$axios({
                    method: 'post',
                    url: 'Order/vip_order_list',
                    data: {
                        buyer_name: this.buyerName,
                        order_state: this.order_status,
                        query_start_time: this.startTime,
                        query_end_time: this.endTime,
                        payment_code: this.payTypeCode,
                        page: this.currentPage
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
            },
            // 点击翻页
            pageChange(val) {
                this.currentPage = val
                this.$axios({
                    method: 'post',
                    url: 'Order/vip_order_list',
                    data: {
                        buyer_name: this.buyerName,
                        order_state: this.order_status,
                        query_start_time: this.startTime,
                        query_end_time: this.endTime,
                        payment_code: this.payTypeCode,
                        page: this.currentPage
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
                    url: 'Order/vip_order_cancel',
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
        //     this.$session.save('vipRecharge', {
        //         'tdes': this.tdes,
        //         'lastPage': this.lastPage,
        //         'currentPage': this.currentPage,
        //         'vipMoneyNum': this.vipMoneyNum,
        //         'vipMonthType': this.vipMonthType,
        //         'presentMonth': this.presentMonth,
        //         'vipList': this.vipList,
        //         'vipMonthTypes': this.vipMonthTypes,
        //     })
        //     next()
        // }
    }
</script>

<style scoped lang="scss">
    .contentDiv {
        padding-bottom: 50px;
    }

    table {
        text-align: left;
    }

    .thead {
        background: url('../../assets/image/thead.png') no-repeat -10px -352px;
    }

    .el-col em {
        font-style: normal;
    }

    .tip span {
        display: inline-block;
        height: 10px;
        line-height: 10px;
        padding-left: 10px;
        margin-right: 10px;
        color: #242424;
    }

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
        top: 200px;
        width: 500px;
        height: 480px;
        background: linear-gradient(45deg, #19D2EE, #92FE9D);
    }

    .infoDiv {
        position: relative;
        width: 474px;
        height: 400px;
        margin: 14px auto;
        padding-top: 50px;
        background-color: #fff;
    }

    .infoDiv em {
        position: absolute;
        right: 20px;
        top: 6px;
        font-size: 36px;
        cursor: pointer;

    }

    .infoDiv p {
        width: 80%;
        line-height: 30px;
        margin: 0 auto;
        text-align: left;
        color: #242424;
    }

    .infoDiv p label {
        display: inline-block;
        width: 120px;
        text-align: right;
    }

    .infoDiv > span {
        display: block;
        margin-top: 88px;
        color: #e4393c;
    }

    .btnDiv {
        margin-top: 20px;
        text-align: center;
    }

    .btnDiv .el-button {
        width: 116px;
    }

    .cancelDiv {
        position: fixed;
        left: 50%;
        margin-left: -200px;
        width: 400px;
        height: 200px;
        background-color: #fff;
    }

    .cancelDiv em {
        position: absolute;
        right: 20px;
        top: 6px;
        font-size: 36px;
        cursor: pointer;
    }

    .cancelDiv p {
        margin-top: 60px;
    }

    @import "../../assets/css/base.css";


</style>
