<template>
  <div class="tripod-container">
    <!-- 查询条件 -->
    <div class="filter-container">
      <div class="filter-left">
        <div class="filter-item">
          <span class="text">时间：</span>
          <el-date-picker
            v-model="listQuery.startime"
            type="datetime"
            size="mini"
            prefix-icon=" "
            value-format="yyyy-MM-dd HH:ss"
            :picker-options="pickerBeginDateBefore"
            placeholder="开始时间">
          </el-date-picker>
          <span class="text">-</span>
          <el-date-picker
            v-model="listQuery.endtime"
            type="datetime"
            size="mini"
            prefix-icon=" "
            value-format="yyyy-MM-dd HH:ss"
            :picker-options="pickerBeginDateAfter"
            placeholder="结束时间">
          </el-date-picker>
        </div>
        <div class="filter-item">
          <span class="area-options-btn" @click="selectArea()">区域选择(1)</span>
          <span class="text">出行目的：</span>
          <el-select v-model="listQuery.goal" placeholder="请选择" size="mini" clearable>
            <el-option
              v-for="item in trip_goal_options"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!-- <div class="filter-item">
          <span class="text">出行方式：</span>
          <el-select v-model="listQuery.totype" placeholder="请选择" size="mini" clearable>
            <el-option
              v-for="item in trip_mode_options"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <span class="text">用户画像：</span>
        <div class="filter-item">
          <el-select v-model="listQuery.gender" placeholder="性别" size="mini" class="small-width-80" clearable>
            <el-option
              v-for="item in gender_options"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <el-select v-model="listQuery.age" placeholder="年龄" size="mini" class="small-width-80" clearable>
            <el-option
              v-for="item in age_options"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <el-select v-model="listQuery.edu" placeholder="教育程度" size="mini" clearable>
            <el-option
              v-for="item in edu_options"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <el-select v-model="listQuery.prop" placeholder="用户属性" size="mini" clearable>
            <el-option
              v-for="item in prop_options"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="filter-item">
          <el-button type="primary" size="mini" class="query-btn" @click="handleFilter()">查询</el-button>
        </div>
      </div>
      <div class="filter-right">
        <ul class="btn-grounp">
          <li v-for="(item, index) in btn_groups" :key="index" :class="{'active': currentIndex === index }" @click="switchMapView(index)"><span class="text">{{item}}</span></li>
        </ul>
        <el-button type="primary" size="mini" class="export-btn">导出</el-button>
      </div>
    </div>
    <!-- 区域选择 -->
    <el-dialog
      :visible.sync="dialogAreasVisible"
      custom-class="areas-wrapper"
      :close-on-click-modal=false
      width="60%">
      <div class="areas-content">
        <div class="optionMap" id="optionMap" ref="optionMap"></div>
        <div class="options">
          <div class="header">区域选择</div>
          <div class="area-plans">
            <div class="text">方案选择</div>
            <el-scrollbar wrap-class="scrollbar-wrapper" ref="scrollbar">
              <el-radio-group v-model="plan" class="plan-content">
                <el-radio :label="3">默认区域</el-radio>
                <el-radio :label="6">方案一</el-radio>
                <el-radio :label="9">方案二</el-radio>
                <el-radio :label="3">默认区域</el-radio>
                <el-radio :label="6">方案一</el-radio>
                <el-radio :label="9">方案二</el-radio>
              </el-radio-group>
            </el-scrollbar>
          </div>

          <div class="btn-bottom">
            <el-button type="primary" size="medium">保存</el-button>
            <el-button type="danger" size="medium">新建方案</el-button>
          </div>
          <div class="small-text">
            备注：单击为选中区域，再次单击取消选中状态，选中小区覆盖层为黄色，未选中覆盖层为灰色
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 主体 -->
    <div class="map-box">
      <div class="border_line">
        <span class="tr"></span>
        <span class="tb"></span>
        <span class="rt"></span>
        <span class="rb"></span>
      </div>
      <!-- 地图展示 -->
      <div id="map_container" class="map_container" ref="map_container"></div>
    </div>

    <!-- 交通量分析 -->
    <el-dialog
      title="交通量分析"
      :visible.sync="dialogTrafficVisible"
      custom-class="traffic-wrapper"
      :close-on-click-modal=false
      center
      width="60%">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="col-chart">
            <div class="title">性别</div>
            <div id="sex_chart"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="col-chart">
            <div class="title">年龄</div>
            <div id="age_chart"></div>
          </div>
        </el-col>
        <el-col :span="6" v-show="false">
          <div class="col-chart">
            <div class="title">教育程度</div>
            <div id="edu_chart"></div>
          </div>
        </el-col>
        <el-col :span="6" v-show="false">
          <div class="col-chart">
            <div class="title">用户属性</div>
            <div id="user_chart"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-chart">
            <div class="title">出行目的分析</div>
            <div id="dest_chart"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-chart">
            <div class="title">出行方式分析</div>
            <div id="type_chart"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-chart">
            <div class="title">各时段交通量变化趋势</div>
            <div id="traffic_chart"></div>
          </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTrafficVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogTrafficVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import labelType from '@/utils/labeldata.js'
