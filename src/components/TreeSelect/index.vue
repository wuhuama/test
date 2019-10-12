<!--
  * @Description: 封装下拉树选择框组件
  * @use： <el-tree-select v-model="value1" :name="valueTitle" :options="menus" @getValue="getValue($event)" @getName="getValue($event)"></el-tree-select>
  * 必须提供选中项的选中值和显示值
-->
<template>
  <el-select :value="valueTitle" clearable @clear="clearHandle" :size="size" ref="elOption">
    <el-option :value="valueTitle" :label="valueTitle">
        <el-tree
          ref="selectTree"
          :data="options"
          :props="defaultProps"
          :node-key="defaultProps.value"
          :default-expanded-keys="defaultExpandedKey"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'ElTreeSlect',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          value: 'id', // ID字段名
          label: 'label', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },
    size: {
      type: String,
      default: () => {
        return '' //medium/small/mini
      }
    },
    value: {
      type: [Number,String],
      default: () => {
        return null
      }
    },
    name: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data () {
    return {
      valueId: this.value, //初始值
      valueTitle: this.name,
      defaultExpandedKey: []
    }
  },
  watch: {
    value: {
      handler: function (newVal, oldVal) {
          this.valueId = newVal
          this.defaultExpandedKey = newVal!=null ? [newVal] : []
          // this.$nextTick(() => {
          //   this.valueTitle = this.$refs.selectTree.getNode(newVal).data.label
          //   this.$refs.selectTree.setCurrentKey(newVal) // 设置默认选中
          // })
      },
      immediate: true,
      deep: true
    },
    name: {
      handler: function (newVal) {
        this.valueTitle = newVal
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.initHandle()
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.valueId) {
        this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data.label // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.valueId) // 设置默认选中
        this.defaultExpandedKey = [this.valueId] // 设置默认展开
      }
    },
    // 切换选项
    handleNodeClick(node) {
      this.valueTitle = node[this.defaultProps.label]
      this.valueId = node[this.defaultProps.value]
      this.$emit('getValue', this.valueId)
      this.$emit('getName', this.valueTitle)
      this.defaultExpandedKey = []
      this.$refs.elOption.blur()
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = ''
      this.valueId = null
      this.defaultExpandedKey = []
      this.$refs.selectTree.setCurrentKey(null) // 设置默认选中
      this.$emit('getValue', null)
      this.$emit('getName', null)
    }
  },
}
</script>
<style scoped>
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    padding: 0;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
</style>