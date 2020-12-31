<template>
  <swiper :options="swiperOption" class="wrapper" ref="mySwiper" v-if="swiperSlides.length>1">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">I'm Slide {{ slide }}</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
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
          speed:500,
          direction : 'vertical',
          slidesPerView: 6,
          slidesPerGroup: 6,
          spaceBetween: 10,
          debugger: true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper 
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          observeSlideChildren: true,
        },
        swiperSlides: [1, 2, 3, 4, 5],
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
        console.log(this.swiper);
        if (this.swiperSlides.length < 10) {
          this.swiperSlides.push(this.swiperSlides.length + 1)
        }
      }, 3000)
    }
  }
</script>
<style lang="">
.wrapper {
  height: 360px;
  border: 1px solid red;
}
  .swiper-slide {
    height: 50px;
    background: #ccc;
  }
</style>