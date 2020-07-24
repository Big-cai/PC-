<template>
  <div>
      地图
      <div id="container"></div>
  </div>
</template>

<script>
export default {
    mounted() {
        window.onLoad  = function(){
            // 2. 地图库加载完毕的回调函数
            var map = new AMap.Map('container', {
                zoom: 21,
                center: [113.32459, 23.10668],
                viewMode: '3D'
            });
        }

        // 1. 加载高德地图库
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=bd0434aac500d03e65c54ad38c83fe02&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;

        document.head.appendChild(jsapi);
    }
}
</script>

<style lang="less" scoped>
#container {
    width: 500px;
    height: 300px;
}
</style>