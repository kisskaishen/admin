<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item to="/activityManage">活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>地推管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="contentDiv">
            <div class="condition">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <router-link to="/activityManage/spreadManage/spreadList">
                            <el-button size="large" :class="{curr:button1curr}" @click="spreadList">地推订单列表</el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="4">
                        <router-link to="/activityManage/spreadManage/spreadJoinList">
                            <el-button size="large" :class="{curr:button2curr}" @click="spreadJoinList">地推人员列表
                            </el-button>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                button1curr: true,
                button2curr: false,
            }
        },
        created() {
            if (this.$route.path == '/activityManage/spreadManage/spreadList') {
                this.button1curr = true
                this.button2curr = false
            } else if (this.$route.path == '/activityManage/spreadManage/spreadJoinList') {
                this.button1curr = false
                this.button2curr = true
            }
        },
        methods: {
            spreadList() {
                this.button1curr = true
                this.button2curr = false
            },
            spreadJoinList() {
                this.button1curr = false
                this.button2curr = true
            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-breadcrumb {
        line-height:30px;
    }
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