import { getOD, getODDetail } from '@/api/od.js'

const btn_groups = ['2D地图', '3D地图', '平面地图']

export default {
  data () {
    return {
      btn_groups: btn_groups,
      currentIndex: 0,
      trip_mode_options: labelType.TRIP_MODE,
      trip_goal_options: labelType.TRIP_GOAL,
      edu_options: labelType.EDU,
      age_options: labelType.AGE,
      gender_options: labelType.GENDER,
      prop_options: labelType.PROP,
      listQuery: {
        startime: '',
        endtime: '',
        regionids: '2',
        projectid: '',
        gender: 0,
        age: 0,
        edu: 0,
        prop: 0,
        goal: 0
      },
      pickerBeginDateBefore: {
        disabledDate: time => {
          let beginDateVal = this.listQuery.endtime;
          if (beginDateVal) {
              return time.getTime() > beginDateVal;
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: time => {
          let beginDateVal = this.listQuery.startime;
          if (beginDateVal) {
              return time.getTime() < beginDateVal;
          }
        }
      },
      dialogAreasVisible: false,
      plan: 3,
      dialogTrafficVisible: false,
      map: {},
      colors: {},
      // 选2个区域时
      startRegion:{
        id: null,
        path: []
      },
      endRegion: {
        id: null,
        path: []
      },
      // 选多个区域
      multiRegion: []
    }
  },
  mounted(){
    this.initMap()
  },
  methods: {
    initMap () {
      const self = this
      this.map = new AMap.Map(this.$refs.map_container, {// 创建高德地图实例
        zoom: 12,
        center: [120.14671, 30.296056],
        resizeEnable: true,
      })
      this.map.setMapStyle('amap://styles/grey')//设置地图的显示样式

      getOD(this.listQuery).then((res) => {
        console.log(res);
      })

      // 覆盖物
      let Polygon1 = new AMap.Polygon({
          path: [
              new AMap.LngLat("120.143963","30.277675"),
              new AMap.LngLat("120.175549","30.312655"),
              new AMap.LngLat('120.14774','30.344659')
        ]
      });
      // 覆盖物
      let Polygon2 = new AMap.Polygon({
          path: [
              new AMap.LngLat("120.142247","30.263294"),
              new AMap.LngLat("120.162502","30.285087"),
              new AMap.LngLat('120.180698','30.265222')
          ]
      });
      // 折线1
      var polyline1 = new AMap.BezierCurve({
        path: [
          new AMap.LngLat("120.156666","30.30895"),
          // [120.13744,30.303615],
          // [120.132977,30.291758],
          // [120.14156,30.279899],
          new AMap.LngLat('120.152546','30.267149')
        ],
        strokeWeight: 10, // 描边宽度
        strokeColor: 'red', // 线条颜色
        lineJoin: 'round', // 折线拐点连接处样式
        showDir: true
      });

      // 折线2
      var polyline2 = new AMap.Polyline({
        path: [
          new AMap.LngLat("120.165936","30.276638"),
          new AMap.LngLat("120.168683","30.311321"),
        ],
        strokeWeight: 10, // 线条宽度
        strokeColor: 'green', // 线条颜色
        lineJoin: 'round', // 折线拐点连接处样式
        showDir: true
      });
      // 创建覆盖物群组，传入覆盖物组成的数组
      let overlayGroup = new AMap.OverlayGroup([Polygon1, Polygon2]);

      // 对此覆盖物群组设置同一属性
      overlayGroup.setOptions({
          // strokeColor: "#FF33FF", 
          // strokeWeight: 6,
          strokeOpacity: 0.2,
          fillOpacity: 0.4,
          fillColor: '#1791fc',
          // zIndex: 50,
      });

      // 统一添加到地图实例上
      this.map.add(overlayGroup);
      this.map.add(polyline1);
      this.map.add(polyline2);
      Polygon2.on('click', (e)=>{
        console.log('点击了坐标:'+e.lnglat.getLng()+','+e.lnglat.getLat());
      })
      this.map.on('click', (e) => {
        console.log('地图点击事件绑定成功');
        this.showInfoClick(e)
      });

      // 创建纯文本标记
      let text = new AMap.Text({
          text:'纯文本标记',
          anchor:'center', // 设置文本标记锚点
          draggable:true,
          cursor:'pointer',
          angle:0,
          style:{
              'padding': '.75rem 1.25rem',
              'margin-bottom': '1rem',
              'margin-left': '2rem',
              'border-radius': '.25rem',
              'background-color': 'white',
              'width': '15rem',
              'border-width': 0,
              'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
              'text-align': 'center',
              'font-size': '20px',
              'color': 'blue'
          },
          offset: new AMap.Pixel(90,0),
          position: [120.180356,30.295908]
      });
      text.setMap(this.map);
      this.map.setFitView([ overlayGroup ])
      // AMap.plugin('AMap.DistrictLayer',() => {//异步加载插件
      //   // 行政区域填充
      //   let disProvince = new AMap.DistrictLayer.Province({
      //     zIndex:12,
      //     adcode:['330100'],
      //     depth:2,
      //     styles:{
      //         'fill':(properties) => {
      //             let adcode = properties.adcode
      //             let selfColor = self.getColorByAdcode(adcode)
      //             return selfColor
      //         },
      //         'province-stroke':'cornflowerblue',
      //         'city-stroke': 'white',//中国地级市边界
      //         'county-stroke': 'rgba(255,255,255,0.5)'//中国区县边界  
      //     }
      //   })
      //   disProvince.setMap(this.map)
      // })
    },
    selectArea () {
      this.dialogAreasVisible = true
    },
    switchMapView (index) {
      this.currentIndex = index
    },
    handleFilter () {
      const tempData = Object.assign({}, this.listQuery)
      console.log(tempData)
    },
    showInfoClick (e) {
      console.log('经度-纬度'+e.lnglat.getLng()+ ','+e.lnglat.getLat())
    },
    // 颜色辅助方法
    getColorByAdcode (adcode) {
      if (!this.colors[adcode]) {
          var gb = Math.random() * 155 + 50;
          this.colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
      }
      return this.colors[adcode]
    }
  }
}
</script>
<style lang="scss" scoped>
.tripod-container {
  position: relative;
  width: 100%;
  min-height: 100%;
  min-height: calc(100vh - 80px);

  .filter-container{
    // font-size: 0;
    // height: 42px;
    display: flex;
    align-items: start;
    justify-content: space-between;
    padding-bottom: 0;
    .filter-left{
      flex: 1;
      .text{
        font-size: 12px;
        display: inline-block;
        height: 28px;
        line-height: 28px;
        vertical-align: top;
      }
      /deep/ .el-select--mini{
        width: 100px;
      }
      .el-select.small-width-80{
        width: 80px;
      }
      /deep/ .el-input__inner {
        background-color: transparent;
        color: #fff;
      }
      .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 150px;
      }
      .area-options-btn{
        display: inline-block;
        border: 1px solid #fff;
        border-radius: 4px;
        cursor: pointer;
        height: 26px;
        line-height: 25px;
        font-size: 14px;
        padding: 0 10px;
      }
      .query-btn{
        padding-left: 20px;
        padding-right: 20px;
      }
    }
    .filter-right{
      display: flex;
      align-items: center;

      .btn-grounp{
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 28px;
        border-radius: 4px;
        margin: 0;
        padding: 0;
        margin-right: 10px;
        box-sizing: border-box;
        border: 1px solid #0e72d0;
        li{
          height: 100%;
          line-height: 28px;
          font-size: 14px;
          border-right: 1px solid #0e72d0;
          cursor: pointer;
          &:last-child{
            border-right: none;
          }
          &.active{
            background-color: #0e72d0;
          }
          span{
            display: inline-block;
            padding: 0 10px;
          }
        }
      }
      .export-btn{
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }

  /* 区域选择dialog */
  /deep/ .areas-wrapper{
    background: rgba($color: #000000, $alpha: 0.5);
    .areas-content{
      display: flex;
      .optionMap{
        flex: 1;
        height: 600px;
      }
      .options{
        width: 300px;
        .header{
          height: 50px;
          line-height: 50px;
          color: #fff;
          font-size: 20px;
          font-weight: 500;
        }
      }
      .area-plans {
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        width: 100%;
        height: 320px;
        overflow: hidden;
        /deep/ .el-scrollbar{
          height: 100%;
          width: 100%;
        }
        .scrollbar-wrapper {
          overflow-x: hidden !important;
        }
        .text{
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #fff;
          font-size: 18px;
          margin-bottom: 15px;
        }
        .el-radio {
          width: 100%;
          display: block;
          margin-bottom: 25px;
          font-size: 16px;
          color: #fff;
          &:last-child{
            margin-bottom: 0;
          }
        }
      }
      .btn-bottom{
        margin-bottom: 15px;
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

  
  .traffic-wrapper{
    .col-chart{
      height: 240px;
      border: 1px solid #ccc;
    }
  }

  @media screen and (min-width: 1366px) {
    /deep/ .traffic-wrapper{
      margin-top: 5vh !important;
      .col-chart{
        height: 200px;
      }
    }
  }
}

</style>
<style>
.el-picker-panel .el-picker-panel__body .el-input__inner {
  color: #606266;
}
.el-input--prefix .el-input__inner {
  padding-left: 10px;
}

.el-input--suffix .el-input__inner {
  padding-right: 10px;
}
</style>
