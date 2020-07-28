<template>
  <div>
    <!-- 酒店列表组件 -->
 <!-- v-for="(item,index) in NameList " :key="index" -->
    <div class="container">
      <el-row class="hodel_list">
        <!-- 酒店图片部分 -->

        <el-col :span="8" class="hodel_img">
          <nuxt-link to="">
          <img :src="data.photos" alt />

          </nuxt-link>
        </el-col>
        <!-- 酒店名称 -->
        <el-col :span="10" class="hodelIntroDuce">
          <nuxt-link to="#">
            <h4 class="hotel_ch_name">{{data.name}}</h4>
          </nuxt-link>
          
          <div class="hotel_en_name">
            <span>{{data.alias}}</span>
            <span class="levelStar">
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <span>{{data.hoteltype.name}}</span>
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
              <span class="orange">{{data.all_remarks}}</span>条评价
            </el-col>
            <el-col :span="7">
              <span class="orange">{{data.bad_remarks}}</span>篇游记
            </el-col>
          </el-row>

          <div class="coordinates">
            <i class="iconfont iconlocation"></i>
            位于: {{data.address}}
          </div>
        </el-col>

        <!-- 左侧菜单列表 -->
        <nuxt-link to="#">
        <el-col :span="6" >
          <div class="item" v-for="(data,index) in data.products" :key="index">
            <span>{{data.name}}</span>
            <div class="cell">
              <span class="hodelPlice">￥{{data.price}}</span>
              <i class="el-icon-arrow-right"></i>
            </div>
            
          </div>
         
          
        </el-col>
        </nuxt-link>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data: {
      type: Object,
      // 默认是空数组
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      value: 4,
      NameList: [], //总数据
      products:{},   // 右侧菜单列表数据
      random:''
    }
  },
  created() {
    this.$axios({
      url: '/hotels',
      method: 'get'
    }).then(res => {
      console.log(res.data)
      this.NameList = res.data.data

    })
  },
  created(){
   
  },
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