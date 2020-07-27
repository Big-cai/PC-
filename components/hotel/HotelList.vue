<template>
  <div>
    <!-- 酒店列表组件 -->

    <div class="container">
      <el-row class="hodel_list" v-for="(item,index) in NameList " :key="index">
        <!-- 酒店图片部分 -->

        <el-col :span="8" class="hodel_img">
          <nuxt-link to="">
          <img :src="item.photos" alt />

          </nuxt-link>
        </el-col>
        <!-- 酒店名称 -->
        <el-col :span="10" class="hodelIntroDuce">
          <nuxt-link to="#">
            <h4 class="hotel_ch_name">{{item.name}}</h4>
          </nuxt-link>
          
          <div class="hotel_en_name">
            <span>{{item.alias}}</span>
            <span class="levelStar">
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <span>{{item.hoteltype.name}}</span>
            </span>
          </div>
          <el-row class="evaluation">
            <el-col :span="10" class="Hodel_start">
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}分"
              ></el-rate>
            </el-col>
            <el-col :span="7">
              <span class="orange">{{item.all_remarks}}</span>条评价
            </el-col>
            <el-col :span="7">
              <span class="orange">{{item.bad_remarks}}</span>篇游记
            </el-col>
          </el-row>

          <div class="coordinates">
            <i class="iconfont iconlocation"></i>
            位于: {{item.address}}
          </div>
        </el-col>

        <!-- 左侧菜单列表 -->
        <el-col :span="6" >
          <div class="item" >
            <span>携程</span>
            <div class="cell">
              <span class="hodelPlice">￥203</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="item" >
            <span>艺龙</span>
            <div class="cell">
              <span class="hodelPlice">￥304</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="item" >
            <span>Hodel.com</span>
            <div class="cell">
              <span class="hodelPlice">￥187</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 4,
      NameList: [], //总数据
      products:{}    // 右侧菜单列表数据
    }
  },
  created() {
    this.$axios({
      url: '/hotels',
      method: 'get'
    }).then(res => {
      // console.log(res.data)
      this.NameList = res.data.data

    })
  }
}
</script>

<style lang="less" scoped>
.hodel_item {
  padding: 25px 0;
  border-bottom: 1px solid #ddd;
}
.hodel_list {
  padding: 25px 0;
  border-bottom: 1px solid #ddd;
  .hodelIntroDuce {
    padding: 0 10px;
  }
}
// 酒店图片
.hodel_img {
  img {
    width: 320px;
    height: 210px;
  }
}
// 右侧菜单列表样式
.item {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  .hodelPlice {
    color: orange;
  }
}
.item:hover {
  background-color: #e7eaed;
}

// 酒店名称 星级部分 样式
.hotel_ch_name {
  font-size: 24px;
  font-weight: 400;
}
.hotel_en_name {
  margin-bottom: 10px;
  color: #666;
  .levelStar {
    i {
      color: orange;
    }
  }
}
.Hodel_start {
  margin-bottom: 10px;
}
.coordinates {
  font-size: 14px;
  color: #666;
}
.orange {
  color: orange;
}
</style>