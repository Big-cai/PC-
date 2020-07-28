<template>
  <!-- 游记页面 -->
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 文本框表单 -->
      <textModule :deliveryData="deliveryData" />
      <!-- 草稿箱 -->
      <draftModule @delivery="delivery" />
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
  },
  data() {
    return {
      //草稿箱组件传递的数据
      deliveryData: ""
    };
  },
  methods: {
    delivery(value) {
      console.log("子传父");
      this.deliveryData = value;
    }
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