<template>
    <div id="asider">
        <el-menu :default-active="onRoutes" theme="light" unique-opened router>
            <el-submenu :index="item.html_name" v-for="item in aside" :key="item.id">
                <template slot="title">
                    <router-link :to="{path:item.html_name}"><i
                        :class="item.html_name.replace(/\//,'')"></i>{{item.title}}
                    </router-link>
                </template>
                <el-menu-item :index="td.html_name" v-for="td in item.child" :key="item.id">{{td.title}}</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                aside: [],
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '')
            }
        },
        created() {
            this.$axios.post('login/admin_rules', {
                member_id:this.$memberId,
                member_type:this.$memberType,
            })
                .then(res=>{
                    this.aside = res.data.data
                })
                .catch(err=>{
                    console.log(err)
                })
            // this.aside = JSON.parse(localStorage.getItem('aside'))
        },
        watch: {},
        methods: {}
    }
</script>

<style scoped lang="scss">
    #asider {
        float: left;
        position: absolute;
        width: 160px;
        top: 60px;
        bottom: 0;
        left: 0;
        background-color: #fff;
        box-shadow: 0 0 2px #ffd6d7;
        text-align: left;
        .el-menu {
            background-color: #fff;
            .el-menu-item {
                text-indent: 24px;
                background-color: #fff;
            }
            .pandect, .ccqOrder, .vipRecharge, .message {
                text-indent: 0 !important;
            }
            a {
                display: block;
                color: #242424;
                i {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    margin-right: 6px;
                    vertical-align: middle;
                }
                .pandect, .agentManage, .carriorManage {
                    background: url('../../assets/image/image-count.png') -6px -6px;
                }

                .member, .agentMember, .carriorMember {
                    background: url('../../assets/image/image-count.png') -46px -6px;
                }

                .seller, .agentSeller, .carriorSeller {
                    background: url('../../assets/image/image-count.png') -210px -6px;
                }

                .agent, .subordinateAgent {
                    background: url('../../assets/image/image-count.png') -252px -6px;
                }

                .carrierOperator, .carriorAgent, .carriorCarrior {
                    background: url('../../assets/image/image-count.png') -294px -6px;
                }

                .ccqOrder {
                    background: url('../../assets/image/image-count.png') -378px -6px;
                }

                .vipRecharge {
                    background: url('../../assets/image/image-count.png') -420px -6px;
                }

                .message {
                    background: url('../../assets/image/image-count.png') -336px -6px;
                }

                .goods {
                    background: url('../../assets/image/image-count.png') -462px -6px;
                }

                .finance, .agentFinance, .carriorFinance {
                    background: url('../../assets/image/image-count.png') -496px -6px;
                }

                .activityManage {
                    background: url('../../assets/image/image-count.png') -532px -6px;
                }

                .otherPay {
                    background: url('../../assets/image/image-count.png') -570px -6px;
                }

                .power {
                    background: url('../../assets/image/image-count.png') -606px -6px;
                }

            }
        }
    }


</style>
