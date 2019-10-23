<template>
  <div :id="_id" :style="_style">
    <slot></slot>
  </div>
</template>
<script>
import * as creatObj from './base/util.js'
export default {
  name: 'MyBMap',
  props: {
    _id: {
      type: String,
      default: 'container'
    },
    _style: {
      type: String,
      default: ''
    },
    _point: {
      type: Object,
      default: () => {
        return {
          lng: 116.404,
          lat: 39.915
        }
      }
    },
    _zoom: {
      type: Number,
      default: 15
    }
  },
  data () {
    return {
      map: null
    }
  },
  mounted () {
    console.log('子mounted');
    this.initMap()
  },
  destroyed() {
    this.map = null
  },
  methods: {
    initMap () {
      if (this.map)
        return
      const map = new BMap.Map(this._id,{enableMapClick: false})        // 创建地图实例
      this.map = map
      
      let point = creatObj.createPoint(BMap, {lng: this._point.lng, lat: this._point.lat})
      map.reset()
      map.centerAndZoom(point, this._zoom)

      map.addEventListener("click", function(e){    
        console.info(`您点击了地图：lng: ${e.point.lng} ,lat: ${e.point.lat}`)  
      })
    },
    showMakers (data = []) {
      data.forEach( (item, i) => {
        const overlay = new BMap.Marker(new BMap.Point(item.lng, item.lat))
        this.map.addOverlay(overlay)
      })
    },
    showPolygons (path = []) {
      const overlay = new BMap.Polygon(path.map(item => creatObj.createPoint(BMap, {lng: item.lng, lat: item.lat})), {
        strokeColor:'blue',
        strokeWeight: 2,
        strokeOpacity: 0.9,
        strokeStyle: 'solid',
        fillColor:'#fff',
        fillOpacity: 0.5,
        enableClicking: false
      })
      this.map.addOverlay(overlay)
    },
    openHeatMap (points=[]) {
      
    //详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
    //参数说明如下:
    /* visible 热力图是否显示,默认为true
      * opacity 热力的透明度,1-100
      * radius 势力图的每个点的半径大小   
      * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
      *	{
        .2:'rgb(0, 255, 255)',
        .5:'rgb(0, 110, 255)',
        .8:'rgb(100, 0, 255)'
      }
      其中 key 表示插值的位置, 0~1. 
          value 为颜色值. 
      */
      const heatmapOverlay = new BMapLib.HeatmapOverlay({
        "radius":20,
        gradient: {
          0:'rgb(102, 255, 0)',
	 	 	    .5:'rgb(255, 170, 0)',
		  	  1:'rgb(255, 0, 0)'
        }});
      this.map.addOverlay(heatmapOverlay);
      heatmapOverlay.setDataSet({data:points,max:100});
      heatmapOverlay.show()
    },
    /**清除地图上所有覆盖物 */
    clearMap () {
      this.map.clearOverlays()
    },
    clearSpecifiedOverlays (arr) {
      arr.forEach((item, i) => {
        this.map.removeoverlay(item)
      })
    }
  },
}
</script>