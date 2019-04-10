<template>
  <button type="button" :class="sizeType" :disabled="disabled" @click="passAData($attrs.messageA)">
    <slot></slot>
  </button>
</template>
<script>
  // 判断参数是否是其中之一
  function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  }

  export default {
    props: {
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large', 'default']);
        },
        default: 'default'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      sizeType(){
        return 'i-button-size' + this.size
      }
    },
    methods: {
      passAData(message){
        // console.log(message);
        this.$emit('getAData', message)
      }
    },
  }
</script>
<style lang="">
  .i-button-size-default{
    padding: 0
  }
  .i-button-size-large{
    padding: 10px 15px;
  }
</style>