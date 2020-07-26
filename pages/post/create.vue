<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 文本框表单 -->
      <textModule />
      <!-- 草稿箱 -->
      <draftModule />
    </el-row>
  </div>
</template>

<script>
//引入文本框组件
import textModule from "@/components/post/travel/textModule";
//引入草稿箱组件
import draftModule from "@/components/post/travel/draftModule";
export default {
  components: {
    textModule,
    draftModule
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px 0;
  margin: 0 auto;
  width: 1000px;
}
</style>