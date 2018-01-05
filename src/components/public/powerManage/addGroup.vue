<template>
    <div>
        <div class="contenDiv">
            <Group></Group>
        </div>
    </div>
</template>
<script>
    import Group from './group'
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        components:{ Group },
        methods: {

        }
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
                .el-checkbox {
                    span {
                        color: #999;
                        margin-left: 10px;
                    }
                }
                .el-checkbox-group {
                    margin-bottom: 30px;
                    margin-left: 30px;
                    .el-checkbox {
                        width: 120px;
                        margin: 6px 16px 0 0;
                    }
                }
            }
            .el-button {
                margin-left: 40px;
            }
        }
    }
</style>
