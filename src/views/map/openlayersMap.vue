<template>
  <div class="container">
    <div>hhhhhh</div>
    <div id="openlayersMap" class="map" ref="openlayersMap"></div>
  </div>
</template>
<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

export default {
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.map = new Map({
      target: 'openlayersMap',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: [119.992901,30.379319],
        zoom: 12
      })
    });
    }
  },
}
</script>
<style lang="scss">
.container {
  font-size: 16px;
  .map {
    width: 1000px;
    height: 500px;
  }
}
</style>