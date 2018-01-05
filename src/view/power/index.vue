<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2>权限管理</h2>
            </el-col>
        </el-row>
        <div class="contentDiv">
            <div class="condition">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <router-link to="/power/index/manageList">
                            <el-button size="large" :class="{curr:button1curr}" @click="handleClick">管理员</el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="4">
                        <router-link to="/power/index/addManage">
                            <el-button size="large" :class="{curr:button2curr}" @click="handleClick">添加管理员
                            </el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="4">
                        <router-link to="/power/index/powerGroup">
                            <el-button size="large" :class="{curr:button3curr}" @click="handleClick">权限组
                            </el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="4">
                        <router-link to="/power/index/addGroup">
                            <el-button size="large" :class="{curr:button4curr}" @click="handleClick">
                                添加权限组
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
                button3curr: false,
                button4curr: false,
            }
        },
        created() {
            if (this.$route.path == '/power/index/manageList') {
                this.button1curr = true
            } else if (this.$route.path == '/power/index/addManage') {
                this.button1curr = false
                this.button2curr = true
            } else if (this.$route.path == '/power/index/powerGroup') {
                this.button1curr = false
                this.button3curr = true
            } else if (this.$route.path == '/power/index/addGroup') {
                this.button1curr = false
                this.button4curr = true
            }

        },
        methods: {
            handleClick(e) {
                switch (e.target.innerText) {
                    case '管理员':
                        this.button1curr = true
                        this.button2curr = false
                        this.button3curr = false
                        this.button4curr = false
                        break;
                    case '添加管理员':
                        this.button1curr = false
                        this.button2curr = true
                        this.button3curr = false
                        this.button4curr = false
                        break;
                    case '权限组':
                        this.button1curr = false
                        this.button2curr = false
                        this.button3curr = true
                        this.button4curr = false
                        break;
                    case '添加权限组':
                        this.button1curr = false
                        this.button2curr = false
                        this.button3curr = false
                        this.button4curr = true
                        break;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .condition {
        .el-button {
            width: 136px;
        }
        .curr {
            background-color: #e4393c;
            color: #fff;
            border: 1px solid #e4393c;
        }
    }


</style>
