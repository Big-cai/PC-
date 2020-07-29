<template>
  <div>
    <!-- 酒店 入住日期-离店日期 组件 -->
    <el-form class="form_conter" ref="showcities">
      <!-- 切换城市  -->
      <el-form-item>
        <el-autocomplete
          v-model="formInline.departCity"
          :fetch-suggestions="queryDepartSearch"
          :trigger-on-focus="false"
          :highlight-first-item="true"
          placeholder="切换城市"
          @select="handleDepartSelect"
        ></el-autocomplete>
      </el-form-item>
      <!-- 入住日期-离店日期 -->
      <el-form-item>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="formInline.date"
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          @change="pickerOptions"
        ></el-date-picker>
      </el-form-item>

      <!-- 人数 -->
      <el-form-item>
        <el-input
          role="tooltip"
          placeholder="人数未定"
          readonly="readonly"
          autocomplete="off"
          suffix-icon="el-input__icon iconfont iconuser"
          v-popover:popover
        ></el-input>
        <el-popover
          class="tooltip"
          ref="popover"
          placement="bottom-start"
          width="350"
          trigger="focus"
        >
          <el-row class="PeopleNumber">
            <el-col :span="6">每间</el-col>
            <el-col :span="6">
              <el-select
                v-model="selectData.valueO"
                placeholder="2成人"
                size="mini"
                class="select-item"
                @change="addlabel('成人')"
              >
                <el-option v-for="item in 7" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>

            <el-col :span="6">
              <el-select size="mini" v-model="selectData.valueT" placeholder="请选择">
                <el-option
                  v-for="item in 4"
                  :key="item + 10"
                  :label="item"
                  :value="item"
                  @change="addlabel('儿童')"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row class="SelectNumber">
            <el-button type="primary" size="mini" @click="handlesubmit">确定</el-button>
          </el-row>
        </el-popover>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="facet_query">查看价格</el-button>
      </el-form-item>
    </el-form>
    <!-- 酒店 入住日期-离店日期 end -->

    <!-- 地图模块组件 -->
    <el-row class="hotel_map">
      <el-col :span="14">
        <!-- 区域 -->
        <el-row class="area">
          <el-col :span="2">区域:</el-col>
          <el-col :span="24" :class="{'hidden-all': isSpread}">
            <div class="scenics_box" :class="{limitHeight: isSpread}">
              <span class="location_place" v-for="(item) in scenics" :key="item.id">{{item.name}}</span>
            </div>

            <span class="change" @click="spreadContent">
              <i class="el-icon-d-arrow-right"></i>
              等{{scenics.length}}个区域
            </span>
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
                    <span>￥521</span>
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
                    <span>￥768</span>
                  </span>
                </el-tooltip>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" v-loading="loading">
        <div id="container"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      formInline: {
        departCity: '', //切换城市
        input2: '' //人数 输入
      },
      // 成人 儿童
      selectData: {
        valueO: '2成人',
        valueT: '0儿童'
      },

      cityData: {},
      cityTemp: [],
      searchData: [],
      map: '',
      infoWindow: '',
      isSpread: true, //带点击展开
      // enterTime: '',
      // leftTime: '',
      loading: true
    }
  },
  mounted() {
    //调用地图初始化数据
    this.getAmap()
  },
  computed: {
    scenics() {
      if (!this.cityData.scenics) {
        if (this.$store.state.hotel.scenics.length) {
          return this.$store.state.hotel.scenics
        }
        return []
      }
      return this.cityData.scenics
    }
  },
  methods: {
    // 调用vuex 数据 
    async queryDepartSearch(value, callback) {
      this.cityTemp = await this.querySearchAsync(this.formInline.departCity)
      if (this.cityTemp.length > 0) {
        this.formInline.departCity = this.cityTemp[0].value
        this.formInline.departCode = this.cityTemp[0].sort
        this.cityData = this.cityTemp[0]
        this.getSearchData(this.cityData.id)
        this.$store.commit('hotel/setCityName', this.cityData.value)
        this.$store.commit('hotel/setCityPid', this.cityData.id)
        this.$store.commit('hotel/setScenics', this.cityData.scenics)
      }
      callback(this.cityTemp)
    },
    // 点击展开 收起
    spreadContent() {
      this.isSpread = !this.isSpread
    },

    // 日期
    pickerOptions() {},
    // 人数确定按钮
    handlesubmit(data) {
      // this.$refs.personal.click()
      // if (this.selectData.valueT === '0儿童') {
      //   this.formInline.input2 = this.selectData.valueO
      //   return
      // }
      // this.formInline.input2 =
      //   this.selectData.valueO + ' ' + this.selectData.valueT
    },
    // 查看价格
    facet_query() {},
    // 儿童
    addlabel(data) {
      if (data === '成人') {
        this.selectData.valueO += data
      } else {
        this.selectData.valueT += data
      }
    },

    // 地图实例渲染
    getAmap() {
      window.onLoad = () => {
        this.map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 13
        })
        const cityName = this.$store.state.hotel.cityName
        if (!cityName) {
          this.autoLocation()
        } else {
          const pid = this.$store.state.hotel.cityPid
          this.$message.success(`当前所在${cityName}，请手动更改城市`)
          this.formInline.departCity = cityName
          pid && this.getSearchData(pid)
          this.querySearchAsync(cityName)
        }
      }
      var url =
        'https://webapi.amap.com/maps?v=1.4.15&key=0bc30017317f7c4cb9192fcc0b735c33&callback=onLoad'
      var jsapi = document.createElement('script')
      jsapi.charset = 'utf-8'
      jsapi.src = url
      document.head.appendChild(jsapi)
    },
    async getSearchData(id) {
      let { data } = await this.$axios({
        url: `/hotels`,
        params: {
          city: id
        }
      })
      this.searchData = data.data
      this.setMarker()
    },
      // 定位插件
    autoLocation() {
      AMap.plugin('AMap.CitySearch', () => {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity((status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            this.$message.success(`当前已定位到${result.city}`)
            this.formInline.departCity = result.city
            this.querySearchAsync(result.city)
          } else {
            this.$message.warning('定位失败，自动跳转到上海市，请手动更改城市')
            this.formInline.departCity = '上海市'
            this.querySearchAsync('上海市')
          }
        })
      })
    },
    // 设置点标记
    setMarker() {
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 13
      })
      const lnglats = this.searchData.map(v => {
        return [v.location.longitude, v.location.latitude]
      })
      this.map.clearMap()
      this.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) })
      for (var i = 0, marker; i < lnglats.length; i++) {
        var marker = new AMap.Marker({
          icon:
            'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' +
            (i + 1) +
            '.png',
          position: lnglats[i],
          map: this.map
        })
        marker.content = this.searchData[i].name
        marker.on('mouseover', this.markerClick)
        marker.emit('mouseover', { target: marker })
      }
      this.map.setFitView()
      this.loading = false
    },
    // 鼠标点击地图marker
    markerClick(e) {
      this.infoWindow.setContent(e.target.content)
      this.infoWindow.open(this.map, e.target.getPosition())
    },
    // 切换城市 选中触发
    handleDepartSelect(data) {
      if (data.id === this.cityData.id) {
        return
      }
      this.cityData = data
      this.getSearchData(this.cityData.id)
      this.$store.commit('hotel/setCityName', data.value)
      this.$store.commit('hotel/setCityPid', data.id)
      this.$store.commit('hotel/setScenics', this.cityData.scenics)
      this.formInline.destCity = data.value
      this.formInline.destCode = data.sort
    },
    querySearchAsync(keywords) {
      try {
        return new Promise((resolve, reject) => {
          if (!keywords || keywords.length === 0) {
            return resolve([])
          }
          if (keywords === this.$store.state.hotel.cityName) {
            return resolve([])
          }
          this.$axios({
            url: '/cities',
            params: {
              name: keywords
            }
          })
            .then(({ data }) => {
              if (!data.data.length) {
                this.$message.error('未搜索到该城市，试试拼音哦')
                return resolve([])
              }
              if (!this.$store.state.hotel.cityName) {
                this.cityData = data.data[0]
                this.$store.commit('hotel/setCityName', this.cityData.name)
                this.$store.commit('hotel/setCityPid', this.cityData.id)
                this.$store.commit('hotel/setScenics', this.cityData.scenics)
                this.getSearchData(this.cityData.id)
              }
              data = data.data.map(v => {
                return {
                  ...v,
                  value: v.name
                }
              })
              resolve(data)
            })
            .catch(e => {
              this.$message.error('未搜索到该城市，试试拼音哦')
              return resolve([])
            })
        })
      } catch (e) {}
    },

    changeFoldState() {
      this.brandFold = !this.brandFold
    }
  }
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
    .change {
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
    .level {
      display: flex;
      justify-content: space-around;
    }
    .levelStar {
      i {
        color: orange;
      }
    }
  }
  // 展开 收起
  .area .hidden-all .el-icon-d-arrow-right {
    transform: rotate(90deg);
  }
  // 最大高度 溢出隐藏
  .limitHeight {
    max-height: 3em;
    overflow: hidden;
  }
  // 地图样式
  #container {
    width: 420px;
    height: 260px;
  }
}
// 日期部分样式
.form_conter {
  display: flex;
  justify-content: space-between;
}

.tooltip {
}

.PeopleNumber {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-popover {
  overflow: auto !important;
}

.SelectNumber {
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #ddd;
  text-align: right;
}
</style>