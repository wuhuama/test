<template>
  <div class="parent">
    <div>我是父组件</div>
    <child-a :message="message" :messageA="messageA" v-on:getAData="getAData"></child-a>
    <child-b></child-b>
    <!-- <i-button :size="defaulf" :disabled="false">保存</i-button> -->
  </div>
</template>
<script>
import childA from '@/components/props/childA'
import childB from '@/components/props/childB'
// import iButton from '@/components/props/iButton'
export default {
  data(){
    return {
      defaulf: 'defaulf',
      message: 'hello',
      messageA: 'hello childA'
    }
  },
  components:{
    childA,
    childB,
    // iButton
  },
  methods: {
    getAData(val){
      console.log(`来自child A的信息${val}`);
    }
  },
}
</script>