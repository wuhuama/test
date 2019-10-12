<template>
  <div class="page-box">
    <span>共{{total}}条/第{{current}}页</span>
    <button type="button" class="pre" :disabled="current==1" @click="setCurrent(current-1)">&lt;</button>
    <ul class="page-nums">
      <li v-for="(i, index) in grouplist" :key="index" :class="['page-item', {'active':current === i}]" @click="setCurrent(i)">{{i}}</li>
    </ul>
    <button type="button" class="next" :disabled="current==maxPageNum" @click="setCurrent(current+1)">&gt;</button>
    <span>前往<input type="number" min="1" class="jump" />页</span>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    // 分页数目
		// 默认可视为5页
		pagegroup: {
			type: Number,
			default: 5,
		}
  },
  data () {
    return {
      current: this.currentPage
    }
  },
  computed: {
    maxPageNum: function () {
      return Math.ceil(this.total / this.pageSize)
    },
    grouplist: function () {
      let len = this.maxPageNum, // 总页数
          count = Math.floor(this.pagegroup/2),
          center = this.current,//把当前页当做中间页
          temp = [],
          list = [];

      // 总页数小于分页数
      if (len <= this.pagegroup) {
        while(len--) {
          temp.push({
            tex: this.maxPageNum-len,
            val: this.maxPageNum-len
          })
        }
        return temp
      }
      // 总页数大于分页数
      while(len--) {
        temp.push(this.maxPageNum-len)
      }

      let idx = temp.indexOf(center) //找到当前页所在所有分页中的下标
      console.log(idx);
      // (eq<count) && ()
      // 判断这个位置与中间偏离的大小
      // 计算出中间值
      (idx < count) && (center = center + count - idx);
      (this.current > this.maxPageNum - count) && (center = this.maxPageNum - count)
      // 从当前位置减去偏移量再减去1就是数组索引，
      // 获取this.pagegroup长度数组
      temp = temp.splice(center - count - 1, this.pagegroup);

      do{
        // 拼接数据
        let t = temp.shift();
        list.push(t)
      }while(temp.length)

      // 接着判断数组是否到达处于中间
      if (this.maxPageNum > this.pagegroup) {
        (this.current > count + 1) && list.unshift((list[0] - 1));
        // (this.current < this.maxPageNum - count) && list.push((list[list.length - 1] + 1));
      }
      return list;
    }
  },
  methods: {
    setCurrent (i) {
      this.current = i
    }
  },
}
</script>
<style lang="" scope>
.page-box {
  color: #000;
  font-size: 12px;
}
.page-nums {
  display: inline-block;
}
.page-nums .page-item {
  display: inline-block;
  padding: 10px;
  background: rgb(236, 234, 234);
  margin-right: 5px;
  cursor: pointer;
}
.page-item.active {
  background: #99e3ec;
  color: #fff;
}
.pre,.next {
  display: inline-block;
  padding: 10px;
  border: none;
  outline: none;
}
.pre:disabled,.next:disabled {
  cursor: not-allowed;
}
ul, li {
  margin: 0;
  padding: 0;
}
</style>
