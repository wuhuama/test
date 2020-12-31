<template>
  <div @mouseleave="startPlay()" @mouseenter="stopPlay()">
    <swiper :options="swiperOption" class="wrapper" ref="mySwiper" v-if="swiperSlides.length>0">
      <swiper-slide class="item" v-for="(slide, index) in swiperSlides" :key="index">
        
        <div v-for="(item, ind) in slide" :key="ind">我是{{item}}</div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>

import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay:{
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          loop: true,
          speed:500,
          direction : 'vertical',
          debugger: true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper 
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          observeSlideChildren: true,
        },
        swiperSlides: [],
        list: [{a:1},{a:2},{a:3},{a:4},{a:5},{a:6},{a:7},{a:8}]
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    mounted() {
      setInterval(() => {
        console.log('simulate async data')
        if (this.swiperSlides.length < 10) {
          let random = Math.floor(Math.random()*10+11)
          this.list.push({a:random})
          this.getData()
        }
      }, 3000)
      this.getData()
    },
    methods: {
      getData () {
        var data = this.list;
        var result = [];
        var chunk = 4;
        for (var i = 0, j = data.length; i < j; i += chunk) {
          this.swiperSlides.push(data.slice(i, i + chunk));
        }
        console.log(this.swiperSlides);
      },
      startPlay () {
        setTimeout(() => {
          this.swiper.autoplay.start()
        }, 300);
      },
      stopPlay () {
        console.log(this.swiper);
        this.swiper.autoplay.stop()
      }
    },
  }
</script>
<style >
.wrapper {
  height: 360px;
  border: 1px solid red;
}

  .swiper-slide {
    height: 50px;
    background: #ccc;
  }
</style>