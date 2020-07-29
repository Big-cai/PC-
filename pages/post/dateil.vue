<template>
  <!-- 攻略详情页 -->
  <el-row class="container" type="flex" justify="space-between">
    <!-- 1. 攻略详情组件-->
    <jumpModule :articleContent="articleContent" />
    <!-- 2. 相关详情组件-->
    <correlationModule @delivery="delivery" />
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
    return {
      //文章详情内容
      articleContent: null
    };
  },
  methods: {
    //子传父
    delivery(value) {
      // console.log("走通父组件");
      // console.log(value);
      this.articleContent = value;
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