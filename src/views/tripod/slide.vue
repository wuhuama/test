<template>
    <div class="swiper-box">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index)  in slides" :key="index">
                    <img :src="item" :data-index="index">
                </div>
            </div>
        </div>
        <div class="swiper-add" id="add" @click="clickAdd">
            <img src="../../assets/left/add.png">
        </div>
        <div class="swiper-text" >
            <div>- 123 -</div>
            <div>name<span></span><span>5星</span></div>
        </div>
    </div>
</template>
<script>
    import Swiper from '../../../static/swiper.min.js';
    import '../../../static/swiper.min.css';
    export default {
        props: {
            slides: {
                type: Array,
            }
        },
        data() {
            return {
                mySwiper: {},
                status: 1,
            }
        },
        
        methods:{
            initSwiper(){
                this.mySwiper = new Swiper('.swiper-container', {
//                    loop: true,
//                    loopFillGroupWithBlank: true,
//                    grabCursor: true,
                    queueEndCallbacks: true,
                    centeredSlides: true,//
                    allowTouchMove: false, //不允许触摸滑动
                    slidesPerView: 3,//设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
                    slidesPerGroup: 1,
//                    watchSlidesProgress : true,
//                    watchSlidesVisibility : true,
                    spaceBetween: 20,
//                    slidesOffsetBefore: 100,
//                    slidesOffsetAfter  : 300,
                    initialSlide: 0,
                    observer:true,
                    observerParents:true,

                });
                this.$store.dispatch('getSwiperValue', this.mySwiper);
                var self = this;
                this.mySwiper.on('slideChangeTransitionEnd', function (swiper) { // 滑动之后执行
                    var $img = document.querySelector('.swiper-slide-active > img');
                    self.$store.dispatch('getSwiperIndex', $img.getAttribute('data-index')); // 得到第几张图片
                    console.log($img.getAttribute('data-index'), this.slides.length - 1);
                    if(this.isEnd) { //最后一个
                        self.status = 2 // 修改状态
                    }
                });
            },
            //点击下一张
            clickAdd(){
                if(this.status === 2){
                    this.mySwiper.slideTo(0, 1000, false); // 回跳到第一个
                    this.status = 1;
                    this.$store.dispatch('getSwiperIndex', 0); // 修改值，第一张图片
                } else {
                    this.mySwiper.slideNext();  // 下一张
                }
            },

        },
        mounted() {
            this.initSwiper();
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .swiper-box {
        position: relative;
        width: 408px;
        height: 248px;
        background: url('../../assets/left/bg.png') no-repeat;
        background-size: 100% auto;
    }
    .swiper-container {
        width: 300px;
        margin-left: 50px;
    }
    .swiper-slide {
        text-align: center;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .swiper-add {
        position: absolute;
        right: 12px;
        top: 82px;
    }
    .swiper-add img {
        width: 40px;
        height: 42px;
    }

    .swiper-text {
        color: #ffffff;
        text-align: center;
        line-height:32px;
        position: absolute;
        left: 50%;
        top: 78%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
    }
    .swiper-text div:last-child {
        color: #43FFD2;
        font-size: 18px;
        vertical-align: middle;
    }
    .swiper-text span:first-child {
        display: inline-block;
        width: 23px;
        height: 26px;
        margin: 0 4px 0 12px;
        vertical-align: middle;
        background: url('../../assets/left/level.png') no-repeat;
        background-size: 100% auto;
    }
    .swiper-text span:last-child {
        font-size: 12px;
        vertical-align: middle;
    }
    .swiper-wrapper {
        padding-top: 44px;
        height: 110px;
    }
  
    .swiper-slide img {
        width: 80px;
        height: 80px;
    }
    .swiper-slide-active img {
        width: 110px;
        height: 110px;
    }

</style>