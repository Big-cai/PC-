<template>
  <div>
    <!-- 地图模块组件 -->
    <el-row class="hotel_map">
      <el-col :span="14">
        <!-- 区域 -->
        <el-row class="area">
          <el-col :span="2">区域:</el-col>
          <el-col :span="24">
            <div class="scenics_box">
              <!-- <span class="location_place" v-for="(item,index) in  AreaNear" :key="index">{{item.scenic[0].name}}</span> -->
              <span class="location_place">城桥镇</span>
              <span class="location_place">奉贤区</span>
              <span class="location_place">金山区</span>
              <span class="location_place">建设镇</span>
              <span class="location_place">三星镇</span>
              <span class="location_place">新河镇</span>
              <span class="location_place">通河/泗塘</span>
              <span class="location_place">堡镇</span>
              <span class="location_place">绿华镇</span>
              <span class="location_place">南门</span>
              <span class="location_place">向化镇</span>
              <span class="location_place">陈家镇</span>
              <span class="location_place">横沙乡</span>
              <span class="location_place">富乐广场</span>
              <span class="location_place">亭林</span>
            </div>

            <a href="#">
              <i class="el-icon-d-arrow-right"></i>
              等29个区域
            </a>
          </el-col>
        </el-row>
        <!-- 均价 -->
        <el-row class="BothPrice">
          <el-col :span="3">
            均价
            <i class="el-icon-question QuestionMark">:</i>
          </el-col>
          <el-col :span="24">
            <el-row class="level">
              <el-col :span="6">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="等级评定是针对房价，设施和服务等各方面水平的综合评估"
                  placement="bottom-start"
                >
                  <span class="levelStar">
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <span>￥332</span>
                  </span>
                </el-tooltip>
              </el-col>
              <el-col :span="6">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="等级评定是针对房价，设施和服务等各方面水平的综合评估"
                  placement="bottom-start"
                >
                  <span class="levelStar">
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <span>￥332</span>
                  </span>
                </el-tooltip>
              </el-col>
              <el-col :span="8">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="等级评定是针对房价，设施和服务等各方面水平的综合评估"
                  placement="bottom-start"
                >
                  <span class="levelStar">
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <span>￥332</span>
                  </span>
                </el-tooltip>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="6">
        <div id="map"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map('map',{
        resizeEnable: true,
        center: [113.261732, 23.151086],
        zoom: 13
      })
      
    }
    var url =
      'https://webapi.amap.com/maps?v=1.4.15&key=7a92f6a43b8dbdeba546223a6756a589&callback=onLoad'
    var jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
    
  },
  data(){
    return{
       AreaNear:{}  //
    }
  },
  created() {
    this.$axios({
      url:'/hotels',
      method:'get'
    }).then(res=>{
      console.log(res.data);    
      this.AreaNear = res.data.data
    })
  },
}
</script>

<style lang="less" scoped>
.hotel_map {
  display: flex;
  margin-bottom: 20px;
  height: 260px;
  .area {
    display: flex;
    color: #666666;
    font-size: 14px;
    margin-bottom: 20px;
    .scenics_box {
      .location_place {
        margin-right: 1em;
        padding: 0 2px;
      }
    }
    a {
      cursor: pointer;
      i {
        color: orange;
      }
    }
  }

  // 均价样式
  .BothPrice {
    display: flex;
    color: #666666;
    font-size: 14px;
    .QuestionMark {
      color: #cccccc;
    }
    .level{
   display: flex;
   justify-content: space-around;
    }
    .levelStar {
      i {
        color: orange;
      }
    }
  }

  #map {
    width: 420px;
    height: 100%;
  }
}
</style>