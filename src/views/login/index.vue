<template>
    <div class="login">
        <!-- <form action="#">
            <div class="form-item">
                <label for="">原数据
                    <input type="text" v-model="formLogin.pwd">
                </label>
                <div>
                    <button type="button" @click="encyInfo">加密</button>
                    <button type="button" @click="decryInfo">解密</button>
                </div>
                <div>
                    <input type="text" placeholder="加密数据..." v-model="formLogin.encypt_pwd">
                </div>
                <div>
                    <input type="text" placeholder="解密数据..." v-model="formLogin.decry_pwd">
                </div>
            </div>
        </form> -->
        <swiper :options="swiperOption1">
          <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">I'm Slide {{ slide }}</swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        
        <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间">
            </el-date-picker>
        </div>
        <div class="refreshcode">{{code}}</div>
    </div>
</template>
<script>
import axios from 'axios'
import Utils from '@/utils/utils.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    data(){
        return{
            value1: '',
            code:'',
            formLogin:{
                pwd: '',
                encypt_pwd:'',
                decry_pwd:'',
            },
            swiperOption: {
                autoplay: {
                    stopOnLastSlide: false
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            },
            swiperOption1: {
                pagination: {
                el: '.swiper-pagination'
                }
            },
            swiperSlides: [1, 2, 3, 4, 5]
        }
    },
    components:{
        swiper,
        swiperSlide
    },
    mounted() {
        // current swiper instance
        // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
        // console.log('this is current swiper instance object', this.swiper)
        // this.swiper.slideTo(3, 1000, false)

        // setInterval(() => {
        //     console.log('simulate async data')
        //     if (this.swiperSlides.length < 10) {
        //     this.swiperSlides.push(this.swiperSlides.length + 1)
        //     }
        // }, 3000)
        this.getcode()

    },
    beforeDestroy() {
        
    },
    destroyed() {
        this.formLogin = null
        this.swiperOption = null
        this.swiperOption1 = null
        this.swiperSlides = null
    },
    methods: {
        getcode () {
            axios.get('/refreshcode').then(res=>{
                console.log(res);
                this.code = `${res.data.data.authcode} ->>>${res.data.data.date}`
            })
        },
        encyInfo(){
            const asePwd = Utils.encrypt(this.formLogin.pwd)
            console.log(`加密后pwd:${asePwd}`);
            this.formLogin.encypt_pwd = asePwd
        },
        decryInfo(){
            const decodePwd = Utils.decrypt(this.formLogin.encypt_pwd)
            console.log(`解密后pwd:${decodePwd}`)
            this.formLogin.decry_pwd = decodePwd
        }
    },
}
</script>
<style lang="">
  @import 'swiper/dist/css/swiper.css';

    input{
        height: 30px;
        line-height: 30px;
        width: 300px;
        margin-bottom: 10px;
    }
</style>