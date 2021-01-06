<template>
  <div>
    我是A页面
    <iframe :src="src" frameborder="0" ref="iframeRef" @load="sendMessage"></iframe>
  </div>
</template>
<script>
export default {
  name: 'PageA',
  data() {
    return {
      src: ''
    }
  },
  mounted() {
    
  },
  methods: {
    sendMessage() {
      const ifwin = this.$refs.iframeRef.contentWindow
      ifwin.postMessage('123456', '*')
    }
  },
}
</script>