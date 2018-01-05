<template>
    <div>
        <div class="contentDiv">
            <p>列表</p>
            <el-checkbox-group v-model="checkedGroup">
                <el-checkbox
                    v-for="item,index in groups"
                    :label="item.id"
                    :key="item.id"
                    @change="changeGroup(item,index)">{{item.title}}
                </el-checkbox>
            </el-checkbox-group>

            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="changeAllGroup">全选</el-checkbox> -->
            <el-tooltip class="item" effect="dark" content="仅支持单个删除" placement="bottom">
                <el-button @click="deleteBtn" :disabled="disabledVal">删除</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="仅支持单个编辑" placement="right">
                <el-button type="primary" @click="editBtn" :disabled="disabledVal">编辑</el-button>
            </el-tooltip>
        </div>
        <el-dialog title="编辑权限组" :visible.sync="dialogEditVisible">
            <Group :id="parseInt(checkedGroup)"></Group>
        </el-dialog>
    </div>
</template>
<script>
    import Group from './group'

    export default {
        data() {
            return {
                checkAll: true,
                checkedGroup: [],
                groups: [],
                groupsId: [],

                checkedId:'',       // id
                isIndeterminate: true,
                userInfo: '',
                num: '',
                disabledVal: false,

                dialogEditVisible: false,
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
        components: {Group},
        methods: {
            // 单选一个
            changeGroup(val, index) {
                this.checkedId = val.id
                this.num = index
                this.disabledVal = this.checkedGroup.length > 1 ? true : false                
            },
            // // 全选
            // changeAllGroup(e) {
            //     for (let i = 0; i < this.groups.length; i++) {
            //         this.groupsId.push(this.groups[i].id)
            //     }
            //     this.groupsId = e.target.checked ? this.groupsId : []
            //     this.checkedGroup = e.target.checked ? this.groupsId : []
            //     this.isIndeterminate = false
            //     this.disabledVal = e.target.checked ? true : false
            // },
            // 删除
            deleteBtn() {
                this.$axios.post('Index/del_group', {
                    member_id: this.$memberId,
                    member_type: this.$memberType,
                    group_id: this.checkedId
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message)
                            this.groups.splice(this.num, 1)
                        } else {
                            this.$message.warning(res.data.message)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 编辑
            editBtn() {
                this.dialogEditVisible = true
            },
        }
    }
</script>
<style lang="scss" scoped>


    .contentDiv {
        text-align: left;
        padding: 30px;
        .el-checkbox-group {
            padding: 20px;
        }
        .el-checkbox {
            width: 100%;
            margin: 10px 0;
        }
    }
</style>
