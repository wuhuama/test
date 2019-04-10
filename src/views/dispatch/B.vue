<template>
    <div class="b">
        bbbbbb
        <slot></slot>
	    <button @click="handleAA">触发父组件中的事件</button>
    </div>
</template>
<script>
import Emitter from '@/mixins/emitter.js'

export default {
  name: 'componentB',
  mixins: [ Emitter ],
  created () {
    this.$on('on-message', this.showMessage);
  },
  methods: {
    showMessage (text) {
      window.alert(text);
    },
    handleAA(){
        this.dispatch('componentA', 'to-message', '你好,不不不不不')
    }
  }
}
</script>