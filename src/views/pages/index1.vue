<template>
  <div class="body">
      <w-baidu-map _id="map1" _ref="map1" _style="width:1000px;height:400px;">

      </w-baidu-map>
  </div>
</template>
<script>
import wBaiduMap from '@/components/bmap/BMap'
export default {
  data() {
    return {
      
    }
  },
  components: {
    wBaiduMap
  }
}
</script>