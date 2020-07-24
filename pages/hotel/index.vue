<template>
    <div>
        <h1>酒店模块的地图演示</h1>
        <!-- 1. 创建一个容器放地图 -->
        <div id="mymap"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        // 3. 编写回调函数创建地图
        window.onLoad  = function(){
          var map = new AMap.Map('mymap', {
              zoom: 21,
              center: [113.32459, 23.10668],
              viewMode: '3D'
          });

          var marker = new AMap.Marker({
            position: [113.32459, 23.10668],
            offset: new AMap.Pixel(-100, -100),
            icon: '//vdata.amap.com/icons/b18/1/2.png',
            title: '这里是小蛮腰',
            content: '<h1>哈哈哈</h1>'
          })

          map.add(marker)
          
        }

        // 2. 引入高德地图库
        var url =
            "https://webapi.amap.com/maps?v=1.4.15&key=bd0434aac500d03e65c54ad38c83fe02&callback=onLoad";

        var jsapi = document.createElement("script");
        jsapi.charset = "utf-8";
        jsapi.src = url;

        document.head.appendChild(jsapi);
    },
};
</script>

<style lang="less" scoped>
// 1.2 设置容器的宽高
#mymap {
  width: 640px;
  height: 480px;
}
</style>