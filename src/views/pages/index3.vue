<template>
  <div class="wrap">
    <!-- text-fill-color，IE果然又不兼容。移动端UC浏览器也不兼容。
      -webkit-background-clip: text; 非正式属性，目前（2017-07-07）仅仅FF、Chrome、Safari支持，并且必须带前缀。
      所以，如果您的目标用户很有可能会用IE浏览器，那么，就需要再写一个IE下能正常浏览的代码：用图片代替 -->
    <div class="text-liner">这是一段渐变文字。</div>
    <input type="text" v-model.lazy="value1">
    <el-tree-select v-model="value1" :name="valueTitle" :options="menus" @getValue="getValue($event)" @getName="getName($event)"></el-tree-select>
    <el-tree-select2 v-model="value1" :data="menus"></el-tree-select2>
  </div>
</template>
<script>
import ElTreeSelect from '@/components/TreeSelect/index'
import ElTreeSelect2 from '@/components/TreeSelect/index2'
export default {
  data () {
    return {
      value1: 111,
      valueTitle:'',
      img1: require('@/assets/images/text-gradient.png'),
      menus: [{
        id: 1,
        label:'菜单1',
        children:[{
          id: 11,
          label:'子菜单11'
        },{
          id: 12,
          label:'子菜单12',
          children: [{
            id: 111,
            label:'子菜单111'
          }]
        }]
      },{
        id: 2,
        label:'菜单2',
        children:[{
          id: 21,
          label:'子菜单21'
        },{
          id: 22,
          label:'子菜单22',
          children: [{
            id: 221,
            label:'子菜单221'
          },{
            id: 222,
            label:'子菜单222'
          },{
            id: 223,
            label:'子菜单223'
          },{
            id: 224,
            label:'子菜单224'
          }]
        }]
      },{
        id: 3,
        label:'菜单3'
      }]
    }
  },
  components: {
    ElTreeSelect,
    ElTreeSelect2
  },
  mounted() {
    // setTimeout(() => {
    //   this.value1 = 222
    // }, 2000);
  },
  methods: {
    getValue(value){
      this.value1 = value
    },
    getName(name) {
      this.valueTitle = name
    }
  },
}
</script>
<style scoped>
  .text-liner {
    display: inline-block;
    font-size: 36px;
    background-image:linear-gradient(left, #2db5e8, #08d588);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>