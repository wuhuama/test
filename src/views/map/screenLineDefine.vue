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
require("echarts-extension-amap") //引入高德地图扩展

export default {
  data() {
    return {
      map:{},//高德地图
      mouseTool: {}
    }
  },
  mounted() {
    // this.initMap();
    this.initChart()
  },
  methods: {
    initMap () {
      this.$refs.map_container
       this.map = new AMap.Map('map_container', {
          zoom:11,//级别
          center: [120.12, 30.16], //中心点坐标
          // viewMode:'3D',//使用3D视图
          // pitch: 55,
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

      // let self = this
      // this.map.plugin(["AMap.MouseTool"],function(){ // 异步加载插件
      //     self.mousetool = new AMap.MouseTool(self.map); 
      //     self.mousetool.on('draw',function(e){ //添加事件
      //       console.log('绘制完成');
      //       console.log(e.obj.getPath());//获取路径/范围
      //       let path = e.obj.getPath()
      //       // let tempPath = deepClone([].concat(path))
      //       // console.log(tempPath);
      //       let ww = []
      //       path.map ((item)=>{
      //         let {lat, lng} = item
      //         ww.push({lat: lat, lng: lng})
      //       })
      //       console.log(ww); // 路径坐标点数组
      //     });
      // });
      
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
    },
    initChart(){
      var echartmap = this.$echarts.init(this.$refs.map_container);
      const series_ = [
        //闪动的线
        /*{
          name: "上海 Top10",
          coordinateSystem: "amap",
          type: "lines",
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: "#2f44c8",
              width: 0,
              curveness: 0.2
            }
          },
          data: [
            {
              fromName: "区域3",
              toName: "区域4",
              fromid:3,
              toid: 4,
              coords: [
                [ 120.4127890925979, 30.533175137165294 ],
                [ 120.3521309141421, 30.56954960904261 ]
              ],
              value: 95
            }
          ]
        },*/
        //轨迹
        {
          name: "交通量",
          coordinateSystem: "amap",
          type: "lines",
          zlevel: 2,
          symbol: [
            "none",
            "circle"
          ],
          symbolSize: 10,
           effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: ['arrow'],
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: "#fff",
              width: 5,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          label: {
            show: true,
            position: 'middle',
            formatter: '{a}:{c}人'
          },
          data: [{
              fromName: "区域3",
              toName: "区域4",
              fromid:3,
              toid: 4,
              coords: [
                [ 120.4127890925979, 30.533175137165294 ],
                [ 120.3521309141421, 30.56954960904261 ]
              ],
              value: 56
            },
            {
              fromName: "区域4",
              toName: "区域3",
              fromid:4,
              toid: 5,
              coords: [
                [ 120.3521309141421, 30.56954960904261 ],
                [ 120.4127890925979, 30.533175137165294 ]
              ],
              "value": 95
            }
          ]
        },

        //包头圆点
        {
          name: "区域",
          type: "effectScatter",
          coordinateSystem: "amap",
          zlevel: 2,
          symbolSize: 20,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            normal: {
              show: true,
              position: "bottom",
              formatter: "{b}"
            }
          },
          itemStyle: {
            normal: {
              color: "#a6c84c"
            }
          },
          data: [/*{
              name: "区域3",
              value: [ 120.4127890925979, 30.533175137165294 ]
            },{
              name: "区域4",
              value: [ 120.3521309141421, 30.56954960904261 ]
            }*/
            // ,
            // {
            //   name: "区域5",
            //   value: [ 120.4480204540896, 30.624303172444428 ]
            // }
          ]
        }
      ]
      const option = {
        amap: {
          // 高德地图中心经纬度
          center: [120.4480204540896, 30.624303172444428],
          // 高德地图缩放
          zoom: 11,
          // 启用resize
          resizeEnable: true,
          // 自定义地图样式主题
          mapStyle: 'amap://styles/grey',
          viewMode:'2D',//使用3D视图
        },
        tooltip : {
          trigger: 'item',
          formatter: '{a}: {c}人'
          // formatter: (params)=>{
          //   console.log('patams', params);
          //   return params.value
          // }
        },
        animation: false,
        series: series_
      }
      echartmap.setOption(option)
      this.map = echartmap.getModel().getComponent("amap").getAMap();
      let polyline = new AMap.Polyline({
        path: [new AMap.LngLat(120.3521309141421, 30.56954960904261), new AMap.LngLat(120.4480204540896, 30.624303172444428)],
        strokeWeight: 3,//线条宽度
        strokeColor: '#ffff00',//线条颜色

        isOutline: true,//线条是否带描边
        borderWeight: 10,//线条描边宽度
        outlineColor: '#ffba00'//线条描边颜色
      })
      this.map.add(polyline)
      echartmap.on('click', function (params) {
        // window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
        console.log(params);
        if (params.componentType === 'series') {
          if (params.seriesType === 'lines') {
            console.log(params.data)
          }
        }
      });
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
