<template>
    <div id="app">
        <v-header></v-header>
        <v-asider></v-asider>

        <div class="content">
            <keep-alive>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </keep-alive>
        </div>


    </div>
</template>

<script>

    import vHeader from './components/public/header.vue'
    import vAsider from './components/public/asider.vue'


    export default {
        name: 'app',
        components: {
            vHeader, vAsider
        }

    }
</script>

<style>
    @import "./assets/css/base.css";
</style>
