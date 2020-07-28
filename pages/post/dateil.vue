<template>
  <!-- 攻略详情页 -->
  <el-row class="container" type="flex" justify="space-between">
    <!-- 1. 攻略详情组件-->
    <jumpModule />
    <!-- 2. 相关详情组件-->
    <correlationModule />
  </el-row>
</template>

<script>
//1.引入攻略详情组件
import jumpModule from "@/components/post/detail/jumpModule";
//2.引入相关详情组件
import correlationModule from "@/components/post/detail/correlationModule";
export default {
  components: {
    jumpModule,
    correlationModule
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px 0;
  margin: 0 auto;
  width: 1000px;
}
</style>