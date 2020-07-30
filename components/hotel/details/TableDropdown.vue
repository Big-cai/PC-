<template>
  <el-row class="back">
    <el-table
      :data="tableData"
      style="width: 100%;"
      height="195"
      @row-click="cimsInputClick"
    >
      <el-table-column  prop="name" label="价格来源" width="420">
      </el-table-column>
      <el-table-column prop="bestType" label="价格房型" width="420">
      </el-table-column>
      <el-table-column label="最低价格/每晚" width="160">
        <template slot-scope="scope">
          <span style="color:#ff9900">{{ scope.row.price }}</span>
          <i>起</i>
          <i class="el-icon-arrow-right" style="color:#ff9900"></i>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
    export default {
    props: {
        hotelData: Object
    },
  data() {
    return {
      tableData: [
        // {
        //   source: "携程",
        //   type: "高级大床房A",
        //   minimum: "￥148"
        // },
        // {
        //   source: "携程",
        //   type: "高级大床房A",
        //   minimum: "￥148"
        // },
        // {
        //   source: "携程",
        //   type: "高级大床房A",
        //   minimum: "￥148"
        // }
      ]
    };
  },
  created() {
    //数据一加载完毕，将父组件传递进来的酒店详情数据中的 products 赋值给data 中的 tableData 数组中
    this.tableData = this.hotelData.products;
  },
  methods: {
    cimsInputClick(row) {
      window.open("https://hotels.ctrip.com/hotel/694679.html", "_blank");
    }
  }
};
</script>

<style lang="less">
.back {
  margin-bottom: 40px ;
}
</style>
