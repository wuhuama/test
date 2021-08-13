<template>
  <div class="audio-box">
    <audio :src="source" class="audio-player" @ended="endAudio"></audio>
    <!-- 播放 -->
    <div class="play" v-if="playShow" @click="playAudio">
      <svg
        t="1628754599703"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2046"
        width="200"
        height="200"
      >
        <path
          d="M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z m199.978667 525.653333l-291.456 247.978667a21.546667 21.546667 0 0 1-14.336 5.376c-10.794667 0-21.034667-7.594667-21.034667-19.029333V263.936c0-11.434667 10.24-19.072 21.034667-19.072 5.034667 0 10.112 1.621333 14.336 5.418667l291.456 247.978666c8.533333 7.509333 8.533333 19.84 0 27.349334z"
          :fill="options.color"
          opacity=".65"
          p-id="2047"
        ></path>
      </svg>
    </div>
    <!-- 暂停-->
    <div class="play" v-else @click="pauseAudio">
      <svg
        t="1628754780427"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3763"
        width="200"
        height="200"
      >
        <path
          :fill="options.color"
          d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM454.4 723.2c0 19.2-19.2 32-44.8 32-25.6 0-44.8-12.8-44.8-32L364.8 300.8c0-19.2 19.2-32 44.8-32 25.6 0 44.8 12.8 44.8 32L454.4 723.2zM665.6 723.2c0 19.2-19.2 32-44.8 32-25.6 0-44.8-12.8-44.8-32L576 300.8c0-19.2 19.2-32 44.8-32 25.6 0 44.8 12.8 44.8 32L665.6 723.2z"
          p-id="3764"
        ></path>
      </svg>
    </div>
    <div class="audio-timeline-wrap" v-if="showDuration">
      <div class="line-track" ref="line" :style="trackStyle" @click="trackClick">
        <div class="line-inner" :style="{ width: audioWidth + 'px' }"></div>
      </div>
    </div>
    <div class="time" v-if="totalTime && showDuration">
      <span class="play-time">{{ currentTime | formatTime }} </span> / <span class="total-time">{{ totalTime | formatTime }} </span></div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default() {
        return {
          color: "#2c2c2c"
        };
      }
    },
    source: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 100
    },
    showDuration: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      audio: null,
      playShow: true,
      audioInterval: null,
      audioEnd: false,
      audioWidth: 0,
      step: 0,
      currentTime: 0,
      totalTime: 0
    };
  },
  computed: {
    trackStyle() {
      return {
        width: `${this.width}.px`
      }
    }
  },
  watch: {
    source: {
      handler(v) {
        this.resetVideo(v);
      }
    }
  },
  filters: {
    formatTime(sec) {
      let hh = '00'
      let mm = '00'
      let ss = '00'
      const fillZero = (num, len) => {
        return num.toString().padStart(len, '0');
      }
      if (sec) {
        const min = Math.floor(sec % 3600);
        ss = fillZero(sec % 60, 2) // 秒
        mm = fillZero(Math.floor(min / 60), 2) // 分
        hh = fillZero(Math.floor(sec / 3600), 2) // 时
      }
      return `${hh}:${mm}:${ss}`
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.clearInterval();
  },
  methods: {
    init() {
      return new Promise((resolve) => {
        this.audio = document.querySelector(".audio-player");
        this.$nextTick(() => {
          this.audio.addEventListener('canplay', () => {
            this.totalTime = Number.parseInt(this.audio.duration)
          })
        })
        resolve()
      })
    },
    async resetVideo(src) {
      this.audio.load();
      this.$nextTick(() => {
        this.audio.addEventListener('canplay', () => {
          this.totalTime = Number.parseInt(this.audio.duration)
        })
      })
      this.currentTime = 0
    },
    /**
     * 播放音频
     */
    playAudio() {
      this.playShow = false
      if (this.showDuration) {
        const duration = this.totalTime || Number.parseInt(this.audio.duration) // 音频时间长度 单位: 秒
        if (Number.isNaN(duration) || duration.toString() === '+Infinity') {
          return
        }
        this.step = this.toFixed( this.$refs.line.offsetWidth / duration, 1);
        if (this.audioEnd) {
          this.audioEnd = false;
          this.audioWidth = 0;
          this.audio.load();
        }
        this.startInterval()
      }
      this.audio.play();
    },
    /**
     * 暂停音频
     */
    pauseAudio() {
      this.playShow = true;
      this.currentTime = this.totalTime;
      this.audio.pause();
      this.clearInterval();
    },
    /**
     * 音频播放结束
     */
    endAudio() {
      if (this.showDuration) {
        this.audioWidth = this.$refs.line.offsetWidth;
      }
      this.audioEnd = true;
      this.pauseAudio();
    },
    /**
     * 播放时的定时器
     * 更新播放时间
     */
    startInterval() {
      this.clearInterval();
      this.currentTime = Number.parseInt(this.audio.currentTime);
      this.audioInterval = setInterval(() => {
        this.currentTime = Number.parseInt(this.audio.currentTime);
        this.audioWidth = this.add(this.audioWidth, this.step);
      }, 1000);
    },
    // 清除定时器
    clearInterval() {
      this.audioInterval && clearInterval(this.audioInterval);
      this.audioInterval = null;
    },
    trackClick(event) {
      this.step = this.toFixed( this.$refs.line.offsetWidth / this.totalTime, 1);

      const tarRect = this.$refs.line.getBoundingClientRect()
      let newWidth = event.clientX - tarRect.left
      this.audioWidth = newWidth
      newWidth = newWidth > this.width ? this.width : newWidth
      const tatTime = newWidth / this.step
      this.audio.currentTime = tatTime
      this.playShow = false
      this.startInterval()
      this.audio.play()
    },
    toFixed(num, count) {
      return Number(num.toFixed(count))
    },
    add(a, b) {
      let m = 0, n = 0,              //记录a，b的小数位数
          d = a + "",                  //字符串化
          e = b + "";
      try {
        m = d.split(".")[1]?.length || 0;
      } catch (error) {
        console.log(error)
      }
      try {
        n = e.split(".")[1]?.length || 0;
      } catch (error) {
        console.log(error)
      }
      let maxInt = Math.pow(10, Math.max(m, n)); //将数字转换为整数的最大倍数
      return Number((a * maxInt + b * maxInt)) / maxInt;
    },
    // 补零
    fillZero(num, len) {
      return num.toString().padStart(len, '0');
    }
  }
};
</script>
<style lang="scss">
.audio-box {
  display: flex;
  align-items: center;
}
.play {
  width: 2em;
  height: 2em;
  svg {
    width: 100%;
    height: 100%;
  }
}
.audio-timeline-wrap {
  margin-left: 5px;
}
.line-track {
  height: 3px;
  background: rgba(128, 128, 128, 0.6);
}
.line-inner {
  height: 100%;
  background: rgb(71, 155, 233);
}
.time {
  font-size: 12px;
  color: #a3a3ac;
  margin-left: 5px;
}
.play-time {
  color: #333;
}
.total-time {
  color: #a3a3ac;
}
</style>
