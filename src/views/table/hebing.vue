<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="amount1" label="部门"></el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）"></el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "研发",
          amount2: "3.2",
          amount3: 10
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "研发",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "行政",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "客服",
          amount2: "2.2",
          amount3: 17
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "客服",
          amount2: "4.1",
          amount3: 15
        },
        {
          id: "12987127",
          name: "王小丫",
          amount1: "客服",
          amount2: "4.1",
          amount3: 15
        }
      ],
      spanArr: [],
      pos: 0
    }
  },
  mounted() {
    this.getSpanArr(this.tableData)
  },
  methods: {
    getSpanArr(data) {
      this.spanArr = []
      for (var i = 0; i < data.length; i++) {
          if (i === 0) {
              this.spanArr.push(1);
              this.pos = 0
          } else {
              // 判断这一条和上一条的值是否相同
              if (data[i].amount1 === data[i - 1].amount1) {
                  this.spanArr[this.pos] += 1;
                  this.spanArr.push(0);
              } else {
                  this.spanArr.push(1);
                  this.pos = i;
              }
          }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 2) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        // alert(_row);
        // alert(_col);
        return {
            rowspan: _row,
            colspan: _col
        }
      }
    }
  }
};
</script>