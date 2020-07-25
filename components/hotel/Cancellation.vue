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
                <el-col :span="24">0-2230</el-col>
              </el-row>
              <!-- 拖动条 -->
              <el-row>
                <el-slider v-model="value"></el-slider>
              </el-row>
            </el-col>

            <el-col class="contentModule" :span="5">
              <div class="hodelLevel">住宿等级</div>
              <div class="dropdwn">
                <el-dropdown class="dropdwn_box">
                  <span class="el-dropdown-link dropdwn_link">
                    不限
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" placement="bottom-start">
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>1星</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>2星</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>3星</span>
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
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>1星</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>2星</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>3星</span>
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
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>1星</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>2星</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>3星</span>
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
                  <el-dropdown-menu slot="dropdown" placement="top-start">
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>1星</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>2星</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <i class="iconfont iconright-1"></i>
                      <span>3星</span>
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
      value: 1200
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
            cursor: pointer ;
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
</style>