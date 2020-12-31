<template>
  <div class="container">
    <div class="wrapper"> 
      <TimeLine
        v-model="value"
        :min='0'
        :max='time24'
        :step="30"
        ref="timeline"
        class="timeline"
        :vertical="false"
        :showTooltip="true"
        :formatter-tooltip="formatVal"
        :marks="true"
        @change="handleChange"></TimeLine>
    </div>
  </div>
</template>
<script>
import TimeLine from '@/components/timeLine'
export default {
  name: 'Demo',
  data() {
    return {
      value: 0,
      time24: 100,
      marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    }
  },
  components: {
    TimeLine
  },
  mounted() {
    
  },
  methods: {
    handleChange(value) {
      console.log(`当前值为${value}`);
    },
    formatVal(value) {
      const hh = this.addZero(parseInt(value/60))
      const mm = this.addZero(value%60)
      return `${value}`
    },
    addZero(val) {
      return val < 10 ? `0${val}` : val
    }
  },
}
</script>
<style lang="scss">
  .wrapper {
    margin-left: 100px;
    margin-top: 100px;
    margin-right: 100px;
  }
</style>