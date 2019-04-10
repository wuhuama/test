<<template>
  <div class="test">
    <div class="wrapper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">I'm Slide {{ slide }}</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data () {
    return {
      swiperOption: {
        autoplay: {
            stopOnLastSlide: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      swiperSlides: [1, 2, 3, 4, 5]
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
        this.swiperSlides.push(this.swiperSlides.length + 1)
      }
    }, 3000)
  }
}
</script>
<style lang="">
  @import 'swiper/dist/css/swiper.css';

.swiper-container{
    height: 200px;
    border: 1px solid red;
  }
</style>