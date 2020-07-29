<template>
  <!-- 详情页地图模块 -->
  <div id="map" style="height:360px; width:650px"></div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("map", {
        zoom: 15
      });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=d07cabd08a2309e5797eaae8b5adbbe0&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
<style lang="less">
#map{
  margin: 40px 0;
}
</style>
