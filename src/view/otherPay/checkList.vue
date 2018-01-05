<template>
    <div>
        <el-row>
            <el-col>
                <h2>商家开通支付平台申请表</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <div class="fullIn"><label style="height: 20px;"></label></div>
            <div>
                <label>商家账号</label>
                <span>{{}}</span>
                <span style="width:60px;margin-left: 240px;">推荐人</span>
                <span style="width:120px;border-bottom: 1px solid #666;height:30px">12313213</span>
            </div>
            <div>
                <label>商家名称</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>商家简称</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>商家城市</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>商家地址</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>商家服务电话</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>组织机构代码</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>商家类型</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>经营类目</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>法人姓名</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>法人身份证号码</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>法人联系电话</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>法人手机</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>银行代码</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>开户行</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>开户账号</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>是否自动提取</label>
                <span>{{}}</span>
            </div>
            <div>
                <label>审核操作</label>
                <el-radio-group v-model="checkVal" @change="checkValChange">
                    <el-radio label="1">通过</el-radio>
                    <el-radio label="0">拒绝</el-radio>
                </el-radio-group>
                <el-input v-model="refuseReason" v-if="isRefuse" placeholder="请填写拒绝理由" size="small"></el-input>
                <span style="width:60px;margin-left: 160px;">审核人</span>
                <span style="width:120px;border-bottom: 1px solid #666;height:30px">当前登录者</span>
            </div>
            <div class="fullIn"><label style="height: 20px"></label></div>

            <div class="btn">
                <el-button @click="returnBack">取消</el-button>
                <el-button type="danger" @click="submit">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                refuseReason:'数据不符',
                checkVal:'1',
                isRefuse:false,

            }
        },
        created() {

        },
        methods: {
            // 通过/拒绝
            checkValChange(val) {
                this.checkVal = val
                if (val == 1) {
                    this.isRefuse = false
                } else {
                    this.isRefuse = true
                }
            },

            // 取消返回上一页
            returnBack() {
                history.go(-1)
            },
            // 提交
            submit() {

            }
        }
    }
</script>
<style lang="scss" scoped>
    .contentDiv {
        position: relative;
        .error {
            position: absolute;
            right: 20px;
            top: 20px;
        }
        .fullIn {
            height: 20px;
        }
        .btn {
            padding-top: 40px;
            .el-button {
                width: 120px;
                text-align: center;
            }
        }
        & > div {
            width: 100%;
            height: 40px;
            line-height: 40px;
            & > label {
                display: inline-block;
                width: 180px;
                float: left;
                background-color: #e65358;
                text-align: left;
                color: #fff;
                text-indent: 30px;
                margin-right: 20px;
            }
            .el-input {
                float: left;
                width: 200px;
                margin-left:40px ;
            }

            span {
                display: inline-block;
                text-align: left;
                float: left;
            }

        }
    }


</style>


