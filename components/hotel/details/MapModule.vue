<template>
  <!-- 详情页地图模块 -->
  <div style="display:flex">
    <div id="map"></div>
    <div class="locatitonWrapper">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 风景栏 -->
        <el-tab-pane label="风景" name="first" class="Wrapper-hd"
          ><ul>
            <li
              v-for="(item, index) in pois"
              :key="index"
              @mouseover="showPoi(item.id)"
              class="Wrapper-bd"
            >
              <span>{{ item.name }}</span>
              <span>{{ Number(item.distance) / 100 }}公里</span>
            </li>
          </ul></el-tab-pane
        >
        <!-- 交通栏 -->
        <el-tab-pane label="交通" name="second" class="Wrapper-hd">
          <ul>
            <li
              v-for="(item, index) in pois"
              :key="index"
              @mouseover="showPoi(item.id)"
              class="Wrapper-bd"
            >
              <span>{{ item.name }}</span>
              <span>{{ Number(item.distance) / 100 }}公里</span>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLocation: "",
      pois: [],
      map: {},
      markers: [],
      // tab栏先后实时数据
      activeName: "first"
    };
  },
  async mounted() {
    this.loadUserLocation();
    // 先获取点数据
    // await 等待的一定是 promise
    // 所以这个 loadPoiList 方法必须 return axios 才可以
    await this.loadPoiList();
    // 创建地图, 在创建地图函数里面, 放置点标记
    this.createMap();
  },
  methods: {
    // tab栏切换
    handleClick(tab) {
      console.log(tab);
      if (tab.name == "first") {
        this.changeMarkers("风景");
      } else if (tab.name == "second") {
        this.changeMarkers("交通");
      }
    },
    // 创建高德地图
    createMap() {
      this.map = new AMap.Map("map", {
        zoom: 18
        // center: [113.3245904, 23.1066805]
      });

      this.setMarkers();
    },
    // 获取定位数据
    loadUserLocation() {
      this.$axios({
        url: "https://restapi.amap.com/v3/ip",
        params: {
          key: "9036ae6ba9fbb824443d4938b5f0be0a"
        }
      }).then(res => {
        console.log(res.data.city);
        this.userLocation = res.data.city;
      });
    },
    // 获取周边数据
    loadPoiList(types) {
      return this.$axios({
        url: "https://restapi.amap.com/v3/place/around",
        params: {
          key: "9036ae6ba9fbb824443d4938b5f0be0a",
          location: "113.324590,23.106681",
          types: types || "风景"
        }
      }).then(res => {
        console.log(res.data);
        this.pois = res.data.pois;
      });
    },
    // 点标记，组为数组
    setMarkers() {
      // 遍历 pois 列表, 每个 poi 生成一个 marker
      // 最终组成 markers 数组
      this.markers = this.pois.map(poi => {
        var marker = new AMap.Marker({
          title: poi.name,
          position: poi.location.split(","),
          // 创建点标记的时候, 可以讲每个 poi 的id 作为额外数据添加从点标记
          // 用作后面的标识
          extData: poi.id
        });

        // 设置每个点标记鼠标 Hover 事件
        // 传入当前的 poiId, 进行居中
        marker.on("mouseover", () => {
          return this.showPoi(poi.id);
        });

        return marker;
      });

      // 使用通用函数,将整个地图的覆盖物清理掉
      this.map.clearMap();

      this.map.add(this.markers);

      // 添加完点标记, 将地图的视图设为合适的大小
      this.map.setFitView();
    },
    // 定位居中
    showPoi(poiId) {
      // 外面传入 poiId
      // 遍历 markers 数组,
      // 找出对应的标记居中显示

      // 如果不是 vue, 可以用高德的方法获取 markers 数组
      // const markers = this.map.getAllOverlays('marker');

      this.markers.forEach(marker => {
        // 判断标记的额外信息是否等于传进来的poiId
        if (marker.getExtData() == poiId) {
          // 找到了需要居中的标记

          // 将匹配点置顶(重叠的情况)
          marker.setTop(true);
          //显示一个提示窗
          const infoWindow = new AMap.InfoWindow({
            content: `<span style="font-size: 12px;color: #333">${marker.getTitle()}</span>`,
            offset: new AMap.Pixel(0, -32)
          });
          infoWindow.open(this.map, marker.getPosition());

          // 设置地图以这个点居中
          this.map.setCenter(marker.getPosition());
        }
      });
    },
    // 周边数据tab栏触发
    async changeMarkers(types) {
      console.log(types);

      await this.loadPoiList(types);
      // 要等待地点列表获取完毕
      this.setMarkers();
    }
  }
};
</script>

<style lang="less" scoped>
#map {
  width: 650px;
  height: 360px;
}
.locatitonWrapper {
  font-size: 14px;
  padding-left: 20px;
  width: 330px;
  height: 360px;
  .Wrapper-hd {
    overflow: auto;
    height: 300px;
    color: #666;
    .Wrapper-bd {
      margin: 0 20px 20px 10px;
      display: flex;
      span:first-child {
        flex: 1;
      }
    }
  }
}
</style>
