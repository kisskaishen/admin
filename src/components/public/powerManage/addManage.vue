<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
            <el-form-item label="登录名称：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="登录密码：" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="passwordAgain">
                <el-input v-model="ruleForm.passwordAgain"></el-input>
            </el-form-item>
            <el-form-item label="权限组：" required>
                <el-select v-model="ruleForm.group">
                    <el-option
                        v-for="item in groups"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" size="large" @click="submit('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import md5 from 'js-md5'
    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    password: '',
                    passwordAgain: '',
                    group: ''
                },

                rules: {
                    name: [{required: true, message: '请输入登录名称', trigger: 'blur'}],
                    password: [
                        {required: true, message: '请输入登录密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    passwordAgain: [{required: true, message: '请再次输入登录密码', trigger: 'blur'}],
                },

                groups: [],

            }
        },
        created() {
            this.$axios.post('Index/g_class', {
                member_id: this.$memberId,
                member_type: this.$memberType
            })
                .then(res => {
                    this.groups = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {
            // submit
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.password == this.ruleForm.passwordAgain) {
                            this.$axios.post('Index/add_admin', {
                                member_id: this.$memberId,
                                member_type: this.$memberType,
                                admin_name: this.ruleForm.name,
                                password: md5(this.ruleForm.password),
                                admin_gid: this.ruleForm.group,
                            })
                                .then(res => {
                                    if (res.data.code == 200) {
                                        this.$message.success(res.data.message)
                                        this.$refs[formName].resetFields()
                                        this.ruleForm.group = ''
                                    } else {
                                        this.$message.error(res.data.message)
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        } else {
                            this.$message.warning('密码不一致！')
                        }

                    } else {
                        this.$message.warning('提交失败！')
                        return false;
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-form {
        border-top: 1px solid #999;
        .el-form-item {
            margin-top: 22px;
        }
        .el-input {
            float: left;
            width: 220px;
        }
        .el-button {
            float: left;
        }
        .el-select {
            float: left;
            width: 220px
        }
    }

</style>
