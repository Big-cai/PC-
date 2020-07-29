<template>
  <!-- 相关攻略组件 -->
  <div class="aside">
    <h4 class="aside-title">相关攻略</h4>
    <div class="correlationList" v-if="list">
      <nuxt-link to="#" class="correlation-item" v-for="item in list" :key="item.id">
        <el-row type="flex" class="post-imgText">
          <!-- 无图片模板 -->
          <div class="post-text" v-if="item.images.length==0" @click="handelCorrela(item.id)">
            <div>{{item.title}}</div>
            <p>{{item.created_at|capitalize}} 阅读 {{item.watch}}</p>
          </div>
          <!-- 有图片模板 -->
          <div class="post-texts" v-else @click="handelCorrela(item.id)">
            <img :src="item.images[0]" alt />
            <div>
              {{item.title}}
              <p>{{item.created_at|capitalize}} 阅读 {{item.watch}}</p>
            </div>
          </div>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //攻略数组
      list: []
    };
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
    }
  },
  mounted() {
    // console.log(this.$route.query.id);
    //相关攻略的数据请求
    this.$axios({
      url: "/posts/recommend?id=" + this.$route.query.id
    }).then(res => {
      // console.log(res);
      if (res.status == 200) {
        this.list = res.data.data;
      }
    });
  },
  methods: {
    //相关攻略点击
    handelCorrela(id) {
      // console.log(id);
      this.$axios({
        url: "/posts?id=" + id
      }).then(res => {
        // console.log(res);
        let data = res.data.data[0];
        // console.log("子传父");
        // console.log(data);

        //子传父
        this.$emit("delivery", data);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.aside {
  width: 280px;
  max-width: 280px;
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
      /deep/ .post-imgText {
        max-width: 280px;
        height: 80px;
        .post-text {
          width: 280px;
          position: relative;
          flex: 1;
          > img {
            float: left;
          }
          > div {
            float: right;
            min-width: 280px;
            line-height: 1.4em;
            height: 2.8em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            font-size: 12px;
            color: #999;
          }
        }
        .post-texts {
          width: 280px;
          position: relative;
          flex: 1;
          display: flex;
          > img {
            max-width: 100px;
            max-height: 80px;
            margin-right: 15px;
          }
          > div {
            min-width: 280px;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            margin-top: 42px;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>