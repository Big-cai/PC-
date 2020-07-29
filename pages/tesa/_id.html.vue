<template>
  <!-- 酒店详情页 -->
  <div class="container">
    <!-- 1.面包屑 -->
    <div class="breadcrumb">
      <!-- 攻略详情面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/tesa' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/tesa' }">广州酒店</el-breadcrumb-item>
        <el-breadcrumb-item>锦江之星（吴泾点）</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 2.酒店信息简介 -->
    <el-row class="name-info">
      <el-col :span="24">
        <el-row>
          <h4 class="hotel-name">
            乐逸精品酒店(珠江新城地铁站店)
            <span title="星级">
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
            </span>
          </h4>
        </el-row>
        <el-row>
          <span class="hotel-en-name">le yi jing pin hotel (san lin dong di tie zhan dian)</span>
        </el-row>
        <el-row>
          <i class="iconfont iconlocation"></i>
          永泰路1165号(近东明路)
        </el-row>
      </el-col>
    </el-row>

    <!-- 3.酒店图片 -->
    <el-row class="pic-info">
      <el-row class="photo-view">
        <el-col class="pic-main" :span="16">
          <img src="@/assets/pic_sea.jpeg" style="width:640px;height:360px" alt />
        </el-col>
        <el-col class="pic-list" :span="8">
          <el-row class="list-itme">
            <el-col class="pic-list" :span="12">
              <nuxt-link to="#">
                <img src="@/assets/pic_sea.jpeg" alt />
              </nuxt-link>
            </el-col>
            <el-col class="pic-list" :span="12">
              <nuxt-link to="#">
                <img src="@/assets/pic_sea.jpeg" alt />
              </nuxt-link>
            </el-col>
            <el-col class="pic-list" :span="12">
              <nuxt-link to="#">
                <img src="@/assets/pic_sea.jpeg" alt />
              </nuxt-link>
            </el-col>
            <el-col class="pic-list" :span="12">
              <nuxt-link to="#">
                <img src="@/assets/pic_sea.jpeg" alt />
              </nuxt-link>
            </el-col>
            <el-col class="pic-list" :span="12">
              <nuxt-link to="#">
                <img src="@/assets/pic_sea.jpeg" alt />
              </nuxt-link>
            </el-col>
            <el-col class="pic-list" :span="12">
              <nuxt-link to="#">
                <img src="@/assets/pic_sea.jpeg" alt />
              </nuxt-link>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-row>

    <!-- 4.价格-房型信息 -->
    <el-table class="info-row" :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>

    <!-- 5.地图 -->
    <div class="info-row">
      <div class="map-view">
        <!-- 地图  高德地图插件-->
        <div id="mapBox" class="mapBox"></div>
        <!-- 风景 饿了么tabs选项卡-->
        <div class="poiBox">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="scenic">
              <div class="poi-list-ov">
                <ol>
                  <li class="poi-list-item">
                    <span class="name">广州塔</span>
                    <span class="distance">0.03公里</span>
                  </li>
                  <li class="poi-list-item">
                    <span class="name">广州塔</span>
                    <span class="distance">0.03公里</span>
                  </li>
                  <li class="poi-list-item">
                    <span class="name">广州塔</span>
                    <span class="distance">0.03公里</span>
                  </li>
                </ol>
              </div>

              <!-- <el-tab-pane label="用户管理" name="first">风景</el-tab-pane> -->
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="traffic">
              <div class="poi-list-ov">
                <ol>
                  <li class="poi-list-item">
                    <span class="name">埃菲尔铁塔</span>
                    <span class="distance">0.05公里</span>
                  </li>
                  <li class="poi-list-item">
                    <span class="name">埃菲尔铁塔</span>
                    <span class="distance">0.05公里</span>
                  </li>
                  <li class="poi-list-item">
                    <span class="name">埃菲尔铁塔</span>
                    <span class="distance">0.05公里</span>
                  </li>
                </ol>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <!-- 6.酒店基本信息 -->
    <div class="info-row">
      <!-- 基本信息，主要设施，停车服务，品牌信息 -->
      <el-row class="assets-info">
        <el-col :span="4">基本信息</el-col>
        <el-col :span="20">
          <el-row class="base-info" type="flex">
            <el-col :span="24">入住时间：14:00之后</el-col>
            <el-col :span="24">离店时间：12:00之后</el-col>
            <el-col :span="24">2014年开业 / 2014年装修</el-col>
            <el-col :span="24">酒店规模： 183间房客</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="4" class="assets-info-hd">主要设施</el-col>
        <el-col :span="20">
          <span class="assets-info-item">洗衣服务</span>
          <span class="assets-info-item">吹风机</span>
          <span class="assets-info-item">外币兑换服务</span>
          <span class="assets-info-item">热水壶</span>
        </el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="4">停车服务</el-col>
        <el-col :span="20">-</el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20">-</el-col>
      </el-row>
    </div>

    <!-- 7.酒店评价 -->
    <div class="comment-row">
      <h4 class="comments-hd">0条真实用户评论</h4>
      <el-row class="scores-row" type="flex">
        <el-col :span="4">
          <p>总评数</p>
          <p>好评数</p>
          <p>差评数</p>
        </el-col>
        <el-col :span="5" class="recomment-score">
          <div class="comment-star">
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </div>
          <div class="stamp">推荐</div>
        </el-col>
        <el-col :span="3">
          <div class="rate-box">
            <el-progress type="circle" :percentage="50" status="warning"></el-progress>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="rate-box">
            <el-progress type="circle" :percentage="50" status="warning"></el-progress>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="rate-box">
            <el-progress type="circle" :percentage="50" status="warning"></el-progress>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("mapBox", {
        zoom: 13,
        viewMode: "3D",
        center: [110, 30]
      });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=34bf8bef9e64bd0ee6be16f8aaf8685e&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  data() {
    return {
      activeName: "",
      tableData: [],
      value: 4
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>


<style lang="less" scoped>
.container {
  margin: 0 auto;
  width: 1000px;
  //1.面包屑
  .breadcrumb {
    padding: 20px 0;
    overflow: hidden;
  }

  //2.酒店信息简介
  .name-info {
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
    .hotel-name {
      font-weight: 400;
      font-size: x-large;
      color: #333;
      span {
        .iconhuangguan {
          font-style: normal;
          font-size: 16px;
          color: orange;
        }
      }
    }
    .hotel-en-name {
      margin-bottom: 10px;
      .iconlocation {
        font-size: 16px;
        font-style: normal;
      }
    }
  }
  //3.酒店图片
  .pic-info {
    margin: 40px 0;
    .photo-view {
      .pic-main {
        position: relative;
        img {
          width: 640px;
          height: 360px;
        }
      }
      .pic-list {
        img {
          width: 160px;
          height: 110px;
          margin-bottom: 10px;
        }
        .list-item {
          margin: 0 10px;
          margin: 0 -10px;
          a {
            margin: 0 10px;
          }
        }
      }
    }
  }

  .info-row {
    margin: 40px 0;
    //4.价格-房型 表格
    /deep/ .el-table {
      .cell {
        line-height: 23px;
      }
    }
    //5.地图-风景
    .map-view {
      display: flex;
      flex: 1;
      height: 360px;
      //地图
      .mapBox {
        width: 65%;
        height: 100%;
      }
      //风景
      .poiBox {
        background: #fff;
        padding-left: 20px;
        flex: 1;
        .poi-list-ov {
          overflow: auto;
          height: 300px;
          font-size: 14px;
          color: #666;
          .poi-list-item {
            margin: 0 20px 20px 10px;
            display: flex;
            cursor: pointer;
            .name {
              flex: 1;
            }
            .distance {
            }
          }
        }
      }
    }
    //6.酒店基本信息
    .assets-info {
      padding: 20px 10px;
      font-size: 14px;
      border-bottom: 1px solid #eee;
      .base-info {
        font-size: 14px;
        color: #666;
      }
      .assets-info-item {
        padding: 4px 10px;
        margin-right: 10px;
        border-radius: 4px;
        color: #666;
        border: 1px solid #eee;
        background: #eee;
      }
    }
  }

  //7.酒店评价
  .comment-row {
    .comments-hd {
    }
    .scores-row {
      padding: 20px 0;
      color: #666;
      .recomment-score {
        position: relative;
        display: flex;
        align-content: center;
        .comment-star {
          margin-top: 32px;
        }
        //.推荐
        .stamp {
          position: absolute;
          top: 10px;
          left: 20px;
          border: 2px solid #fa3;
          border-radius: 50%;
          text-align: center;
          width: 70px;
          height: 70px;
          line-height: 70px;
          opacity: 0.25;
          transform: rotate(-30deg);
        }
      }
      .rate-box {
        margin-right: 55px;
        width: 70px;
      }
      p {
        color: #666;
      }
    }
  }
}
</style>