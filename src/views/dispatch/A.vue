<template>
    <div>
        aaaaaaaa
	    <button @click="handleClick">触发子组件中的事件</button>
        <b-com>456789</b-com>
    </div>
</template>
<script>
  import Emitter from '@/mixins/emitter.js';
  import BCom from '@/views/dispatch/B.vue'

  export default {
    name: 'componentA',
    mixins: [ Emitter ],
    components:{
        BCom
    },
    methods: {
      handleClick () {
        this.broadcast('componentB', 'on-message', 'Hello Vue.js');
      },
      handleCC(val){
          window.alert(val)
      }
    },
    created() {
        this.$on('to-message', this.handleCC)
    },
  }
</script>