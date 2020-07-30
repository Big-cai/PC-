<template>
  <el-row class="service">
    <div class="assets-he">
      <div class="assets-hd ">基本信息</div>
      <div class="assets-bd">
        <div style="width:200px">入住时间: 14:00之后</div>
        <div style="width:200px">离店时间: 12:00之前</div>
        <div style="width:200px">2010年开业 / 2010年装修</div>
        <div style="width:200px">酒店规模:{{ hotelData.roomCount }}间客房</div>
      </div>
    </div>
    <div class="assets-he">
      <div class="assets-hd ">主要设施</div>
      <el-button
        type="info"
        style="color:black; background-color: #eee;  border:#eeeeee;"
        v-for="item in hotelData.hotelassets"
        :key="item.id"
        >{{ item.name }}</el-button
      >
    </div>
    <br />
    <div class="assets-he">
      <div class="assets-hd ">停车服务</div>
      <div v-if="hotelData.parking == null">-</div>
      <div v-else>{{ hotelData.parking }}</div>
    </div>
    <div class="assets-he">
      <div class="assets-hd ">品牌信息</div>
      <!-- <div v-if="hotelDatat.hotelbrand == null">-</div>
      <div v-else>{{ hotelData.hotelbrand.name }}</div> -->
      <div v-if="hotelData.hotelbrand == null">-</div>
      <div v-else>{{ hotelData.hotelbrand.name }}</div>
    </div>
  </el-row>
</template>

<script>
export default {
  props: {
    hotelData: Object
  }
};
</script>
<style lang="less">
.service {
  div {
    display: inline-block;
    font-size: 14px;
    background-color: 238, 238, 238;
  }
  .assets-he {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #eeeeee;

    .assets-hd {
      width: 166px;
    }
    .assets-bd {
      color: #666;
    }
  }
}
</style>
