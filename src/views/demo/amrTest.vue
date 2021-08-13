<template>
  <div>
    <div>hhh</div>
    <audio controls>
      <source :src="amrAudio2" type="audio/mpeg">
      您的浏览器不支持 audio 元素。
    </audio>
  </div>
</template>

<script>

export default {
  name: 'AmrTest',
  data() {
    return {
      amrAudio: require('../assets/老鼠爱大米.amr'),
      amrAudio2: '' // require('../../../images/nav_bg2.png')
    }
  },
  mounted() {
    this.amrFun()
  },
  methods: {
    amrToMp3() {
      const amrToMp3 = require('amrToMp3')
      amrToMp3(amrAudio)
        .then(function (data) {
          console.log(data)  // ./src/mp3/test.mp3
          //...some code
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    amrFun() {
      let BenzAMRRecorder = require('benz-amr-recorder');  //引入
      this.amr = null;
      this.amr = new BenzAMRRecorder();    //创建
      this.amr.initWithUrl(amrAudio);   //初始化
      // this.amrTime.duration = data.audios[0].duration / 1000;  //音频总时长
      this.amr.play()  //播放
      this.amr.stop() //停止
    }
  },
}
</script>
