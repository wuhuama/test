<template>
	<div class="pagination" v-if="totalPage>1">
		<span v-if="!small" class="total">共{{totalCount}}条记录&nbsp;&nbsp;&nbsp;第{{currentPage}}/{{totalPage}}页</span>
		<ul class="paging">
			<li class="prev" :class="{'disabled':currentPage<=1}" @click="currentPage<=1?'':turn(currentPage-1)">&lt;</li>

			<li v-for="i in showPageBtn"
				:key="i" class="num"
				:class="{'active':i==currentPage,'num iconfont icon-more':i==='-'||i==='+'}"
				@mouseenter="i==='-'?toPrev=true:i==='+'?toNext=true:''"
				@mouseleave="i==='-'?toPrev=false:i==='+'?toNext=false:''"
				@click="i==='-'?turn(currentPage-1):i==='+'? turn(currentPage+1):turn(i)">{{i>0?i:'...'}}</li>
			<!--<li v-else-if="i==='-'" class="num iconfont icon-more" :class="{'icon-d-arrow-left':toPrev}" @click="turn(currentPage-1)" @mouseenter="toPrev=true" @mouseleave="toPrev=false"></li>
			<li v-else-if="i==='+'" class="num iconfont icon-more" :class="{'icon-d-arrow-right':toNext}" @click="turn(currentPage+1)" @mouseenter="toNext=true" @mouseleave="toNext=false"></li>-->

			<li class="next" :class="{'disabled':currentPage>=totalPage}"  @click="currentPage>=totalPage?'':turn(currentPage+1)">&gt;</li>
		</ul>
    <!-- <select v-if="!small" v-model="limitNum" @change="turn(currentPage)">
      <option v-for="item in limitNums" :value="item" :key="item">{{item}}条/页</option>
    </select> -->
		<span  v-if="all" class="jump">前往<input type="text" autocomplete="off" v-model="goPage" @keyup.enter="turn(goPage)">页</span>
	</div>
</template>

<script>
export default {
  name: "MyPagination",
  props: {
    currentPage: {
      //当前页
      type: Number,
      default: 1
    },
    limit: {
      //每页显示条数
      type: Number,
      default: 10
    },
    totalCount: {
      //总条数
      type: Number,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    all: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      goPage: "1",
      limitNum: "",
      limitNums: [5, 10, 15, 20, 25, 30],
      toPrev: false,
      toNext: false
    };
  },
  created: function() {
    // this.initLimitNums();
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalCount / this.limit);
    },
    showPageBtn() {
      let pageNum = Number(this.totalPage),
        index = Number(this.currentPage),
        arr = [];
      if (pageNum <= 9) {
        for (let i = 1; i <= pageNum; i++) {
          arr.push(i);
        }
        return arr;
      }
      if (index < 5) return [1, 2, 3, 4, 5, 6, 7, "+", pageNum]
      if (index >= pageNum - 1) return [1, 2, "-", pageNum - 5, pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
      if (index === pageNum - 2) return [1, 2, "-", pageNum - 5, pageNum - 4, pageNum - 3, pageNum - 2, pageNum - 1, pageNum] 
      return [1, "-", index - 2, index - 1, index, index + 1, index + 2, "+",  pageNum]
    }
  },
  methods: {
    // initLimitNums() {
    //   this.limitNum = this.limit;
    //   //if (this.limitNums.indexOf(this.limit) == -1) {
    //   if (!this.limitNums.includes(this.limit)) {
    //     this.limitNums.push(this.limit);
    //     this.limitNums.sort(function(a, b) {
    //       return a - b;
    //     });
    //   }
    // },
    //翻页，显示条数变化
    turn(page) {
      let i = parseInt(Number(page));
      if(isNaN(i)){
        return false
      }
      if (i < 1) {
        i = 1;
      } else if (i > this.totalPage) {
        i = this.totalPage
      }
      // if (this.limitNum !== this.limit && this.limitNum !== "") {
      //   //每页显示条数改变
      //   let pages = Math.ceil(this.totalCount / this.limitNum);
      //   if (page > pages) {
      //     i = pages
      //   }
      //   this.$emit("update:limit", this.limitNum);
      // }
      this.$emit("update:currentPage", i);
      this.goPage = i
      this.$emit("turn");
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination{
  position: absolute;
  top:15px;
  right:20px;
  line-height: 30px;
  user-select: none;
  text-align: right;
  .total{
    color:#78CDFF
  }
  .paging{
    display: inline-block;
    padding-left: 20px;
    margin: 0 20px;
    li{
      display: inline-block;
      border: 1px solid #1572d0;
      min-width: 32px;
      padding: 0 4px;
      margin: 0 2px;
      text-align: center;
      background: #0B254A;
      color:#4d91ff;
      cursor: pointer;
      &:not(.disabled):not(.active):hover{
        color: #1572d0;
        border-color: #1572d0;
      }
      &.active{
        background-color: #1572d0;
        color: #fff;
        cursor: default;
      }
      &.disabled{
        cursor:not-allowed;
        color: #999;
      }
    }
  }
  input{
    margin: 0 4px;
    width: 50px;
    padding: 4px 2px;
    border: 1px solid #1572d0;
    color: #fff;
    background: #0B254A;
    text-align: center;
  }
  .jump{
    color:#78CDFF;
    display: inline-block;
  }
}
</style>