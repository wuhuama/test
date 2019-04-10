<template>
  <!-- 区域自定义 -->
  <div class="screenline-define-container">
    <div class="filter-container clearfix">
      <div class="filter-right fr">
        <div class="green-btn" @click="addNewLine" style="color:#fff;background: green;display:inline-block;">新增查核线</div>
      </div>
    </div>
    <div class="map-box">
      <div class="border_line">
        <span class="tr"></span>
        <span class="tb"></span>
        <span class="rt"></span>
        <span class="rb"></span>
      </div>

      <div id="map_container" class="map_container" ref="map_container"></div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      map:{},//高德地图
      mouseTool: {}
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap () {
      //this.$refs.map_container
       this.map = new AMap.Map('map_container', {
          zoom:11,//级别
          center: [120.12, 30.16], //中心点坐标
          viewMode:'3D',//使用3D视图
          mapStyle: 'amap://styles/grey', //设置地图的显示样式
      })


      let polyline = new AMap.Polyline({
        path: [new AMap.LngLat(120.10, 30.13), new AMap.LngLat(120.18, 30.16)],
        strokeWeight: 3,//线条宽度
        strokeColor: '#ffff00',//线条颜色

        isOutline: true,//线条是否带描边
        borderWeight: 10,//线条描边宽度
        outlineColor: '#ffba00'//线条描边颜色
      })
      this.map.add(polyline)

      this.mousetool = new AMap.MouseTool(this.map)
      this.mousetool.on('draw',function(e){ //添加事件
        console.log('绘制完成');
        console.log(e.obj.getPath());//获取路径/范围
      });
    },
    addNewLine () {
      this.mousetool.polyline({
        strokeWeight: 5,
        strokeColor: '#fff990',
        lineCap: 'round',
        isOutline: true,
        borderWeight: 30,
        outlineColor: '#ffffff',
        
      }); //使用鼠标工具，在地图上画线
    }
  }
}
</script>
<style lang="scss">

.screenline-define-container {
  position: relative;
  width: 100%;
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
