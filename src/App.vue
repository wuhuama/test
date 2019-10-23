<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import  "babel-polyfill"
export default {
  name: 'App',
  mounted() {
    console.log('更新');
  },
}
</script>

<style>

</style>
