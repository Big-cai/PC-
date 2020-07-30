<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px 0;">
    <el-breadcrumb-item :to="{ path: '/hotel' }">
      {{ hotelData.big_cate }}
    </el-breadcrumb-item>
    <el-breadcrumb-item><a href="/hotel">广州酒店</a></el-breadcrumb-item>
    <el-breadcrumb-item>{{ hotelData.address }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    hotelData: Object
  }
};
</script>

<style></style>
