<template>
<div>
<slot></slot>
</div>
</template>
<script>
export default {
  props: {
    position: {},
    offset: {},
    icon: {},
    dragging: {
      type: Boolean,
      default: false
    },
    clicking: {
      type: Boolean,
      default: true
    },
    rotation: {
      type: Number
    },
    shadow: {
      type: Object
    },
    title: {
      type: String
    },
    top: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      BMap: null,
      map: null
    }
  },
  watch: {
    'position.lng' (newVal, oldVal) {

    }
  },
  computed: {
    renderByParent () {
      return this.$parent.preventChildrenRender
    }
  },
  methods: {
    load () {
      let {position, offset, icon, dragging, clicking, rotation, shadow, title, top, zIndex} = this
      // BMap = this.BMap = this.$parent.BMap
      // map = this.map = this.$parent.map
      console.log(BMap);
      const overlay = new BMap.Marker(new BMap.Point(position.lng, position.lat), {
        offset,
          icon: icon && createIcon(BMap, icon),
          enableDragging: dragging,
          enableClicking: clicking,
          draggingCursor,
          rotation,
          shadow,
          title
      })
      this.originInstance = overlay
      overlay.setTop(top)
      overlay.setZIndex(zIndex)
    }
  }
}
</script>