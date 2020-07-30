<template>
  <!-- 攻略详情组件 -->
  <div class="main">
    <!-- 攻略面包屑 -->
    <postBreadcrumb />
    <!-- 1.攻略详情块 -->
    <!-- 标题 -->
    <h1 v-if="article">{{article.title}}</h1>
    <!-- 攻略时间-阅读量 -->
    <div class="post-info" v-if="article">
      <span>攻略： {{article.created_at |capitalize}}</span>
      <span>阅读：{{article.watch}}</span>
    </div>
    <!-- 文章内容 -->
    <div class="post-content" v-if="article" v-html="article.content"></div>
    <!-- 评论-分享 -->
    <div class="post-ctrl">
      <el-row type="flex" justify="center">
        <div class="ctrl-item">
          <i class="iconfont iconpinglun"></i>
          <p v-if="article">评论（{{article.comments.length}}）</p>
        </div>
        <div class="ctrl-item" @click="$message.warning('暂不支持分享')">
          <i class="iconfont iconfenxiang"></i>
          <p>分享</p>
        </div>
      </el-row>
    </div>

    <!-- 2.评论模块 （递归）-->
    <div class="correlation">
      <h4 class="cmt-title" id="comment">评论</h4>
      <!-- 回复@ -->
      <el-tag
        v-if="$store.state.parent.list.account"
        @close="handleClose"
        type="info"
        closable
      >回复 @{{$store.state.parent.list.account.nickname}}</el-tag>

      <!-- 饿了么文本域 -->
      <div class="cmt-input">
        <el-input v-focus type="textarea" :rows="2" placeholder="说点什么吧..." v-model="textarea"></el-input>
      </div>
      <!-- 图片上传 -->
      <el-row class="cmt-input-img" type="flex" justify="space-between">
        <div class="cmt-pics">
          <!-- 照片墙 -->
          <!-- :file-list  :
               :action  :上传接口地址
               :on-success :上传成功回调
               :on-remove  :删除成功回调
          -->
          <!-- XXXX注意XXX：1.饿了么默认上传的fromdata文件字段名为file，需要设置name：'files'
                           2.不用带上token
          -->
          <el-upload
            name="files"
            :action="$axios.defaults.baseURL+'/upload'"
            :file-list="list"
            list-type="picture-card"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>-->
        </div>
        <!-- 按钮 -->
        <div>
          <el-button type="primary" size="mini" @click="sendSubmit">提交</el-button>
        </div>
      </el-row>
      <!-- 递归评论 -->
      <div v-if="postList.length">
        <comment :postList="fenyeList" :postId="postId" />
      </div>

      <div v-else class="cmt-empty">暂无评论，赶紧抢占沙发！</div>

      <!-- 分页 -->
      <!-- size-change:改变数据长度  current-change：改变当前页  -->
      <el-pagination
        v-if="postList"
        @size-change="sizeChange"
        @current-change="currentChange"
        background
        layout="total,sizes,prev, pager, next,jumper"
        :total="postList.length"
        :page-sizes="[3,5,10,15,20]"
        :current-page="pageIndex"
        :page-size="pageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
