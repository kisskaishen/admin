<template>
    <div>
        <div class="switchDiv">
            <banner-block1 :bannerInfo="banner" @listenBanner1="getBanner1" @listenDelBanner1="delNum1" v-if="0<this.bannerLen"></banner-block1>
         
            <banner-block2 :bannerInfo="banner" @listenBanner2="getBanner2" @listenDelBanner2="delNum2" v-if="1<this.bannerLen"></banner-block2>
    
            <banner-block3 :bannerInfo="banner" @listenBanner3="getBanner3" @listenDelBanner3="delNum3" v-if="this.bannerLen==3"></banner-block3>

            


            <el-button type="primary" size="large" @click="addBanner" v-if="this.bannerLen != 3">添加banner</el-button>
            <el-button type="success" size="large" @click="uploadAll">批量更新图片</el-button>
        </div>

    </div>
</template>
<script>
    import BannerBlock1 from './bannerBlock1.vue'
    import BannerBlock2 from './bannerBlock2.vue'
    import BannerBlock3 from './bannerBlock3.vue'
    export default {
        data() {
            return {
                banner:[],
                bannerLen:'',

                banner2:false,
                banner3:false,


                bannerIdArr: [],                 // 轮播图id数据
                bannerUrlArr: [],                 // 轮播图url数据
              
            }
        },
        created() {
            this.$axios.post('Activity/banner')
                .then(res => {
                    if (res.data.code == 200) {
                        this.banner = res.data.data
                        this.bannerLen = this.banner.length
                        switch (this.bannerLen) {
                            case 1:
                                this.bannerIdArr.push(res.data.data[0].id)
                                this.bannerUrlArr.push(res.data.data[0].image)
                                break;
                            case 2:
                                this.bannerIdArr.push(res.data.data[0].id)
                                this.bannerUrlArr.push(res.data.data[0].image)
                                this.bannerIdArr.push(res.data.data[1].id)
                                this.bannerUrlArr.push(res.data.data[1].image)
                                break;
                            case 3:
                                this.bannerIdArr.push(res.data.data[0].id)
                                this.bannerUrlArr.push(res.data.data[0].image)
                                this.bannerIdArr.push(res.data.data[1].id)
                                this.bannerUrlArr.push(res.data.data[1].image)
                                this.bannerIdArr.push(res.data.data[2].id)
                                this.bannerUrlArr.push(res.data.data[2].image)
                                break;
                        }                     
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'warning',
                            duration: 1600
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        components:{ BannerBlock1,BannerBlock2,BannerBlock3 },

        methods: {
            // 添加banner
            addBanner() {
                this.bannerLen += 1
            },
            // 删除
            delNum1(val) {
                this.banner.splice(0,1)
            },
            delNum2(val) {
                this.banner.splice(1,1)
            },
            delNum3(val) {
                this.banner.splice(2,1)
            },
            getBanner1(data) {
                this.bannerUrlArr[0] = data.url
            },
            getBanner2(data) {
                this.bannerUrlArr[1] = data.url
            },
            getBanner3(data) {
                this.bannerUrlArr[2] = data.url
            },
            // 更新所有
            uploadAll() {
                this.$axios.post('Activity/update_banner_image', {
                    id: JSON.stringify(this.bannerIdArr),
                    image_url: JSON.stringify(this.bannerUrlArr)
                })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message:res.data.message,
                                type:'success',
                                duration:1600
                            })
                        } else {
                            this.$message({
                                message:res.data.message,
                                type:'warning',
                                duration:1600
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
    .switchDiv {
        .list {
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
            }
            .choose {
                width: 600px;
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
            }
        }
        .uploadDiv {
            position: absolute;
            left: 572px;
            .el-button {
                margin-right: 20px;
            }
        }
        .uploadDiv1 {
            top: 244px;
        }
        .uploadDiv2 {
            top: 524px;
        }
        .uploadDiv3 {
            top: 804px;
        }
    }

    .dialog {
        .el-input {
            width: 200px;
        }
    }
</style>
