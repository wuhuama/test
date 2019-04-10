<template>
  <div class="childA">
    <div>我是组件1---{{message}}</div>
    <i-button v-bind="$attrs" v-on="$listeners">{{$attrs.messageA}}</i-button>
  </div>
</template>
<script>
import IButton from '@/components/props/iButton'
export default {
  props:['message'],
  components:{
    IButton
  }
}
</script>