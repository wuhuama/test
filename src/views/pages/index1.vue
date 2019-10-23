<template>
  <div class="body">
      <w-baidu-map _id="map1" ref="map1" _style="width:1000px;height:400px;">
        <w-baidu-maker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></w-baidu-maker>
      </w-baidu-map>
  </div>
</template>
<script>
import wBaiduMap from '@/components/bmap/BMap'
import wBaiduMaker from '@/components/bmap/BMapMaker'
import heatData from './heatdata.js'
export default {
  data() {
    return {
      // 基础掌握牢固资讯能够
    }
  },
  components: {
    wBaiduMap,
    wBaiduMaker
  },
  mounted() {
    console.log('父mounted');
    this.getMakers()
  },
  methods: {
    getMakers () {
      const { showMakers } = this
      const data = [{lng: 116.388908 ,lat: 39.922747},{lng: 116.414348 ,lat: 39.917878},{lng: 116.413414 ,lat: 39.912344},{lng: 116.417942 ,lat: 39.914557}]
      showMakers(data)
    },
    showMakers (data) {
      this.$refs.map1.showMakers(data)
      var path = [{lng:116.387112,lat:39.920977},{lng:116.385243,lat:39.913063},{lng:116.394226,lat:39.917988},{lng:116.401772,lat:39.921364},{lng:116.41248,lat:39.927893}]
      this.$refs.map1.showPolygons(path)

      this.$refs.map1.openHeatMap(heatData)
    }
  },
}
// vue的父组件和子组件生命周期钩子函数执行顺序是什么
// 加载渲染过程  父组件beforeCreat->父组件created->父组件beforeMount->子组件beforeCreat->子组件created->子组件beforeMount->子组件mounted->父组件->mounted
// 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

// 子组件更新过程
// 父beforeUpdate->子beforeUpdate->子updated->父updated

// 父组件更新过程
// 父beforeUpdate->父updated

// 销毁过程
// 父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
</script>