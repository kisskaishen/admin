<template>
    <div>
        <div class="contenDiv">
            <div class="title">
                <p class="tip">权限组</p>
                <el-input v-model="newGroupName" placeholder="请输入新建的权限组名"></el-input>
            </div>
            <div class="group">
                <p class="tip">设置权限组</p>

                <div class="list">
                    <div>
                        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="changeAllGroup">
                            {{groupsInfo.title}} <span>(勾选选全部)</span></el-checkbox> -->
                        {{groupsInfo.title}}
                    </div>

                    <ul>
                        <li>
                            <el-checkbox v-model="checkAll0" @change="changeAllGroup0" class="child2">
                                {{groups0.title}}
                            </el-checkbox>
                            <el-checkbox-group v-model="checkChild0" class="child3" @change="child3Change0">
                                <el-checkbox
                                    v-for="item in groups0.child"
                                    :label="item.id"
                                    :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li>
                            <el-checkbox v-model="checkAll1" @change="changeAllGroup1" class="child2">
                                {{groups1.title}}
                            </el-checkbox>
                            <el-checkbox-group v-model="checkChild1" class="child3" @change="child3Change1">
                                <el-checkbox
                                    v-for="item in groups1.child"
                                    :label="item.id"
                                    :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li>
                            <el-checkbox v-model="checkAll2" @change="changeAllGroup2" class="child2">
                                {{groups2.title}}
                            </el-checkbox>
                            <el-checkbox-group v-model="checkChild2" class="child3" @change="child3Change2">
                                <el-checkbox
                                    v-for="item in groups2.child"
                                    :label="item.id"
                                    :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li>
                            <el-checkbox v-model="checkAll3" @change="changeAllGroup3" class="child2">
                                {{groups3.title}}
                            </el-checkbox>
                            <el-checkbox-group v-model="checkChild3" class="child3" @change="child3Change3">
                                <el-checkbox
                                    v-for="item in groups3.child"
                                    :label="item.id"
                                    :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li>
                            <el-checkbox v-model="checkAll4" @change="changeAllGroup4" class="child2">
                                {{groups4.title}}
                            </el-checkbox>
                            <el-checkbox-group v-model="checkChild4" class="child3" @change="child3Change4">
                                <el-checkbox
                                    v-for="item in groups4.child"
                                    :label="item.id"
                                    :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li>
                            <el-checkbox v-model="checkAll5" @change="changeAllGroup5" class="child2">
                                {{groups5.title}}
                            </el-checkbox>
                            <el-checkbox-group v-model="checkChild5" class="child3" @change="child3Change5">
                                <el-checkbox
                                    v-for="item in groups5.child"
                                    :label="item.id"
                                    :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li>
                            <el-checkbox v-model="checkAll6" @change="changeAllGroup6" class="child2">
                                {{groups6.title}}
                            </el-checkbox>
                            <el-checkbox-group v-model="checkChild6" class="child3" @change="child3Change6">
                                <el-checkbox
                                    v-for="item in groups6.child"
                                    :label="item.id"
                                    :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li>
                            <el-checkbox v-model="checkAll7" @change="changeAllGroup7" class="child2">
                                {{groups7.title}}
                            </el-checkbox>
                            <el-checkbox-group v-model="checkChild7" class="child3" @change="child3Change7">
                                <el-checkbox
                                    v-for="item in groups7.child"
                                    :label="item.id"
                                    :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li>
                            <el-checkbox v-model="checkAll8" @change="changeAllGroup8" class="child2">
                                {{groups8.title}}
                            </el-checkbox>
                            <el-checkbox-group v-model="checkChild8" class="child3" @change="child3Change8">
                                <el-checkbox
                                    v-for="item in groups8.child"
                                    :label="item.id"
                                    :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li>
                            <el-checkbox v-model="checkAll9" @change="changeAllGroup9" class="child2">
                                {{groups9.title}}
                            </el-checkbox>
                            <el-checkbox-group v-model="checkChild9" class="child3" @change="child3Change9">
                                <el-checkbox
                                    v-for="item in groups9.child"
                                    :label="item.id"
                                    :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                        <li>
                            <el-checkbox v-model="checkAll10" @change="changeAllGroup10" class="child2">{{groups10.title}}</el-checkbox>
                            <el-checkbox-group v-model="checkChild10" class="child3" @change="child3Change10">
                                <el-checkbox
                                    v-for="item in groups10.child"
                                    :label="item.id"
                                    :key="item.id">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </li>
                    </ul>
                </div>

                <el-button type="danger" size="large" @click="submitBtn">提交</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['id'],
        data() {
            return {
                newGroupName: '',
                isIndeterminate: true,

                checkAll: true,
                groupsInfo: '',
                groups: [],
                checkedGroup: [],

                groups0: [],                 // 概况
                checkAll0: false,             // 全选 ,true->checkChild0全部选择,false->checkChild0=[]
                checkChild0: [],             // 二级已选的数组,单选数组内容+1
                arr0: [],                    // 数组id

                groups1: [],
                checkAll1: false,
                checkChild1: [],
                arr1: [],

                groups2: [],
                checkAll2: false,
                checkChild2: [],
                arr2: [],

                groups3: [],
                checkAll3: false,
                checkChild3: [],
                arr3: [],

                groups4: [],
                checkAll4: false,
                checkChild4: [],
                arr4: [],

                groups5: [],
                checkAll5: false,
                checkChild5: [],
                arr5: [],

                groups6: [],
                checkAll6: false,
                checkChild6: [],
                arr6: [],

                groups7: [],
                checkAll7: false,
                checkChild7: [],
                arr7: [],

                groups8: [],
                checkAll8: false,
                checkChild8: [],
                arr8: [],

                groups9: [],
                checkAll9: false,
                checkChild9: [],
                arr9: [],

                groups10: [],
                checkAll10: false,
                checkChild10: [],
                arr10: [],



                objArr:[]

            }
        },
        created() {
            if (this.id) {
                // 根据id值获取信息
                this.$axios.post('Index/power_group', {
                    member_id: this.$memberId,
                    member_type: this.$memberType,
                    id: this.id
                })
                    .then(res => {
                        this.checkChild0 = []
                        this.checkChild1 = []
                        this.checkChild2 = []
                        this.checkChild3 = []
                        this.checkChild4 = []
                        this.checkChild5 = []
                        this.checkChild6 = []
                        this.checkChild7 = []
                        this.checkChild8 = []
                        this.checkChild9 = []
                        this.checkChild10 = []
                        this.newGroupName = res.data.data.title

                        this.groups0 = res.data.data.list[0]
                        for(let i=0;i<this.groups0.child.length;i++) {
                            if (this.groups0.child[i].is_default == 1) {
                                this.checkChild0.push(this.groups0.child[i].id)
                            }
                        }

                        this.groups1 = res.data.data.list[1]
                        for(let i=0;i<this.groups1.child.length;i++) {
                            if (this.groups1.child[i].is_default == 1) {
                                this.checkChild1.push(this.groups1.child[i].id)
                            }
                        }

                        this.groups2 = res.data.data.list[2]
                        for(let i=0;i<this.groups2.child.length;i++) {
                            if (this.groups2.child[i].is_default == 1) {
                                this.checkChild2.push(this.groups2.child[i].id)
                            }
                        }

                        this.groups3 = res.data.data.list[3]
                        for(let i=0;i<this.groups3.child.length;i++) {
                            if (this.groups3.child[i].is_default == 1) {
                                this.checkChild3.push(this.groups3.child[i].id)
                            }
                        }

                        this.groups4 = res.data.data.list[4]
                        for(let i=0;i<this.groups4.child.length;i++) {
                            if (this.groups4.child[i].is_default == 1) {
                                this.checkChild4.push(this.groups4.child[i].id)
                            }
                        }

                        this.groups5 = res.data.data.list[5]
                        for(let i=0;i<this.groups5.child.length;i++) {
                            if (this.groups5.child[i].is_default == 1) {
                                this.checkChild5.push(this.groups5.child[i].id)
                            }
                        }

                        this.groups6 = res.data.data.list[6]
                        for(let i=0;i<this.groups6.child.length;i++) {
                            if (this.groups6.child[i].is_default == 1) {
                                this.checkChild6.push(this.groups6.child[i].id)
                            }
                        }

                        this.groups7 = res.data.data.list[7]
                        for(let i=0;i<this.groups7.child.length;i++) {
                            if (this.groups7.child[i].is_default == 1) {
                                this.checkChild7.push(this.groups7.child[i].id)
                            }
                        }

                        this.groups8 = res.data.data.list[8]
                        for(let i=0;i<this.groups8.child.length;i++) {
                            if (this.groups8.child[i].is_default == 1) {
                                this.checkChild8.push(this.groups8.child[i].id)
                            }
                        }

                        this.groups9 = res.data.data.list[9]
                        for(let i=0;i<this.groups9.child.length;i++) {
                            if (this.groups9.child[i].is_default == 1) {
                                this.checkChild9.push(this.groups9.child[i].id)
                            }
                        }

                        this.groups10 = res.data.data.list[10]
                        for(let i=0;i<this.groups10.child.length;i++) {
                            if (this.groups10.child[i].is_default == 1) {
                                this.checkChild10.push(this.groups10.child[i].id)
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                 // 获取全部权限信息
                this.$axios.post('Index/rules_list', {
                    member_id: this.$memberId,
                    member_type: this.$memberType
                })
                    .then(res => {
                        this.groupsInfo = res.data.data
                        this.groups = res.data.data.data
                        this.groups0 = res.data.data.data[0]
                        this.groups1 = res.data.data.data[1]
                        this.groups2 = res.data.data.data[2]
                        this.groups3 = res.data.data.data[3]
                        this.groups4 = res.data.data.data[4]
                        this.groups5 = res.data.data.data[5]
                        this.groups6 = res.data.data.data[6]
                        this.groups7 = res.data.data.data[7]
                        this.groups8 = res.data.data.data[8]
                        this.groups9 = res.data.data.data[9]
                        this.groups10 = res.data.data.data[10]
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
           

        },
        methods: {

            // 提交
            submitBtn() {
                this.$axios.post('Index/add_group', {
                    member_id: this.$memberId,
                    member_type: this.$memberType,
                    title: this.newGroupName,
                    rules: JSON.stringify(this.objArr.concat(this.arr0,this.arr1,this.arr2,this.arr3,this.arr4,this.arr5,this.arr6,this.arr7,this.arr8,this.arr9,this.arr10)),
                    id:this.id || ''
                })
                    .then(res => {
                        if (this.newGroupName == '') {
                            this.$message.error('请输入新建权限组名！')
                        } else {
                            if (res.data.code == 200) {
                                this.$message.success(res.data.message)
                                this.newGroupName = ''
                                this.$router.push({
                                    path:'/power/index/powerGroup'
                                })
                            } else {
                                this.$message.error(res.data.message)
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },


            // 概况
            changeAllGroup0(e) {
                this.arr0 = []
                for (let i = 0; i < this.groups0.child.length; i++) {
                    this.arr0.push(this.groups0.child[i].id)
                }
                this.checkChild0 = e.target.checked ? this.arr0 : []
            },
            child3Change0(val) {
                let checkedCount = val.length
                this.checkAll0 = checkedCount === this.groups0.child.length
                this.arr0 = val
            },

            changeAllGroup1(e) {
                this.arr1 = []
                for (let i = 0; i < this.groups1.child.length; i++) {
                    this.arr1.push(this.groups1.child[i].id)
                }
                this.checkChild1 = e.target.checked ? this.arr1 : []
            },
            child3Change1(val) {
                let checkedCount = val.length
                this.checkAll1 = checkedCount === this.groups1.child.length
                this.arr1 = val
            },

            changeAllGroup2(e) {
                this.arr2 = []
                for (let i = 0; i < this.groups2.child.length; i++) {
                    this.arr2.push(this.groups2.child[i].id)
                }
                this.checkChild2 = e.target.checked ? this.arr2 : []
            },
            child3Change2(val) {
                let checkedCount = val.length
                this.checkAll2 = checkedCount === this.groups2.child.length
                this.arr2 = val
            },


            changeAllGroup3(e) {
                this.arr3 = []
                for (let i = 0; i < this.groups3.child.length; i++) {
                    this.arr3.push(this.groups3.child[i].id)
                }
                this.checkChild3 = e.target.checked ? this.arr3 : []
            },
            child3Change3(val) {
                let checkedCount = val.length
                this.checkAll3 = checkedCount === this.groups3.child.length
                this.arr3 = val
            },

            changeAllGroup4(e) {
                this.arr4 = []
                for (let i = 0; i < this.groups4.child.length; i++) {
                    this.arr4.push(this.groups4.child[i].id)
                }
                this.checkChild4 = e.target.checked ? this.arr4 : []
            },
            child3Change4(val) {
                let checkedCount = val.length
                this.checkAll4 = checkedCount === this.groups4.child.length
                this.arr4 = val
            },

            changeAllGroup5(e) {
                this.arr5 = []
                for (let i = 0; i < this.groups5.child.length; i++) {
                    this.arr5.push(this.groups5.child[i].id)
                }
                this.checkChild5 = e.target.checked ? this.arr5 : []
            },
            child3Change5(val) {
                let checkedCount = val.length
                this.checkAll5 = checkedCount === this.groups5.child.length
                this.arr5 = val
            },

            changeAllGroup6(e) {
                this.arr6 = []
                for (let i = 0; i < this.groups6.child.length; i++) {
                    this.arr6.push(this.groups6.child[i].id)
                }
                this.checkChild6 = e.target.checked ? this.arr6 : []
            },
            child3Change6(val) {
                let checkedCount = val.length
                this.checkAll6 = checkedCount === this.groups6.child.length
                this.arr6 = val
            },

            changeAllGroup7(e) {
                this.arr7 = []
                for (let i = 0; i < this.groups7.child.length; i++) {
                    this.arr7.push(this.groups7.child[i].id)
                }
                this.checkChild7 = e.target.checked ? this.arr7 : []
            },
            child3Change7(val) {
                let checkedCount = val.length
                this.checkAll7 = checkedCount === this.groups7.child.length
                this.arr7 = val
            },

            changeAllGroup8(e) {
                this.arr8 = []
                for (let i = 0; i < this.groups8.child.length; i++) {
                    this.arr8.push(this.groups8.child[i].id)
                }
                this.checkChild8 = e.target.checked ? this.arr8 : []
            },
            child3Change8(val) {
                let checkedCount = val.length
                this.checkAll8 = checkedCount === this.groups8.child.length
                this.arr8 = val
            },

            changeAllGroup9(e) {
                this.arr9 = []
                for (let i = 0; i < this.groups9.child.length; i++) {
                    this.arr9.push(this.groups9.child[i].id)
                }
                this.checkChild9 = e.target.checked ? this.arr9 : []
            },
            child3Change9(val) {
                let checkedCount = val.length
                this.checkAll9 = checkedCount === this.groups9.child.length
                this.arr9 = val
            },

            changeAllGroup10(e) {
                this.arr10 = []
                for (let i = 0; i < this.groups10.child.length; i++) {
                    this.arr10.push(this.groups10.child[i].id)
                }
                this.checkChild10 = e.target.checked ? this.arr10 : []
            },
            child3Change10(val) {
                let checkedCount = val.length
                this.checkAll10 = checkedCount === this.groups10.child.length
                this.arr10 = val
            }



        },
    }
</script>
<style lang="scss" scoped>
    .contenDiv {
        .tip {
            color: #333;
            font-size: 16px;
            line-height: 40px;
        }
        .title {
            height: 100px;
            padding: 0 20px;
            text-align: left;
            border-bottom: 1px solid #dcdcdc;
            .el-input {
                width: 240px;
                margin-left: 30px;
            }
            .el-button {

            }
        }
        .group {
            padding: 0 20px;
            text-align: left;
            .list {
                padding: 0 30px;
                /*height: 560px;*/
                .el-checkbox {
                    span {
                        color: #999;
                        margin-left: 10px;
                    }
                }
                ul {
                    li {
                        margin-top: 14px;
                        .el-checkbox-group {
                            display: inline-block;
                        }
                        .child2 {
                            width: 140px;
                        }

                        .child3 {
                            .el-checkbox {
                                width: 120px;
                                margin-left:0;
                                padding-left: 10px;
                                font-size: 14px;
                            }

                        }
                    }
                }

            }
            .el-button {
                margin-left: 40px;
            }
        }
    }
</style>
<style lang="scss">
    .child2 {
        .el-checkbox__label {
            font-weight: bolder;
        }
    }

    .child3 {
        .el-checkbox__label {
            font-size: 14px;
        }
    }
</style>
