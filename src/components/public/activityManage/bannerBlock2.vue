<template>
    <div>
        <div class="banner">
        2
            <div class="fl">
                <div class="file">
                    <img v-if="imgSrc" :src="imgSrc" class="avatar" alt="用户轮播图">
                    <i v-else class="el-icon-banner"></i>
                </div>
            </div>
            <div class="fl choose">
                <div><span>功能选择</span></div>
                <div>
                    <el-select v-model="type" @change="typeChange" style="width:200px;float:left;">
                        <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                    <el-input v-model="dataValue" style="width:100px;float:left;margin-left:20px"></el-input>
                    <el-button type="warning" size="small" style="width:80px;float:left;margin-left:20px" @click="showSubmit">确认修改</el-button>
                </div>
                <div class="uploadDiv">
                    <el-tooltip effect="dark" content="尺寸图片不得小于：750*400像素 或 比例不小于15:8" placement="top">
                        <el-button v-if="imgSrc"><input ref="files" type="file" name="avatar" @change="changeUpload"><span>更换图片</span></el-button>
                        <el-button v-else><input ref="files" type="file" name="avatar" @change="addUpload"><span>添加图片</span></el-button>
                    </el-tooltip>
                    <el-button type="danger" @click="deleteBanner">删除banner</el-button>
                </div>
            </div>
        </div>
        

        <el-dialog
            title="删除提示"
            :visible.sync="dialogVisible"
            size="tiny">
                <span>确定删除？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="danger" @click="sureDelDialog">确 定</el-button>
                </span>
        </el-dialog>

        <div class="dialog">
            <el-dialog
                title="提示信息"
                :visible.sync="showDialog"
                size="tiny"
                style="text-align: left">
                <p v-if="this.type == 0">展示会清除相应轮播图的所有链接，仅做展示图片</p>
                <el-form label-width="100px" v-else>
                    <el-form-item :label="labelText">
                        <el-input v-model="dataValue"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                        <el-button @click="showDialog = false">取 消</el-button>
                        <el-button type="danger" @click="showSubmit">提 交</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        props:['bannerInfo'],
        data() {
            return {
                showDialog: false,        // dialog

                dataValue:'',               // 填写内容
                labelText:'',               // dialog抬头信息

                banner2Info:'',             // banner2

                types:[
                    {
                        label:'仅展示图片',
                        value:'0'
                    },
                    {
                        label:'链接商品',
                        value:'1'
                    },
                    {
                        label:'链接商家',
                        value:'2'
                    },
                    {
                        label:'指定页面',
                        value:'3'
                    },
                    {
                        label:'领取一个月免费vip',
                        value:'11'
                    },
                    {
                        label:'跳转活动',
                        value:'12'
                    }
                ],
                type:'',

                imgSrc:'',
                dialogVisible:false,
                bannerId:'',
            }
        },
        created() {
            this.imgSrc = this.bannerInfo[1].image
            this.type = this.bannerInfo[1].item_type
            this.dataValue = this.bannerInfo[1].data
        },
        // computed:{
        //     banner() {          // banner信息
        //         return this.bannerInfo
        //     }
        // },
        methods: {
            // typeChange
            typeChange(val) {
                this.type = val
                
                switch (val) {
                    case '0':
                        this.labelText = '展示图片'
                        break;
                    case '1':
                        this.labelText = '链接商品'
                        break;
                    case '2':
                        this.labelText = '链接商家'
                        break;
                    case '3':
                        this.labelText = '指定页面'
                        break;
                    case '12':
                        this.labelText = '跳转活动'
                        break;
                }
                this.showDialog = true           // 选择完之后显示弹框
            },

            // 提交操作修改信息
            showSubmit () {
                this.$axios.post('Activity/update_banner', {
                    id: this.bannerId || this.bannerInfo[1].id,
                    item_type: this.type,
                    data:this.dataValue
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success',
                                duration: 1600
                            })
                            this.showDialog = false
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: 'error',
                                duration: 1600
                            })
                            this.showDialog = false
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
 
            },

            // 删除
            deleteBanner() {
                this.dialogVisible = true
            },
            // 确认删除
            sureDelDialog() {                
                this.$axios.post('Activity/del_banner',{
                    id:this.bannerInfo[1].id
                })
                    .then(res=>{ 
                        if (res.data.code == 200) {
                            this.$message.success(res.data.message)
                            this.dialogVisible = false
                            this.$emit('listenDelBanner2',1)
                            location.reload()

                        } else {
                            this.$message.error(res.data.message)
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            // 更改图片
            changeUpload(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 11)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.imgSrc = res.data.data.url
                            this.banner2Info = res.data.data
                            this.$emit('listenBanner2',this.banner2Info)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 添加图片
            addUpload(e) {
                e.preventDefault()
                let files = e.target.files
                let data = new FormData()
                data.append('image', files[0])
                data.append('type', 11)
                this.$upload({
                    method: 'post',
                    url: '',
                    data: data
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.imgSrc = res.data.data.url
                            this.banner2Info = res.data.data
                            this.$emit('listenBanner2',this.banner2Info)
                            this.$axios.post('Activity/add_banner',{
                                img_url:this.imgSrc,
                                item_type:'0' || this.type,
                                info:''
                            })
                                .then(res=>{
                                    if (res.data.code == 200) {
                                        this.$message.success(res.data.message)
                                        this.bannerId = res.data.data
                                    } else {
                                        this.$message.error(res.data.message)
                                    }
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>
<style lang="scss" scoped>

    .banner {
        height: 240px;
        padding: 20px 0;
        border-top: 1px solid #dcdcdc;
        .fl {
            width: 500px;
            margin-left: 30px;
            img {
                display: block;
                width: 450px;
                height: 240px;
                border: 1px solid #e4e4e4;
            }
            .file {
                width:450px;
                height: 240px;
                .el-icon-banner {
                    width:450px;
                    height: 240px;
                    background-size:100%;
                }
                input[type="file"] {
                    width:450px;
                    height: 240px;
                }
            }
        }
        .choose {
            width: 520px;
            div {
                width: 100%;
                margin-bottom: 10px;
                &:nth-child(1) {
                    text-align: left;
                    span {
                        display: block;
                        width: 200px;
                        line-height: 40px;
                        border-bottom: 1px solid #dcdcdc;
                    }
                }
                &:nth-child(2) {
                    height: 80px;
                    .el-button {
                        float: left;
                        width: 88px;
                        margin-right: 20px;
                    }
                }
            }
            .uploadDiv {
                text-align:left;
                .el-button {
                    position: relative;
                    margin-right: 20px;
                    height: 40px;
                    input[type="file"] {
                        width:160px;
                        opacity: 0;
                        filter: alpha(opacity=0);
                        z-index:999;

                    }
                    span {
                        position: absolute;
                        display: block;
                        width:60px;
                        left:50%;
                        margin-left:-30px;
                        top:34%;
                    }
                }
            }
        }
    }



    .dialog {
        .el-input {
            width: 200px;
        }
    }
</style>
