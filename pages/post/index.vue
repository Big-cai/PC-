<template>
  <!-- 攻略首页 -->
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 1.左侧推荐城市组件 -->
      <div class="proposal">
        <proposalModule />
      </div>

      <!-- 2.右侧推荐攻略组件 -->
      <div class="strategy">
        <strategyModule />
      </div>
    </el-row>
  </div>
</template>

<script>
//引入左侧推荐城市组件
import proposalModule from "@/components/post/proposalModule";
//引入右侧推荐攻略组件
import strategyModule from "@/components/post/strategyModule";
export default {
  components: {
    proposalModule,
    strategyModule
  }
};
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  padding: 20px 0;
  width: 1000px;
  height: 1098px; /* 高度之后要清理掉 */
}
</style>