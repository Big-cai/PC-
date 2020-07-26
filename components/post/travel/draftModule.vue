<template>
  <div class="aside">
    <div class="draft-box">
      <h4 class="draft-title">草稿箱子 （假数据1）</h4>
      <!-- 循环增加 -->
      <div class="draft-list">
        <div class="draft-item">
          <div class="draft-post-title">33</div>
          <el-row type="flex" justify="space-between">
            <p>2020-060-06</p>
            <div>
              <!-- 更改 -->
              <span class="iconfont el-icon-edit"></span>
              <!-- 删除 -->
              <span class="iconfont el-icon-delete"></span>
            </div>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入文本框组件
export default {
  props: [],
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.aside {
  width: 225px;
  .draft-box {
    padding: 10;
    border: 1px solid #ddd;
    .draft-title {
      margin-bottom: 10px;
      color: #666;
      font-weight: 400;
    }
    .draft-list {
      .draft-item {
        margin-bottom: 10px;
        font-size: 14px;
        .draft-post-title {
          cursor: pointer;
          //显示两行，之后用省略号替代
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        p {
          color: #999;
        }
        .iconfont {
          cursor: pointer;
        }
      }
    }
  }
}
</style>