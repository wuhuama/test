<!--
1. npm install --save video.js videojs-contrib-hls
2. 在主index.js中 import 'video.js/dist/video-js.css'
 -->
<template>
  <!-- playsinline: 禁止在iPhone safari中自动全屏 -->
  <div class="player-box">
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin vjs-big-play-centered"
      playsinline="true"
    ></video>
  </div>
</template>

<script>
import videojs from "video.js";
import 'videojs-contrib-hls'

export default {
  props: {
    options: {
      type: Object,
      default() {
        return {
          // 是否静音
          muted: false,
          // 是否拥有控制条
          controls: true,
          controlBar: {
            volumePanel: {
              inline: false // //默认是true,横着的
            },
            currentTimeDisplay: true, //当前播放位置
            timeDivider: false, // 时间分割线
            durationDisplay: false, // 总时间
            progressControl: true, // 进度条
            remainingTimeDisplay: true, // 剩余时间
            pictureInPictureToggle: false, // 画中画按钮
            fullscreenToggle: true, // 全屏按钮
          },
          userActions: {
            doubleClick: false // boolean|function 双击播放器是否全屏
          },
          // 尺寸
          height: 300,
          width: 600,
          // 播放器准备好之后，是否自动播放
          autoplay: false,
          // 视频播放结束后，是否循环播放
          loop: false,
           // 视频封面 播放前显示的视频画面
          poster: '',
           // 预加载
          preload: 'none',
          //播放速度
          playbackRates: [0.5, 1, 1.5, 2, 3],
          // 允许覆盖 Video.js 无法播放媒体源时显示的默认消息。
          notSupportedMessage: '此视频暂无法播放!',
        };
      }
    },
    source: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      player: null
    };
  },
  watch: {
    source: {
      handler(v) {
        this.resetVideo(v)
      }
    }
  },
  mounted() {
    this.init()
  },
  /**
   * 组件销毁时销毁视频对象
   */
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    init() {
      const promise = new Promise((resolve) => {
        this.player = videojs(
          this.$refs.videoPlayer,
          this.options,
          () => {
            this.onPlayerReady()

            this.player.on('ended', () => {
              this.onPlayerEnd()
            })

            resolve()
          }
        );
      })
      return promise

    },
    onPlayerReady() {
      // console.log('播放器已经准备好')
      this.resetVideo(this.source)
    },
    onPlayerEnd() {
      // console.log('播放结束')
      this.$emit('playEnd')
    },
    /**
     * 重置视频和设置播放器的视频源
     */
    resetVideo(src) {
      this.player.reset()
      const regx = new RegExp('rtmp:\/\/*')
      if (regx.test(src)) {
        return
      }
      const type = src.slice(src.lastIndexOf('.') + 1)?.toLowerCase()
      if (type === 'm3u8') {
        this.player.src([
          {
            src,
            type: 'application/x-mpegURL'
          }
        ]);
      } else if (type === 'ogg') {
        this.player.src([
          {
            src,
            type: 'video/ogg'
          }
        ]);
      } else if (type === 'webm') {
        this.player.src([
          {
            src,
            type: 'video/webm'
          }
        ]);
      } else if (type.indexOf('mp') > -1) { // mp4 mpeg mpg
        this.player.src([
          {
            src,
            type: 'video/mp4'
          }
        ]);
      }
      this.player.load();
    }
  },
};
</script>
<style lang="scss">
.player-box {
  // .video-js .vjs-tech{
  //   object-fit: cover
  // }
  .video-js.vjs-playing .vjs-tech {
    pointer-events: auto;
  }
  .vjs-paused .vjs-big-play-button,
  .vjs-paused.vjs-has-started .vjs-big-play-button {
      display: block;
  }
  .video-js.vjs-error .vjs-big-play-button {
    display: none;
  }
  .video-js .vjs-big-play-button{
    font-size: 2.5em;
    line-height: 2.3em;
    height: 2.5em;
    width: 2.5em;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em;
    background-color: #73859f;
    background-color: rgba(115,133,159,.5);
    border-width: 0.15em;
    margin-top: -1.25em;
    margin-left: -1.75em;
  }
  /* 中间的播放箭头 */
  .vjs-big-play-button .vjs-icon-placeholder {
      font-size: 1.63em;
  }
  /* 加载圆圈 */
  .vjs-loading-spinner {
      font-size: 2.5em;
      width: 2em;
      height: 2em;
      border-radius: 1em;
      margin-top: -1em;
      margin-left: -1.5em;
  }
  .video-js button {
    outline: none; // 去除按钮点击后出现蓝色边框
  }
}
</style>
