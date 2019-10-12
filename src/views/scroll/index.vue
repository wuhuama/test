<template>
    <!-- vue滚动条插件： vue-happy-scroll, vuescroll -->
    <!-- 你的内容 -->
    <div>
      <h3>仪表盘</h3>
  　　 <!-- 外层盒子 -->
      <div style="height:200px;width:300px;background-color:#ccc;">
        <!-- 这里的标签名称要和main.js文件中定义的组件名称保持一致 -->
        <happy-scroll color="rgba(0,0,0,0.2)" size="5" hide-horizontal resize>
          <!-- 内层盒子——内容区 -->
          <div class="con">
            <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
            <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
            <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
            <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
            <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
            <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
            <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
            <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
            <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
            <p>士大夫撒入个任务二个人合同不大废物个人都怕顺风耳个二级gap所爱速发sure欧若尔奥沙是否</p>
          </div>
        </happy-scroll>
      </div>
    </div>
</template>
<script>
import { HappyScroll } from 'vue-happy-scroll'
// 引入css，推荐将css放入main入口中引入一次即可。
import 'vue-happy-scroll/docs/happy-scroll.css'
export default {
  components: {HappyScroll} //在组件内注册
}
</script>