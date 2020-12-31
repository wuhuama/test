<template>
  <div class="map-container">
    <div class="map" ref="map" id="allmap" :style="{height: mapHeight+'px'}"></div>
  </div>
</template>
<script>
import BaiduMap from 'BaiduMap'
import shp from 'shp'
// import {open} from 'shapefile'
var shapefile = require("shapefile");
// var shp = require("shpjs");

export default {
  data() {
    return {
      mapHeight: 500
    }
  },
  mounted() {
        
    var map = new BaiduMap.Map('allmap')                        // 创建地图实例
    var point = new BaiduMap.Point(120.209947,30.245853)        // 创建中心点坐标
    var marker = new BaiduMap.Marker(point) // 创建标注

    map.centerAndZoom(point,10)                         // 初始化地图，设置中心点坐标和地图级别


    map.addOverlay(marker) // 将标注添加到地图中
    
    this.readFile()
  },
  methods: {
    readFile() {
      shapefile.open("./polygon.shp", {encoding:'utf-8'})
      .then(source => source.read()
        .then(function log(result) {
          if (result.done) {
            console.log('文件读取完毕');
            // 文件读完进入此函数中
            return
          };
          console.log('读...');
          console.info(result.value);
          return source.read().then(log);
        }))
      .catch(error => console.error(error.stack));

      console.log('dddd');
      var url = './polygon.shp'
      shp(url).then(function(geojson){
        //do something with your geojson
        console.log('读了吗');
        console.log(geojson);
      }).catch(err=> {
        console.log('error', err);
      })
    }
  },
}
</script>