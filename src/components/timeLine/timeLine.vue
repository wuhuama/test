<!-- 播放轴 -->
<template>
  <div class="time-tool">
    <div class="time-tool-wrapper" :style="timeToolStyle">
      <div class="slider-inner" :style="sliderStyle">
        <Slider
          v-model="curValue"
          :height="barHeight"
          :max="curTime"
          :dotSize="dotSize"
          :show-tooltip="true"
          :step="gap"
          :show-tick="false"
          :showTick="showTick"
          :formatterTooltip="formatterTooltip"
          :showTooltip="showTooltip"
          @change="timeCallback"
        >
        </Slider>
      </div>
      <div class="slider-labels" v-if="labelList.length">
        <div
          class="slider-label-item"
          v-for="(item, index) in labelList"
          :key="index"
          :style="getLabelStyle(item)"
        >
          <div class="slider-label-text" :style="labelStyle">
            <span>{{item.label}}</span>
          </div>
        </div>
      </div>
    </div>
    <i
      :class="
        isplay ? 'el-icon-video-play play-btn' : 'el-icon-video-pause play-btn'
      "
      :title="isplay ? '点击播放' : '暂停'"
      @click="go"
    ></i>
    <i class="el-icon-refresh-left play-btn" @click="replay" title="重播"></i>
  </div>
</template>

<script>
import Slider from "./index.vue";

