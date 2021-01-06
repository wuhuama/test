<template>
  <div class="container">
    <div class="wrapper">
      <TimeLine
        v-model="value"
        :min="minVal"
        :max="time24"
        :step="value0"
        ref="timeline"
        class="timeline"
        :showTooltip="true"
        :marks="true"
        :showTick="true"
        @change="handleChange"
      ></TimeLine>
    </div>
    <div class="wrapper">
      <slider
        v-model="value"
        :min="minVal"
        :max="time24"
        :step="value0"
        show-stops
      ></slider>
    </div>
    <div class="wrapper">
      <div class="app-container">
        <span>步长:</span>
        <el-select v-model="value0" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span>播放速率:</span>
        <el-select v-model="value4" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span> 循环播放</span>
        <el-switch
          v-model="value3"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
        <div style="height: 20px"></div>
        <time-line
          v-model="value"
          @change="loopEvent"
          :frequence="value4"
          :gap="value0"
          :circle="value3"
          :simpleTime="false"
          :limit="false"
          :showTooltip="true"
          :formatter-tooltip="formatVal"
        ></time-line>

        <div style="height: 20px"></div>
        <el-time-picker
          is-range
          v-model="value2"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          format="HH:mm"
        >
        </el-time-picker>
        <div style="height: 20px"></div>
        <time-line
          v-model="value"
          @change="loopEvent"
          :frequence="value4"
          :gap="value0"
          :timeRange="tttfilter(value2)"
          :circle="value3"
        ></time-line>

        <br />
        <p class="current-time">
          当前播放时间:
          <span style="display: inline-block; width: 400px">{{
            timeText
          }}</span>
        </p>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm"
        >
        </el-date-picker>
        <div style="height: 20px"></div>
        <time-line
          v-model="value"
          @change="loopEvent"
          :frequence="value4"
          :gap="value0"
          :daysRange="value1"
          :circle="value3"
          :showTooltip="true"
          :formatter-tooltip="formatVal"
        ></time-line>
      </div>
    </div>
  </div>
</template>
<script>
import TimeLine from "@/components/timeLine";
import Slider from "@/components/slider";
import Timeline from '@/components/timeLine/timeLine.vue'

export default {
  name: "Demo",
  data() {
    return {
      value: 0,
      minVal: 0,
      time24: 1440,
      marks: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
      ],
      timeText: '',
      options: [{
        label: '1分钟',
        value: 1
      }, {
        label: '5分钟',
        value: 5
      }, {
        label: '10分钟',
        value: 10
      }, {
        label: '30分钟',
        value: 30
      }, {
        label: '1小时',
        value: 60
      }],
      options1: [{
        label: '0.5秒',
        value: 500
      }, {
        label: '1秒',
        value: 1000
      }, {
        label: '2秒',
        value: 2000
      }, {
        label: '3秒',
        value: 3000
      }, {
        label: '5秒',
        value: 5000
      }],
      value0: 60,
      value1: [],
      value2: [new Date(), new Date(new Date().getTime() + 6 * 60 * 60 * 1000)],
      value3: false,
      value4: 1000,
    };
  },
  components: {
    TimeLine,
    Slider,
    'time-line': Timeline
  },
  mounted() {},
  methods: {
    handleChange(value) {
      console.log(`当前值为${value}`);
    },
    formatVal(value) {
      const hh = this.addZero(parseInt(value / 60));
      const mm = this.addZero(value % 60);
      return `${hh}:${mm}`;
    },
    addZero(val) {
      return val < 10 ? `0${val}` : val;
    },
    loopEvent(time, index, date) {
      console.log(date, time, index)
      this.timeText = date
    },
    endEvent(time) {
      console.warn(`播放结束:${time}`)
    },
    tttfilter(arr) {
      let i = 0
      const brr = []
      while (i < 2) {
        const myDate = arr[i]
        const hour = myDate.getHours() < 10 ? `0${myDate.getHours()}` : myDate.getHours()
        const min = myDate.getMinutes() < 10 ? `0${myDate.getMinutes()}` : myDate.getMinutes()
        brr.push(`${hour}:${min}`)
        i += 1
      }
      return brr
    }
  },
};
</script>
<style lang="scss">
.wrapper {
  margin-left: 100px;
  margin-top: 100px;
  margin-right: 100px;
}
</style>