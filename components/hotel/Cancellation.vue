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
                <el-slider v-model="objVal.value" :max="4000" @change="dragdown"></el-slider>
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
                      @click.native="submit(item)"
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
                    <el-dropdown-item
                      v-for="(item,index) in types"
                      :key="index"
                      @click.native="submit2(item)"
                    >
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
                    不限
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" placement="bottom-start">
                    <el-dropdown-item
                      v-for="(item,index) in assets"
                      :key="index"
                      @click.native="submit3(item)"
                    >
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
                    <el-dropdown-item
                      v-for="(item,index) in brands"
                      :key="index"
                      @click.native="submit4(item)"
                    >
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
      objVal: {
        value: 2000
      },
      levels: [], // 酒店等级
      types: [], // 酒店类型
      assets: [], // 酒店设施
      brands: [], // 酒店品牌

      hotel_lang: '' //酒店数据
    }
  },
  created() {
    this.$axios({
      url: '/hotels/options',
      method: 'GET'
    }).then(res => {
      // console.log(res.data)
      // 酒店等级
      this.levels = res.data.data.levels.map(x => {
        return {
          ...x,
          flag: true
        }
      })
      // 酒店类型
      this.types = res.data.data.types.map(x => {
        return {
          ...x,
          flag: true
        }
      })
      // 酒店设施
      this.assets = res.data.data.assets.map(x => {
        return {
          ...x,
          flag: true
        }
      })
      // 酒店品牌
      this.brands = res.data.data.brands.map(x => {
        return {
          ...x,
          flag: true
        }
      })
    })
  },
  watch: {
    '$route.query': {
      handler() {
        this.dragdown()
      },
      immediate: true //深度监听
    }
  },
  methods: {
    submit(item) {
      item.flag = !item.flag
    },
    submit2(item) {
      item.flag = !item.flag
    },
    submit3(item) {
      item.flag = !item.flag
    },
    submit4(item) {
      item.flag = !item.flag
    },
    // 拖动
    dragdown() {
      this.$axios({
        url: '/hotels',
        method: 'get',
        params: {
          city: this.city,
          price_lt: this.price_lt
        }
      }).then(res => {
        console.log(res.data)
      })
    }
  }
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