<template>
  <div>
    <div class="container">
      <!-- 面包屑部分 -->
      <Breadcrumb />

      <!-- 筛选部分 -->
      <Screening />
      <!-- 地图部分 -->
      <HotelMap />

      <!-- 撤销条件部分 -->
      <Cancellation />

      <!-- 酒店列表部分、 -->
      <HodelList />

      <!-- 分页部分 -->
      <div class="paging">
      <el-pagination small background layout="prev, pager, next" :total="50"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/hotel/Breadcrumb'
import Screening from '@/components/hotel/Screening'
import HotelMap from '@/components/hotel/Hotel_Option'
import Cancellation from '@/components/hotel/Cancellation'
import HodelList from '@/components/hotel/HotelList'
export default {
  components: {
    Breadcrumb,
    Screening,
    HotelMap,
    Cancellation,
    HodelList
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
.paging{
  text-align: right;
  padding: 20px 0 40px;
}
</style>