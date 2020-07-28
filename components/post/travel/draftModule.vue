<template>
  <!-- 草稿箱组件 -->
  <div class="aside">
    <!-- 遍历vuex草稿箱数据 -->
    <div class="draft-box" v-if="$store.state.draft.list">
      <h4 class="draft-title">草稿箱 （{{$store.state.draft.list.length}}）</h4>
      <!-- 循环增加 -->
      <div class="draft-list" v-for="(item,index) in $store.state.draft.list" :key="index">
        <div class="draft-item">
          <div
            class="draft-post-title"
            :class="{'active':isCurrent===index}"
            @mouseover="addClass(index)"
            @mouseout="removeClass(index)"
            @click="updateItem(index)"
          >{{item.title}}</div>
          <el-row type="flex" justify="space-between">
            <p>{{item.date}}</p>
            <div>
              <!-- 更改 -->
              <span class="iconfont el-icon-edit" @click="updateItem(index)"></span>
              <!-- 删除 -->
              <span class="iconfont el-icon-delete" @click="delItem(index)"></span>
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
    return {
      isCurrent: ""
    };
  },
  methods: {
    //1.更改草稿内容
    updateItem(index) {
      // console.log(index);
      let deliveryData = this.$store.state.draft.list[index];
      let datas = {
        city: deliveryData.city,
        content: deliveryData.content,
        title: deliveryData.title
      };
      //子传父
      this.$emit("delivery", datas);
    },
    //2.删除草稿箱
    delItem(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("draft/delDraft", index);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //3.鼠标移入添加动态类名
    addClass(index) {
      //更改当前选项，增加active类名
      this.isCurrent = index;
    },
    //4.鼠标移出添加动态类名
    removeClass(index) {
      this.isCurrent = "";
    }
  }
};
</script>

<style lang="less" scoped>
.aside {
  width: 225px;
  .draft-box {
    padding: 10px;
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
          margin-bottom: 10px;
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
      .active {
        color: orange;
      }
    }
  }
}
</style>