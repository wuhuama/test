<template>
  <!-- 区域自定义 -->
  <div class="screenline-define-container">
    <div class="filter-container clearfix">
      <div class="filter-right fr"></div>
    </div>
    <div class="map-box">
      <div class="border_line">
        <span class="tr"></span>
        <span class="tb"></span>
        <span class="rt"></span>
        <span class="rb"></span>
      </div>

      <div id="map_container" class="map_container" ref="map_container"></div>
      <div id="map_container2" class="map_container2" ref="map_container2"></div>
      <div id="map_container3" class="map_container3" ref="map_container3"></div>
    </div>
  </div>
</template>
<script>
require("echarts-extension-amap") //引入高德地图扩展

export default {
  data() {
    return {
      map:{},//高德地图
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap () {
      this.map = new AMap.Map(this.$refs.map_container,{
        mapStyle: 'amap://styles/grey',
        zoom: 5,
        center: [107.4976,32.1697],
        layers: [
            // 高德默认标准图层
            new AMap.TileLayer(),
            // 楼块图层
            new AMap.Buildings({
                zooms: [14, 18],
                zIndex: 100,
                opacity: 100,
                heightFactor: 2//2倍于默认高度，3D下有效
            })
        ],
      })

      const layer = new Loca.ScatterPointLayer({
          map: this.map
      });
      // 市县位置数据
      var data = [
          { "lnglat": [116.366794, 39.915309], "name": "西城区", "style": 20 }, 
          { "lnglat": [116.486409, 39.921489], "name": "朝阳区", "style": 20 }, 
          { "lnglat": [116.286968, 39.863642], "name": "丰台区", "style": 200 }
          // ...更多数据
      ]

      // 传入原始数据
      layer.setData(data, {
          lnglat: 'lnglat'   // 指定坐标数据的来源，数据格式: 经度在前，维度在后，数组格式。
      });

      // 配置样式
      layer.setOptions({
        unit: 'px',
        style: {
          radius: 20,     // 圆形半径，单位像素
          color: '#b7eff7', // 填充颜色
          borderWidth: 0.5,   // 边框宽度
          borderColor: '#ffffff'  // 边框颜色
        },
         selectStyle: {
            radius: 14,
            color: '#ffe30a'
        }
      });
      layer.render();
      this.map.setFitView()
    }
  }
}
</script>
<style lang="scss">

.screenline-define-container {
  position: relative;
  width: 99%;
  min-height: 100%;
  min-height: calc(100vh - 80px);

  .filter-container{
    font-size: 14px;

    .filter-right {
      .green-btn {
        height: 30px;
        width: 84px;
        color: #fff;
        line-height: 30px;
        text-align: center;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }

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
  }
}
</style>
