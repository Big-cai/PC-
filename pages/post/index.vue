<template>
  <!-- 攻略首页 -->
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 1.左侧推荐城市组件 -->
      <div class="proposal">
        <proposalModule @delivery="delivery" />
      </div>

      <!-- 2.右侧推荐攻略组件 -->
      <div class="strategy">
        <strategyModule :city="city" />
      </div>
    </el-row>
  </div>
</template>

<script>
//引入左侧推荐城市组件
import proposalModule from "@/components/post/module/proposalModule";
//引入右侧推荐攻略组件
import strategyModule from "@/components/post/module/strategyModule";
export default {
  components: {
    proposalModule,
    strategyModule
  },
  data() {
    return {
      city: null
    };
  },
  methods: {
    delivery(value) {
      // console.log("父组件走通");
      this.city = value;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  margin: 0px auto;
  padding: 20px 0;
  width: 1000px;
}
</style>