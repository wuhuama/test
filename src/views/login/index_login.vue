<template>
  <div class="container">
     <svg-icon icon-class="pie" class="icon-main"></svg-icon>
     <div>
       <i class="icon-home"></i>
       <div id="testDrive" class="icon-">home house home2 house2 home3 house3 office buildings pencil write&nbsp;</div>
     </div>
  </div>
</template>
<script>
import SvgIcon from '@/components/SvgIcon'

export default {
  components: {
    SvgIcon
  }
}
</script>
<style>
  .icon-main{
    color: red;
  }
  .icon-home{
    font-size: 30px;
  }
</style>
