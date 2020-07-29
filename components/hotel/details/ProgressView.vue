<template>
  <!-- 环形进度条 -->
  <div>
    <div class="text-hd">
      <el-progress
        type="circle"
        :percentage="77"
        color="#ff9900"
        :show-text="false"
        :stroke-width="2"
        :width="70"
      >
      </el-progress>
      <div class="text">
        <span>环境</span>
        <span>8.3</span>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {}
};
</script>

<style lang="less">
.text-hd {
  position: relative;
  width: 70px;

  .text {
    position: absolute;
    background-color: #fff;
    text-align: center;
    color: rgb(255, 153, 0);
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
}
</style>
