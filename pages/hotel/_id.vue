<template>
  <div class="hotel">
    <!-- 面包屑 -->
    <!-- 假数据为（死） -->
    <BreadCrumb v-if="hotelData" :hotelData="hotelData"></BreadCrumb>

    <!-- 酒店详细信息 -->
    <div class="hoteldetail" v-if="hotelData" :hotelData="hotelData">
      <h2 style="font-weight: 400; color: #333;">{{ hotelData.name }}</h2>
      <span style="color:#666; font-size:14px">{{ hotelData.alias }}</span>
      <p style="color:#666; font-size:14px">
        <i class="iconfont iconlocation"></i>{{ hotelData.address }}
      </p>
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
    <TableDropdown v-if="hotelData" :hotelData="hotelData"></TableDropdown>
    <!-- 地图导航 -->
    <MapModule />

    <!-- 其他服务 -->
    <HotelServices v-if="hotelData" :hotelData="hotelData"></HotelServices>

    <!--评论模块 -->

    <Comment v-if="hotelData" :hotelData="hotelData"></Comment>
  </div>
</template>

<script>
// 引入
import MapModule from "@/components/hotel/details/MapModule";
import BreadCrumb from "@/components/hotel/details/BreadCrumb";
import Comment from "@/components/hotel/details/Comment";
import TableDropdown from "@/components/hotel/details/TableDropdown";
import HotelServices from "@/components/hotel/details/HotelServices";
export default {
  components: {
    MapModule,
    Comment,
    BreadCrumb,
    TableDropdown,
    HotelServices
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
      // tableData: [
      //   {
      //     source: "携程",
      //     type: "高级大床房A",
      //     minimum: "￥148"
      //   },
      //   {
      //     source: "携程",
      //     type: "高级大床房A",
      //     minimum: "￥148"
      //   },
      //   {
      //     source: "携程",
      //     type: "高级大床房A",
      //     minimum: "￥148"
      //   }
      // ],

      hotelData: null //总数据
    };
  },
  // 点击图片
  methods: {
    changeImg(imgUrl) {
      console.log();
      this.src = imgUrl;
    }
  },
  created() {
    console.log("query",this.$route.params.id); 
    this.$axios({
      url: "/hotels/?id="+ this.$route.params.id,
      method: 'get'
    }).then(res => {
      // console.log(res.data.data[0].breadcrumb);
      //将获取到的酒店数据保存到data中 hotelData
      this.hotelData = res.data.data[0];
      console.log(this.hotelData);
    });
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
