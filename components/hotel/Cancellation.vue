<template>
  <!-- 撤销条件 模块组件 -->
  <div>
    <div class="ListFilter">
      <div class="content">
        <el-col :span="24">
          <el-row class="content_box">
            <el-col :span="6" class="contentModule">
              <el-row class="box_price">
                <el-col :span="24">价格</el-col>
                <el-col :span="24">0-4000</el-col>
              </el-row>
              <!-- 拖动条 -->
              <el-row>
                <el-slider v-model="value" :max="4000"></el-slider>
              </el-row>
            </el-col>

            <el-col class="contentModule" :span="5">
              <div class="hodelLevel">住宿等级</div>
              <div class="dropdwn">
                <el-dropdown class="dropdwn_box" placement="top-end">
                  <span class="el-dropdown-link dropdwn_link">
                    不限
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item,index) in levels"
                      :key="index"
                      @click.native="selected(item)"
                    >
                    
                      <i class="iconfont iconcircle" v-if="item.flag"></i>
                      <i class="iconfont iconright-1" v-else></i>
                      <span>{{item.level}}星</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
            <el-col class="contentModule" :span="5">
              <div class="hodelLevel">住宿类型</div>
              <div class="dropdwn">
                <el-dropdown class="dropdwn_box">
                  <span class="el-dropdown-link dropdwn_link">
                    不限
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" placement="bottom-start">
                    <el-dropdown-item v-for="(item,index) in types" :key="index" @click.native="accommodation(item)">
                      <i class="iconfont iconcircle" v-if="item.flag"></i>
                      <i class="iconfont iconright-1" v-else></i>
                      <span>{{item.name}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
            <el-col class="contentModule" :span="5">
              <div class="hodelLevel">酒店设施</div>
              <div class="dropdwn">
                <el-dropdown class="dropdwn_box">
                  <span class="el-dropdown-link dropdwn_link">
                    {{this.NewValue}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" placement="bottom-start">
                    <el-dropdown-item v-for="(item,index) in assets" :key="index" @click.native="HotelItems(item)">
                      <i class="iconfont iconcircle" v-if="item.flag"></i>
                      <i class="iconfont iconright-1" v-else></i>
                      <span>{{item.name}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
            <el-col class="contentModule" :span="5">
              <div class="hodelLevel">酒店品牌</div>
              <div class="dropdwn">
                <el-dropdown class="dropdwn_box">
                  <span class="el-dropdown-link dropdwn_link">
                    不限
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" placement="top-start" class="scrool">
                    <el-dropdown-item v-for="(item,index) in brands" :key="index" @click.native="hotelplanner(item)">
                      <i class="iconfont iconcircle" v-if="item.flag"></i>
                      <i class="iconfont iconright-1" v-else></i>
                      <span>{{item.name}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
            <el-col class="contentModule" :span="5">
              <el-button type="primary">撤销条件</el-button>
            </el-col>
          </el-row>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 2000,
      NewValue:'哈哈',
      levels: [], // 酒店等级
      types: [], // 酒店类型
      assets: [], // 酒店设施
      brands: [], // 酒店品牌

      isShow: false
    }
  },
  created() {
    this.$axios({
      url: '/hotels/options',
      method: 'GET'
    }).then(res => {
      // console.log(res.data)
      // 酒店等级
      this.levels = res.data.data.levels.map(x=>{
        return{
          ...x,
          flag:true
        }
      })

      // 住宿类型
      this.types = res.data.data.types.map(x=>{
        return{
          ...x,
          flag:true
        }
      })
      // 酒店设施
      this.assets = res.data.data.assets.map(x=>{
        return{
          ...x,
          flag:true
        }
      })
      // 酒店品牌
      this.brands = res.data.data.brands.map(x=>{
        return{
          ...x,
          flag:true
        }
      })
    })
  },
  methods: {
    selected(item) {
      console.log(item)
      // this.isShow = index
     item.flag = !item.flag
    },
    // 住宿类型
    accommodation(item){
      console.log('哈哈');
      item.flag = !item.flag
    },
    // 酒店设施 
    HotelItems(item){
      item.flag = !item.flag

    },
    // 酒店品牌
    hotelplanner(item){
      item.flag = !item.flag
    }
  },
}
</script>

<style lang="less" scoped>
.ListFilter {
  border: 1px solid #dddddd;
  padding: 8px 0;
  margin-bottom: 20px;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 65px;
    .content_box {
      display: flex;
      align-items: center;
      .contentModule {
        padding: 0 20px;
        border-right: 1px solid #ddd;
      }
      .contentModule:nth-child(6) {
        border-right: none;
        text-align: center;
        line-height: 70px;
      }
      .dropdwn {
        .dropdwn_box {
          width: 114px;
          .dropdwn_link {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 38px;
            line-height: 38px;
            cursor: pointer;
          }
        }
      }
      .box_price {
        display: flex;
      }
    }
  }
}
.el-dropdown-menu {
  width: 200px !important ;
}
.scrool {
  overflow-y: scroll !important;
  height: 250px;
}
</style>