export default {
  name: "Timeline",
  components: {
    Slider,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    // 限制刻度
    limit: {
      type: Boolean,
      default: false,
    },
    // 简易模式 (单纯的刻度轴)
    simpleTime: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: 0,
    },
    // 轴刻度 (默认全天1440分钟)
    max: {
      type: Number,
      default: 1440,
    },
    // 步长(默认10分钟)
    gap: {
      type: Number,
      default: 10,
    },
    // 播放频率(默认1秒)
    frequence: {
      type: Number,
      default: 1000,
    },
    // 刻度(默认24)
    clocks: {
      type: Array,
      default: () => [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 ],
    },
    // 播放时间范围
    // 某日->某日(能被new date()识别)
    daysRange: {
      type: Array,
      default: () => [],
    },
    // 某时->某时(hh:mm)
    timeRange: {
      type: Array,
      default: () => ["14:20", "20:30"],
    },
    circle: {
      type: Boolean,
      default: false,
    },
    timeFilter: {
      type: Function,
      default: (val) => {
        // 把滑动轴value转成时间
        let hour = Math.floor(val / 60);
        let min = val % 60;
        if (hour < 10) hour = `0${hour}`;
        min = min < 10 ? `0${min}` : min;
        return `${hour}:${min}`;
      },
    },
    sliderWidth: {
      type: Number,
      default: 1080,
    },
    /* 是否显示tooltip */
    showTooltip: {
      type: Boolean,
      default: false,
    },
    /* tooltip格式化 */
    formatterTooltip: {
      type: Function,
    },
    /* 标记数组 */
    marks: {
      type: [Boolean, Array],
    },
    /* 是否显示间断点标记 */
    showTick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      barHeight: 24,
      dotSize: 24,
      getTimePerMin: "",
      curTime: 0,
      curValue: 0,
      /** 是否能播放 */
      isplay: true,
      playStatus: null,
      startTime: "",
      endTime: "",
      startDate: "",
      endDate: "",
      dateDiff: 0,
      nowDate: 1,
      dateText: "", // 日期(yyyy-mm-dd)
    };
  },
  watch: {
    curValue(value) {
      this.$emit("input", value);
    },
    value() {
      this.curValue = this.value;
    },
    isplay(val) {
      if (!val) {
        this.playStatus = setInterval(this.play, this.frequence);
        this.$once("hook:beforeDestroy", () => {
          clearInterval(this.playStatus);
          this.playStatus = null;
        });
      } else {
        this.stop();
      }
    },
    timeRange(newArr, oldArr) {
      if (newArr.length > 1 && oldArr.toString() !== newArr.toString()) {
        clearInterval(this.getTimePerMin);
        this.getTimePerMin = null;
        this.startTime = newArr[0].split(":")[0] * 60 + +newArr[0].split(":")[1];
        this.endTime = newArr[1].split(":")[0] * 60 + +newArr[1].split(":")[1];
        // 播放起始时间
        this.$emit("input", this.startTime);
        // 播放终止时间
        if (this.limit) {
          this.curTime = Math.min(this.endTime, this.curTime);
        } else {
          this.curTime = this.endTime;
        }
      }
    },
    daysRange(newArr) {
      clearInterval(this.getTimePerMin);
      this.getTimePerMin = null;
      this.startDate = this.timeTranslator(newArr[0]);
      this.endDate = this.timeTranslator(newArr[1]);
      this.getDateDiff(
        this.startDate.split(" ")[0],
        this.endDate.split(" ")[0]
      );
      this.$emit("input", this.calculatorTimeValue(this.startDate));
      if (this.dateDiff > 1) {
        this.curTime = this.max;
      } else {
        this.curTime = this.calculatorTimeValue(this.endDate);
      }
    },
  },
  computed: {
    sliderStyle() {
      return {
        width: `${100 * ((this.curTime - this.min) / (this.max - this.min))}%`
      }
    },
    timeToolStyle() {
      return {
        'border-radius': `${this.barHeight / 2}px`
      }
    },
    labelList() {
      const arr = []
      if (this.simpleTime) {
        const result = []
        for (let i = this.min; i <= this.max; i += this.gap) {
          result.push(i)
        }
        result.map((label, index) => {
          arr.push({
            index,
            position: ((index * 100) / (this.max - this.min)) * this.gap,
            label
          })
          return label
        })
      }else {
        const result = this.clocks
        result.map((label, index) => {
          arr.push({
            index,
            position: ((index * 100) / (this.max - this.min)) * this.gap,
            label
          })
          return label
        })
      }
      return arr
    },
    labelStyle() {
      return {
          left: '50%',
          top: '0',
          transform: 'translateX(-50%)'
        };
    }
  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.curValue = this.value;
    if (this.simpleTime) {
      this.curTime = this.max;
    } else {
      this.init();
    }
  },
  destroyed() {
    clearInterval(this.playStatus);
    this.playStatus = null;
  },
  // 方法
  methods: {
    init() {
      if (!this.limit) {
        this.curTime = 1440;
        return;
      }
      this.gettime();
      this.getTimePerMin = setInterval(this.gettime, 1000 * 60); // 每分钟刷新时间轴总长度
      const that = this;
      this.$once("hook:beforeDestroy", () => {
        clearInterval(that.getTimePerMin);
        that.getTimePerMin = null;
      });
    },
    // 获取最新时间
    gettime() {
      const nowDate = new Date();
      const nowHour = nowDate.getHours(); // 获取当前小时数(0-23)
      const nowMin = nowDate.getMinutes(); // 获取当前分钟
      this.curTime = nowHour * 60 + nowMin;
    },
    // 播放过程
    play() {
      if (this.simpleTime) {
        if (this.curValue + this.gap <= this.curTime) {
          this.curValue += this.gap;
          this.timeCallback();
        } else if (!this.circle) {
          this.$emit("input", this.value);
          // 播放结束触发myEndingEvent事件
          this.$emit("myEndingEvent", this.timeFilter(this.value), this.value);
          this.stop();
        } else {
          this.replay();
          this.isplay = false;
        }
        return;
      }
      // 不跨天
      if (this.dateDiff < 2) {
        if (this.curValue + this.gap <= this.curTime) {
          this.curValue += this.gap;
          this.timeCallback();
        } else if (!this.circle) {
          // 播放结束触发myEndingEvent事件
          this.$emit("myEndingEvent", this.timeFilter(this.value), this.value);
          this.stop();
          this.$emit("input", this.curTime);
        } else {
          this.replay();
          this.isplay = false;
        }
      } else if (this.nowDate < this.dateDiff) {
        // 不是最后一天
        if (this.curValue + this.gap < this.max) {
          this.timeCallback();
          this.curValue += this.gap;
        } else {
          this.nowDate += 1;
          const arr = this.dateText.split("-");
          const da = new Date(arr[0], +arr[1] - 1, +arr[2] + 1);
          this.dateText = this.timeTranslator(da).split(" ")[0];
          this.replay();
        }
      } else {
        // 最后一天
        this.curTime = this.calculatorTimeValue(this.endDate);
        if (this.curValue + this.gap <= this.curTime) {
          this.timeCallback();
          this.curValue += this.gap;
        } else if (!this.circle) {
          this.$emit("myEndingEvent", this.timeFilter(this.value), this.value);
          this.stop();
          this.$emit("input", this.curTime);
        } else {
          this.curTime = this.max;
          this.$emit("input", this.calculatorTimeValue(this.startDate));
          this.dateText = this.startDate.split(" ")[0];
          this.timeCallback();
          this.nowDate = 1;
        }
      }
    },
    // 暂停
    stop() {
      this.isplay = true;
      clearInterval(this.playStatus);
    },
    // 播放回调
    timeCallback() {
      setTimeout(() => {
        this.$emit(
          "change",
          this.timeFilter(this.value),
          this.value,
          this.dateText
        );
      }, 0);
    },
    // 播放
    go() {
      this.isplay = !this.isplay;
      if (!this.isplay && this.curValue + this.gap > this.curTime) {
        this.$emit("input", this.startTime || 0);
      }
    },
    // 重播
    replay() {
      // 跨天播放的非第一天
      if (this.nowDate > 1) {
        const end = this.calculatorTimeValue(this.endDate);
        if (this.curValue + this.gap === this.max) {
          this.curValue = 0;
        } else {
          // 非最后一天从gap开始播放， 最后一天取终点值和gap值的小值
          this.$emit(
            "input",
            this.nowDate === this.dateDiff ? Math.min(this.gap, end) : this.gap
          );
        }
        this.timeCallback();
      } else {
        this.$emit("input", this.startTime === "" ? 0 : this.startTime);
        this.isplay = true;
      }
    },
    // new Date -> yyyy-mm-dd hh:mm
    timeTranslator(time) {
      const myDate = new Date(time);
      const month = myDate.getMonth() + 1 < 10
          ? `0${myDate.getMonth() + 1}`
          : myDate.getMonth() + 1;
      const day =  myDate.getDate() < 10
          ? `0${myDate.getDate()}`
          : myDate.getDate();
      const hour = myDate.getHours() < 10
          ? `0${myDate.getHours()}`
          : myDate.getHours();
      const min = myDate.getMinutes() < 10
          ? `0${myDate.getMinutes()}`
          : myDate.getMinutes();
      const date = `${myDate.getFullYear()}-${month}-${day} ${hour}:${min}`;
      return date;
    },
    // 计算天数
    getDateDiff(date1, date2) {
      const arr1 = date1.split("-");
      const arr2 = date2.split("-");
      this.dateText = date1;
      const d1 = new Date(arr1[0], arr1[1] - 1, arr1[2]);
      const d2 = new Date(arr2[0], arr2[1] - 1, arr2[2]);
      this.dateDiff = (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24) + 1;
    },
    // make一个0~24的数组
    makeNumberArr(num) {
      let i = 0;
      const arr = [];
      while (i < num) {
        arr.push(i);
        i += 1;
      }
      return arr;
    },
    // hh:mm -> hh + mm*60
    calculatorTimeValue(str) {
      return (
        str.split(" ")[1].split(":")[0] * 60 + +str.split(" ")[1].split(":")[1]
      );
    },
    getLabelStyle(item) {
      return {
          left: `${item.position}%`,
          width: `${this.barHeight}px`,
          transform: 'translateX(-50%)'
        }
    }
  },
};
</script>

<style scoped lang="scss">
.time-tool {
  padding: 0 12px;
  display: flex;
  align-items: center;
  .time-tool-wrapper {
    flex: 1;
    margin-right: 20px;
    position: relative;
    cursor: pointer;
    background-color: #e4e7ed;
  }
  .slider-labels {
    position: relative;
    width: 100%;
    height: 100%;
    .slider-label-item {
      height: 100%;
      position: absolute;
      z-index: 4;
      .slider-label-text {
        font-size: 14px;
        white-space: nowrap;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
      }
    }
  }
  .play-btn {
    // transform: translate(30%, 40%);
    cursor: pointer;
    color: #000;
    font-size: 50px;
  }
}
</style>
