<template>
  <!-- 酒店详情页 -->
  <div class="container">
    <!-- 1.面包屑 -->
    <div class="breadcrumb">
      <!-- 攻略详情面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/tesa' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/tesa' }">广州酒店</el-breadcrumb-item>
        <el-breadcrumb-item>锦江之星（吴泾点）</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 2.酒店信息简介 -->
    <el-row class="name-info"></el-row>

    <!-- 3.酒店图片 -->
    <el-row class="pic-info"></el-row>

    <!-- 4.价格-房型信息 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>

    <!-- 5.地图 -->
    <div class="info-row"></div>

    <!-- 6.酒店基本信息 -->
    <div class="info-row"></div>

    <!-- 7.酒店评价 -->
    <div class="comment-row"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  }
};
</script>

<style lang="less" scoped>
.container {
  //1.面包屑
  .breadcrumb {
    padding: 20px 0;
    overflow: hidden;
  }
  //2.酒店信息简介
  //3.酒店图片
  //4.价格-房型
  //5.地图
  //6.酒店基本信息
  //7.酒店评价
}
</style>