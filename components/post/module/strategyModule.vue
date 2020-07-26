<template>
  <!-- 攻略组件-推荐攻略 -->
  <div class="containerWrapper">
    <!-- 1.搜索布局 -->
    <div class="search-wrapper">
      <!-- 搜索框 -->
      <el-row class="search-bar" type="flex" justify="space-between" align="middle">
        <input
          type="text"
          placeholder="请输入想去的地方， 比如:'广州'"
          v-model="inputValue"
          @keyup.enter="clickCity(inputValue)"
        />
        <i class="el-icon-search" @click="clickCity(inputValue)"></i>
      </el-row>
      <!-- 推荐城市 -->
      <div class="search-recommend">
        推荐：
        <span
          v-for="(item,index) in searchCity"
          :key="index"
          :class="{'active':current===index}"
          @click="clickCity(item)"
          @mouseover="addClass(index)"
          @mouseout="removeClass(index)"
        >{{item}}</span>
      </div>
      <!-- 写游记 -->
      <el-row class="post-title" type="flex" justify="space-between" align="middle">
        <h4>推荐攻略</h4>
        <button class="el-button el-button--primary" @click="$router.push('/post/create')">
          <i class="el-icon-edit"></i>
          <span>写游记</span>
        </button>
      </el-row>
    </div>

    <!-- 2.文章列表 -->
    <div class="post-list">
      <div v-if="postList">
        <div class="post-item" v-for="item in fenyeList" :key="item.id">
          <!-- 0或者大于3张图的样式 -->
          <div v-if="item.images.length>=3||item.images.length==0">
            <h4 class="post-title">
              <nuxt-link to="#">{{item.title}}</nuxt-link>
            </h4>
            <p class="post-desc">
              <nuxt-link to="#">{{item.summary}}</nuxt-link>
            </p>
            <!-- 图片 -->
            <el-row class="card-images" type="flex" justify="space-between" align="middle">
              <!-- 多图片的排除0张 -->
              <div v-if="item.images.length>0">
                <nuxt-link to="#">
                  <img style="float:left;margin-right:15px" :src="item.images[0]" alt />
                  <img style="float:left;margin-right:15px" :src="item.images[1]" alt />
                  <img style="float:left;" :src="item.images[2]" alt />
                </nuxt-link>
              </div>
            </el-row>
            <!-- 点赞 -->
            <el-row class="post-info" type="flex" justify="space-between">
              <el-row class="post-info-left" type="flex" align="middle">
                <span>
                  <i class="el-icon-location-outline"></i>
                  {{item.cityName}}
                </span>
                <el-row class="post-user" type="flex" align="middle">
                  by
                  <nuxt-link to="/user/personal">
                    <img
                      style="width:30px;height:30px "
                      :src="$axios.defaults.baseURL +item.account.defaultAvatar"
                    />
                  </nuxt-link>
                  <nuxt-link to="/user/personal">{{item.account.nickname}}</nuxt-link>
                </el-row>
                <span>
                  <i class="el-icon-view"></i>
                  {{item.watch}}
                </span>
              </el-row>
              <span class="post-info-right">{{item.like>0?item.like:0}}赞</span>
            </el-row>
          </div>
          <!-- 1-2张图的样式  断点，冲这里开始做起 -->
          <div v-if="item.images.length==1||item.images.length==2">
            <el-row class="card-images" type="flex" justify="space-between" align="middle">
              <nuxt-link to="#">
                <img :src="item.images[0]" alt />
              </nuxt-link>
              <div style="margin-left:10px">
                <h4 class="post-title">
                  <nuxt-link to="#">{{item.title}}</nuxt-link>
                </h4>
                <p class="post-desc">
                  <nuxt-link to="#">{{item.summary}}</nuxt-link>
                </p>
                <el-row class="post-info" type="flex" justify="space-between">
                  <el-row class="post-info-left" type="flex" align="middle">
                    <span>
                      <i class="el-icon-location-outline"></i>
                      {{item.cityName}}
                    </span>
                    <el-row class="post-user" type="flex" align="middle">
                      by
                      <nuxt-link to="/user/personal">
                        <img
                          style="width:30px;height:30px "
                          :src="$axios.defaults.baseURL +item.account.defaultAvatar"
                        />
                      </nuxt-link>
                      <nuxt-link to="/user/personal">{{item.account.nickname}}</nuxt-link>
                    </el-row>
                    <span>
                      <i class="el-icon-view"></i>
                      {{item.watch}}
                    </span>
                  </el-row>
                  <span class="post-info-right">{{item.like>0?item.like:0}}赞</span>
                </el-row>
              </div>
            </el-row>
          </div>
        </div>
      </div>
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
export default {
  //接受父组件传的值
  props: {
    city: {
      type: String
    }
  },
  data() {
    return {
      //推荐城市数据
      searchCity: ["广州", "上海", "北京"],
      //当前选项
      current: "",
      //搜索框value
      inputValue: "",
      //文章列表数据
      postList: null,
      //分页数据
      fenyeList: "",
      //分页
      pageIndex: 1,
      pageSize: 3
    };
  },
  mounted() {
    //获取文章列表
    this.clickCity();
  },
  //侦听器
  watch: {
    //监听组件将传值  每次搜索的时候，分页都从第一页开始
    city: {
      handler(value) {
        this.pageIndex = 1;
        this.pageSize = 3;
        this.clickCity(value);
      }
    }
  },
  methods: {
    clickCity(item) {
      if (item == "") {
        this.$axios({
          url: "/posts"
        }).then(res => {
          console.log(res.data.data);
          this.postList = res.data.data;
          //更改输入框对应的占位符
          this.inputValue = item;
          this.xixiList = this.postList;
          this.pageIndex = 1;
          this.pageSize = 3;
          this.partition();
        });
      } else {
        //获取文章列表
        this.$axios({
          url: "/posts",
          params: { city: item }
        }).then(res => {
          console.log(res.data.data);
          this.postList = res.data.data;
          //更改输入框对应的占位符
          this.inputValue = item;
          // console.log(this.inputValue + "111");
          this.pageIndex = 1;
          this.pageSize = 3;
          this.fenyeList = this.postList;
          this.partition();
        });
      }
    },
    //推荐城市，动态加载类名
    addClass(index) {
      this.current = index;
    },
    //推荐城市，动态删除类名
    removeClass(index) {
      this.current = "";
    },
    //分页事件（分页大小）
    sizeChange(value) {
      // console.log("每页数据大小");
      this.pageSize = value;
      // console.log(this.pageSize);
      //分割要显示的数据长度
      this.partition();
    },
    //分页事件（当前页）
    currentChange(value) {
      // console.log("当前页");
      this.pageIndex = value;
      // console.log(this.pageIndex);
      //分割要显示的数据长度
      this.partition();
    },
    //分页-分割要显示的数据长度
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
.containerWrapper {
  //1.搜索布局
  .search-wrapper {
    width: 700px;
    height: 76px;
    //搜索框
    .search-bar {
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border: 3px solid orange;
      > input {
        flex: 1;
        padding: 0 20px;
        line-height: 40px;
        outline: none;
        border: none;
        background: none;
      }
      .el-icon-search {
        margin-right: 10px;
        font-size: 24px;
        font-weight: 700;
        color: orange;
      }
    }
    //推荐城市
    .search-recommend {
      padding: 10px 0;
      font-size: 12px;
      color: #666;
      .active {
        cursor: pointer;
        color: orange;
        border-bottom: 1px solid orange;
      }
      span {
        margin-right: 5px;
      }
    }
    //写游记
    .post-title {
      position: relative;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      h4 {
        font-size: 18px;
        color: orange;
        font-weight: 400;
        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          display: block;
          content: "";
          width: 72px;
          height: 2px;
          background: orange;
        }
      }
      button {
        .el-icon-edit {
        }
        span {
        }
      }
    }
  }

  //2.文章布局
  .post-list {
    margin-top: 50px;
    margin-bottom: 10px;
    width: 700px;
    .post-item {
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      &:last-child {
        margin-bottom: 30px;
      }

      //标题
      .post-title {
        //前三项，单行显示，省略号替换
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-bottom: 15px;
        font-weight: 400;
        font-size: 18px;
        a {
          text-decoration: none;
          color: inherit;
        }
      }
      //文章内容
      .post-desc {
        margin-bottom: 15px;
        height: 63px;
        line-height: 1.5;
        font-size: 14px;
        color: #666;

        //3行之后用省略号替代（五行样式多少对此设置）
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        a {
          text-decoration: none;
        }
      }
      //图片容器
      .card-images {
        margin: 15px 0;
        a {
          text-decoration: none;
          color: inherit;
          img {
            display: block;
            object-fit: cover;
            width: 220px;
            height: 150px;
          }
        }
      }
      //用户信息
      .post-info {
        //地区
        .post-info-left {
          font-size: 12px;
          color: #999;
          span {
            margin-right: 15px;
            .el-icon-location-outline {
              display: inline-block;
              font-style: normal;
              font-weight: 400;
              line-height: 1;
              vertical-align: baseline;
            }
            .el-icon-view {
              display: inline-block;
              font-style: normal;
              font-weight: 400;
              line-height: 1;
              vertical-align: baseline;
            }
          }
          //用户
          .post-user {
            margin-right: 15px;
            a {
              color: orange;
              img {
                display: block;
                margin: 5px;
                width: 16px;
                height: 16px;
                border-radius: 100px;
              }
            }
          }
        }
        .post-info-right {
          color: orange;
        }
      }
    }
  }
}
</style>