<template>
  <div class="breadcrumbs">
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{$store.state.hotel.cityName}}酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.breadcrumbs {
  display: flex;
  justify-content: left;
  padding-left: 10px;
  color: #606266;
  padding: 20px 0;
}
</style>