<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>活动管理</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <div class="condition">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <router-link to="/activityManage/index/banner">
                            <el-button size="large" :class="{curr:button1curr}" @click="bannerClick">用户轮播图</el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="4">
                        <router-link to="/activityManage/index/goodsList">
                            <el-button size="large" :class="{curr:button2curr}" @click="goodsListClick">商品推荐列表
                            </el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="4">
                        <router-link to="/activityManage/index/message">
                            <el-button size="large" :class="{curr:button3curr}" @click="messageSendClick">短信推送
                            </el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="4">
                        <router-link to="/activityManage/index/vipData">
                            <el-button size="large" :class="[{curr:button4curr},'bigger']" @click="vipDataClick">
                                3个月VIP活动数据
                            </el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="large" disabled>APP信息推送</el-button>
                    </el-col>
                </el-row>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import Banner from '@/components/public/activityManage/banner'
    import GoodsList from '@/components/public/activityManage/goodsList'
    import Message from '@/components/public/activityManage/message'

    export default {
        data() {
            return {
                button1curr: true,
                button2curr: false,
                button3curr: false,
                button4curr: false,
            }
        },
        components: {
            Banner,
            GoodsList,
            Message
        },
        created() {
            if (this.$route.path == '/activityManage/index/banner') {
                this.button1curr = true
            } else if (this.$route.path == '/activityManage/index/goodsList') {
                this.button1curr = false
                this.button2curr = true
            } else if (this.$route.path == '/activityManage/index/message') {
                this.button1curr = false
                this.button3curr = true
            } else if (this.$route.path == '/activityManage/index/vipData') {
                this.button1curr = false
                this.button4curr = true
            }

        },
        methods: {
            bannerClick() {
                this.button1curr = true
                this.button2curr = false
                this.button3curr = false
                this.button4curr = false
                this.button5curr = false
            },
            goodsListClick() {
                this.button1curr = false
                this.button2curr = true
                this.button3curr = false
                this.button4curr = false
                this.button5curr = false
            },
            messageSendClick() {
                this.button1curr = false
                this.button2curr = false
                this.button3curr = true
                this.button4curr = false
                this.button5curr = false
            },
            vipDataClick() {
                this.button1curr = false
                this.button2curr = false
                this.button3curr = false
                this.button4curr = true
                this.button5curr = false
            },
 
        }
    }
</script>
<style lang="scss" scoped>
    .condition {
        .el-button {
            width: 136px;
        }
        .bigger {
            width: 200px;
        }
        .curr {
            background-color: #e4393c;
            color: #fff;
            border: 1px solid #e4393c;
        }
    }


</style>