//1.引入攻略页面包屑
import postBreadcrumb from "@/components/breadcrumb/postBreadcrumb";
//2.引入攻略递归主评论
import comment from "@/components/post/detail/comment";
export default {
  components: {
    postBreadcrumb,
    comment
  },
  //子组件间传值
  props: ["articleContent"],
  watch: {
    articleContent(value) {
      // console.log("侦听器");
      // console.log(value);
      //替换成相关攻略传递的值
      this.article = value;
      if (this.articleContent.id) {
        this.postId = this.articleContent.id;
      } else {
        this.postId = this.$route.query.id;
      }
      // this.postId = this.$route.query.id;

      //2.递归评论数据
      this.$axios({
        url: "/posts/comments",
        params: {
          post: value.id
        }
      }).then(res => {
        console.log("侧边递归数据");

        console.log(res);
        this.postList = res.data.data;
        this.pageInde = 1;
        this.pageSize = 3;
        this.partition();
      });
    }
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
  //自定义指令
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  data() {
    return {
      //1.文章详情
      article: null,
      //2.文本域
      textarea: "",
      //3.上传图片绑定数组
      list: [],
      //4.评论列表数据(分页)
      postList: [],
      //5.分页数据
      fenyeList: "",
      //6.分页
      pageIndex: 1,
      pageSize: 5,
      //7.提交评论的图片数组
      pics: [],
      //8.递归评论的深度
      follow: "",
      //9.传递给递归主评论的页面Id
      postId: ""
    };
  },
  mounted() {
    this.handleClose();
    this.$store.commit("parent/setList", "");
    this.postId = this.$route.query.id;
    console.log(this.$store.state.parent.list);
    console.log("eem");
    console.log(this.postId);

    //1.攻略详情的数据请求
    this.$axios({
      url: "/posts?id=" + this.$route.query.id
    }).then(res => {
      // console.log(res.data);
      this.article = res.data.data[0];
    });

    //2.递归评论数据
    this.loding();
  },
  methods: {
    //1.图片上传成功
    handleSuccess(res, file) {
      console.log("添加图片成功");
      console.log(res);
      this.list.push(file);
      this.pics.push(res[0]);
    },
    //2.图片删除成功
    handleRemove(file, fileList) {
      console.log("删除图片");
      this.list = fileList;
      console.log(this.list);
    },
    //3.提交按钮
    sendSubmit() {
      //this.article.id 相关攻略传递的id
      //this.$route.query.id   攻略详情页面传递的问号id
      //this.$store.state.parent.list  递归回复的id
      // console.log(this.$store.state.parent.list.id);
      if (this.$store.state.parent.list.id) {
        this.follow = this.$store.state.parent.list.id;
      }
      let datas = {
        content: this.textarea,
        pics: this.pics,
        follow: this.follow,
        // post: this.postID
        post: this.article.id || this.$route.query.id
      };
      console.log(datas);
      //提交攻略评论
      this.$axios({
        url: "/comments",
        method: "post",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data: datas
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$message.success(res.data.message);
          this.textarea = "";
          this.list = [];
          this.pics = [];
          //重新获取递归数据
          this.loding();
          //提交完完毕，关闭@事件
          this.handleClose();
        }
      });
    },
    //4.递归评论数据
    loding() {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id
        }
      }).then(res => {
        console.log(res);
        this.postList = res.data.data;
        //3.分页数据执行
        //分页
        this.pageInde = 1;
        this.pageSize = 3;
        this.partition();
      });
    },
    //5.分页事件（分页大小）
    sizeChange(value) {
      // console.log("每页数据大小");
      this.pageSize = value;
      // console.log(this.pageSize);
      //分割要显示的数据长度
      this.partition();
    },
    //6.分页事件（当前页）
    currentChange(value) {
      // console.log("当前页");
      this.pageIndex = value;
      // console.log(this.pageIndex);
      //分割要显示的数据长度
      this.partition();
    },
    //7.分页-分割要显示的数据长度
    partition() {
      if (this.postList) {
        this.fenyeList = this.postList;
        const beginIndex = (this.pageIndex - 1) * this.pageSize;
        const endIndex = beginIndex + this.pageSize;
        this.fenyeList = this.fenyeList.slice(beginIndex, endIndex);
        console.log("分页数据");

        console.log(this.fenyeList);
      }
    },
    //8.关闭@事件
    handleClose() {
      console.log("xx");
      this.$store.commit("parent/setList", "");
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 700px;
  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  //攻略时间-阅读量
  .post-info {
    padding: 20px;
    text-align: right;
    color: #999;
    span {
      margin-left: 20px;
    }
  }
  //文字内容
  /deep/ .post-content {
    width: 100%;
    line-height: 1.5;
    img {
      max-width: 100%;
    }
  }
  //评论-分享
  .post-ctrl {
    padding: 50px 0 30px;
    .ctrl-item {
      margin: 0px 20px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;

      .iconfont {
        padding-bottom: 5px;
        display: block;
        font-size: 28px;
        color: orange;
        // &:nth-child(1) {
        //   transform: scale(1.4);
        // }
      }
      p {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }
  //2.递归模块
  .correlation {
    margin-bottom: 20;
    h4 {
      font-weight: 400;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .cmt-input {
      margin-top: 20px;
      margin-bottom: 10px;
      /deep/ .el-textarea__inner {
        resize: none;
      }
    }
    .cmt-input-img {
      margin-bottom: 30px;

      .cmt-pics {
        .el-icon-plus {
        }
      }
    }
  }
  .cmt-empty {
    margin-bottom: 20px;
    padding: 30px 0;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
}
</style>