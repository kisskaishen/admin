<template>
    <div>
        <table>
            <tr>
                <th>登录名</th>
                <th>上次登录</th>
                <th>登陆次数</th>
                <th>权限组</th>
                <th>操作</th>
            </tr>
            <tr v-for="item,index in list">
                <td>{{item.admin_name}}</td>
                <td>{{item.admin_login_time}}</td>
                <td>{{item.admin_login_num}}</td>
                <td>{{item.title}}</td>
                <td>
                    <span class="curr5" @click="editDiolog(item)">{{item.is_modify}}</span>
                    <em v-if="item.is_modify">|</em>
                    <span class="curr" @click="deleteBtn(index,item)">{{item.is_delete}}</span>
                </td>
            </tr>
        </table>
        <el-dialog title="编辑管理员" :visible.sync="dialogEditVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
                <el-form-item label="登录名称：" prop="name">
                    <el-input v-model="ruleForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="登录密码：" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="密码不修改可不填"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="passwordAgain">
                    <el-input v-model="ruleForm.passwordAgain" placeholder="密码不修改可不填"></el-input>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog
          title="提示"
          :visible.sync="dialogDeleteVisible"
          size="tiny">
          <span>确认删除？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDeleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureDeteleBtn">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
    import md5 from 'js-md5'

    export default {
        data() {
            return {
                list: [],
                dialogEditVisible: false,
                // 编辑信息
                ruleForm: {
                    name: '',
                    password: '',
                    passwordAgain: '',
                    group: ''
                },

                rules: {
                    name: [{required: true, message: '登录名称不能为空', trigger: 'blur'}],
                },

                groups: [],
                adminVal: '',            // 对象信息

                dialogDeleteVisible:false,
                adminArrId:'',
                _num:1


            }
        },
        created() {
            this.$axios.post('Index/admin_list', {
                member_id: this.$memberId,
                member_type: this.$memberType
            })
                .then(res => {
                    this.list = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {

            // 编辑显示dialog
            editDiolog(val) {
                console.log(val)
                this.adminVal = val
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
                this.dialogEditVisible = true
                this.ruleForm.name = val.admin_name
                this.ruleForm.group = val.gname
            },
            // 确定编辑管理员
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.password != this.ruleForm.passwordAgain) {
                            this.$message.warning('密码不一致！')
                        } else {
                            this.$axios.post('Index/add_admin', {
                                member_id: this.$memberId,
                                member_type: this.$memberType,
                                admin_id: this.adminVal.admin_id,
                                password: this.ruleForm.password == '' ? '' : md5(this.ruleForm.password),
                                admin_gid: this.ruleForm.group,
                            })
                                .then(res => {
                                    if (res.data.code == 200) {
                                        this.$message.success(res.data.message)
                                        this.dialogEditVisible = false
                                        setTimeout(function () {
                                            location.reload()
                                        }, 1600)
                                    } else {
                                        this.$message.error(res.data.message)
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    }
                })
            },
            // 删除
            deleteBtn(index, val) {
                this.dialogDeleteVisible = true            
                this.adminArrId = val.admin_id
                this._num = index
            },
            // 确认删除
            sureDeteleBtn() {
                this.$axios.post('Index/del_admin', {
                    member_id: this.$memberId,
                    member_type: this.$memberType,
                    admin_id: this.adminArrId
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message)
                            this.dialogDeleteVisible = false
                            this.list.splice(this._num, 1)

                        } else {
                            this.$message.error(res.data.message)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
        }
    }
</script>
<style lang="scss" scoped>
    .el-checkbox {
        margin-right: 10px;
    }

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
