<template>
  <!-- 递归评论 -->
  <div>
    <div class="cmt-list" v-if="parentList">
      <!-- 子评论递归 -->
      <parent v-if="parentList.parent" :parentList="parentList.parent" />
      <!-- cmtshow类名控制回复文字的显示 -->
      <div class="cmtshow">
        <div class="cmt-info">
          {{parentList.account.nickname}}
          <i>{{parentList.account.created_at |capitalize}}</i>
          <!-- 层级 -->
          <span>{{parentList.level}}</span>
        </div>
        <div class="cmt-new">
          <p>{{parentList.content}}</p>
        </div>
        <!-- 图片 -->
        <div class="cmt-content" v-if="parentList.pics.length">
          <div class="cmt-pic" v-for="(item,index) in parentList.pics" :key="index">
            <img v-if="parentList.pics" :src="$axios.defaults.baseURL+item.url" alt />
          </div>
        </div>
        <div class="cmt-ctrl">
          <nuxt-link to="#" @click.native="handleCall(parentList)">回复</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["parentList"],
  name: "parent",
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

  data() {
    return {};
  },
  methods: {
    //回复按钮事件
    handleCall(data) {
      console.log();

      //  console.log("子组件回复");
      // console.log(data1.level);
      this.$store.commit("parent/setList", data);
    }
  }
};
</script>

<style lang="less" scoped>
.cmt-list {
  padding: 20px;
  margin: 5px 0 15px 0;
  background: #f9f9f9;
  border: 1px solid #ddd;

  .cmt-item {
    padding: 20px 30px 5px;
    border: 1px solid #ddd;
    .cmtshow:hover .cmt-ctrl a {
      color: rosybrown;
    }
    .cmt-info {
      font-size: 12px;
      color: #666;
      img {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
      i {
        font-style: normal;
        color: #999;
      }
      span {
        float: right;
      }
    }
    .cmt-content {
      padding: 5px 10px 0;
      display: flex;
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
          display: inline-block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
        }
      }
    }
    .cmt-new {
      p {
        margin-top: 10px;
      }
    }
    .cmt-ctrl {
      text-align: right;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #1e50a2;
      a {
        text-decoration: none;
        color: transparent;
      }
    }
  }
}
</style>