<template>
  <div>
    我是B页面
    {{message}}
  </div>
</template>
<script>
export default {
  name: 'PageB',
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    const receiveMessage = (event) => {
      console.log(event, event.data, '我接收到了')

      localStorage.setItem('cookie', event.data)
      this.message = event.data
    }
    window.addEventListener('message', receiveMessage, false);
  },
  methods: {
    
  },
}
</script>