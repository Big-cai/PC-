<template>
  <!-- 相关攻略组件 -->
  <div class="aside">
    <h4 class="aside-title">相关攻略</h4>
    <div class="correlationList">
      <nuxt-link to="#" class="correlation-item" v-for="(item,index) in 2" :key="index">
        <el-row type="flex" class="post-imgText">
          <div class="post-text">
            <div>广州有哪些好玩的地方</div>
            <p>2020-07-27 5:34 阅读 1</p>
          </div>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.aside {
  width: 280px;
  .aside-title {
    padding: 10px 0;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 400;
    border-bottom: 1px solid #ddd;
  }
  .correlationList {
    .correlation-item {
      display: block;
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      .post-imgText {
        height: 80px;
        .post-text {
          position: relative;
          flex: 1;
          > div {
            width: 100%;
            line-height: 1.4em;
            height: 2.8em;
            overflow: hidden;
          }
          p {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>