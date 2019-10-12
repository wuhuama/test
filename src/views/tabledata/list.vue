<template>
<div class="container">
  <ul>
    <li v-for="(i,index) in list" :key="index">
      <b>{{i.id}}</b><span>{{i.name}}</span>
    </li>
  </ul>
  <my-page :total="total" :current-page="currentPage" :page-size="pageSize"></my-page>
</div>
</template>
<script>
import myPage from '@/components/Pagination/index'
export default {
  data () {
    return {
      data: [],
      list: [],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30],
      total: 0
    }
  },
  components: {
    myPage
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let num = 600
      let arr = ['苹果', '橘子', '西瓜', '火龙果', '香蕉', '草莓']
      for (let i = 1; i < num; i++) {
        this.data.push({
          id: i,
          name: arr[i % 6]
        })
        this.total = this.data.length
        this.list = this.data.slice(0, 10)
      }
    }
  }
}
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
  }
</style>
