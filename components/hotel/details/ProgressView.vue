<template>
  <!-- 环形进度条 -->
  <div class="progress">
    <div class="progress-info">
      <el-progress
        type="circle"
        :percentage="scores * 10"
        color="#f90"
        :width="70"
        :stroke-width="2"
        :show-text="false"
      ></el-progress>
      <div class="showText">
        <span>{{ ProText }}</span>
        <span>{{ scores }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ProText: String, //显示文字
    scores: Number //分数
  }
};
</script>

<style lang="less">
.progress {
  width: 12.5%;
  .progress-info {
    position: relative;
    width: 70px;
    .showText {
      position: absolute;
      left: 50%;
      top: 50%;
      background-color: #fff;
      text-align: center;
      color: rgb(255, 153, 0);
      transform: translate(-50%, -50%);
    }
  }
}
</style>
