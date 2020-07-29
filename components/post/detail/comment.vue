<template>
  <!-- 递归主评论 -->
  <div>
    <div class="cmt-list" v-if="postList">
      <div class="cmt-item" v-for="(item,index) in postList" :key="index">
        <div class="cmt-info">
          <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
          {{item.account.nickname}}
          <i>{{item.created_at |capitalize}}</i>
          <!-- 层级 -->
          <span>{{item.level}}</span>
        </div>
        <!-- 子评论 -->
        <parent v-if="item.parent" :parentList="item.parent" />
        <div class="cmt-content">
          <p>{{item.content}}</p>
          <div class="cmt-new" v-if="item.pics.length">
            <div class="cmt-pic" v-for="(itemx,index) in item.pics" :key="index">
              <img :src="$axios.defaults.baseURL+itemx.url" alt />
            </div>
          </div>
          <div class="cmt-ctrl">
            <nuxt-link to="#" @click.native="handleCall(item)">回复</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//3.引入攻略页子评论
import parent from "@/components/post/detail/parent";
export default {
  components: {
    parent
  },
  data() {
    return {};
  },
  //过滤器
  filters: {
    capitalize: function(value) {
      let date = new Date(value);
      let month =
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
      let hours =
        date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
      let min =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();

      date =
        date.getFullYear() + "-" + month + "-" + day + "  " + hours + ":" + min;

      // console.log(date);
      return date;
      // return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  mounted() {},
  props: ["postList", "postId"],
  methods: {
    //回复按钮
    handleCall(data) {
      console.log(this.postx);

      this.$router.push("dateil?id=" + this.postId);
      // console.log("主评论");
      // console.log(index);
      // console.log(index.level);
      //绑定的第一层子组件事件
      this.$store.commit("parent/setList", data);
    }
  }
};
</script>

<style lang="less" scoped>
.cmt-list {
  border: 1px solid #ddd;
  margin-bottom: 28px;
  .cmt-item {
    padding: 20px 30px 5px;
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
      clear: both;
      &:hover .cmt-ctrl a {
        color: rosybrown;
      }
      .cmt-new {
        display: flex;
        p {
          margin-top: 10px;
        }
      }
      .cmt-pic {
        margin-right: 5px;
        margin-top: 10px;
        padding: 5px;
        border: 1px dashed #ddd;
        overflow: hidden;
        border-radius: 6px;
        width: 80px;
        height: 80px;
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
        }
      }
      .cmt-ctrl {
        margin-bottom: 10px;
        text-align: right;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #1e50a2;

        a {
          text-decoration: none;
          color: transparent;
        }

        .active {
          display: block;
        }
      }
    }
  }
}
</style>