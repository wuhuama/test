<template>
  <div :class="['slider', {'is-vertial': vertical}]">
    <input v-model="value" class="slider-input" />
    <div
      ref="slider"
      class="slider-runway"
      :style="runwayStyle"
      @click.prevent="clickSlider"
    >
      <div class="slider-bar"
        :style="barStyle"
      >
      </div>
      <!-- 滑块按钮 -->
      <div
        ref="button"
        class="slider-button-wrapper"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @mousedown="onButtonDown"
        @touchstart="onButtonDown"
        :style="wrapperStyle"
      >
        <div class="slider-button" :style="buttonStyle"></div>
      </div>
      <!-- tooltip  -->
      <div
        :class="['tooltip', vertical ? 'left-tooltip' : 'top-tooltip']"
        :style="tooltipStyle"
        v-show="showTooltip"
      >
        <div
          class="tooltip-inner"
        >
          {{tooltipText}}
        </div>
      </div>
      <!-- 刻度标记 -->
      <div class="slider-marks" v-if="markList.length">
        <div
          class="slider-mark"
          v-for="(item, index) in markList"
          :key="index"
          :style="getMarkStyle(item)"
        >
          <div :class="['slider-mark-tick', {'lastValmore100': item.position >= 100}]" :style="tickStyle" v-show="showTick"></div>
          <div class="slider-mark-label" :style="labelStyle">
            <span>{{item.mark}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cslider',
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    /* 两个值之间的间隔 必须大于0 并且能被max-min整除 */
    step: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 0,
    },
    /* 垂直方向时，需给定组件一个高度，否则会无法正常渲染 */
    vertical: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 6
    },
    /* 垂直方向时用到默认是6 */
    width: {
      type: Number,
      default: 6
    },
    /* 滑块按钮的大小 */
    dotSize: {
      type: Number,
      default: 10
    },
    sliderDisabled: {
      type: Boolean,
      default: false
    },
    /* 是否显示tooltip */
    showTooltip: {
      type: Boolean,
      default: false
    },
    /* tooltip格式化 */
    formatterTooltip: {
      type: Function
    },
    /* 标记数组 */
    marks: {
      type: [Boolean, Array]
    },
    /* 是否显示间断点标记 */
    showTick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sliderSize: 1,
      oldValue: null,
      newValue: null,
      dragging: false,
      hovering: false,
      isClick: false,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0,
      transDuration0: false
    };
  },
  computed: {
    tooltipText() {
      return (typeof this.formatterTooltip === 'function' && this.formatterTooltip(this.value)) || this.value
    },
    barSize() {
      let barSize = `${(100 * (this.value - this.min)) / (this.max - this.min)}`
      if (barSize < 0) {
        barSize = 0
      } else if (barSize > 100) {
        barSize = 100
      }
      return barSize;
    },
    maxValue() {
      const int = parseInt((this.max - this.min) / this.step, 10) * this.step + this.min
      return int
    },
    currentPosition() {
      return `${((this.value - this.min) / (this.max - this.min)) * 100}%`;
    },
    barStart() {
      return '0%';
    },
    runwayStyle() {
      return this.vertical
        ? {
          height: `${this.height}px`,
          width: `${this.width}px`,
          'border-radius': `${this.width / 2}px`
        }
        : {
          height: `${this.height}px`,
          'border-radius': `${this.height / 2}px`
        };
    },
    barStyle() {
      return this.vertical
        ? {
          height: `${this.newPosition}%`,
          bottom: this.barStart,
          'border-radius': `0 0 ${this.width / 2}px ${this.width / 2}px`,
          'transition-duration': this.dragging ? '0s' : '0.3s'
        }
        : {
          width: `${this.newPosition}%`,
          left: this.barStart,
          'border-radius': `${this.height / 2}px 0 0 ${this.height / 2}px`,
          'transition-duration': this.dragging ? '0s' : '0.3s'
        };
    },
    wrapperStyle() {
      return this.vertical
        ? {
          height: `${this.dotSize + 10}px`,
          width: `${this.dotSize + 10}px`,
          left: `-${(this.dotSize + 10 - this.width) / 2}px`,
          bottom: `${this.newPosition}%`,
          'transition-duration': this.dragging ? '0s' : '0.3s'
        }
        : {
          height: `${this.dotSize + 10}px`,
          width: `${this.dotSize + 10}px`,
          top: `-${(this.dotSize + 10 - this.height) / 2}px`,
          left: `${this.newPosition}%`,
          'transition-duration': this.dragging ? '0s' : '0.3s'
        };
    },
    buttonStyle() {
      return {
        width: `${this.dotSize}px`,
        height: `${this.dotSize}px`,
      }
    },
    tooltipStyle() {
      return this.vertical
        ? {
          bottom: `${this.newPosition}%`,
          'transition-duration': this.dragging ? '0s' : '0.3s'
        }
        : {
          left: `${this.newPosition}%`,
          'transition-duration': this.dragging ? '0s' : '0.3s'
        };
    },
    markList() {
      if (!this.marks) {
        return [];
      }
      const arr = []
      if (typeof this.marks === 'boolean') {
        // 均分
        const result = []
        for (let i = this.min; i <= this.max; i += this.step) {
          result.push(i)
        }
        result.map((mark, index) => {
          arr.push({
            index,
            position: ((index * 100) / (this.max - this.min)) * this.step,
            mark
          })
          return mark
        })
      }
      if (this.marks instanceof Array) {
        this.marks.map((mark, index) => {
          arr.push({
            index,
            position: (index * 100) / (this.marks.length - 1), // (this.max - this.min) * this.step,
            mark
          })
          return mark
        })
      }
      return arr
    },
    tickStyle() {
      return this.vertical
        ? {
          width: `${this.width}px`,
          height: `${this.width}px`
        }
        : {
          width: `${this.height}px`,
          height: `${this.height}px`
        };
    },
    labelStyle() {
      return this.vertical
        ? {
          'margin-left': `${this.width + 5}px`,
          left: '0',
          top: '50%',
          transform: 'translateY(-50%)'
        }
        : {
          'margin-top': `${this.height + 5}px`,
          left: '50%',
          top: '0',
          transform: 'translateX(-50%)'
        };
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    value(val, oldVal) {
      if (this.dragging) {
        return;
      }
      this.setValue();
    },
    dragging(val) {
      if (!val) {
        this.setValue();
      }
    },
    newValue(val) {
      this.$emit('input', val);
    },
    min() {
      this.setValue();
    },
    max() {
      this.setValue();
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resetSize);
  },
  mounted() {
    if (typeof this.value !== 'number' || Number.isNaN(this.value)) {
      this.newValue = this.min;
    } else {
      this.newValue = Math.min(this.max, Math.max(this.min, this.value));
    }
    this.oldValue = this.newValue;
    this.newPosition = ((this.value - this.min) / (this.max - this.min)) * 100;
    window.addEventListener('resize', this.resetSize);
  },
  methods: {
    // 检测slider的值是否发生改变
    valueChange() {
      return this.value !== this.oldValue;
    },
    // 设置slider的value
    setValue() {
      if (this.min > this.max) {
        console.error('min 不能比 max 大');
        return;
      }
      const val = this.value;
      if (typeof val !== 'number' || Number.isNaN(val)) return;
      if (val < this.min) {
        this.$emit('input', this.min);
      } else if (val > this.max) {
        this.$emit('input', this.max);
      } else {
        this.newValue = val;
        this.newPosition = parseFloat(this.barSize)
        if (this.valueChange()) {
          this.oldValue = val;
        }
      }
    },
    // 用于计算父组件的宽度
    resetSize() {
      if (this.$refs.slider) {
        this.sliderSize = this.$refs.slider[
          `client${this.vertical ? 'Height' : 'Width'}`
        ];
      }
    },
    // 点击slider的进度条
    clickSlider(event) {
      if (this.sliderDisabled || this.dragging) return;
      this.resetSize();
      // 相对于视口的top,left
      if (this.vertical) {
        const sliderOffsetBottom = this.$refs.slider.getBoundingClientRect()
          .bottom;
        this.setPosition(
          ((sliderOffsetBottom - event.clientY) / this.sliderSize) * 100
        );
      } else {
        const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
        this.setPosition(
          ((event.clientX - sliderOffsetLeft) / this.sliderSize) * 100
        );
      }
      this.emitChange();
    },
    // 设置滑块按钮的位置
    setPosition(percent) {
      setTimeout(() => {
        this.newPosition = parseFloat(this.barSize)
      }, 0);
      this.setButtonPosition(percent);
    },
    setButtonPosition(newPosition, flag, diff) {
      if (newPosition === null || Number.isNaN(newPosition)) return;

      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > this.maxValue) {
        newPosition = this.maxValue;
      }
      /**
       * newPosition: 新值的百分比
       * lengthPerStep: 步长百分比
       */
      const lengthPerStep = 100 / ((this.max - this.min) / this.step);
      let steps = 0;
      if (flag === 'mousemove') {
        if (diff < 0) {
          steps = Math.floor(newPosition / lengthPerStep);
        } else {
          steps = Math.ceil(newPosition / lengthPerStep);
        }
      }
      if (flag === 'drag') {
        steps = Math.ceil(newPosition / lengthPerStep);
      } else {
        const spanStep = newPosition / lengthPerStep;
        const per = spanStep > 1 ? spanStep - parseInt(spanStep, 10) : spanStep;
        if (per < 0.1) {
          steps = Math.floor(newPosition / lengthPerStep);
        } else {
          steps = Math.ceil(newPosition / lengthPerStep);
        }
      }
      let value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
      value = parseFloat(value.toFixed(this.precision()));
      this.$emit('input', value);

      if (!this.dragging && this.value !== this.oldValue) {
        this.oldValue = this.value;
      }
    },
    // 根绝min, max, step 获取精度
    precision() {
      const precisions = [this.min, this.max, this.step].map((item) => {
        const decimal = (`${item}`).split('.')[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max.apply(null, precisions);
    },
    //
    emitChange() {
      this.$nextTick(() => {
        this.$emit('change', this.value);
      });
    },
    handleMouseEnter() {
      this.hovering = true;
    },
    handleMouseLeave() {
      this.hovering = false;
    },
    onButtonDown(event) {
      if (this.sliderDisabled) return;
      this.onDragStart(event);
      window.addEventListener('mousemove', this.onDragging);
      window.addEventListener('touchmove', this.onDragging);
      window.addEventListener('mouseup', this.onDragEnd);
      window.addEventListener('touchend', this.onDragEnd);
      window.addEventListener('contextmenu', this.onDragEnd);
    },
    onDragStart(event) {
      this.dragging = true;
      this.isClick = true;
      if (event.type === 'touchstart') {
        event.clientY = event.touches[0].clientY;
        event.clientX = event.touches[0].clientX;
      }
      if (this.vertical) {
        this.startY = event.clientY;
      } else {
        this.startX = event.clientX;
      }
      this.startPosition = parseFloat(this.currentPosition);
      this.newPosition = this.startPosition;
    },
    onDragging(event) {
      if (this.dragging) {
        this.isClick = false; // 滑块拖动过程中可判定不是点击事件
        this.resetSize();
        if (event.type === 'touchmove') {
          event.clientY = event.touches[0].clientY;
          event.clientX = event.touches[0].clientX;
        }
        /* diff 滑块移动的距离 */
        let diff = 0;
        if (this.vertical) {
          this.currentY = event.clientY;
          diff = ((this.startY - this.currentY) / this.sliderSize) * 100;
        } else {
          this.currentX = event.clientX;
          diff = ((this.currentX - this.startX) / this.sliderSize) * 100;
        }
        this.newPosition = this.startPosition + diff;
        if (this.newPosition < 0) {
          this.newPosition = 0
        } else if (this.newPosition > this.maxValue) {
          this.newPosition = this.maxValue
        }
        this.setButtonPosition(this.newPosition, 'mousemove', diff);
      }
    },
    // eslint-disable-next-line no-unused-vars
    onDragEnd(event) {
      if (this.dragging) {
        setTimeout(() => {
          this.dragging = false;
          if (!this.isClick) {
            this.newPosition = parseFloat(this.barSize)
            this.setButtonPosition(this.newPosition, 'drag');
            this.emitChange();
          }
        }, 0);
        window.addEventListener('mousemove', this.onDragging);
        window.addEventListener('touchmove', this.onDragging);
        window.addEventListener('mouseup', this.onDragEnd);
        window.addEventListener('touchend', this.onDragEnd);
        window.addEventListener('contextmenu', this.onDragEnd);
      }
    },
    getMarkStyle(item) {
      return this.vertical
        ? {
          bottom: `${item.position}%`,
          height: `${this.width}px`,
          transform: 'translateY(50%)'
        }
        : {
          left: `${item.position}%`,
          width: `${this.height}px`,
          transform: 'translateX(-50%)'
        }
    }
  },
};
</script>

<style lang="scss" scoped>
.slider-input {
  display: block;
  margin-bottom: 10px;
}
.slider {
  &.is-vertial {
    .slider-runway {
      .slider-bar {
        width: 100%;
      }
      .slider-button-wrapper {
        top: auto;
        transform: translateY(50%);
      }
      .slider-marks {
        .slider-mark {
          width: 100%;
        }
      }
    }
  }
}
.slider-runway {
  background-color: #e4e7ed;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
}
.slider-bar {
  position: absolute;
  height: 100%;
  background-color: #409eff;
  // transition-property: all;
  transition: all 0.3s ease 0s;
  z-index: 1;
}

.slider-button-wrapper {
  position: absolute;
  z-index: 5;
  transform: translateX(-50%);
  background-color: transparent;
  text-align: center;
  user-select: none;
  line-height: normal;
  .slider-button {
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0.5px 0.5px 2px 1px rgba(0,0,0,.32);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease 0s;
    user-select: none;
  }
}

.tooltip {
  position: absolute;
  transition: all 0.3s ease 0s;
  &.top-tooltip {
    top: -10px;
    left: 50%;
    transform: translate(-50%, -100%);
    .tooltip-inner {
      &::after {
        border-color: transparent;
        border-top-color: #409eff;
        top: 100%;
        left: 50%;
        transform: translate(-50%);
        margin-top: -1px;
      }
    }
  }
  &.left-tooltip {
    left: -10px;
    transform: translate(-100%, 50%);
    .tooltip-inner {
      &::after {
        border-color: transparent;
        border-left-color: #409eff;
        transform: translateY(-50%);
        top: 50%;
        left: 100%;
        margin-left: -1px;
      }
    }
  }
  .tooltip-inner {
    background: #409eff;
    color: #fff;
    padding: 2px 5px;
    border-radius: 2px;
    white-space: nowrap;
    text-align: center;
    min-width: 20px;
    min-height: 10px;

    &::after {
      content: '';
      height: 0;
      width: 0;
      border-width: 5px;
      border-style: solid;
      position: absolute;
    }
  }
}

.slider-marks {
  position: relative;
  width: 100%;
  height: 100%;
  .slider-mark {
    height: 100%;
    position: absolute;
    z-index: 4;

    &:first-child {
      .slider-mark-tick {
        display: none;
      }
    }

    &:last-child {
      .slider-mark-tick.lastValmore100 {
        display: none;
      }
    }
    .slider-mark-tick {
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;
      background-color: rgba(0,0,0,.16)
    }
    .slider-mark-label {
      font-size: 14px;
      white-space: nowrap;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
    }
  }
}

</style>
