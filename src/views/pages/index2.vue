<template>
  <div>
    <div :id="mapId" ref="map" style="width:1000px;height:500px;"></div>
  </div>
</template>
<script>
import loadBMap from '@/components/bmap/loadMap.js'
export default {
  data() {
    return {
      mapId: 'BMap-' + parseInt(Date.now() + Math.random()),
      myMap: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap () {
      loadBMap('N9a4sFxRQVR4X2au5YnsEEfmr0jdu8Ta')
        .then(() => {
          // 百度地图API功能
          this.myMap = new BMap.Map(this.mapId) // 创建Map实例
          this.myMap.centerAndZoom(new BMap.Point(116.404, 39.915), 11) // 初始化地图,设置中心点坐标和地图级别
          //添加地图类型控件
          this.myMap.addControl(
            new BMap.MapTypeControl({
              mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
            })
          )
          this.myMap.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的
          
          this.myMap.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
          //添加marker等
          //...
      })
      .catch(err => {
          console.log('地图加载失败')
      })
    }
  },
}
</script>