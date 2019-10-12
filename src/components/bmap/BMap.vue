<template>
  <div :id="_id" :ref="_ref" :style="_style"></div>
</template>
<script>
export default {
  name:'BMap',
  props: {
    _id: {
      type: String,
      default: 'container'
    },
    _ref: {
      type: String,
      default: 'container'
    },
    _style: {
      type: String,
      default: ''
    },
    _point: {
      type: String,
      default: '116.404, 39.915'
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
  mounted() {
    this.initMap()
  },
  destroyed() {
    this.map = null
  },
  methods: {
    initMap () {
      this.map = new BMap.Map(this._id)        // 创建地图实例  
      let tempp = this._point.split(',')
      let point = new BMap.Point(tempp[0],tempp[1])  // 创建点坐标
      this.map.centerAndZoom(point, this._zoom)  
    }
  },
}
</script>