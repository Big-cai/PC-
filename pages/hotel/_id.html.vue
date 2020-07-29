<template>
  <div class="hotel">
    <!-- 面包屑 -->
    <!-- 假数据为（死） -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 8px 0;">
      <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">广州酒店</a></el-breadcrumb-item>
      <el-breadcrumb-item>锦江之星(吴泾店)</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 酒店详细信息 -->
    <div class="hoteldetail">
      <h2>锦江之星(吴泾店)</h2>
      <span>jin jiang zhi xing (shang hai min hang wu jing dian)</span>
      <p><i class="iconfont iconlocation"></i>剑川路165号(近龙吴路)</p>
    </div>
    <!-- 酒店参考图 -->
    <div class="images">
      <!-- 左大图 -->
      <div class="left">
        <img :src="src" alt="" />
      </div>
      <!-- 右小图 -->
      <div class="right">
        <div v-for="(img, index) in imgList" :key="index">
          <a @click="changeImg(img.url)"><img :src="img.url" ref="img"/></a>
        </div>
      </div>
    </div>

    <!-- table下拉栏 -->
    <el-row>
      <el-table :data="tableData" style="width: 100%" height="195">
        <el-table-column fixed prop="source" label="价格来源" width="420">
        </el-table-column>
        <el-table-column prop="type" label="价格房型" width="420">
        </el-table-column>
        <el-table-column label="最低价格/每晚" width="160">
          <template slot-scope="scope">
            <span style="color:#ff9900">{{ scope.row.minimum }}</span>
            <i>起</i>
            <i class="el-icon-arrow-right" style="color:#ff9900"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 地图导航 -->
    <MapModule />

    <!-- 其他服务 -->
    <el-row class="service">
      <div class="assets-he">
        <div class="assets-hd ">基本信息</div>
        <div class="assets-bd">
          <div style="width:200px">入住时间: 14:00之后</div>
          <div style="width:200px">离店时间: 12:00之前</div>
          <div style="width:200px">2010年开业 / 2010年装修</div>
          <div style="width:200px">酒店规模: 153间客房</div>
        </div>
      </div>
      <div class="assets-he">
        <div class="assets-hd ">主要设施</div>
        <el-button
          type="info"
          style="color:black; background-color: #eee;  border:#eeeeee;"
          >热水壶</el-button
        >
      </div>
      <br />
      <div class="assets-he">
        <div class="assets-hd ">停车服务</div>
        -
      </div>
      <div class="assets-he">
        <div class="assets-hd ">品牌信息</div>
        锦江
      </div>
    </el-row>

    <!--评论模块 -->
    <Comment />
  </div>
</template>

<script>
// 引入
import MapModule from "@/components/hotel/details/MapModule";
import Comment from "@/components/hotel/details/Comment";
export default {
  components: {
    MapModule,
    Comment
  },
  data() {
    return {
      imgList: [
        {
          index: 1,
          url: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
        },
        {
          index: 2,
          url: "http://157.122.54.189:9093/images/hotel-pics/2.jpeg"
        },
        {
          index: 3,
          url: "http://157.122.54.189:9093/images/hotel-pics/3.jpeg"
        },
        {
          index: 4,
          url: "http://157.122.54.189:9093/images/hotel-pics/4.jpeg"
        },
        {
          index: 5,
          url: "http://157.122.54.189:9093/images/hotel-pics/5.jpeg"
        },
        { index: 6, url: "http://157.122.54.189:9093/images/hotel-pics/6.jpeg" }
      ],
      src: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg",
      // table下拉栏数据
      tableData: [
        {
          source: "携程",
          type: "高级大床房A",
          minimum: "￥148"
        },
        {
          source: "携程",
          type: "高级大床房A",
          minimum: "￥148"
        },
        {
          source: "携程",
          type: "高级大床房A",
          minimum: "￥148"
        }
      ]
    };
  },
  // 点击图片
  methods: {
    changeImg(imgUrl) {
      console.log();
      this.src = imgUrl;
    }
  } 
};
</script>

<style lang="less">
.hotel {
  width: 1000px;
  margin: 20px auto;
  height: 100%;
  // 参考图样式
  .images {
    display: flex;
    margin-top: 40px;
    margin-bottom: 40px;
    .left {
      flex: 2;
      img {
        width: 650px;
        height: 340px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      img {
        width: 160px;
        cursor: pointer;
        margin-right: 5px;
      }
    }
  }
  // 其他服务样式
  .service {
    div {
      display: inline-block;
      font-size: 14px;
      background-color: 238, 238, 238;
    }
    .assets-he {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #eeeeee;

      .assets-hd {
        width: 166px;
      }
      .assets-bd {
        color: #666;
      }
    }
  } 
}
</style>
