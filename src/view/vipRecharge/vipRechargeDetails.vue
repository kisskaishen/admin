<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/vipRecharge">VIP充值</el-breadcrumb-item>
            <el-breadcrumb-item>充值详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="订单详情" name="1">
                    <div>
                        <p>会员：{{memberName}}</p>
                        <p>店铺：{{storeName}}</p>
                        <p>手机号码：{{tel}}</p>
                        <p>支付方式：{{payType}}</p>
                        <p>下单时间：{{orderTime}}</p>
                        <p>支付时间：{{payTime}}</p>
                        <p>收货人姓名：{{receiver}}</p>
                        <p>联系电话：{{receiveTel}}</p>
                        <p>收货人地址：{{receiveAdd}}</p>
                    </div>
                </el-collapse-item>

                <el-collapse-item title="订单信息" class="orderInfoTitle" name="2">
                    <div>
                        <p>订单号：{{orderSn}}(支付单号：{{paySn}})</p>
                        <p>订单状态：{{orderStatus}}</p>
                        <p>订单总额：{{orderTotal}}元</p>
                        <p>运费：{{shipping}}元</p>
                        <p>公司利润：{{companyProfit}}元</p>
                        <p>订单分润：{{orderProfit}}元</p>
                        <div style="padding-left: 40px;">分润列表：
                            <ul>
                                <li v-for="item in profitList"><span>{{item.member_name}}</span><b>{{item.member_type}}</b><label>{{item.value}}元</label></li>
                            </ul>
                        </div>
                    </div>
                    <div class="goodsInfo">
                        <div class="fl">
                            <img :src="goodsImage" alt="商品图" @click="biggerImg">
                        </div>
                        <div class="infoText fl">
                            <table>
                                <tr>
                                    <th>商品名称</th>
                                    <th>单价</th>
                                    <th>实际支付额</th>
                                    <th>单品成本家</th>
                                    <th>单品利润</th>
                                    <th>数量</th>
                                    <th>税率</th>
                                </tr>
                                <tr>
                                    <td>{{goodsName}}</td>
                                    <td>{{goodsPrice}}元</td>
                                    <td>{{price}}元</td>
                                    <td>{{costPrice}}元</td>
                                    <td>{{profit}}元</td>
                                    <td>{{goodsSum}}</td>
                                    <td>{{tax_rate}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </el-collapse-item>

            </el-collapse>
            <div class="img-view">
                <div class="img-layer" v-if="showImg" @click="closeLayer"></div>
                <div class="img-img">
                    <img :src="layerImg" alt="商品图片" v-if="showImg">
                </div>
            </div>
        </div>
        <div class="historyOperate">
            <p class="tip">操作历史</p>
            <ul>
                <li v-for="item in historyList">
                    {{item}}
                </li>
            </ul>
        </div>

        <div class="btnDiv">
            <el-button @click="returnBack">返回</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeNames: ['1','2'],
                orderId: '',             // url参数id
                memberName:'',              // 会员
                storeName:'',               // 店铺
                tel:'',                     // 手机号
                payType:'',                 // 支付方式
                payMoney:'',                // 支付金额
                orderTime:'',               // 下单时间
                payTime:'',                 // 支付时间
                receiver:'',                // 收件人
                receiveTel:'',              // 收件人电话
                receiveAdd:'',              // 收件人地址

                orderSn:'',                 // 订单号
                paySn:'',                   // 支付单号
                orderStatus:'',             // 订单状态
                orderTotal:'',              // 订单总额
                shipping:'',                // 运费
                companyProfit:'',           // 公司利润
                orderProfit:'',             // 订单利润
                profitList:[],              // 分润列表

                goodsName:'',               // 商品名称
                goodsImage:'',              // 商品图
                goodsPrice:'',              // 商品价格
                price:'',                   // 实际支付
                costPrice:'',               // 成本价
                goodsSum:'',                // 数量
                profit:'',                  // 利润
                tax_rate:'',                // 税率

                showImg:false,
                layerImg:''

            }

        },
        created() {
            // 获取url参数
            this.orderId = this.$route.query.orderId
            this.$axios({
                method:'post',
                url: 'Order/vip_order_detail',
                data: {
                    order_id: this.orderId
                }
            })
                .then(res => {
                    this.memberName = res.data.data.buyer_name
                    this.storeName = res.data.data.store_name
                    this.tel = res.data.data.member_mobile
                    this.payType = res.data.data.payment_code
//                    this.payMoney = res.data.data.
                    this.orderTime = res.data.data.add_time
                    this.payTime = res.data.data.payment_time
//                    this.receiver = res.data.data.
//                    this.receiveTel = res.data.data.
//                    this.receiveAdd = res.data.data.

                    this.orderSn = res.data.data.order_sn
                    this.paySn = res.data.data.pay_sn
                    this.orderStatus = res.data.data.order_state
                    this.orderTotal = res.data.data.order_amount
                    this.shipping = res.data.data.shipping_fee
                    this.companyProfit = res.data.data.company_profit
                    this.orderProfit = res.data.data.order_profit
                    this.profitList = res.data.data.re_info

                    this.goodsName = res.data.data.goods.goods_name
                    this.goodsImage = res.data.data.goods.goods_image
                    this.goodsPrice = res.data.data.goods.goods_price
                    this.price = res.data.data.goods.price
                    this.costPrice = res.data.data.goods.cost_price
                    this.goodsSum = res.data.data.goods.goods_num
                    this.profit = res.data.data.goods.profit
                    this.tax_rate = res.data.data.goods.tax_rate

                    this.historyList = res.data.data.history



                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {
            returnBack() {
                history.go(-1)
            },
            // 点击放大图片
            biggerImg(e) {
                this.showImg = true
                this.layerImg = e.target.currentSrc
            },
            // 点击阴影
            closeLayer(){
                this.showImg = false
            }
        }
    }
</script>


<style scoped lang="scss">

    .el-breadcrumb {
        line-height: 30px;
    }

    .el-collapse {
        text-align: left;
        .orderInfoTitle ul {
            padding-left: 100px;
            margin-top: -26px;
            li {
                float: left;
                line-height: 36px;
                margin-right: 50px;
                span {
                    display: inline-block;
                    color: #3caaf7;
                    margin-right: 10px
                }
                b {
                    display: inline-block;
                    font-weight: normal;
                    margin-right: 10px
                }
                label {
                    display: inline-block;
                    color: #e4393c;
                }
            }
        }
    }

    .el-collapse-item__content p {
        padding-left: 40px;
        line-height: 40px;
        color: #242424;
    }

    .goodsInfo {
        width: 103%;
        height: 150px;
        padding-top: 30px;
        margin: 100px -15px 0;
        border-top: 14px solid #f2f2f2;
        background-color: #fff;
        .fl {
            margin-left: 15px;
            img {
                display: block;
                width: 200px;
                height: 120px;
                text-align: center;
                border: 1px solid #dcdcdc;
            }
        }
        .infoText {
            width: 66%;
            height: 120px;
            margin-left: 4%;
            background: linear-gradient(to bottom, #30dbdf, #42e1d3);
            border-radius: 10px;
            table {
                border: none;
                tr, td {
                    border: none;
                    color: #fff !important;
                }
                th {
                    line-height: 60px;
                    border:none;
                    background-color: transparent;
                }
            }

        }
    }


    .historyOperate {
        text-align: left;
        li {
            padding-left: 20px;
            color: #c6c5c5;
        }
    }

    .tip {
        font-size: 16px;
        padding-left: 0;
        border: none;
    }
    .img-view {
        .img-layer {
            position: fixed;
            left:0;
            top:0;
            width: 100%;
            height:100%;
            background-color: rgba(0,0,0,.6);
        }
        .img-img {
            img {
                display: block;
                position: absolute;
                top:50%;
                left:50%;
                margin-left: -300px;
                width: 600px;
                height:380px;
                z-index:99;
                border: 1px solid #dcdcdc;
            }
        }

    }
</style>
