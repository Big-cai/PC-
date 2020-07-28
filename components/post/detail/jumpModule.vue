<template>
  <!-- 攻略详情组件 -->
  <div class="main">
    <!-- 攻略面包屑 -->
    <postBreadcrumb />
    <!-- 1.攻略详情块 -->
    <!-- 标题 -->
    <h1>标题试试水</h1>
    <!-- 攻略时间-阅读量 -->
    <div class="post-info">
      <span>攻略：xxxx-xx-xx mm:ss</span>
      <span>阅读：xxx</span>
    </div>
    <!-- 文章内容 -->
    <div class="post-content">文章内容如 v-html结构</div>
    <!-- 评论-分享 -->
    <div class="post-ctrl">
      <el-row type="flex" justify="center">
        <div class="ctrl-item">
          <i class="iconfont iconpinglun"></i>
          <p>评论（100假数据）</p>
        </div>
        <div class="ctrl-item">
          <i class="iconfont iconfenxiang"></i>
          <p>分享</p>
        </div>
      </el-row>
    </div>

    <!-- 2.评论模块 （递归）-->
    <div class="correlation">
      <h4 class="cmt-title">评论</h4>
      <!-- 饿了么文本域 -->
      <div class="cmt-input">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
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
          <el-button type="primary" size="mini">提交</el-button>
        </div>
      </el-row>
      <!-- 递归评论 -->
      <comment />
      <!-- 分页 -->
      <!-- size-change:改变数据长度  current-change：改变当前页  -->
      <el-pagination
        v-if="postList"
        @size-change="sizeChange"
        @current-change="currentChange"
        background
        layout="total,sizes,prev, pager, next,jumper"
        :total="postList.length"
        :page-sizes="[1,3,5,10]"
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
  data() {
    return {
      //测试递归数据
      testList: [
        { content: "哪吒" },
        {
          content: "猴子",
          parent: {
            content: "斗战胜佛"
          }
        },
        {
          content: "杨戬",
          parent: {
            content: "二郎神",
            parent: {
              content: "司法天神"
            }
          }
        }
      ],
      textarea: "",
      list: [],
      //评论列表数据
      postList: [],
      //分页数据
      fenyeList: "",
      //分页
      pageIndex: 1,
      pageSize: 3
    };
  },
  methods: {
    //1.图片上传成功
    handleSuccess(res, file) {
      console.log("添加图片成功");
      console.log(res);
      this.list.push(file);
    },
    //2.图片删除成功
    handleRemove(file, fileList) {
      console.log("删除图片");
      this.list = fileList;
      console.log(this.list);
    },
    //3.分页事件（分页大小）
    sizeChange(value) {
      // console.log("每页数据大小");
      this.pageSize = value;
      // console.log(this.pageSize);
      //分割要显示的数据长度
      this.partition();
    },
    //4.页事件（当前页）
    currentChange(value) {
      // console.log("当前页");
      this.pageIndex = value;
      // console.log(this.pageIndex);
      //分割要显示的数据长度
      this.partition();
    },
    //5.分页-分割要显示的数据长度
    partition() {
      if (this.postList) {
        this.fenyeList = this.postList;
        const beginIndex = (this.pageIndex - 1) * this.pageSize;
        const endIndex = beginIndex + this.pageSize;
        this.fenyeList = this.fenyeList.slice(beginIndex, endIndex);
        console.log(this.fenyeList);
      }
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
  .post-content {
    line-height: 1.5;
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
}
</style>