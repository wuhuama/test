<template>
  <div class="tripod-container">
    <!-- 主体 -->
    <div class="map-box">
      <div class="border_line">
        <span class="tr"></span>
        <span class="tb"></span>
        <span class="rt"></span>
        <span class="rb"></span>
      </div>
      <!-- 地图展示 -->
      <div id="map_container" class="map_container map_2d" ref="map_container_2d"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import amap from 'echarts-extension-amap'
// import { isEmpty, deepClone } from '@/utils'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import { FILE_PATH } from '@/config'
const btn_groups = ['3D地图', '平面地图']
const colors = [['#008B8Bff', '#00008Bff', '#8B008Bff', '#8B0000ff'],//图例颜色
                ['#696969ff','#ccccccff','#828282ff'], // 灰色板块
                [ '#bbffffff','#00f5ffff','#00c5cdff','#00868bff','#7fffd4ff', //区域板块
                  '#66cdaaff','#c1ffc1ff','#9bcd9bff','#54ff9fff','#43cd80ff']]
let map_3d = null, map = null, map_flat = null, optionMap = null
export default {
  data () {
    return {
      swiperOption: {
        // loop: true, // loop会导致循环第二遍时第一张图出现空白
        // autoplay:true
        autoplay:{
          delay: 2500,
          disableOnInteraction: true,
        }
      },
      // map_3d: {},
      // map: {}, // 2个区域时平面地图
      // optionMap: {}, // 区域选择地图
      // map_flat: {}, // 平面地图底层
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
  created (){
    console.log('创建之前',this.listQuery)
  },
  mounted(){
    this.initMap()
    // this.init3DMap()
    // this.initMap_flat()
  },
  beforeDestroy() {
    console.log('销毁之前',this)
  },
  destroyed () {
    console.log('销毁之后',this);
  },
  methods: {
    initMap () {
      const self = this
      this.echartmap = this.$echarts.init(this.$refs.map_container_2d);
      const option = {
        amap: {
          // 高德地图中心经纬度
          center: [120.4480204540896, 30.624303172444428],
          // 高德地图缩放
          zoom: 11,
          // 启用resize
          resizeEnable: true,
          // 自定义地图样式主题
          mapStyle: 'amap://styles/grey',
          viewMode:'2D',//使用3D视图
        },
        tooltip : {
          trigger: 'item',
          formatter: (param)=>{
            if (param.seriesType === 'lines') {
              return '交通量：'+param.value+'人'
            }else {
              return ''
            }
          }
        },
        animation: false,
        series: [//轨迹
          {
            name: "交通量",
            coordinateSystem: "amap",
            type: "lines",
            zlevel: 2,
            symbol: [
              "circle",
              "none"
            ],
            symbolSize: 20,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: ['arrow'],
              symbolSize: 20
            },
            label: {
              show: true,
              position: 'middle',
              fontSize: 20,
              formatter: '{c}'
            },
            data: []
          }
        ]
      }
      this.echartmap.setOption(option)
      map = this.echartmap.getModel().getComponent("amap").getAMap();
    }
  }
}
</script>
<style>
  @import 'swiper/dist/css/swiper.css';
</style>
<style lang="scss" scoped>
.tripod-container {
  position: relative;
  width: 100%;
  min-height: 100%;
  min-height: calc(100vh - 80px);
  .map-box {
    width: 100%;
    height: calc(100vh - 122px);
    position: relative;
    padding: 5px;

    /* 四个角的边框 */
    .border_line {width: 100%;height: 100%;position: absolute;left: 0px;top: 0px;}
    .border_line span {
      width: 15px;
      height: 15px;
      border: 2px solid #368CF9;
      position: absolute;
      display: block;
    }
    .border_line span.tr {
        border-bottom: 0;
        border-right: 0;
        top: -1px;
        left: -1px;
    }
    .border_line span.tb {
        border-top: 0;
        border-right: 0;
        bottom: -1px;
        left: -1px;
    }
    .border_line span.rt {
      border-bottom: 0;
        border-left: 0;
        top: -1px;
        right: -1px;
    }
    .border_line span.rb {
      border-top: 0;
        border-left: 0;
        bottom: -1px;
        right: -1px;
    }

    .map_container{
      width: 100%;
      height: 100%;
    }
    .map_flat {
    }
    .legend_3d {
      position: absolute;
      left: 20px;
      bottom: 20px;
      .legend-item {
        margin-bottom: 5px;
        &:last-child{
          margin-bottom: 0;
        }
        .colors {
          display: inline-block;
          width: 22px;
          height: 15px;
        }
        .labels {
          display: inline-block;
          margin-left: 3px;
          font-size: 12px;
          height: 15px;
          line-height: 15px;
        }
      }
    }
    .legend {
      position: absolute;
      right: 82px;
      top: 52px;
      font-family: '微软雅黑';
      .title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
      }
      ul {
        display: flex;
        align-items: center;
        .legend-item {
          &:first-child{
            .labels{margin-top: 0}
          }
          .colors {
            background: #00efdb;
          }
        }
      }
      .labels{
        display: flex;
        margin-top: 10px;
        margin-bottom: 30px;
        li{
          width: 60px;
          text-align: center;
          font-size: 12px;
          color: #fff;
        }
      }
      .scale {
        li {
          height: 10px;
          width: 80px;
          box-sizing: border-box;
          border: 1px solid #cd7f0e;
          &:not(.empty) {
            background: #cd7f0e;
          }
        }
      }
      .scale_labels {
        display: flex;
        margin-top: 10px;
        li{
          width: 60px;
          text-align: left;
          font-size: 12px;
          color: #fff;
          &:nth-child(2) {
            padding-left: 5px;
          }
          &:nth-child(3) {
            padding-left: 15px;
          }
          &:nth-child(4) {
            padding-left: 35px;
          }
        }
      }
    }
  }
}
</style>
