<template>
  <div>
    <!-- 酒店列表组件 -->
    
    <div class="container">
      <el-row class="hodel_list">
        <!-- 酒店图片部分 -->
        <el-col :span="8" class="hodel_img">
          <img
            src="https://p1.meituan.net/hotel/c48d045b9f5bf221c479f55c622c8782154904.jpg%40700w_700h_0e_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20"
            alt
          />
        </el-col>
           <!-- 酒店名称 -->
        <el-col :span="10" class="hodelIntroDuce">
          <h4 class="hotel_ch_name">锦江之星(吴泾店)</h4>
          <div class="hotel_en_name">
            <span>jin jiang zhi xing (shang hai min hang wu</span>
            <span class="levelStar">
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <span>经济型</span>
            </span>
          </div>     
          <el-row class="evaluation">
            <el-col :span="10" class="Hodel_start">
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
            </el-col>
            <el-col :span="7">
              <span>15</span>条评价
            </el-col>
            <el-col :span="7">
              <span>13</span>条游记
            </el-col>
          </el-row>

          <div class="coordinates">
            <i class="iconfont iconlocation"></i>
            位于: 剑川路165号(近龙吴路)
          </div>
        </el-col>

        <!-- 左侧菜单列表 -->
        <el-col :span="6">
          <div class="item">
            <span>携程</span>
            <div class="cell">
              <span class="hodelPlice">￥240</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="item">
            <span>艺龙</span>
            <div class="cell">
              <span class="hodelPlice">￥190</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="item">
            <span>Hodels.com</span>
            <div class="cell">
              <span class="hodelPlice">￥240</span>
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
      value: 3.7
    }
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
  .hodelIntroDuce{
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
  .levelStar{
    i{
      color: orange;
    }
  }
}
.Hodel_start {
  margin-bottom: 10px;
}
.coordinates{
  font-size: 14px;
  color: #666;
}
</style>