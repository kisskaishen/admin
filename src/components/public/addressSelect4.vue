<!--四级联动+详情地址----显示汉字-->
<template>
    <div>
        <!-- :model="form" :rules="rules" ref="form" -->
        <el-form>
            <el-row>

                <el-col>
                    <el-form-item>
                        <el-select v-model="province" placeholder="请选择省份" @change="proChange">
                            <el-option
                                v-for="item in provinces"
                                :key="item.province"
                                :label="item.label"
                                :value="item.name+'('+item.id+')'"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item>
                        <el-select v-model="city" placeholder="请选择市" @change="cityChange">
                            <el-option
                                v-for="item in cities"
                                :key="item.city"
                                :label="item.label"
                                :value="item.name+'('+item.id+')'"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>


                <el-col>
                    <el-form-item>
                        <el-select v-model="area" placeholder="请选择区" @change="areaChange">
                            <el-option
                                v-for="item in areas"
                                :key="item.area"
                                :label="item.label"
                                :value="item.name+'('+item.id+')'"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item>
                        <el-select v-model="street" placeholder="请选择/街道/镇" @change="streetChange">
                            <el-option
                                v-for="item in streets"
                                :key="item.street"
                                :label="item.label"
                                :value="item.name+'('+item.id+')'"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px;">
                <el-col>
                    <el-form-item>
                        <el-input v-model="detail" placeholder="请输入详情地址" @change="detailChange"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>

        </el-form>
    </div>
</template>
<script>

    export default {
        props: ['provinceValue', 'cityValue', 'areaValue', 'streetValue'],
        data() {
            return {
                provinces: [],
                cities: [],
                areas: [],
                streets: [],

                province: this.provinceValue,
                city: this.cityValue,
                area: this.areaValue,
                street: this.streetValue,
                detail:this.detailValue,

                provinceId: '',
                cityId: '',
                areaId: '',
                streetId: '',


            }
        },
        methods: {
            proChange(newVal) {
                this.provinceId = newVal.replace(/[^0-9]/ig, '')
                this.provinceVal = newVal.replace(/[^\u4e00-\u9fa5]+/ig, '')
                this.$emit('listenProvince', this.provinceVal)
                if (newVal) {
                    this.city = ''
                    this.area = ''
                    this.street = ''
                    this.detail = ''
                }
                this.$axios({
                    method: 'POST',
                    url: 'store/get_narea',
                    data: {
                        parent_id: this.provinceId
                    }
                })
                    .then(res => {
                        this.cities = res.data.data
                    })
                    .catch(err => {
                        console.log('err')
                    })


            },
            cityChange(newVal) {
                this.cityId = newVal.replace(/[^0-9]/ig, '')
                this.cityVal = newVal.replace(/[^\u4e00-\u9fa5]+/ig, '')
                this.$emit('listenCity', this.cityVal)
                if (newVal) {
                    this.area = ''
                    this.street = ''
                    this.detail = ''
                }
                this.$axios({
                    method: 'POST',
                    url: 'store/get_narea',
                    data: {
                        parent_id: this.cityId
                    }
                })
                    .then(res => {
                        this.areas = res.data.data
                    })
                    .catch(err => {
                        console.log('err')
                    })
            },
            areaChange(newVal) {
                this.areaId = newVal.replace(/[^0-9]/ig, '')
                this.areaVal = newVal.replace(/[^\u4e00-\u9fa5]+/ig, '')
                this.$emit('listenArea', this.areaVal)
                if (newVal) {
                    this.street = ''
                    this.detail = ''
                }
                this.$axios({
                    method: 'POST',
                    url: 'store/get_narea',
                    data: {
                        parent_id: this.areaId
                    }
                })
                    .then(res => {
                        this.streets = res.data.data
                    })
                    .catch(err => {
                        console.log('err')
                    })
            },
            streetChange(newVal) {
                this.streetId = newVal.replace(/[^0-9]/ig, '')
                this.streetVal = newVal.replace(/[^\u4e00-\u9fa5]+/ig, '')

                this.$emit('listenStreet', this.streetVal)
                if (newVal) {
                    this.detail = ''
                }
            },
            detailChange() {
                this.$emit('listenDetail',this.detail)
            }
        },
        watch: {
            provinceValue(val) {
                this.province = val
            },
            cityValue(val) {
                this.city = val
            },
            areaValue(val) {
                this.area = val
            },
            streetValue(val) {
                this.street = val
            },

        },
        created() {
            this.$axios.post('store/get_narea')
                .then(res => {
                    this.provinces = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })

        }
    }
</script>
<style scoped>
    .el-col {
        width: 180px;
        margin-right: 10px;
    }

    .el-input {
        width: 600px;
    }
</style>
