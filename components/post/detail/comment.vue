<template>
  <div>
    <div class="cmt-list">
      <div class="cmt-item">
        <div class="cmt-info">
          <img src alt />用户昵称
          <i>20202-20-20 20:20</i>
          <span>1</span>
        </div>
        <div class="cmt-content">
          <div class="cmt-new">
            <p>111</p>
            <div class="cmt-ctrl">
              <nuxt-link to="#">回复</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <p>{{commentList.content}}</p>
    <parent v-if="commentList.parent" :parentList="commentList.parent" />-->
  </div>
</template>

<script>
//3.引入攻略页子评论
import parent from "@/components/post/detail/parent";
export default {
  components: {
    parent
  },
  props: ["commentList"]
};
</script>

<style lang="less" scoped>
.cmt-list {
  border: 1px solid #ddd;
  .cmt-item {
    padding: 20px 20px 5px;
    border: 1px solid #ddd;
    .cmt-info {
      margin-bottom: 10px;
      font-size: 12px;
      color: #666;
      img {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
      i {
        color: #999;
      }
      span {
        float: right;
      }
    }
    .cmt-content {
      padding-left: 30px;
      .cmt-new {
        p {
          margin-top: 10px;
        }
        .cmt-ctrl {
          text-align: right;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #1e50a2;

          a {
            text-decoration: none;
            color: inherit;
          }
        }
      }
    }
  }
}
</style>