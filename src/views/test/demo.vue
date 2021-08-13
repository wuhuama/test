<template>
  <div class="test-container">
    <div class="t-header">
      <div>
        视频1-mp4: <el-input
          v-model="value"
          placeholder="请输入视频链接地址"
          @keyup.enter.native='handleChange(0)'
          clearable
        ></el-input>
      </div>
      <div>
        视频2-webm: <el-input
          v-model="value2"
          placeholder="请输入视频链接地址"
          @keyup.enter.native='handleChange(1)'
          clearable
        ></el-input>
      </div>
      <div>
        视频3-m3u8: <el-input
          v-model="value3"
          placeholder="请输入视频链接地址"
          @keyup.enter.native='handleChange(2)'
          clearable
        ></el-input>
      </div>
    </div>
    <VideoPlayer :source="source"/>

    <div>
       music
      <AudioPlayer :source.sync="msource"/>
    </div>
  </div>
</template>
<script>
import VideoPlayer from '@/components/Video'
import AudioPlayer from '@/components/Audio'

export default {
  name: 'Test',
  data() {
    return {
      value: 'https://www.runoob.com/try/demo_source/movie.mp4',
      value2: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      value3: 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8',
      value4: 'rtmp://58.200.131.2:1935/livetv/cctv1',
      source: 'https://www.runoob.com/try/demo_source/movie.mp4',
      msource: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/zzzzzmp3/2015kNov/20X/20m_MingX/01.mp3'
    }
  },
  components: {
    VideoPlayer,
    AudioPlayer
  },
  methods: {
    handleChange(v) {
      const arr = [this.value, this.value2, this.value3]
      this.source = arr[v]
    }
  },
}
</script>
<style lang="scss">
  .t-header {
    .el-input {
      width: 600px;
    }
  }
</style>
